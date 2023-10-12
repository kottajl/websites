function writePkt () {
    document.getElementById("pkt").innerText= "Score: " + punkty;
}
function writeInfo (out) {
    document.getElementById("info").innerText= out;
    let temp= document.getElementById("fullInfo").innerText;
    document.getElementById("fullInfo").innerText= out + "\n" + temp;
}
function afterClick () {
    writePkt();
    if (punkty > 30) {
        div2works= false;
        document.getElementById("div2").style.backgroundColor= "grey";
    }
    if (punkty > 50) {
        div3works= false;
        document.getElementById("div3").style.backgroundColor= "grey";
    }
}
function resetAll () {
    punkty= 0;
    writePkt();

    div1works= true;
    div2works= true;
    div3works= true;
    document.getElementById("div2").style.backgroundColor= "red";
    document.getElementById("div3").style.backgroundColor= "yellow";
    
    propagationText= "Stop";
    document.getElementById("propagation").innerText= propagationText + " Propagaton";

    writeInfo("Reseted");
    document.getElementById("fullInfo").innerText= "";

    orderText= "normal";
    orderBool= false;
    document.getElementById("changeOrder").innerText= "Order type: " + orderText;
}


let punkty= 0;
let div1works= true;
let div2works= true;
let div3works= true;
let propagationText= "Stop";
let orderText= "normal";
let orderBool= false;
resetAll();
writeInfo("Nothing happened");
document.getElementById("fullInfo").innerText= "";

function eventClick1 () {
    if (div1works) {
        punkty+= 1;
        afterClick();
        writeInfo("nacisnąłeś niebieski o wartości 1");
    }
}

function eventClick2 (event) {
    if (div2works) {
        punkty+= 2;
        afterClick();
        writeInfo("nacisnąłeś czerwony o wartości 2");
    }
    if (propagationText == "Start")
        event.stopPropagation();
}

function eventClick3 (event) {
    if (div3works) {
        punkty+= 5;
        afterClick();
        writeInfo("nacisnąłeś żółty o wartości 5");
    }
    if (propagationText == "Start")
        event.stopPropagation();
}

div1.addEventListener("click", eventClick1, orderBool);
div2.addEventListener("click", eventClick2, orderBool);
div3.addEventListener("click", eventClick3, orderBool);

function changeEventListener () {
    div1.removeEventListener("click", eventClick1, !orderBool);
    div2.removeEventListener("click", eventClick2, !orderBool);
    div3.removeEventListener("click", eventClick3, !orderBool);

    div1.addEventListener("click", eventClick1, orderBool);
    div2.addEventListener("click", eventClick2, orderBool);
    div3.addEventListener("click", eventClick3, orderBool);
}

function changePropagationOrder () {
    if (propagationText == "Stop") {
        
        if (orderBool)
            orderText= "normal";
        else
            orderText= "reverse";
    
        orderBool= !orderBool;
        changeEventListener();

        document.getElementById("changeOrder").innerText= "Order type: " + orderText;
    }
}

changeOrder.addEventListener("click", changePropagationOrder);

propagation.addEventListener("click", function () {
    if (propagationText == "Stop") {
        propagationText= "Start";
        document.getElementById("changeOrder").innerText= "One event - no order";
    }
    else {
        propagationText= "Stop";
        document.getElementById("changeOrder").innerText= "Order type: " + orderText;
    }
    
    document.getElementById("propagation").innerText= propagationText + " Propagaton";
});

reset.addEventListener("click", resetAll);
