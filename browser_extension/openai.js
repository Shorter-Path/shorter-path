// create a system message
const systemMessage = "You are Explainer, a service to simplify complex topics for newer learners. \
Considering the fact that the user has: \n\
    - A degree in Computer Science \n\
    - 5 years of experience as a software engineer\n\
And are unfamiliar with the topics:\n\
    - Neural Networks\n\
    - Linear Regression\n\
Take in a complex sentence or paragraph, and return a simplified \
version of the input which has aproximately the same number of words."


async function simplifyTextWithGPT(selectedRange, selectionText) {
    
    // initialize the message array with a system message
    let messageArray = [
        { role: "system", content: systemMessage }
    ];
    messageArray.push({ role: "user", "content": selectionText });

    // TODO
    let apiKey = await new Promise(resolve => chrome.storage.local.get(['apiKey'], result => resolve(result.apiKey)));
    try {
        // send the request containing the messages to the OpenAI API
        let response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": messageArray
            })
        });

        // check if the API response is ok Else throw an error
        if (!response.ok) {
            throw new Error(`Failed to fetch. Status code: ${response.status}`);
        }

        // get the data from the API response as json
        let data = await response.json();

        // check if the API response contains an answer
        if (data && data.choices && data.choices.length > 0) {
            // get the answer from the API response
            let response = data.choices[0].message.content;
            let parsedResponse = parseGPTResponse(response);
            
            replaceSelectedText(selectedRange, parsedResponse.textToReplace)
        }
    } catch (error) {
        // send error message back to the content script
        alert("No answer Received: Make sure the entered API-Key is correct.");
    }
}

function parseGPTResponse(response) {
    return {"textToReplace": response}
}