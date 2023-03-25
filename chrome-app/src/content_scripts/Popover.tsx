import React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { IWord } from "./Word"
import { getWord } from './Utils'

function Word(word: IWord) {
    return (
        <div>
            <div  className="card-name">{word.name}</div>
            <div>
                <div>{word.phonetic}</div>
                {word.audio !== undefined && word.audio !== "" ? ( 
                    <audio controls>
                        <source id="player" src={word.audio} type="audio/mpeg" />
                    </audio> 
                    ): ""
                }
                </div>
            <div className="card-meaning">{word.meaning}</div>
            <div className="card-example">{word.example}</div>
        </div>
    )
}

let rootDiv: Root
let domNode: HTMLElement
let addedToBody = false 

function show(event: MouseEvent) {
    let word: IWord
    const selection = window.getSelection()
    if (selection == null) return
    const selectedText = getWord(selection.toString().trim())
    if (selectedText !== "") {
        chrome.runtime.sendMessage({ name: selectedText }, function (response) {
            word = response.word
            domNode = document.createElement('div')
            domNode.classList.add("show-word")
            rootDiv = createRoot(domNode)
            rootDiv.render(<Word name={word.name} phonetic={word.phonetic} audio={word.audio} meaning={word.meaning} example={word.example} />)
            document.body.appendChild(domNode)
            addedToBody = true
        })
    }
}

const dismiss = (e: MouseEvent | Event) => {
	try {
        if (rootDiv !== undefined && addedToBody) {
            document.body.removeChild(domNode)
            rootDiv.unmount()
            addedToBody = false 
        }
	} catch (e) {
        console.log(e)
    }
}

async function main() {
    document.addEventListener('mouseup', show)
    document.addEventListener('mousedown', dismiss)
}

setTimeout(main, 1000)