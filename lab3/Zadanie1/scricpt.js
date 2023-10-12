document.getElementById("btn").onclick = function () {
    var imie = prompt("Twoje imie:");
    var mr;
    if (imie[imie.length - 1] == 'a')
        mr = 'ią '
    else
        mr = 'a '

    greetingContent = 'Witam pan' + mr + imie;
    document.getElementById("greeting").textContent = greetingContent;
};


