import Quill from 'quill';
const Parchment = Quill.import('parchment');
import Delta from 'quill-delta';

const styleHolderAttr = new Parchment.Attributor('styleholder', 'styleholder');
Quill.register(styleHolderAttr);

const Inline = Quill.import('blots/inline');

class StartBlot extends Inline { }
StartBlot.blotName = 'start';
StartBlot.tagName = 'start';

Quill.register(StartBlot);

/**
	1. 新输入文字，和前面的文字样式保持一致，
		a. 如果前面没有，有两种情况
			i. 初始态，使用默认样式
			ii. 删光了，则使用最后一个删除的字符样式，即头字
		b. 如果是一行内输入，保持最后一个字符样式
		c. 如果是换行，则和前一行的尾部字符样式一致，换行，相当于换行符有一个自己的样式
*/
const getOpsOffset = (delta: Delta, targetDeltaIndex: number) => {
	const ops = delta.ops.slice(0, targetDeltaIndex);

	return ops.reduce((currIndex, item) => {
		if(item.retain) {
			return currIndex + item.retain;
		} else if(item.insert) {
			return currIndex + (typeof item.insert === 'string' ? item.insert.length: 1);
		} else if(item.delete) {
			return currIndex - item.delete;
		}

		return currIndex;
	}, 0);
};
// styleholder代表的是下一行行首的样式
const styleHolder = (editor: Quill) => {
	editor.on('text-change', (delta, oldContent) => {
		console.log(delta.ops, oldContent.ops);

		const ops = delta.ops;

		const lastOp = ops[ops.length - 1];

    /*
		1\n =====>     换行的话，会在  1后面插入\n, \n会复制后面\n的样式   1\n \n
		*/
		if(lastOp && lastOp.insert === '\n') { // 插入了新行，是在前面插入的\n
			// 获得上一行的样式，如果上一行是空串，使用\n上的，否则使用最后一个字符的样式

			const currInseredIndex = getOpsOffset(delta, ops.length - 1); 

			const preText = editor.getText(currInseredIndex - 1, 1);

			let formats: any;
			if(preText !== '\n') {
				formats = editor.getFormat(currInseredIndex - 1, 1);
				delete formats['styleholder'];

				setTimeout(() => {
					const range = editor.getSelection();
					console.log(currInseredIndex, range, formats);
					//editor.insertText(offset + 1, ' ', { start: true });
					editor.formatText(currInseredIndex + 1, 1, 'styleholder', JSON.stringify(formats));
				}, 100);
			}
		}
	});
};

export default styleHolder;