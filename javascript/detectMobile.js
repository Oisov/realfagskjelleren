var isMobile = false;
var initialized = false;

// mq.matches is true if screen width is 1000px or greater
const mq = window.matchMedia("(min-width: 1000px)");
// Initialize if you start in small screen
swapView(mq);
mq.addListener(swapView);

// Detecting mobile device, updates isMobile. Script found at:
// https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device-in-jquery
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;

// Swaps id's based on screen size
function swapView(mq) {
  // Runs if on a Mobile Device or using a screen size less then 1000px
  if ((isMobile || !mq.matches)) {
    var temp = document.getElementById("header");
    temp.id = "mobile_header";
    temp = document.getElementById("banner");
    temp.id = "mobile_banner";
    temp = document.getElementById("bannerwrap");
    temp.id = "mobile_bannerwrap";
    temp = document.getElementById("logo");
    temp.id = "mobile_logo";
    temp.src = "./img/logo.png";
    temp = document.getElementById("navbut");
    temp.id = "mobile_navbut";
    temp = document.getElementById("navwrap");
    temp.id = "mobile_navwrap";
    temp.style.display="none";
    menuOpen = false;
    temp = document.getElementById("nav_links");
    temp.id = "mobile_nav_links";
    temp = document.getElementById("content");
    temp.id = "mobile_content";
    temp = document.getElementById("footer");
    temp.id = "mobile_footer";
    temp = document.getElementById("images");
    temp.id = "mobile_images";
    temp = document.getElementsByTagName("body")[0];
    temp.style.width = "100%";
    initialized = true;
  }
  // window width is atleast 1000px and not mobile
  // AND windowssize was previously small
  else if (initialized) {
    var temp = document.getElementById("mobile_header");
    temp.id = "header";
    temp = document.getElementById("mobile_bannerwrap");
    temp.id = "bannerwrap";
    temp = document.getElementById("mobile_banner");
    temp.id = "banner";
    temp = document.getElementById("mobile_logo");
    temp.id = "logo";
    temp.src = "./img/banner.png";
    temp = document.getElementById("mobile_navbut");
    temp.id = "navbut";
    temp = document.getElementById("mobile_navwrap");
    temp.id = "navwrap";
    temp.style.display="block";
    temp = document.getElementById("mobile_nav_links");
    temp.id = "nav_links";
    temp = document.getElementById("mobile_content");
    temp.id = "content";
    temp = document.getElementById("mobile_footer");
    temp.id = "footer";
    temp = document.getElementById("mobile_images");
    temp.id = "images";
    temp = document.getElementsByTagName("body")[0];
    temp.style.width = "50%";
  }
}
