let leftviewer = document.getElementById("viewer-left-image");
let rightviewer = document.getElementById("viewer-right-image");
let mobileviewer = document.getElementById("viewer-mobile-image");

document
	.getElementById("desktop-right-arrow")
	.addEventListener("click", () => desktopModify(2));
document
	.getElementById("desktop-left-arrow")
	.addEventListener("click", () => desktopModify(-2));
document
	.getElementById("mobile-right-arrow")
	.addEventListener("click", () => mobileModify(1));
document
	.getElementById("mobile-left-arrow")
	.addEventListener("click", () => mobileModify(-1));

function desktopModify(mod) {
	const leftsrc = leftviewer.getAttribute("src");
	const rightsrc = rightviewer.getAttribute("src");

	leftviewer.setAttribute("src", modifySrc(leftsrc, mod));
	rightviewer.setAttribute("src", modifySrc(rightsrc, mod));
}

function mobileModify(mod) {
	const mobilesrc = mobileviewer.getAttribute("src");
	mobileviewer.setAttribute("src", modifySrc(mobilesrc, mod));
}

function getNum(src) {
	const splitsrc = src.split("/");
	const filename = String(splitsrc[splitsrc.length - 1]);
	return Number(filename.split("-")[1].split(".")[0]);
}

function modifySrc(src, add) {
	let num = getNum(src);
	if (num + add <= Number(params.max) && num + add >= Number(params.min)) {
		num += add;
	}

	return `/${params.issue}/images/${params.issue}-${num}.jpg`;
}
