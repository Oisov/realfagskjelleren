var kortstokk = [];

for (i = 2; i < 11; i++) {
  kortstokk.push(i+"_of_clubs.png");
  kortstokk.push(i+"_of_diamonds.png");
  kortstokk.push(i+"_of_hearts.png");
  kortstokk.push(i+"_of_spades.png");
}

var korttype = ["ace","jack","king","queen"]
var kortnavn = ["clubs","diamonds","hearts","spades"]


for (i = 0; i < 4; i++) {
  for (j = 0; j < 4; j++) {
    kortstokk.push(korttype[j]+"_of_"+kortnavn[i]+".png");
  }
}

function nyttkort() {
  if (kortstokk.length > 0) {
    random = Math.floor(Math.random() * kortstokk.length);
    document.getElementById("spillkort").src = "kort/"+kortstokk[random];
    document.getElementById("kort").innerHTML = kortstokk[random];
    kort = kortstokk[random];
    kortstokk.splice(random, 1);
    document.getElementById("ntll").innerHTML = "Antall kort igjen: " + kortstokk.length;
    if (kort == "2_of_clubs.png" || kort == "2_of_diamonds.png"
  || kort == "2_of_hearts.png" || kort == "2_of_spades.png") {
    document.getElementById("kort").innerHTML = "Du fant Toern!";
  }
  } else {
    document.getElementById("kort").innerHTML = "Ikke flere kort";
  }
}
