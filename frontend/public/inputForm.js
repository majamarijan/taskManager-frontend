export default function inputForm() {
	const header = document.querySelector('header');
	const content = document.querySelector('.content');

	const searchBar = document.querySelector('.searchBar');
	const searchText = document.querySelector('.searchBar input');
	searchBar.onsubmit = (e)=> submitQuery(e, searchText);
	searchText.oninput = (e)=> controlInput(e.target, 'focused');
	searchText.onclick = (e)=> controlInput(e.target, 'focused');

	header.onclick = (e)=> controlInput(searchText, '');
	content.onclick = (e)=> controlInput(searchText, '')


}

function submitQuery(e, text) {
	e.preventDefault();
	if(text.value) {
		console.log('sent');
		text.value = '';
		var props = {color: 'lightgray', bg: '#ede6e6'}
		setValues(text, props)
	}
}


function controlInput(text, msg) {
	if(!msg &&  text.value === '') {
		var props = {color: 'lightgray', bg: '#ede6e6'};
	}else {
		var props = {color: 'black', bg: 'white'};
	}
		setValues(text, props)

}

function setValues(input, props) {
	input.style.color = props.color;
	input.style.background = props.bg;

}



