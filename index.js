let task = [
    {id: 1, title: 'Task 1', isCompleted: true}, 
    {id: 2, title: 'Task 2', isCompleted: false}, 
    {id: 3, title: 'Task 3', isCompleted: false}
];

const isChecked=(event,element)=>{
    console.log(event);
    console.log(element.checked);
    if(element.checked)
    {
        
        event.currentTarget.parentElement.classList = 'checked';
        //console.log(element,"inside if");
    }
    else
    {
        event.currentTarget.parentElement.classList = 'unchecked';
        //console.log(element,"inside else");
    }
}

const deleteItem=(itemId)=>{
    console.log(itemId);
    const index= task.findIndex(t=>t.id===itemId);
    task.splice(index,1);
    const ele= document.getElementById(itemId);
    ele.remove();
    //console.log(task);
}

window.onload = function () {
    let unOrderedList = "<ul id='list'>";
    task.forEach((item) => {
        // unOrderedList += '<li>'+'<input type="checkbox" value="unchecked">' + item.title + '</li>';
        unOrderedList += `<li id=${item.id} class=${item.isCompleted===true?"checked":"unchecked"}> <input type="checkbox" ${item.isCompleted===true?"checked":""} onclick="isChecked(event,this)" > ${item.title} <i class="fa fa-edit"> </i> <i class="fa fa-trash" aria-hidden="true" onclick="deleteItem(${item.id})"></i> </li> `;
    }
    )
    unOrderedList += '</ul>';
    document.getElementById("task").innerHTML += unOrderedList;
}

const addData = () => {
    const inputData = document.getElementById("input_data").value;
    //console.log(inputData);
    if (inputData === "") {
        alert("Cannot add empty task");
    }
    else {
        
        let uuid=uuidv4();
        const newTask= {id:uuid,title:inputData,isCompleted:false};
        task.push(newTask);
        console.log(task);
        let ul = document.getElementById("list");
        let li = document.createElement("li");
        li.setAttribute("id",uuid);
        let checkBox= document.createElement('input');
        let deleteIcon= document.createElement('i');
        let editIcon=document.createElement('i');
        checkBox.type="checkbox";
        checkBox.value=0;
        if(newTask.isCompleted)
        {
            checkBox.setAttribute("checked");
        } 
        li.appendChild(checkBox);
        li.appendChild(document.createTextNode(` ${inputData} `));
        editIcon.setAttribute("class","fa fa-edit");
        editIcon.setAttribute("aria-hidden","true");
        deleteIcon.setAttribute("class","fa fa-trash");
        deleteIcon.setAttribute("aria-hidden","true");
        deleteIcon.onclick=function(){deleteItem(uuid)};
        li.appendChild(editIcon);
        li.appendChild(deleteIcon);
        checkBox.onclick=function(){isChecked(event,this)};
        ul.appendChild(li);
        document.getElementById("input_data").value="";
    }
}





