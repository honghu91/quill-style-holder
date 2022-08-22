import Quill from 'quill';

/**
	1. 新输入文字，和前面的文字样式保持一致，
		a. 如果前面没有，有两种情况
			i. 初始态，使用默认样式
			ii. 删光了，则使用最后一个删除的字符样式，即头字
		b. 如果是一行内输入，保持最后一个字符样式
		c. 如果是换行，则和前一行的尾部字符样式一致，换行，相当于换行符有一个自己的样式
*/

const styleHolder = (editor: Quill) => {
	editor.on('text-change', (delta, oldContent) => {
		
	});
};

export default styleHolder;