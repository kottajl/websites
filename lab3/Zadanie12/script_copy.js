let game= true;
let points= 2137;
let lives= 3;
let livesDisplay= "❤︎❤︎❤︎";
let nr= 1;

function getRandomInt (max) {
    return Math.floor(Math.random() * max);
}
function delay (milliseconds){
    return new Promise (resolve => {
        setTimeout(resolve, milliseconds);
    });
}

function spawnZombie () {
    let newZombie= document.createElement("div");
    newZombie.classList= "zombie";
    document.getElementById("board").appendChild(newZombie);
    newZombie.style.top= 30 + "vw";
    newZombie.style.height= 15 + getRandomInt(5) * 2 + "vw";
    newZombie.addEventListener("click", killZombie);
    newZombie.setAttribute("id", "zombie" + nr++);
    return newZombie;
}

function killZombie (event) {
    points+= 12;
    document.getElementById("points").textContent= points;
    this.style.visibility= "hidden";
    event.stopPropagation();
}

function takeLife (zombie) {
    console.log("Usunięto życie: " + zombie.id);
    lives-= 1;
    livesDisplay= livesDisplay.substring(2);
    document.getElementById("lives").textContent= livesDisplay;

    if (lives <= 0)
        endGame();
}

function newZombieInc () {
    let newZombie= spawnZombie();
    var lifeSpan= 10 + getRandomInt(5);
    console.log(lifeSpan);
    newZombie.style.animation= "zombieMove " + lifeSpan + "s linear";
    setTimeout(() => {
        if (newZombie.style.visibility != "hidden") {
            takeLife(newZombie);
        }
        
        newZombie.remove();
        
    }, lifeSpan * 1000);
}

document.getElementById("board").addEventListener("click", function () {
    points= Math.max(0, points - 6);
    document.getElementById("points").textContent= points;
});

async function gameEngine () {
    document.getElementById("lives").textContent= livesDisplay;
    document.getElementById("points").textContent= points;
    while (game) {
        await delay(1000);
        newZombieInc();
    }
}

function endGame () {
    game= false;
    alert("Game over! Your score: " + points + " points.");
}

gameEngine();