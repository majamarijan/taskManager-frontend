export default function dialog(bg, dg, title, text, tasks) {
	bg.classList.remove('hidden');
	dg.classList.remove('hidden');
	const okBtn = dg.querySelector('.saveBtn');
	const cancel = dg.querySelector('.closeBtn');
	const title_ = dg.querySelector('.dialog_title');
	const text_ = dg.querySelector('.dialog_text');
	
	title_.innerText = title;
	text_.innerText = text;

	okBtn.onclick = (e)=> clearAll(e,bg,dg,tasks);
	cancel.onclick = (e)=> cancelRequest(e, bg, dg);
}

function cancelRequest(e, bg, dg) {
	bg.classList.add('hidden');
	dg.classList.add('hidden')
}

function clearAll(e, bg, dg, tasks) {
	tasks.innerHTML = '';
	bg.classList.add('hidden');
	dg.classList.add('hidden');
}


