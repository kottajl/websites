function makeContact (name, tel) {
    let h5_= document.createElement("h5");
    h5_.className= "infoText";
    h5_.textContent= name;

    let p_= document.createTextNode(tel);
    p_.className= "infoText";
    p_.textContent= tel;

    let bin_= document.createElement("div");
    bin_.className= "undo";
    let bin= document.createElement("img");
    bin.setAttribute("src", "trashbin.png");
    bin_.appendChild(bin);
    bin_.addEventListener("click", deleteContact);

    let newEl= document.createElement("div");
    newEl.className= "contact";
    newEl.appendChild(h5_);
    newEl.appendChild(p_);
    newEl.appendChild(bin_);

    document.getElementById("mainList").appendChild(newEl);
}

function deleteContact () {
    let badContact= this.parentNode;
    badContact.parentNode.removeChild(badContact);
}

function checkName (name) {
    return name.match(/^\p{Lu}\p{Ll}*\s+\p{Lu}\p{Ll}*\s*$/u) || name.match(/^\p{Lu}\p{Ll}*\s\p{Lu}\p{Ll}*\s?\-\s?\p{Lu}\p{Ll}*\s*$/u);
}
function checkBool (tel) {
    return tel.match(/^\+?(?![^ -]*[ -]{2})(?=(?:[ -]*\d){9}$)\d[\d -]*\d$/u) || tel.match(/^\+?(?![^ -]*[ -]{2})(?=(?:[ -]*\d){12}$)\d[\d -]*\d$/u);
}

function checkData (data) {
    let nameBool= checkName(data.get("name"));
    let telBool= checkBool(data.get("tel"));

    if (!nameBool && !telBool)
        alert("Invalid name and phone number format");
    else if (!nameBool)
        alert("Invalid name format");
    else if (!telBool)
        alert("Invalid phone number format");

    return nameBool && telBool;
}

// function czyDobreImie()
// {
//     let imie = document.forms["form"]["name"].value;
//     return imie.match(/^\s*\p{Lu}\p{Ll}*\s+\p{Lu}\p{Ll}*\s*$/u) || imie.match(/^\s*\p{Lu}\p{Ll}*\s+\p{Lu}\p{Ll}*-\p{Lu}\p{Ll}*\s*$/u);
// }
// function czyDobreTel()
// {
//     let tel = document.forms["form"]["phone"].value;
//     return tel.match(/^\+?(?![^ -]*[ -]{2})(?=(?:[ -]*\d){9}$)\d[\d -]*\d$/u) || tel.match(/^\+?(?![^ -]*[ -]{2})(?=(?:[ -]*\d){12}$)\d[\d -]*\d$/u);
// }

addButton.addEventListener("click", function () {
    let newData= new FormData(document.querySelector('form'));
    if (checkData(newData)) {
        makeContact(newData.get("name"), newData.get("tel"));
        document.getElementById("addForm").reset();
    }
});


makeContact("Grzegorz Rogus", "123 456 789");
makeContact("Jacek Dajda", "987 654 321");