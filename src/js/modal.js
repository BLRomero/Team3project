// wrap in window onload to remove error
window.onload = function () {
  const modal = document.getElementById("modal");

  // add event listener to Quick View Button
  const buttons = document.getElementsByClassName("card__productModalbtn");
  
  function openModal(buttonId) {
    console.log("Id", buttonId);
    modal.style.display = "block";
  }

  for (var i = 0; i < buttons.length; i++) {
    let buttonId = buttons[i].value;
    buttons[i].addEventListener("click", function() {openModal(buttonId)}
    , false);
}

};

const span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}