let task = ["Task 1", "Task 2"];
window.onload = function () {
    let orderedList = "<ol id='list'>";
    task.forEach((item) => {
        orderedList += '<li>' + item + '</li>';
    }
    )
    orderedList += '</ol>';
    document.getElementById("task").innerHTML += orderedList;
}

const addData = () => {
    const inputData = document.getElementById("input_data").value;
    if (inputData === "") {
        alert("Cannot add empty task");
    }
    else {
        task.push(inputData);
        var ol = document.getElementById("list");
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(inputData));
        ol.appendChild(li);
        document.getElementById("input_data").value="";
    }
}


