import { IWord } from "./content_scripts/Word"

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        let word = { name: request.name } as IWord
        if (request.name !== "" && request.name.length < 15) {
            fetch('https://api.dictionaryapi.dev/api/v2/entries/en_US/' + request.name)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        let phonetics = data[0].phonetics
                        for (let i=0; i<phonetics.length; i++) {
                            if (phonetics[i].audio !== "" || i-1 === phonetics.length) {
                                word.phonetic = phonetics[i].text
                                word.audio = phonetics[i].audio
                                break
                            }
                        }
                        if (data[0].meanings.length > 0) {
                            word.meaning = data[0].meanings[0].definitions[0].definition
                            word.example = data[0].meanings[0].definitions[0].example
                        }
                    }
                    sendResponse({ word: word })
                })
        }
        return true
    }
)

export {}
