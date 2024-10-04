/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const game = new Game();
document.getElementById("btn__reset").addEventListener("click", event => {
    game.startGame();

});

const keyboard = document.querySelector("#qwerty");
keyboard.addEventListener("click", event => {
    if (event.target.classList.contains("key")) {
        const clickedButton = event.target.textContent;
        game.handleInteraction(clickedButton);
    }
});

//keyboard for exceeds
document.addEventListener("keydown", event => {
    const clickedLetter = event.key.toLowerCase();
    game.handleInteraction(clickedLetter);

});