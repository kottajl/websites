// async function getData () {
//     return await fetch("http://localhost:3000/cities").then((response) => {
//                     console.log("OK", response);
//                 }).catch((err) => {
//                     console.log("error", err);
//                 });
// }

async function getData () {
    var res = await fetch("http://localhost:3000/cities");
    var json = await res.json();
    return json;
}

async function makeZad1 (input) {
    let data= input.filter(city => city.province == "małopolskie");
    let output= data.map(city => " " + city.name);
    document.getElementById("zad1").textContent= output;
}

async function makeZad2 (input) {
    let data= input.filter(city => city.name.match(/^[^a]*a[^a]*a[^a]*$/gm));
    let output= data.map(city => " " + city.name);
    document.getElementById("zad2").textContent= output;
}

async function makeZad3 (input) {
    let data= input;
    data.sort((x, y) => x.dentensity < y.dentensity);
    document.getElementById("zad3").textContent= data[4].name;
    data.sort((x, y) => x.name >= y.name);
}

async function makeZad4 (input) {
    let data= input.filter(city => city.people > 100000);
    let output= data.map(city => " " + city.name + " city");
    document.getElementById("zad4").textContent= output;
}

async function makeZad5 (input) {
    let data= input;
    let less= data.filter(city => city.people < 80000).length;
    let more= data.filter(city => city.people > 80000).length;
    document.getElementById("zad5less").textContent= "Ilość miast poniżej 80 000 mieszkańców: " + less + "\n";
    document.getElementById("zad5more").textContent= "Ilość miast powyżej 80 000 mieszkańców: " + more + "\n";
    
    let temp= "";
    if (less < more)
        temp= "Czyli więcej jest miast z dużą liczbą mieszkańców.";
    else if (less > more)
        temp= "Czyli więcej jest miast z małą liczbą mieszkańców.";
    else
        temp= "Czyli miast z małą liczbą mieszkańców jest tyle samo co miast z dużą liczbą mieszkańców.";
    document.getElementById("zad5summ").textContent= temp;
}

async function makeZad6 (input) {
    let data= input.filter(city => city.township.match(/^P.*$/gm));
    
    let avg= data.reduce((acc, x) => acc + x.area, 0);
    avg/= data.length;

    document.getElementById("zad6").textContent= avg;
}

async function makeZad7 (input) {
    let data= input.filter(city => city.province == "pomorskie");

    let hugeCities= data.filter(x => x.people > 5000).length;
    
    if (hugeCities == data.length)
        document.getElementById("zad7quest").textContent= "Wszystkie miasta w pomorskim mają powyżej 5000 mieszkańców.";
    else
        document.getElementById("zad7quest").textContent= "Istnieją w pomorskim miasta posiadające do 5000 mieszkańców.";
    
    document.getElementById("zad7num").textContent= "Liczba miast >5000 mieszkańców (w pomorskim): " + hugeCities + ".";
}


async function main () {
    let data= await getData();
    makeZad1(data);
    makeZad2(data);
    makeZad3(data);
    makeZad4(data);
    makeZad5(data);
    makeZad6(data);
    makeZad7(data);
}
main();
