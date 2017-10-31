var isOpen = false;

function toggleMenu(){
    if(isOpen) {
      document.getElementById("mobile_navwrap").style.display = "none";
      isOpen = false;
    }
    else{
      document.getElementById("mobile_navwrap").style.display = "block";
      isOpen = true;
    }
}
