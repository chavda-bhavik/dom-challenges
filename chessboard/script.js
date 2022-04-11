function Chessbord(el, n) {
	let container = document.querySelector(el);
	let boardFragmentContainer = document.createDocumentFragment();
	let lastIJObj = null;

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			let item = document.createElement("div");
			item.classList.add("item");
			if (isWhiteTile(i, j)) item.classList.add("bg-white");
			else item.classList.add("bg-black");
			item.dataset.i = i;
			item.dataset.j = j;
			// item.innerText = `${i} x ${j}`;
			boardFragmentContainer.append(item);
		}
	}
	container.appendChild(boardFragmentContainer);

	function highlightTile(i, j) {
		let index = getIndex(i, j);
		container.children[index].classList.add("bg-red");
	}
	function resetTile(i, j) {
		let index = getIndex(i, j);
		if (isWhiteTile(i, j))
			container.children[index].classList.add("bg-white");
		else container.children[index].classList.add("bg-black");
		container.children[index].classList.remove("bg-red");
	}

	function onContainerClick(e) {
		let { i, j } = e.target.dataset;
		if (i !== undefined && j !== undefined) {
			if (lastIJObj)
				highlightDiagonalTiles(lastIJObj.i, lastIJObj.j, resetTile);

			highlightDiagonalTiles(Number(i), Number(j), highlightTile);
			lastIJObj = { i: Number(i), j: Number(j) };
		}
	}

	function isWhiteTile(i, j) {
		return (i % 2 === 0 && j % 2 === 0) || (i % 2 !== 0 && j % 2 !== 0);
	}
	function getIndex(i, j) {
		return i * n + j;
	}

	function highlightDiagonalTiles(i, j, cb = () => {}) {
		let startI = i - j < 0 ? 0 : i - j;
		let startJ = j - i < 0 ? 0 : j - i;
		let index;

		for (let l = startI, k = startJ; l < n; l++, k++) {
			index = getIndex(l, k);
			if (container.children[index] && l < 8 && k < 8) {
				cb(l, k);
			} else break;
		}

		startI = i + j < 8 ? 0 : i + j - 7;
		startJ = i + j > 8 ? 7 : i + j;
		for (let l = startI, k = startJ; l < n; l++, k--) {
			index = getIndex(l, k);
			if (container.children[index] && l < 8 && k >= 0) {
				cb(l, k);
			} else break;
		}
	}

	container.addEventListener("click", onContainerClick);
}
new Chessbord("#container", 8);
