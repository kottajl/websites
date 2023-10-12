document.getElementById("btnLeft").textContent= "<";
document.getElementById("btnRight").textContent= ">";

let entries;
let n;
let it= 0;

function getRandomInt (max) {
    return Math.floor(Math.random() * max);
}
function delay (milliseconds) {
    return new Promise (resolve => {
        setTimeout(resolve, milliseconds);
    });
}

function main () {
    entries= document.getElementsByClassName("entry");
    n= entries.length;
    console.log("It: " + it);
    entries[it].style.visibility= "visible";
}

async function buttonLeft (time) {
    document.getElementById("entries").style.setProperty("--time", time + "s");
    let newIt= ((it + n) - 1) % n;
    entries[newIt].style.visibility= "visible";
    entries[it].classList.add("entryOutR");
    entries[newIt].classList.add("entryInL");
    setTimeout(() => {
        entries[it].style.visibility= "hidden";
        entries[it].classList.remove("entryOutR");
        entries[newIt].classList.remove("entryInL");
    }, time * 1000);

    await delay(time * 1000 + 50);
    it= newIt
}

async function buttonRight (time) {
    document.getElementById("entries").style.setProperty("--time", time + "s");
    let newIt= (it + 1) % n;
    console.log("newIt: " + newIt);
    entries[newIt].style.visibility= "visible";
    entries[it].classList.add("entryOutL");
    entries[newIt].classList.add("entryInR");
    setTimeout(() => {
        entries[it].style.visibility= "hidden";
        entries[it].classList.remove("entryOutL");
        entries[newIt].classList.remove("entryInR");
    }, time * 1000);
    await delay(time * 1000 + 50);
    it= newIt
}

async function buttonRandom (time) {
    let newIt= (it + getRandomInt(n-1) + 1) % n;
    let k= Math.abs(it - newIt);

    if ((k < (n - k)) == (it < newIt))
        while (it != newIt) {
            console.log("it = " + it);
            buttonLeft(time);
            await delay((time * 1000 + 60));
        }
    else
        while (it != newIt) {
            console.log("it = " + it);
            buttonRight(time);
            await delay((time * 1000 + 60));
        }
}


document.getElementById("btnLeft").addEventListener("click", async function () {
    buttonLeft(0.3);
    await delay(300);
});
document.getElementById("btnRight").addEventListener("click", async function () {
    buttonRight(0.3);
    await delay(300);
});
document.getElementById("btnRandom").addEventListener("click", async function () {
    buttonRandom(0.1);
    await delay(100 * n);
});

main();