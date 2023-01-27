// controls 
const removeIcons = document.getElementsByClassName('removeIcon');
const cartrows = document.getElementsByClassName('cartrows');

// main functions



// Eventlisteners 

for(let icon of removeIcons){
    let index = 0;
    icon.addEventListener('click', (e)=> {
        e.preventDefault();
        cartrows[index].innerHTML = ''; 
        removeIcons[index].setAttribute('hidden', 'hidden');
        index = index += 1;
  })  
}