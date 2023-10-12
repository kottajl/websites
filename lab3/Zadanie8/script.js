function reset () {
    document.getElementById("passForm").reset();
    checkPassword(new FormData(document.querySelector("form")));

    document.getElementById("input1").setAttribute("style", "border-color: grey");
    document.getElementById("input2").setAttribute("style", "border-color: grey");

    document.getElementById("vis1").setAttribute("src", "icons/view.png");
    document.getElementById("vis2").setAttribute("src", "icons/view.png");
    document.getElementById("input1").type= "password";
    document.getElementById("input2").type= "password";
}

function checkPassword (data) {
    let password= data.get("password1");
    let tempSrc= "";
    let isValid= true;

    // 1
    if (password.length >= 8)
        tempSrc= "icons/check.png";
    else {
        tempSrc= "icons/wrong.png";
        isValid= false;
    }
        
    document.getElementById("check1img").setAttribute("src", tempSrc);

    // 2
    if (password.match(/^.*[.,?!@#$%^&*()_+!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-]+.*$/gm))
        tempSrc= "icons/check.png";
    else {
        tempSrc= "icons/wrong.png";
        isValid= false;
    }
    document.getElementById("check2img").setAttribute("src", tempSrc);

    // 3
    if (password.match(/^.*[A-Z]+.*$/gm))
        tempSrc= "icons/check.png";
    else {
        tempSrc= "icons/wrong.png";
        isValid= false;
    }
    document.getElementById("check3img").setAttribute("src", tempSrc);

    // 4
    if (password.match(/^.*[0-9]+.*$/gm))
        tempSrc= "icons/check.png";
    else {
        tempSrc= "icons/wrong.png";
        isValid= false;
    }
    document.getElementById("check4img").setAttribute("src", tempSrc);

    return isValid;
}

function checkCopy (data) {
    return data.get("password1") == data.get("password2");
}

document.addEventListener("keyup", (event) => {
    let code= event.code;
    let data= new FormData(document.querySelector("form"));

    // validity functions
    let firstValidity= checkPassword(data);
    let secondValidity= checkCopy(data);

    // borders
    if (firstValidity)
        document.getElementById("input1").setAttribute("style", "border-color: rgb(40, 225, 40)");
    else
        document.getElementById("input1").setAttribute("style", "border-color: grey");
    
    if (secondValidity && firstValidity)
        document.getElementById("input2").setAttribute("style", "border-color: rgb(40, 225, 40)");
    else
        document.getElementById("input2").setAttribute("style", "border-color: grey");

    // Enter
    if (code == "Enter") {
        if (firstValidity && secondValidity) {
            alert("Password accepted!");
            reset();
        }

        else {
            if (!firstValidity)
                alert("Your password is not safe enough!");
            else if (!secondValidity)
                alert("Repeated password is wrong!");
            else
                alert("Error - your input is invalid!");
        }
    }
});

function changeVisibility (inputID, iconID) {
    if (document.getElementById(inputID).type == "password") {
        document.getElementById(inputID).type= "text";
        document.getElementById(iconID).setAttribute("src", "icons/hide.png");
    }
    else {
        document.getElementById(inputID).type= "password";
        document.getElementById(iconID).setAttribute("src", "icons/view.png");
    }
}

document.getElementById("vis1").addEventListener("click", () => changeVisibility("input1", "vis1"));
document.getElementById("vis2").addEventListener("click", () => changeVisibility("input2", "vis2"));


reset();