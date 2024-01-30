type createConfirmConfig = {
	text: string;
	buttonConfirmText: string;
	buttonDeclineText: string;
	onConfirm: Function;
	onDecline: Function;
}

type createHtmlElementArgs = {
	tag: string;
	classNames: string[];
	onClick?: Function;
	text?: string;
}

const defaultConfig: createConfirmConfig = {
	text: 'Are you sure?',
	buttonConfirmText: 'Ok',
	buttonDeclineText: 'Cancel',
	onConfirm: () => { console.log("confirm") },
	onDecline: () => { console.log("decline") },
}

const createHtmlElement = (args: createHtmlElementArgs): HTMLElement => {
	const { tag, classNames, text, onClick } = args;
	const element = document.createElement(tag);
	element.classList.add(...classNames);
	element.innerText = text ?? "";

	if (onClick) {
		element.addEventListener("click", () => {
			onClick();
		});
	}

	return element;
}

const createConfirm = (config: createConfirmConfig = defaultConfig): void => {
	const body = document.querySelector("body");

	if (!body) {
		throw new Error("No button");
	}

	// add attributes to body
	body.setAttribute("confirm-water", "true");

	// Create container
	const confirmContainer = createHtmlElement({
		tag: "div",
		classNames: ["confirm-water-container"],
	});

	// Create confirm button
	const confirmBtn = createHtmlElement({
		tag: "button",
		classNames: ["confirm-water-btn", "confirm-water-confirm-btn"],
		text: config.buttonConfirmText,
		onClick: () => {
			confirmContainer.remove();
			body.removeAttribute("confirm-water");
			config.onConfirm();
		}
	});


	// Create decline button
	const declineBtn = createHtmlElement({
		tag: "button",
		classNames: ["confirm-water-btn", "confirm-water-decline-btn"],
		text: config.buttonDeclineText,
		onClick: () => {
			confirmContainer.remove();
			body.removeAttribute("confirm-water");
			config.onDecline();
		}
	});

	// Create window
	const confirmWindow = createHtmlElement({
		tag: "div",
		classNames: ["confirm-water-window"],
	});

	// Create text element
	const confirmText = createHtmlElement({
		tag: "div",
		classNames: ["confirm-water-text"],
		text: config.text,
	});

	// Create action block
	const confirmActionContainer = createHtmlElement({
		tag: "div",
		classNames: ["confirm-water-action-container"],
	});

	// append elements
	confirmWindow.appendChild(confirmText);
	confirmActionContainer.appendChild(confirmBtn);
	confirmActionContainer.appendChild(declineBtn);
	confirmWindow.appendChild(confirmActionContainer);
	confirmContainer.appendChild(confirmWindow);

	body.appendChild(confirmContainer);
}

export default createConfirm;

