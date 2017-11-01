function openModal(myImg) {
    var modal = document.getElementById("imageModal");
    var bilde = document.getElementById("modalImg");
    modal.style.display = "block";
    bilde.src = myImg.src;
}
function closeModal() {
    var modal = document.getElementById("imageModal");
    modal.style.display = "none";
}
