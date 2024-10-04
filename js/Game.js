
class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [
            new Phrase("We were on a break"),
            new Phrase("Winter is coming"),
            new Phrase("How you doing"),
            new Phrase("live long and prosper"),
            new Phrase("the truth is out there")
        ];
        this.activePhrase = null;
    }
    getRandomPhrase() {
        const randomIndex = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomIndex];
    };

    startGame() {
        const overlay = document.querySelector("#overlay");
        overlay.style.display = "none"; //Hide 

        const randomPhrase = this.getRandomPhrase();
        this.activePhrase = new Phrase(randomPhrase.phrase);
        console.log(this.activePhrase);

        this.activePhrase.addPhraseToDisplay();
    };


    handleInteraction(clickedLetter) {
        // Get the key
        const buttons = document.querySelectorAll(".key");

        buttons.forEach(button => {
            // Check if the button matches the letter
            if (button.textContent === clickedLetter) {
                // Disable button
                button.disabled = true;

                // Check for letter
                if (this.activePhrase.checkLetter(clickedLetter)) {
                    button.classList.add("chosen");

                    // Show matched 
                    this.activePhrase.showMatchedLetter(clickedLetter);

                    // Check for win
                    if (this.checkForWin()) {
                        this.gameOver(); // Call game over method
                    }
                } else {

                    button.classList.add("wrong");

                    // Remove heart
                    this.removeLife();
                }
            }
        });
    }

    checkForWin() {
        const completePhrase = document.querySelectorAll("#phrase .letter");
        for (let letter of completePhrase) {
            if (letter.classList.contains("hide")) {
                return false;
            }
        }
        return true;
    };
    removeLife() {
        const hearts = document.querySelectorAll(".tries");

        if (this.missed < hearts.length) {
            hearts[this.missed].querySelector("img").src = "images/lostHeart.png";
            this.missed++;
            if (this.missed === 5) {
                this.gameOver();
            }
        }
    };

    gameOver() {
        const overlay = document.querySelector("#overlay");
        overlay.style.display = "block";
        const message = document.querySelector("#game-over-message")

        overlay.classList.remove("win", "lose");

        if (this.missed === 5) {
            message.textContent = "You lose, try again!";
            overlay.classList.add("lose")

        } else {
            message.textContent = ("You Win!")
            overlay.classList.add("win")
        }
        this.resetGameboard();
    };
    resetGameboard() {

        const ul = document.querySelector("#phrase ul");
        ul.innerHTML = ''; //removes <li> elements

        const buttons = document.querySelectorAll(".key");
        buttons.forEach(button => {
            button.disabled = false; // Enable the button
            button.classList.remove("chosen", "wrong"); // Remove previous classes
            button.classList.add('key');
        });


        const hearts = document.querySelectorAll(".tries img");
        hearts.forEach(heart => {
            heart.src = "images/liveHeart.png"; // Reset heart image
        });


        this.missed = 0; // Reset 
    }

}