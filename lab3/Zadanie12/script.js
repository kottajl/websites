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
    let pos= 0;
    while (zombie != null) {
        await delay(150);
        pos= (pos + 1) % 10;
        zombie.style.backgroundImage= 'url("images/zombies/zombie' + (10 - pos) + '.png")';
    }
}

function spawnZombie () {
    let newZombie= document.createElement("div");
    newZombie.classList= "zombie";
    document.getElementById("board").appendChild(newZombie);
    newZombie.style.top= 30 + getRandomInt(5) + "vw"
    
    let height= 15 + getRandomInt(5) * 2;
    newZombie.style.height= height + "vw";
    newZombie.style.width= height * 200 / 312 + "vw";

    newZombie.addEventListener("click", killZombie);
    newZombie.setAttribute("id", "zombie" + zombieIt++);
    danceZombie(newZombie);
    return newZombie;
}

function killZombie (event) {
    if (game) {
        points+= 12;
        let zeros= Math.max(0, 5 - points.toString().length);
        document.getElementById("points").textContent= "0".repeat(zeros) + points;
        this.style.visibility= "hidden";
    }
    event.stopPropagation();
}

function takeLife (zombie) {
    console.log("Usunięto życie: " + zombie.id);
    lives-= 1;
    livesDisplay= livesDisplay.substring(2);
    document.getElementById("lives").textContent= livesDisplay;

    setTimeout(() => {
        if (lives <= 0 && game)
            endGame();
    }, 100);
}

function newZombieInc () {
    let newZombie= spawnZombie();
    var lifeSpan= 2 + getRandomInt(5);
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
    if (game) {
        points= Math.max(0, points - 6);
        let zeros= Math.max(0, 5 - points.toString().length);
        document.getElementById("points").textContent= "0".repeat(zeros) + points;
    }
});

document.addEventListener("mousemove", function (event) {
    sight.style.left= event.pageX + 'px';
    sight.style.top= event.pageY + 'px';
    redSight.style.left= event.pageX + 'px';
    redSight.style.top= event.pageY + 'px';
});

async function gameEngine () {
    document.getElementById("lives").textContent= livesDisplay;
    document.getElementById("points").textContent= "0000" + points;
    while (game) {
        await delay(500);
        newZombieInc();
    }
}

function endGame () {
    game= false;
    alert("Game over! Your score: " + points + " points.");
    document.getElementById("points").textContent= "☠️ " + points + " ☠️";
}

gameEngine();
