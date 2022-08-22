import Quill from 'quill';
import styleHolder from './styleholder';

const editor = new Quill('#editor', {
	theme: 'snow'
});

editor.setContents(editor.clipboard.convert({
	html: '<b>sadfasdf</b>'
}));

styleHolder(editor);

(window as any).editor = editor;