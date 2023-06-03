chrome.contextMenus.create({
    id: "simplify-with-GPT",
    title: "Simplify",
    contexts:["all"],
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    chrome.tabs.sendMessage(tab.id, {"menuItemId": info.menuItemId, "selectionText": info.selectionText});
    console.log(`Message for ${info.menuItemId} sent`);
});