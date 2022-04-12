const getRandomColors = function () {
	var ratio = 0.618033988749895;

	var hue = (Math.random() + ratio) % 1;
	var saturation = Math.round(Math.random() * 100) % 85;
	var lightness = Math.round(Math.random() * 100) % 85;

	var color = "hsl(" + Math.round(360 * hue) + "," + saturation + "%," + lightness + "%)";
	var oddColor = "hsl(" + Math.round(360 * hue) + "," + saturation + "%," + (lightness + 5) + "%)";

	return {
		color,
		oddColor,
	};
};

function ColorSpotter(el, scoreEl, startSize = 4) {
	let score = 0;
	let size = startSize;
	let totalWidth = 500;
	let randomTileObj = getRandomTile(size);
	let container = document.querySelector(el);
	let scoreElement = document.querySelector(scoreEl);

	function getRandomTile() {
		return {
			i: Math.floor(Math.random() * size),
			j: Math.floor(Math.random() * size),
		};
	}
	function drawGridItems() {
		let itemsContainer = document.createDocumentFragment();
		let container = document.querySelector(el);

		let colors = getRandomColors();
		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++) {
				let item = document.createElement("div");
				item.classList.add("item");
				if (i === randomTileObj.i && j === randomTileObj.j) {
					item.style.backgroundColor = colors.oddColor;
				} else {
					item.style.backgroundColor = colors.color;
				}
				item.dataset.i = i;
				item.dataset.j = j;
				// item.style.width = `${totalWidth / startSize}px`;
				item.style.height = `${totalWidth / size}px`;
				itemsContainer.append(item);
			}
		}
		container.innerHTML = "";
		container.style.display = "grid";
		container.style.gridTemplateColumns = `repeat(${size}, ${totalWidth / size}px)`;
		container.appendChild(itemsContainer);
	}
	function setScore(n) {
		scoreElement.innerText = n;
		score++;
	}
	function setThings(newSize) {
		size = newSize;
		randomTileObj = getRandomTile(newSize);
		drawGridItems();
	}
	function shake() {
		container.classList.add("shake");
		setTimeout(() => {
			container.classList.remove("shake");
		}, 800);
	}

	function onItemClick(e) {
		let { i, j } = e.target.dataset;
		if (i && j) {
			if (Number(i) === randomTileObj.i && Number(j) === randomTileObj.j) {
				setThings(size + 1);
				setScore(score + 1);
			} else {
				shake();
				setThings(startSize);
				setScore(0);
			}
		}
	}

	setThings(size);
	setScore(score);
	container.addEventListener("click", onItemClick);
}

new ColorSpotter("#container", "#score");
