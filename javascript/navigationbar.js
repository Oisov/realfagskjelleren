var menuOpen = false;

function toggleMenu(){
    if(menuOpen) {
      document.getElementById("mobile_navwrap").style.display = "none";
      menuOpen = false;
    }
    else{
      document.getElementById("mobile_navwrap").style.display = "block";
      menuOpen = true;
    }
}
