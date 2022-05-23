import newTaskHandler from './newTaskHandler.js';

export default function taskHandler (bg) {
	const arr = document.querySelectorAll('.task');
	const taskPreview = document.querySelector('.taskPreview');

	for(var i=0; i<arr.length; i++) {
		arr[i].id = Math.random() * 10 + Math.random();
		const task = arr[i];
		arr[i].onclick = (e)=> openTaskPreview(task, bg, taskPreview);
	}
}

function openTaskPreview(task, bg, box) {
	bg.classList.remove('hidden');
	box.classList.remove('hidden');
	addContent(task, box, bg);
}

function addContent(task, box, bg) {
	// this will read from DB
	const title = box.querySelector('h2');
	const timedate = box.querySelector('.timedate');
	const text = box.querySelector('.text');
	const editBtn = box.querySelector('.editBtn');
	const closeBtn = box.querySelector('.closeBtn');
	const title_ = task.querySelector('.task_text');
	const timedate_ = task.querySelector('.task_time');
	title.textContent  = title_.innerHTML;
	timedate.textContent = timedate_.innerHTML;

	const contents = {
		title: title_.innerHTML,
		timedate: timedate_.innerHTML
	}

	closeBtn.onclick = (e)=> closePreview(box, bg);
	editBtn.onclick = (e)=> editTask(contents, box, bg);
}

function editTask(task,box, bg) {
	box.classList.add('hidden');
	const taskEditor = document.querySelector('.newTaskBox');
	const title = taskEditor.querySelector('h2');

	taskEditor.classList.remove('hidden');
	title.textContent = 'Edit Task';

	newTaskHandler(task);

}

function closePreview(box, bg) {
	bg.classList.add('hidden');
	box.classList.add('hidden');
}

