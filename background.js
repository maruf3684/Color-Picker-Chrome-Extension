
//background process a chole ai code
let workerdata = "workerdata";
chrome.runtime.onInstalled.addListener(() => {
    console.log("setting worker data");
	chrome.storage.sync.set({ workerdata: "workerdata" }, () => {
		console.log("workerdata is set");
	});
});
