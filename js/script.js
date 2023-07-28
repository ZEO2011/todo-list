// catch elements
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// array of tasks
let tasksArr = [];

// check if there is any tasks in the localStorage

if (localStorage.getItem("tasks") !== null) {
	tasksArr = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

submit.addEventListener("click", function () {
	addTasks(input.value);
	input.value = "";
});

// make new task
function addTasks(title) {
	// set task info
	const task = {
		id: Date.now(),
		title: title,
		completed: false,
	};
	// push task to array of tasks
	tasksArr.push(task);
	// add array of tasks to the tasks container
	addTasksToTasksDiv(tasksArr);
}

function addTasksToTasksDiv(tasksArr) {
	// empty tasks container div
	tasksDiv.innerHTML = "";
	// creating the task into the div container
	tasksArr.forEach((task) => {
		let div = document.createElement("div");
		div.classList.add("task");
		if (task.completed === true) {
			div.classList.add("done");
		}
		div.setAttribute("data-id", task.id);
		let txt = document.createTextNode(task.title);
		div.appendChild(txt);
		let delBtn = document.createElement("span");
		delBtn.innerHTML = "delete";
		delBtn.classList.add("del");
		div.appendChild(delBtn);
		tasksDiv.appendChild(div);
		addToLocalStorage(tasksArr);
	});
}

function addToLocalStorage(tasksArr) {
	// add tasks array to the localStorage
	localStorage.setItem("tasks", JSON.stringify(tasksArr));
}

tasksDiv.onclick = function (e) {
	// check if the clicked thing is the del button
	if (e.target.classList.contains("del")) {
		deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
		e.target.parentElement.remove();
		// check if the clicked thing is the task
	} else if (e.target.classList.contains("task")) {
		toggleStatusTaskWith(e.target.getAttribute("data-id"));
		e.target.classList.toggle("done");
	}
};

function deleteTaskWith(taskId) {
	// delete the task & add it to the localStorage
	tasksArr = tasksArr.filter((task) => task.id != taskId);
	addToLocalStorage(tasksArr);
}

function toggleStatusTaskWith(taskId) {
	// toggle the status of task
	tasksArr.forEach((task) => {
		if (task.id == taskId) {
			task.completed == false
				? (task.completed = true)
				: (task.completed = false);
		}
	});
	addToLocalStorage(tasksArr);
}

function getDataFromLocalStorage() {
	let data = localStorage.getItem("tasks");
	if (data !== null) {
		let tasks = JSON.parse(data);
		addTasksToTasksDiv(tasks);
	}
}

// check if clicked is enter

input.addEventListener("keyup", function (e) {
	if (e.keyCode === 13) {
		if (input.value !== "") {
			addTasks(input.value);
			input.value = "";
		}
	}
});
