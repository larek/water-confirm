export type createHtmlElementArgs = {
	tag: string;
	classNames: string[];
	onClick?: Function;
	text?: string;
}

export type createConfirmConfig = {
	text: string;
	buttonConfirmText: string;
	buttonDeclineText: string;
	onConfirm: Function;
	onDecline: Function;
}

