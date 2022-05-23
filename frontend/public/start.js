export default async function loadTasks() {
	 const res = await fetch('/tasks/taskList');
	const json = await res.json();
	const noTasks = document.querySelector('.tasksInfo');	
	console.log(json)

	if(json.message) {
		noTasks.classList.remove('hidden');
		noTasks.textContent = json.message;
	}else {
		noTasks.classList.add('hidden');
		displayTask(json);
	}
}


function displayTask(json) {
	const wrapper = document.querySelector('.task_wrapper');
	populateTasks(json, wrapper);
}

function populateTasks(arr, wrapper) {	
	const dateArr = [];
	arr.forEach(task => {
		var date = checkDate(task.date);
		dateArr.push({date: date, id:date.replace(/\s+/g, '')});
		createNewBlock(task, dateArr, wrapper)
	});
}

function createNewBlock(task, dateArr, wrapper){
	console.log(task);
	dateArr.forEach(obj => {

		createBlock(obj.date, obj.id, task, wrapper)
	});
}


function checkBlockID(block, task, date, wrapper) {
//	console.log(task)
//	console.log(block)
	const id = date.replace(/\s+/g, '');
	for(var i=0;i<block.length; i++) {
	
		if(block[i].id === id) {
			const b = document.querySelector(`#${id}`);
			const tasks = b.querySelector('.tasks');
			createTasks(tasks, task)
			
		}else {
			
		}
/*		if(block[i].id === id) {
					const b = document.querySelector(`#${id}`);
			const tasks = b.querySelector('.tasks');
			const taskDIV = tasks.querySelectorAll('.task');
			console.log(taskDIV)
			createTasks(tasks, task)
		}
		else 	{
			console.log(block.id)
			createBlock(task, wrapper, date)
		}*/
	}
	
}

function createBlock(date, id, task, wrapper) {	
//	const id = date.replace(/\s+/g, '');

	const b = document.createElement(`div`);
			b.id = id;
			b.className = 'task_block';
			const dayIndicator = document.createElement('p');
			dayIndicator.className = 'day_indicator';
			dayIndicator.textContent = date;
			const tasks = document.createElement('div');
			tasks.className = 'tasks';
			const taskDiv = document.createElement('div');
			taskDiv.className = 'task';
			const taskTime = document.createElement('div');
			taskTime.className = 'task_time';
			taskTime.textContent = task.time;
			const taskContent = document.createElement('div');
			taskContent.className = 'task_content';
			const text = document.createElement('div');
			text.className = 'task_text';
			text.textContent = task.task;
			taskDiv.id = task._id;
			taskDiv.append(taskTime);
			taskContent.append(text);
			taskDiv.append(taskContent);
			tasks.append(taskDiv);
			b.append(dayIndicator);
			b.append(tasks);
			wrapper.append(b);

}

function createTasks(tasks, task) {
		const taskDiv = document.createElement('div');
			taskDiv.className = 'task';
			const taskTime = document.createElement('div');
			taskTime.className = 'task_time';
			taskTime.textContent = task.time;
			const taskContent = document.createElement('div');
			taskContent.className = 'task_content';
			const text = document.createElement('div');
			text.className = 'task_text';
			text.textContent = task.task;
			taskDiv.id = task._id;
			taskDiv.append(taskTime);
			taskContent.append(text);
			taskDiv.append(taskContent);
			tasks.append(taskDiv);

}

function checkDate(date) {
	const months = ['Jan', 'Feb', 'March', 'Apr', "May", 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
		var date = new Date(date);
		var year = date.getFullYear();
		var today = date.getDate() === new Date().getDate();
		var month = date.getMonth() === new Date().getMonth();
		var current = new Date().getFullYear();
		if(current > year) {
			return `${months[date.getMonth()]} ${date.getDate()}, ${year}`
		}else {
			if(today && month) {
				return `Today`
			}else {
				return `${months[date.getMonth()]} ${date.getDate()}`
				}
			}
	}
