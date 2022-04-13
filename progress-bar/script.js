function Progressbar(progressEl, btnEl, seconds) {
	let progress = document.querySelector(progressEl);
	let runBtn = document.querySelector(btnEl);
	let clickCount = 0;

	function setClickCount(count) {
		runBtn.innerText = `Run ${count || ""}`;
	}
	function setProgress(n) {
		progress.style.width = `${n}%`;
	}

	function doneProgress() {
		clickCount--;
		setClickCount(clickCount);
		// recursively setup progress bar if required
		if (clickCount > 0) {
			setupProgressInterval(doneProgress);
		}
	}

	function setupProgressInterval(done) {
		let progressPct = 0;
		let interval = setInterval(() => {
			progressPct++;
			setProgress(progressPct);

			if (progressPct === 100) {
				// reset progress after completed
				setProgress(0);
				clearInterval(interval);
				done();
			}
		}, seconds * 10);
	}

	function handleButtonClick() {
		clickCount += 1;
		setClickCount(clickCount);

		// call setup on first call only
		if (clickCount === 1) {
			setupProgressInterval(doneProgress);
		}
	}

	runBtn.addEventListener("click", handleButtonClick);
}

new Progressbar("#progress", "#btn", 3);
