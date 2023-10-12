let game= true;
let points= 0;
let lives= 3;
let livesDisplay= "❤︎❤︎❤︎";
let zombieIt= 1;

function getRandomInt (max) {
    return Math.floor(Math.random() * max);
}
function delay (milliseconds) {
    return new Promise (resolve => {
        setTimeout(resolve, milliseconds);
    });
}

async function danceZombie (zombie) {
    zombie.style.backgroundPosition= "0% 0px";
    let pos= 0;
    while (zombie != null) {
        await delay(100);
        // console.log("wizum " + width);
        pos= (pos + 100) % 1000 + 100;
        zombie.style.backgroundPosition= (1000 - pos) + "% 0px";
    }
}

function spawnZombie () {
    let newZombie= document.createElement("div");
    newZombie.classList= "zombie";
    document.getElementById("board").appendChild(newZombie);
    newZombie.style.top= 30 + "vw"
    
    let height= 6 + getRandomInt(5) * 3;
    newZombie.style.height= height + "vw";
    newZombie.style.width= height * 200 / 312 + "vw";
    // newZombie.style.borderTopLeftRadius= height + 2 + "vw"
    // newZombie.style.height= "312px";
    // newZombie.style.width= "200px";

    newZombie.addEventListener("click", killZombie);
    newZombie.setAttribute("id", "zombie" + zombieIt++);
    danceZombie(newZombie);
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
    var lifeSpan= 5 + getRandomInt(5);
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
