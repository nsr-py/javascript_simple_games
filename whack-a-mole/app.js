document.addEventListener('DOMContentLoaded',()=>{

const square = document.querySelectorAll('.square')
let result = 0
let scoreBoard = document.querySelector('#result')

var hitPoint

function wack () {
    if(this.id == hitPoint){
      result += 1;
      scoreBoard.textContent = result;
      // console.log('hit');
    }
  }
// randomize the mole
function randomMole(){

  square.forEach(block=>{
    block.classList.remove('mole')
    block.removeEventListener('mouseup',wack)
  })

  var randomId = Math.floor(Math.random()*9)
  square[randomId].classList.add('mole')
  square[randomId].addEventListener('mouseup',wack)
  hitPoint = square[randomId].id
}


// add event listner of clickdown


function moveMole(){
  let timeId = setInterval(randomMole,500)
}


moveMole()
// timer
function timer(){
  let time=60
  let timeId = setInterval(function(){
    let timeSlot = document.querySelector('#timer')
    timeSlot.textContent = time--;
  if(time===-1){
    clearInterval(timeId)
    alert(`Game over! final Score ${result}`)
  }
  },1000)


}

timer()

})
