import {quillText, quillFocus} from './quillEditor.js';

export default function newTaskHandler(obj) {
	const newTaskBox = document.querySelector('.newTaskBox');
	const form = document.querySelector('.newTaskBox .body');
	const text = document.querySelector('.newTaskBox #title');
	const time = document.querySelector('.newTaskBox #time');
	const date = document.querySelector('.newTaskBox #date');
	const category = document.querySelector('.newTaskBox .nt_category');
	const cancelBtn = document.querySelector('.newTaskBox .closeBtn');
	const important = document.querySelector('.newTaskBox #important');
	const backdrop = document.querySelector('.backdrop');
	const star = document.querySelector('.newTaskBox .star');
	const info = document.querySelector('.newTaskBox #info');
	const quill = quillText();

	if(obj) {
		console.log(obj);
		text.value = obj.title;
		time.value = obj.timedate;
	}


	var taskInfo = '';
	var isGold = false;
	var newTask = {};

	star.onclick = (e)=> {
		isGold = !isGold;
		if(isGold) {
			important.checked = true;
			newTask.important = true;
		}else {
			important.checked = false;
			newTask.important = false;
		}
		fillStar(isGold);
	}

	cancelBtn.onclick = (e)=> closeDialog(e, backdrop, newTaskBox);
	form.onsubmit = (e)=> saveTask(e, newTask)
	text.oninput = (e)=> newTask.text = e.target.value;
	time.oninput = (e)=> newTask.time = e.target.value;
	date.oninput = (e)=> newTask.date = e.target.value;
	category.onchange = (e)=> newTask.category = e.target.value;
	
	important.oninput = (e)=> {
		var isOn = e.target.checked;
		newTask.important = isOn;
		fillStar(isOn)
	}

	info.onclick = ()=> quillFocus();

	quill.on('text-change', function(delta, oldDelta, source) {
 	 if (source == 'api') {
 	  console.log("An API call triggered this change.");
		}else if (source == 'user') {
			var text = quill.getText();
			var arr = text.split('');
			for(var i=0;i<arr.length;i++) {
				if(arr[i] === '\n') {
					arr.splice(i, 1,' ');
				}
			}
			newTask.textInfo = arr.join('').trim();
			//console.log("A user action triggered this change.");
 		}
	});

}

function closeDialog(e, backdrop, newTaskBox) {
	console.log('close');
	backdrop.classList.add('hidden');	
	newTaskBox.classList.add('hidden');
}

function saveTask(e, newTask) {
	e.preventDefault();
	console.log('saved');
	console.log(newTask)
}

function fillStar(isGold) {
	const polygon = document.querySelector('.star #svg_1');
		if(isGold) {
			polygon.style.fill = 'gold';
		}else {
			polygon.style.fill = '#fcfcfc';
		}
}


