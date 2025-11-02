let leftviewer = document.getElementById("viewer-left-image");
let rightviewer = document.getElementById("viewer-right-image");
let rightContainer = document.getElementById("image-container-right");
let mobileviewer = document.getElementById("viewer-mobile-image");
let preview = document.querySelector(".viewer-preview");
let currentPage = 1;

document
	.getElementById("desktop-right-arrow")
	.addEventListener("click", () => desktopModify(1));
document
	.getElementById("desktop-left-arrow")
	.addEventListener("click", () => desktopModify(-1));
document
	.getElementById("mobile-right-arrow")
	.addEventListener("click", () => mobileModify(1));
document
	.getElementById("mobile-left-arrow")
	.addEventListener("click", () => mobileModify(-1));

function desktopModify(direction) {
	const lastPage = Number(params.max);
	if ((currentPage === 1 && direction === -1) || (currentPage >= lastPage && direction === 1)) return;
	if (currentPage === 1 && direction === 1) {
		currentPage = 2; 
	} else if (direction === 1) {
		currentPage = Math.min(currentPage + 2, lastPage);
	} else if (direction === -1) {
		currentPage = Math.max(currentPage - 2, 1);
	}
	updateDesktopImages();
}


function mobileModify(mod) {
	const mobilesrc = mobileviewer.getAttribute("src");
	mobileviewer.setAttribute("src", modifySrc(mobilesrc, mod));
}

function updateDesktopImages() {
	const lastPage = Number(params.max);
	if (currentPage === 1 || currentPage === lastPage) {
		leftviewer.setAttribute(
			"src",
			`/${params.issue}/images/${params.issue}-${currentPage}.jpg`
		);
		rightContainer.style.display = "none";
		preview.classList.add("single-page");
	} else {
		const leftNum = currentPage;
		const rightNum = currentPage + 1 <= lastPage ? currentPage + 1 : null;
		leftviewer.setAttribute(
			"src",
			`/${params.issue}/images/${params.issue}-${leftNum}.jpg`
		);
		if (rightNum) {
			rightviewer.setAttribute(
				"src",
				`/${params.issue}/images/${params.issue}-${rightNum}.jpg`
			);
			rightContainer.style.display = "block";
			preview.classList.remove("single-page");
		} else {
			rightContainer.style.display = "none";
			preview.classList.add("single-page");
		}
	}
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

updateDesktopImages();
