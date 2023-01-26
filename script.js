var button = document.querySelector('.ham-button')
var slide = document.querySelector('.nav-items')

 button.addEventListener('click', () =>{
   slide.classList.toggle('display');
   button.children[0].classList.toggle('toggle1')
   button.children[1].classList.toggle('toggle2')
   button.children[2].classList.toggle('toggle3')
 })