let task = ["Task 1", "Task 2"];
window.onload = function () {
    task.forEach((item) => {
        console.log(item);
        document.getElementById("task").innerHTML += item;
    }
    )
}

const addData=()=>{
    const inputData=document.getElementById("input_data").value;
    task.push(inputData);
    document.getElementById("task").innerHTML=task;
}
