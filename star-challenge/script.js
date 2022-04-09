function Star(el, count, callback) {
	var something = "asdf";
	let active = -1;
	let container = document.querySelector(el);

	const onMouseOver = e => {
		console.log(this);
		let ratingVal = e.target.dataset.ratingVal;
		if (ratingVal) {
			fill(Number(ratingVal));
		}
	};
	function onMouseLeave() {
		fill(active);
	}
	function onClick(e) {
		let ratingVal = e.target.dataset.ratingVal;
		if (ratingVal) {
			active = Number(ratingVal);
			fill(Number(ratingVal));
			callback(ratingVal);
		}
	}

	function fill(activeCount) {
		for (let i = 0; i < count; i++) {
			if (i < activeCount) {
				container.children[i].classList.add("fa-star");
			} else {
				container.children[i].classList.remove("fa-star");
			}
		}
	}

	// creating stars
	for (let i = 0; i < count; i++) {
		let starElement = document.createElement("i");
		starElement.classList.add("fa");
		starElement.classList.add("fa-star-o");
		starElement.dataset.ratingVal = i + 1;
		container.appendChild(starElement);
	}

	container.addEventListener("mouseover", onMouseOver);
	container.addEventListener("click", onClick);
	container.addEventListener("mouseleave", onMouseLeave);
}

function getStar(value) {
	document.getElementById("display-star").innerHTML = value;
}
new Star("#star", 5, getStar);
