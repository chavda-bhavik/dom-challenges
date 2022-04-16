const HALF_MULTIPLIER = 2.083333333;
const FULL_MULTIPLIER = 4.166666667;
const SINGLE_MULTIPLIER = FULL_MULTIPLIER / 100;

const NON_CONFLICTING_DATA = [
	{
		startTime: "00:00",
		endTime: "01:30",
		color: "#f6be23",
		title: "#TeamDevkode",
	},
	{
		startTime: "4:30",
		endTime: "7:30",
		color: "#f6501e",
		title: "#TeamDevkode",
	},
	{
		startTime: "12:00",
		endTime: "13:30",
		color: "#029be5",
		title: "#TeamDevkode",
	},
	{
		startTime: "9:00",
		endTime: "10:00",
		color: "#029be5",
		title: "#TeamDevkode",
	},
	{
		startTime: "16:00",
		endTime: "19:00",
		color: "#029be5",
		title: "#TeamDevkode",
	},
	{
		startTime: "20:30",
		endTime: "22:30",
		color: "#029be5",
		title: "#TeamDevkode",
	},
];
const CONFLICTING_DATA = [
	{
		startTime: "00:00",
		endTime: "01:30",
		color: "#f6be23",
		title: "#TeamDevkode",
	},
	{
		startTime: "3:30",
		endTime: "7:30",
		color: "#f6501e",
		title: "#TeamDevkode",
	},
	{
		startTime: "4:30",
		endTime: "8:30",
		color: "#f6501e",
		title: "#TeamDevkode",
	},
	{
		startTime: "6:30",
		endTime: "9:00",
		color: "#f6501e",
		title: "Demo",
	},
	{
		startTime: "11:00",
		endTime: "13:30",
		color: "#029be5",
		title: "#TeamDevkode",
	},
	{
		startTime: "12:00",
		endTime: "13:30",
		color: "#029be5",
		title: "#TeamDevkode",
	},
	{
		startTime: "9:30",
		endTime: "10:30",
		color: "#029be5",
		title: "#TeamDevkode",
	},
	{
		startTime: "16:00",
		endTime: "17:00",
		color: "#029be5",
		title: "#TeamDevkode",
	},
	{
		startTime: "15:00",
		endTime: "17:00",
		color: "#029be5",
		title: "#TeamDevkode",
	},
	{
		startTime: "18:00",
		endTime: "19:00",
		color: "#f6501e",
		title: "#TeamDevkode",
	},
	{
		startTime: "20:30",
		endTime: "22:30",
		color: "#029be5",
		title: "#TeamDevkode",
	},
	{
		startTime: "20:30",
		endTime: "22:30",
		color: "#029be5",
		title: "#TeamDevkode",
	},
];

function Events(el, data) {
	let container = document.querySelector(el);
	let itemsContainer = document.createDocumentFragment();

	function getPosition(startTime) {
		let timeArr = String(startTime).split(":");
		let position = Number(timeArr[0]) * FULL_MULTIPLIER;
		let extra = (Number(timeArr[1]) * 100) / 60;
		return position + SINGLE_MULTIPLIER * extra;
	}
	function getHeight(startTime, endTime) {
		return getPosition(endTime) - getPosition(startTime);
	}
	function countConflicts(index) {
		let conflicts = 0,
			tempEvent;
		let dataEvent = data[index],
			dataStartTime = Number(String(dataEvent.startTime).replace(":", "")),
			dataEndTime = Number(String(dataEvent.endTime).replace(":", ""));

		let startTime, endTime;
		for (let i = 0; i < index; i++) {
			tempEvent = data[i];
			startTime = Number(String(tempEvent.startTime).replace(":", ""));
			endTime = Number(String(tempEvent.endTime).replace(":", ""));
			if ((dataStartTime > startTime && dataStartTime < endTime) || (dataEndTime > startTime && dataEndTime < endTime)) conflicts++;
		}

		return conflicts;
	}
	function formatTime(time) {
		let timeArr = String(time).split(":");
		return `${Number(timeArr[0]) > 12 ? Number(timeArr[0]) - 12 : timeArr[0]}:${timeArr[1]} ${Number(timeArr[0]) > 12 ? "PM" : "AM"}`;
	}

	let eventData, conflicts;
	for (let i = 0; i < data.length; i++) {
		eventData = data[i];
		conflicts = countConflicts(i);
		let item = document.createElement("div");
		item.classList.add("event");

		item.style.backgroundColor = eventData.color;
		item.style.top = getPosition(eventData.startTime) + "%";
		item.style.height = getHeight(eventData.startTime, eventData.endTime) + "%";
		item.style.width = 98 - 10 * conflicts + "%";

		item.dataset.startTime = eventData.startTime;
		item.dataset.endTime = eventData.endTime;

		item.innerHTML = `
            ${eventData.title}<br/>
            ${formatTime(eventData.startTime)} - ${formatTime(eventData.endTime)}
        `;
		itemsContainer.append(item);
	}

	container.appendChild(itemsContainer);
}

new Events(".events", CONFLICTING_DATA);
