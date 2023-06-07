chrome.runtime.onMessage.addListener(function (request) {
    switch (request.menuItemId) {
        case "simplify-with-GPT":
            simplify(request.selectionText);
        default:
            console.log(`Menu Item ${request.menuItemId} not recognized`)
    }
});

function simplify(selectionText) {
    /**
     * Grabs the currently selected text and sends that
     * text to OpenAI. Then it selectes the response and
     * replaces the selected text with the model's response.
     * 
     * @since 0.0.1
     * 
     * @param {string} selectedText Text selected when the context
     * menu was triggered.
     */
    let selectedRange = grabSelecedRange();
    if (selectedRange == null) {
        console.log("There was an issue with grabbing the selected element")
    }
    simplifyTextWithGPT(selectedRange, selectionText);

}

function grabSelecedRange() {
    if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            return range
        }
    }
}

function replaceSelectedText(range, replacementText) {
    range.deleteContents();
    range.insertNode(document.createTextNode(replacementText));
}
