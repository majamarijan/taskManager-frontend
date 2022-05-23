export default function loadAvatar(isChanged) {
	const avatarBox = document.querySelector('.sidebar_header .avatar');
	const avatar = localStorage.getItem('avatar');

	if(!isChanged) {
		if(avatar === null) {
			loadInitialAvatar(avatarBox);
		}else {	
			loadUserAvatar(avatarBox, avatar);
		}
	}else {
		loadUserAvatar(avatarBox, avatar);
	}
}

async function loadInitialAvatar(box) {
	box.innerHTML = '';
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
		box.append(image);
	}
}

function loadUserAvatar(box, avatar) {
	let image;
	if(box.innerHTML !== '') {
		image = box.querySelector('img');
	}else {
		image = document.createElement('img');
		box.append(image)
	}
	
	const img_obj = JSON.parse(avatar);
	image.alt = img_obj.title;
	image.title = img_obj.title;
	image.src = img_obj.src;
	image.id = img_obj.id;
	console.log(image)
}
