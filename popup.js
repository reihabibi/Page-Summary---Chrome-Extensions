
async function myFunction() {

    chrome.storage.local.get(["bodyText"]).then((result) => {

        const text = result.bodyText
        document.getElementById('summaryParagraph')?.classList.remove("show")
        document.getElementById("loadingAnimation")?.classList.add("show")

        const apiUrl = 'https://api.cohere.ai/v1/summarize';
        const headers = new Headers({
            'Authorization': 'Bearer <TOKEN>',
            'Content-Type': 'application/json',
        });
        const data = {
            text,
            "length": "long",
            "format": "auto",
            "model": "command",
            "additional_command": "",
            "temperature": 0
        }

        fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(result => {
                document.getElementById("loadingAnimation")?.classList.remove("show")

                if (result.summary === undefined) {
                    document.getElementById('summaryParagraph').classList?.add("show")
                    document.getElementById('summaryParagraph').innerText = 'ups, something went worng reload the page'
                } else {
                    document.getElementById('summaryParagraph').classList?.add("show")
                    document.getElementById('summaryParagraph').innerText = result.summary
                }

            })
            .catch(error => {
                console.error('Error:', error);
            });

    });

}

document.getElementById('summaryGeneratorBtn').addEventListener('click', myFunction);