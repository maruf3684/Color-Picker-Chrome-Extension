const btn = document.querySelector(".changeColorBtn");
const colorGrid = document.querySelector(".colorGrid");
const colorValue = document.querySelector(".colorValue");

//extension popup a chole ai code
btn.addEventListener("click", async function () {
	//data from background.js

	try {
		chrome.storage.sync.get("workerdata", ({ workerdata }) => {
			console.log("workerdata=", workerdata);
		});
	} catch (e) {
		console.error(e);
	}

	///////////////////////////////

	try {
		let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

		chrome.scripting.executeScript(
			{
				target: { tabId: tab.id },
				function: pickColor,
			},
			async (colorResult) => {
				try {
					const [data] = colorResult;
					if (data.result) {
						let color = data.result.sRGBHex;
						colorGrid.style.backgroundColor = color;
						colorValue.innerText = color;
						try {
							await navigator.clipboard.writeText(color);
						} catch (e) {
							console.error(e);
						}
					}
					console.log(colorResult);
				} catch (error) {
					console.log(error);
				}
			}
		);
	} catch (error) {
		console.log(error);
	}
});

///main browser page e chole ai code
async function pickColor() {
	try {
		const eyeDropper = new EyeDropper();
		let color = await eyeDropper.open();
		return color;
	} catch (e) {
		console.error(e);
	}
}
