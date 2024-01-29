type Options = {
	tag: string;
	text: string;
}

export const createConfirm = (options: Options) => {
	const elm = document.createElement(options.tag)
	elm.innerHTML = options.text
	document.body.appendChild(elm);
}

