const editor = document.querySelector('.editor');
var toolbarOptions = [
  [{ 'font': [] }],
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
 
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'align': [] }],

	];

var options = {
  debug: false,
	modules: {
    toolbar: toolbarOptions
  },
  placeholder: 'Some awesome task text ... ',
  readOnly: true,
  theme: 'snow'
};

const quill = new Quill(editor, options);

export function quillFocus() {
	quill.enable();
	if(!quill.hasFocus()) {
		quill.focus()
	}

}


export function quillText() {
	return quill;
}

/*
 

 * */
