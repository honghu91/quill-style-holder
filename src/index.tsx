import Quill from 'quill';
import styleHolder from './styleholder';

const editor = new Quill('#container', {
	theme: 'snow'
});

editor.setContents(editor.clipboard.convert({
	html: '<b>1</b>'
}));

styleHolder(editor);

(window as any).editor = editor;