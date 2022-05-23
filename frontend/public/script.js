import inputForm from './inputForm.js' ;
import newTaskHandler from './newTaskHandler.js';
import {quillFocus} from './quillEditor.js';
import settingsHandler from './settingsHandler.js';
import dialog from './dialog.js';
import taskHandler from './taskHandler.js';
import loadAvatar from './userAvatar.js';
//import loadTasks from './start.js';


window.onload = (e)=> {
	const taskWrapper = document.querySelector('.task_wrapper');
	const searchOptions = document.querySelector('.searchOptions');
	const advancedSearch = document.querySelector('.advancedSearch');
	const backdrop = document.querySelector('.backdrop');
	const searchForm = document.querySelector('.advancedSearch form');
	const newTaskBox = document.querySelector('.newTaskBox');
	const addIcon = document.querySelector('.addIcon');
	const trashCan = document.querySelector('.trashCan');
	const settingsIcon = document.querySelector('.settingsIcon');
	const settingsWrapper = document.querySelector('.settingsWrapper');

//	loadTasks();
	taskHandler(backdrop);
	inputForm();
	loadAvatar(false);
	quillFocus();
	searchOptions.onclick = (e)=> openAdvancedSearch(e, backdrop, advancedSearch);
	searchForm.onsubmit = (e)=> getSearchOptions(e, backdrop, advancedSearch);

	settingsIcon.onclick = (e)=> openSettings(e, settingsWrapper, backdrop);
	addIcon.onclick = (e)=> openNewTaskBox(e, backdrop, newTaskBox);
	trashCan.addEventListener('mouseenter', openTrash, false);
	trashCan.addEventListener('mouseleave', closeTrash, false);
	trashCan.onclick = (e)=> openDialog(e, backdrop, taskWrapper);
}

function openAdvancedSearch(e, backdrop, search) {
	backdrop.classList.remove('hidden');
	search.classList.remove('hidden');
	console.log('search opened')
}

function getSearchOptions(e, backdrop, search) {
	e.preventDefault();
	backdrop.classList.add('hidden');
	search.classList.add('hidden');
	console.log('sent')
}

function openNewTaskBox(e,backdrop,div) {
	div.classList.remove('hidden');
	backdrop.classList.remove('hidden');
	newTaskHandler();
}


function openTrash(e) {
	const trashCover = document.querySelector('.trashCan #svg_32');
	trashCover.setAttribute('y', '10');
}

function closeTrash(e) {
	const trashCover = document.querySelector('.trashCan #svg_32');
	trashCover.setAttribute('y','14.5')
}

function openSettings(e, wrapper, bg) {
	bg.classList.remove('hidden');
	wrapper.classList.remove('hidden');
	settingsHandler(wrapper, bg);
}

function openDialog(e, backdrop, tasks) {
	const dialog_ = document.querySelector('.dialog');
	dialog(backdrop, dialog_, 'Delete All Tasks?','Are you sure?', tasks)
}
