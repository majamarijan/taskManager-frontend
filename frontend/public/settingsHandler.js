import { avatars } from './avatars.js';
import loadAvatar from './userAvatar.js';

export default function settingsHandler(wrapper, backdrop) {
	const saveBtn = wrapper.querySelector('.saveBtn');
	const closeBtn = wrapper.querySelector('.closeBtn');
	const form = wrapper.querySelector('form');
	const uname = form.querySelector('#username');
	const pwd = form.querySelector('#password');
	const new_pwd = form.querySelector('#newPwd');
	const dark = form.querySelector('#dark');
	var userSettings = {};
	const elem = {uname, pwd, new_pwd, dark, userSettings};
	const avatarBox = wrapper.querySelector('.avatars');
	const avatar = wrapper.querySelector('.avatar');

	//get localStorage
	
	saveBtn.onclick = (e)=> saveUserSettings(e, backdrop, wrapper, elem);
	closeBtn.onclick = (e)=> closeSettings(backdrop, wrapper);

	createAvatars(avatarBox);
	fetchAvatarImage(avatar,avatarBox);
	form.onclick = (e)=> avatarBox.classList.add('hidden')
}

function createAvatars(box) {
	if(box.innerHTML !== '') {
		box.innerHTML = '';
	}
	const url = 'https://avatars.dicebear.com/api/bottts/';
	const avatar = document.querySelector('.settingsWrapper .avatar');
	for(var i=0; i<12; i++) {
		const image = document.createElement('img');
		const src = `${url}${avatars[i].name}.svg`;
		image.src = src;
		image.id = avatars[i].id;
		image.alt = avatars[i].name;
		image.title = avatars[i].name;
		image.style.width = '40px';
		box.append(image);
		image.onclick = (e)=> replaceAvatar(e, avatar);
	}

}

function fetchAvatarImage(avatar,box) {
	const stored = localStorage.getItem('avatar');
	const img_obj = JSON.parse(stored);
	
	if(img_obj === null) {
		avatar.innerHTML = '';
		loadInitialAvatar(avatar, box);
	}else {
		let image;
		if(avatar.innerHTML !== '') {
			image = avatar.querySelector('img');
		}else {
			image = document.createElement('img');
			avatar.append(image)
		}
		image.src = img_obj['src'];
		image.title = img_obj['title'];
		image.id = img_obj['id'];
		image.onclick = (e)=> openAvatarBox(e, box);
	}
}

async function loadInitialAvatar(avatar, box) {
	const url = `https://avatars.dicebear.com/api/bottts/`;
	const initialName = ':12';
	const res = await fetch(`${url}${initialName}.svg`);
	const src = await res.url;

	if(res.status === 200) {
		const image = document.createElement('img');
		image.src = src;
		image.style.width= '60px';
		image.alt = 'avatar';
		image.title = initialName;
		image.id = 0;
		avatar.append(image);
		saveToStorage(image);
		image.onclick = (e)=> openAvatarBox(e, box);
	}
}

function openAvatarBox(e, box) {
	if (box.className.includes('hidden')){
		box.classList.remove('hidden');
		box.style.display = 'grid';
	}else {
		box.classList.add('hidden')
	}
}

function replaceAvatar(e, avatar) {
 	const image = avatar.querySelector('img');
	image.src = e.target.src;
	image.id = e.target.id;
	image.alt = e.target.title;
	image.title = e.target.title;
	saveToStorage(image);
	loadAvatar(true);
}

function saveToStorage(image) {
	const img_obj = {
		src: image.src,
		title: image.title,
		id: image.id
	}
	localStorage.setItem('avatar', JSON.stringify(img_obj));
}

function saveUserSettings(e, backdrop, wrapper, obj) {
	e.preventDefault();
	obj.userSettings = {
		username: obj.uname.value,
		password: obj.pwd.value,
		new_pwd: obj.new_pwd.value,
		theme: obj.dark.checked ? 'dark' : 'light',
		avatar: localStorage.getItem('avatar')
	};
	console.log(obj.userSettings);
	backdrop.classList.add('hidden');
	wrapper.classList.add('hidden');

}

function closeSettings(bg, wrapper) {
	bg.classList.add('hidden');
	wrapper.classList.add('hidden');
}
