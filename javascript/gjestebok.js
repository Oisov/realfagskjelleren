document.getElementById("nextPage").addEventListener("click", nextPage);
document.getElementById("lastPage").addEventListener("click", lastPage);
var page = 0;

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myFunction(this, 0);
    }
};
xmlhttp.open("GET", "./gjestebok.xml", true);
xmlhttp.send();


function myFunction(xml, page) {
    var xmlDoc;
    xmlDoc = xml.responseXML;
    var name = "<h2>Side " + (page+1) + "</h2>";
    for (i=0 + page*5; i<5+page*5; i++) {
        name = name + "<div class='innlegg'><p class='name'>" + xmlDoc.getElementsByTagName("navn")[i].childNodes[0].nodeValue +
        "</p><br><p class='message'>" + xmlDoc.getElementsByTagName("melding")[i].childNodes[0].nodeValue + "</p><br></div>";
        document.getElementById("gjestebok").innerHTML = name;
    }
}

function nextPage() {
    page = page + 1;
    myFunction(xmlhttp, page);
}
function lastPage() {
    page = page - 1;
    myFunction(xmlhttp, page);
}
