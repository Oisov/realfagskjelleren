
var div = document.createElement("div");
div.id = "images";

var a = makeLink("https://www.facebook.com/Realfagskjelleren");
var img = makeImage("./img/facebook_new.png", "Facebook", "footerlogo");
a.appendChild(img);
div.appendChild(a);

a = makeLink("https://www.instagram.com/explore/tags/rkjeller/");
a.appendChild(makeImage("./img/temp_instagram.png", "Instagram", "footerlogo"));
div.appendChild(a);

a = makeLink("mailto:realfagskjellern-styre@list.stud.ntnu.no");
a.appendChild(makeImage("./img/email.png", "Mail", "footerlogo"));
div.appendChild(a);

// var container = document.getElementById("footer");
var container = document.createElement("div");
container.id="footer";

var hr = document.createElement("hr");
container.appendChild(hr);
container.appendChild(div);

var body = document.getElementsByTagName("BODY")[0];
body.appendChild(container);

function makeLink(href){
  var a = document.createElement("a");
  a.href=href;
  a.target="_blank";
  return a;
}

function makeImage(src, alt, c){
  var img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.classList.add(c);
  return img;
}
