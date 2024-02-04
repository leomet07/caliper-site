document
	.getElementById("desktop-right-arrow")
	.addEventListener("click", () => desktopModify(2));
document
	.getElementById("desktop-left-arrow")
	.addEventListener("click", () => desktopModify(-2));
document
	.getElementById("mobile-right-arrow")
	.addEventListener("click", () => desktopModify(1));
document
	.getElementById("mobile-left-arrow")
	.addEventListener("click", () => desktopModify(-1));
let leftviewer = document.getElementById("viewer-left");
let rightviewer = document.getElementById("viewer-right");

function desktopModify(mod) {
	const leftsrc = leftviewer.getAttribute("src");
	const rightsrc = rightviewer.getAttribute("src");

	leftviewer.setAttribute("src", modifySrc(leftsrc, mod));
	rightviewer.setAttribute("src", modifySrc(rightsrc, mod));
}

function modifySrc(src, add) {
	const splitsrc = src.split("/");
	const filename = String(splitsrc[splitsrc.length - 1]);
	let num = Number(filename.split("-")[1].split(".")[0]);
	if (num + add <= Number(params.max) && num + add >= Number(params.min)) {
		num += add;
	}

	return `/${params.issue}/images/${params.issue}-${num}.jpg`;
}
