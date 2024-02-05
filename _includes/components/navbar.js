const openicon = document.getElementById("open-icon");
const closeicon = document.getElementById("close-icon");
const menu = document.getElementById("menu");
openicon.addEventListener("click", openMenu);
closeicon.addEventListener("click", closeMenu);

function openMenu() {
	menu.style.maxHeight = 62 * 3 + "px";
	closeicon.style.display = "block";
	openicon.style.display = "none";
}
function closeMenu() {
	menu.style.maxHeight = "0";
	closeicon.style.display = "none";
	openicon.style.display = "block";
}
