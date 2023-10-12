let redDot= document.getElementById("redDot");

function moveToCursor (event) {
    redDot.style.left= event.pageX + 'px';
    redDot.style.top= event.pageY + 'px';
    redDot.style.backgroundColor= "red";
}

function makeError (event) {
    const newError= document.createElement("div");
    newError.innerText= "Kliknięto poza obszarem";
    newError.className= "error";
    newError.style.visibility= "visible";
    newError.style.left= event.pageX + 'px';
    newError.style.top= event.pageY + 'px';
    newError.style.animation= "downOpacity 1.5s";
    newError.style.opacity= "0%";

    document.body.insertBefore(newError, document.getElementById("field"));
    return newError;
}

async function opacityDown (error) {
    error.style.transition= "opacity 0.5s 1s linear";
    error.style.opacity= "10%";
}

async function writeError (event) {
    const newError= makeError(event);
    setTimeout(() => newError.remove(), 1500);
}

document.getElementById("field").addEventListener("click", function (event) {
    moveToCursor(event);
    event.stopPropagation();
});
document.addEventListener("click", writeError);
