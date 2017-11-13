var menuNames = [
  {ref: "index.html",
  name: "Hjem"},
  {ref: "events.html",
  name: "Events"},
  {ref: "map.html",
  name: "Kart"},
  {ref: "media.html",
  name: "Media"},
  {ref: "about.html",
  name: "Om oss"},
  {ref: "games.html",
  name: "Spill"}
];
var menuOpen = false;
console.log(window.location);
var header = document.createElement("div");
header.id = "header";

var bannerwrap = document.createElement("div");
bannerwrap.id = "bannerwrap";

var banner = document.createElement("div");
banner.id = "banner";

var navbut = document.createElement("img");
navbut.id = "navbut";
navbut.src = "./img/button_new.png";
navbut.alt = "Logo";
navbut.onclick = function (){
    if(menuOpen) {
      document.getElementById("mobile_navwrap").style.display = "none";
      menuOpen = false;
    }
    else{
      document.getElementById("mobile_navwrap").style.display = "block";
      menuOpen = true;
    }
  };
console.log(navbut);

var logo = document.createElement("img");
logo.id = "logo";
logo.src = "./img/banner.png";
logo.alt = "Banner";

banner.appendChild(navbut);
banner.appendChild(logo);

bannerwrap.appendChild(banner);

var navwrap = document.createElement("div");
navwrap.id = "navwrap";

var navbar = document.createElement("nav");
navbar.id = "navbar";

var nav_links = document.createElement("ul");
nav_links.id = "nav_links";

var pageName = window.location.pathname.split("/").pop();
for (var i = 0; i < menuNames.length; i++) {
  var tempLi = document.createElement("li");
  var tempA = document.createElement("a");
  if (menuNames[i].ref == pageName) {
    tempA.classList.add("active");
  }
  else{
    tempA.href = "./" + menuNames[i].ref;
  }
  tempA.innerHTML = menuNames[i].name;
  tempLi.appendChild(tempA);
  nav_links.appendChild(tempLi);
}

navbar.appendChild(nav_links);

navwrap.appendChild(navbar);

header.appendChild(bannerwrap);
header.appendChild(navwrap);

var body = document.getElementsByTagName("BODY")[0];

body.appendChild(header);
