document.getElementById("finnToernIcon").addEventListener("click", openFinnToern);
document.getElementById("finnToernClose").addEventListener("click", closeFinnToern);
document.getElementById("finnToernButton").addEventListener("click", nyttKort);

document.getElementById("terningIcon").addEventListener("click", openTerning);
document.getElementById("terningClose").addEventListener("click", closeTerning);
document.getElementById("terningButton").addEventListener("click", nyttKast);

document.getElementById("4chanIcon").addEventListener("click", open4chan);
document.getElementById("4chanClose").addEventListener("click", close4chan);
document.getElementById("4chanButton").addEventListener("click", nytt4chankort);


function openFinnToern() {
  shuffleItAll();
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
  modalImg.src = "./img/games/kort/red_joker.png";
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

function open4chan() {
  shuffleItAll2();
  var modal = document.getElementById("4chanModal");
  var modalBox = document.getElementById("4chanBox");
  var modalHeader = document.getElementById("4chanHeader");
  var modalImg = document.getElementById("4chanImg");
  modal.style.display = "block";
  modalBox.style.display = "block";
  modalHeader.style.display = "block";
  modalImg.style.display = "block";
  modalImg.src = "./img/games/4chan/4chanImg.jpg";
}
function close4chan() {
  var modal = document.getElementById("4chanModal");
  var modalBox = document.getElementById("4chanBox");
  var modalHeader = document.getElementById("4chanHeader");
  var modalImg = document.getElementById("4chanImg");
  modal.style.display = "none";
  modalBox.style.display = "none";
  modalHeader.style.display = "none";
  modalImg.style.display = "none";
}

var kortstokk = [];
function shuffleItAll() {
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
}

var fchankort = [];
function shuffleItAll2() {
  for (i = 1; i < 169; i++) {
    fchankort.push(i + ".jpg");
  }
}

var terninger = [dice1.png, dice2.png, dice3.png, dice4.png, dice5.png, dice6.png];

function nyttKort() {
  document.getElementById("finnToernButton").innerHTML = "Trekk kort";
  if (kortstokk.length > 0) {
    random = Math.floor(Math.random() * kortstokk.length);
    document.getElementById("finnToernImg").src = "./img/games/kort/"+kortstokk[random];
    kort = kortstokk[random];
    kortstokk.splice(random, 1);
    if (kort == "2_of_clubs.png" || kort == "2_of_diamonds.png"
  || kort == "2_of_hearts.png" || kort == "2_of_spades.png") {
    document.getElementById("finnToernButton").innerHTML = "Du fant Toern!";
  }
  } else {
    document.getElementById("finnToernButton").innerHTML = "Ikke flere kort";
  }
}

function nyttKast() {
  var random2 = Math.floor(Math.random() * 6) + 1;
  document.getElementById("terningImg").src = "./img/games/terning/dice" + random2 + ".png";
}

function nytt4chankort() {
    if (fchankort.length > 0) {
        random2 = Math.floor(Math.random() * fchankort.length);
        document.getElementById("4chanImg").src = "./img/games/4chan/cards/" + fchankort[random2];
        fchankort.splice(random2, 1);
    } else {
        document.getElementById("4chanButton").innerHTML = "Ikke flere kort";

    }
}
