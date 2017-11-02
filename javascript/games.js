document.getElementById("finnToernClose").addEventListener("click", closeFinnToern);
document.getElementById("finnToernButton").addEventListener("click", nyttkort);

document.getElementById("terningClose").addEventListener("click", closeTerning);
document.getElementById("terningButton").addEventListener("click", nyttKast);

var kortstokk = [];
var terninger = [dice1.png, dice2.png, dice3.png, dice4.png, dice5.png, dice6.png];
for (i = 2; i < 11; i++) {
  kortstokk.push(i+"_of_clubs.png");
  kortstokk.push(i+"_of_diamonds.png");
  kortstokk.push(i+"_of_hearts.png");
  kortstokk.push(i+"_of_spades.png");
}

var korttype = ["ace","jack","king","queen"];
var kortnavn = ["clubs","diamonds","hearts","spades"];


for (i = 0; i < 4; i++) {
  for (j = 0; j < 4; j++) {
    kortstokk.push(korttype[j]+"_of_"+kortnavn[i]+".png");
  }
}


function openFinnToern() {
  var modal = document.getElementById("finnToernModal");
  var modalBox = document.getElementById("finnToernBox");
  var modalHeader = document.getElementById("finnToernHeader");
  var modalImg = document.getElementById("finnToernImg");
  modal.style.display = "block";
  modalBox.style.display = "block";
  modalHeader.style.display = "block";
  modalImg.style.display = "block";
}
function closeFinnToern() {
  var modal = document.getElementById("finnToernModal");
  var modalBox = document.getElementById("finnToernBox");
  var modalHeader = document.getElementById("finnToernHeader");
  var modalImg = document.getElementById("finnToernImg");
  modal.style.display = "none";
  modalBox.style.display = "none";
  modalHeader.style.display = "none";
  modalImg.style.display = "none";
}

function openTerning() {
  var modal = document.getElementById("terningModal");
  var modalBox = document.getElementById("terningBox");
  var modalHeader = document.getElementById("terningHeader");
  var modalImg = document.getElementById("terningImg");
  modal.style.display = "block";
  modalBox.style.display = "block";
  modalHeader.style.display = "block";
  modalImg.style.display = "block";
}
function closeTerning() {
  var modal = document.getElementById("terningModal");
  var modalBox = document.getElementById("terningBox");
  var modalHeader = document.getElementById("terningHeader");
  var modalImg = document.getElementById("terningImg");
  modal.style.display = "none";
  modalBox.style.display = "none";
  modalHeader.style.display = "none";
  modalImg.style.display = "none";
}

function nyttkort() {
  if (kortstokk.length > 0) {
    random = Math.floor(Math.random() * kortstokk.length);
    document.getElementById("finnToernImg").src = "./img/games/kort/"+kortstokk[random];
    document.getElementById("kort").innerHTML = kortstokk[random];
    kort = kortstokk[random];
    kortstokk.splice(random, 1);
    document.getElementById("kortstokk").innerHTML = kortstokk.toString();
    document.getElementById("ntll").innerHTML = kortstokk.length;
    if (kort == "2_of_clubs.png" || kort == "2_of_diamonds.png"
  || kort == "2_of_hearts.png" || kort == "2_of_spades.png") {
    document.getElementById("finnToernButton").innerHTML = "Du fant Toern!";
  }
  } else {
    document.getElementById("finnToernButton").innerHTML = "Ikke flere kort";
  }
}

function nyttKast() {
  var random = Math.floor(Math.random() * 6) + 1;
  document.getElementById("terningImg").src = "./img/games/terning/dice" + random + ".png";
  document.getElementById("terningHeader").innerHTML = "./img/games/terning/dice" + random + ".png";
}
