/*
 * Creates pixel art grid
 * @param el DOM Element
 * @param rows Number of rows
 * @param rows Number of cols
 */

function getRandomColor() {
	let letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
function PixelArt(el, rows, cols) {
	let selectedColor;
	let container = document.querySelector(el);
	let itemsFragment = document.createDocumentFragment();
	container.style.display = "grid";
	container.style.gridTemplateColumns = `repeat(${cols}, 25px)`;

	// Creating i * j grid items
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			let item = document.createElement("div");
			item.classList.add("item");
			item.dataset.i = i;
			item.dataset.j = j;
			item.addEventListener("dragstart", onDrag);
			item.addEventListener("dragover", onDrag);
			itemsFragment.append(item);
		}
	}

	// Creating Color pallete tiles
	let color;
	for (let j = 0; j < cols; j++) {
		color = getRandomColor();
		let item = document.createElement("div");
		item.classList.add("color-item");
		item.style.backgroundColor = color;
		item.dataset.color = color;
		itemsFragment.append(item);
		selectedColor = color; // setting last color as default selected color
	}

	// Drawing Elements
	container.appendChild(itemsFragment);

	function onTileClick(e) {
		// checking if user clicked on color pallete tile
		let tileColor = e.target.dataset.color;
		if (tileColor) {
			onColorSelect(tileColor);
			return;
		}

		// checking if user clicked on simple tile
		let { i, j } = e.target.dataset;
		if (i !== undefined && j !== undefined) {
			onSimpleTileClick(i, j);
		}
	}
	function onDrag(e) {
		let { i, j } = e.target.dataset;
		if (i !== undefined && j !== undefined) {
			onSimpleTileClick(i, j);
		}
	}
	function onSimpleTileClick(i, j) {
		let selectedTile = container.children[i * Number(rows) + Number(j)];
		if (selectedTile) {
			selectedTile.style.backgroundColor = selectedColor;
		}
	}
	function onColorSelect(tileColor) {
		if (tileColor) {
			selectedColor = tileColor;
		}
	}

	container.addEventListener("click", onTileClick);
	// container.addEventListener("dragstart", e => console.log("Drag started", e));
	// container.addEventListener("dragover", e => console.log("DragOver", e));
}

new PixelArt("#grid", 10, 10);
