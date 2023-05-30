function simplifyWithGPT(info,tab) {
    console.log("Selected: " + info.selectionText);
}

chrome.contextMenus.create({
    id: "simplify-with-GPT",
    title: "Simplify",
    contexts:["all"],
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    switch (info.menuItemId) {
        case 'simplify-with-GPT':
            simplifyWithGPT(info,tab);
            break;
        default:
            console.log('Unknown context menu item clicked.');
    }
});