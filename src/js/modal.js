// wrap in window onload to remove error
window.onload = function () {

  // add event listener to Quick View Button
  const buttons = document.getElementsByClassName("card__productModalbtn");

  var openModal = function() {
    console.log("Open Modal");
  }

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", openModal, false);
}

};
