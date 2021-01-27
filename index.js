

window.onload = function () {
    let task = [
        // {id: 1, title: 'Task 1', isCompleted: true}, 
        // {id: 2, title: 'Task 2', isCompleted: false}, 
        // {id: 3, title: 'Task 3', isCompleted: false}
    ];

    let localTask = localStorage.getItem("task");
    //console.log(localTask);
    if (!localTask) {
        //console.log("i am here");
        let taskStrigified = JSON.stringify(task);
        localStorage.setItem("task", taskStrigified);
        
    }

    localTask = localTask? JSON.parse(localTask):[];
        let unOrderedList = "<ul id='list'>";
        localTask.forEach((item) => {
            // unOrderedList += '<li>'+'<input type="checkbox" value="unchecked">' + item.title + '</li>';
            unOrderedList += `<li id=${item.id} class=${item.isCompleted === true ? "checked" : "unchecked"}> <input type="checkbox" ${item.isCompleted === true ? "checked" : ""} onclick="isChecked(event,this)" > <span> ${item.title} </span> <i class="fa fa-edit" onclick="editItem('${item.id}')"> </i> <i class="fa fa-trash" id="delete-${item.id}" aria-hidden="true" onclick="deleteItem('${item.id}')"></i> </li> `;
        }
        )
        unOrderedList += '</ul>';
        //console.log(unOrderedList);
        document.getElementById("task").innerHTML += unOrderedList;

}

const isChecked = (event, element) => {
     //console.log(event.currentTarget.parentElement);
    // console.log(element.checked);
    let localTask=localStorage.getItem("task");
    localTask=JSON.parse(localTask);
    const id=event.currentTarget.parentElement.id;
    const index = localTask.findIndex(t => t.id === id);
    
    
    if (element.checked) {

        event.currentTarget.parentElement.classList = 'checked';
        localTask[index].isCompleted = true;
        //console.log(element,"inside if");
    }
    else {
        event.currentTarget.parentElement.classList = 'unchecked';
        localTask[index].isCompleted = false;
        //console.log(element,"inside else");
    }
    localTask=JSON.stringify(localTask);
    localStorage.setItem("task",localTask);
}

const deleteItem = (itemId) => {
    let localTask=localStorage.getItem("task");
    localTask=JSON.parse(localTask);
    //console.log(itemId);
    const index = localTask.findIndex(t => t.id === itemId);
    localTask.splice(index, 1);
    localTask=JSON.stringify(localTask);
    localStorage.setItem("task",localTask);
    const ele = document.getElementById(itemId);
    ele.remove();
    //console.log(task);
}

const changeClassName = (id, value) => {
    document.getElementById(id).classList = value;
}

const editItem = (itemId) => {
    //console.log(itemId);
    let localTask=localStorage.getItem("task");
    localTask=JSON.parse(localTask);
    //console.log(localTask);
    document.getElementById(`delete-${itemId}`).classList += " disable";
    const itemData = localTask.find(t => t.id === itemId);
    document.getElementById("input_data").value = itemData.title;
    changeClassName('addButton', 'hide');
    changeClassName('saveButton', 'show');
    changeClassName('cancelButton', 'show');
    const saveButton = document.getElementById("saveButton");
    saveButton.onclick = function () { saveData(itemId) };

}

const saveData = (itemId) => {
    let localTask=localStorage.getItem("task");
    localTask=JSON.parse(localTask);
    document.getElementById(`delete-${itemId}`).classList.remove("disable");
    const index = localTask.findIndex(t => t.id === itemId);
    const inputValue = document.getElementById("input_data").value;
    localTask[index].title = inputValue;
    localTask=JSON.stringify(localTask);
    localStorage.setItem("task",localTask);
    document.getElementById(itemId).children[1].innerHTML = inputValue;
    cancelData();
    console.log(task);
}

const cancelData = () => {
    document.getElementById("input_data").value = "";
    changeClassName('addButton', 'show');
    changeClassName('saveButton', 'hide');
    changeClassName('cancelButton', 'hide');

}



const addData = () => {
    const inputData = document.getElementById("input_data").value;
    //console.log(inputData);
    if (inputData === "") {
        alert("Cannot add empty task");
    }
    else {
        //get data from local storage
        let tasks = localStorage.getItem("task");
        tasks = JSON.parse(tasks);

        let uuid = uuidv4();
        const newTask = { id: uuid, title: inputData, isCompleted: false };
        tasks.push(newTask);
        console.log(tasks);
        tasks = JSON.stringify(tasks);
        localStorage.setItem("task", tasks);

        //For View
        let ul = document.getElementById("list");
        let li = document.createElement("li");
        li.setAttribute("id", uuid);
        let checkBox = document.createElement('input');
        let deleteIcon = document.createElement('i');
        let editIcon = document.createElement('i');
        let spanTag = document.createElement('span');
        checkBox.type = "checkbox";
        checkBox.value = 0;
        if (newTask.isCompleted) {
            checkBox.setAttribute("checked");
        }
        li.appendChild(checkBox);
        spanTag.appendChild(document.createTextNode(` ${inputData} `));
        li.appendChild(spanTag);
        editIcon.setAttribute("class", "fa fa-edit");
        editIcon.setAttribute("aria-hidden", "true");
        editIcon.onclick = function () {editItem(uuid) };
        deleteIcon.setAttribute("class", "fa fa-trash");
        deleteIcon.setAttribute("aria-hidden", "true");
        deleteIcon.setAttribute("id", `delete-${uuid}`);
        deleteIcon.onclick = function () { deleteItem(uuid) };
        li.appendChild(editIcon);
        li.appendChild(deleteIcon);
        checkBox.onclick = function () { isChecked(event, this) };
        ul.appendChild(li);
        document.getElementById("input_data").value = "";
    }
}





