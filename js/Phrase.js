
//Create the phrase class
class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    addPhraseToDisplay() {
        const ul = document.querySelector("#phrase ul");
        let html = '';

        for (let char of this.phrase) {
            if (char === ' ') {
                html += '<li class="space"> </li>'; // Space 
            } else {
                html += `<li class="hide letter">${char}</li>`; // Letter 
            }
        }

        ul.innerHTML = html; // Insert the HTML into the <ul>
    }

    checkLetter(letter) {
        return this.phrase.includes(letter);
    }

    showMatchedLetter(matchedLetter) {
        const letterElements = document.getElementsByClassName("letter");
        for (let i = 0; i < letterElements.length; i++) {
            if (letterElements[i].textContent === matchedLetter) {
                letterElements[i].classList.replace("hide", "show");
            }

        }
    }
}