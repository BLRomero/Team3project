// wrap in window onload to remove error
window.onload = function () {

  // add event listener to Quick View Button
  const buttons = document.getElementsByClassName("card__productModalbtn");
  
  function openModal(buttonId) {
    console.log("Id", buttonId);
  }

  for (var i = 0; i < buttons.length; i++) {
    let buttonId = buttons[i].value;
    buttons[i].addEventListener("click", openModal(buttonId)
    , false);
}



};