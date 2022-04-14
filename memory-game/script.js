function getRandomColor() {
	let letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function MemoryGame(el, btnEl, size) {
	let container = document.querySelector(el);
	let buttonEl = document.querySelector(btnEl);
	let scoreEl = document.querySelector("#score");
	let highestScoreEl = document.querySelector("#highest-score");
	let blinkCount = 1,
		maxBlinkCount = 3,
		blinkIndexArr = [];
	let score = 0,
		highestScore = 0;

	function setUpItems() {
		let itemsFragment = document.createDocumentFragment();
		for (let i = 0; i < size; i++) {
			let item = document.createElement("div");
			item.classList.add("item");
			item.dataset.i = i;
			itemsFragment.append(item);
		}
		container.appendChild(itemsFragment);
	}
	function blink(index, color, duration) {
		return new Promise((resolve) => {
			container.children[index].style.backgroundColor = color;
			setTimeout(() => {
				container.children[index].style.backgroundColor = "aliceblue";
				resolve();
			}, duration);
		});
	}
	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
	async function setUpBlick() {
		let color = getRandomColor(),
			tempIndex;
		blinkIndexArr = [];
		for (let i = 0; i < blinkCount; i++) {
			tempIndex = Math.floor(Math.random() * size);
			blinkIndexArr.push(tempIndex);
			await blink(tempIndex, color, 500);
			await sleep(500);
		}
	}
	function onClickTile(e) {
		let { i } = e.target.dataset;
		if (i) {
			if (Number(i) === blinkIndexArr[0]) {
				rightTileClick(i);
			} else {
				looseAndReset();
			}
		}
	}
	async function rightTileClick(index) {
		blinkIndexArr.shift();
		await blink(index, "gray", 300);
		await sleep(150);
		if (blinkIndexArr.length === 0) {
			if (blinkCount < maxBlinkCount) blinkCount++;
			setScores(score + 1);
			setUpBlick();
		}
	}
	function shake() {
		container.classList.add("shake");
		setTimeout(() => {
			container.classList.remove("shake");
		}, 200);
	}
	function setScores(newScore, reset = false) {
		score = newScore;
		scoreEl.innerHTML = newScore;
		if (highestScore < newScore || reset) {
			highestScore = newScore;
			highestScoreEl.innerHTML = newScore;
		}
	}
	function looseAndReset() {
		blinkCount = 1;
		buttonEl.disabled = false;
		setScores(0);
		shake();
	}
	function runGame() {
		buttonEl.disabled = true;
		setUpBlick();
	}

	container.style.display = "grid";
	container.style.gridTemplateColumns = `repeat(${size}, 50px)`;
	setUpItems();
	setScores(0, true);

	buttonEl.addEventListener("click", runGame);
	container.addEventListener("click", onClickTile);
}

new MemoryGame("#container", "#btn", 5);
