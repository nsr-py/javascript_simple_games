document.addEventListener('DOMContentLoaded',()=>{

  const square = document.querySelectorAll(".grid div");
  const scoreDisplay = document.querySelector("#result");
  const startBtn = document.querySelector(".start")



  let width = 10

  let appleIndex = 20
  let currentIndex = 0

  let direction = 1;
  let score = 0;
  let snake = [2,1,0];
  let speed = 0.9;
  let interval = 0;
  let intervalTime =0;


// to start the game 
function startGame(){
  snake.forEach(index=> square[index].classList.remove('snake'))
  square[appleIndex].classList.remove('apple')
  randomApple()
  speed = 0.9;
  snake = [2,1,0];
  intervalTime = 500;
  currentIndex = 0;
  snake.forEach(index => square[index].classList.add('snake'))
  interval = setInterval(moveOutcomes,intervalTime)
}

// the function that will execute and monitor every outcome
function moveOutcomes(){

  // collision detection
  if (
    // with wall
    snake[0] % width === width-1 && direction===1  || // right wall
    snake[0] % width === 0 && direction===-1  || //left wall
    snake[0] + width >= width*width && direction===width || //bottom wall
    snake[0] - width <= 0 && direction===-width|| //top wall
    // with self
    square[snake[0] + direction].classList.contains('snake')
    ) {  
    return clearInterval(interval)
  }

  // deal with snakes tail and moving the snake 
  const tail = snake.pop()
  square[tail].classList.remove('snake')
  snake.unshift(snake[0]+direction)
  square[snake[0]].classList.add('snake')

  // catching the apple 
  if(square[snake[0]].classList.contains('apple')){
    square[appleIndex].classList.remove('apple')
    score++;
    scoreDisplay.textContent = score
    square[tail].classList.add('snake')
    snake.push(tail)
    randomApple()
    clearInterval(interval)
    intervalTime = intervalTime*speed;
    interval = setInterval(moveOutcomes,intervalTime)
  }
} 

// generates the apple randomly anywhere on the board
function randomApple(){
  do{
    appleIndex = Math.floor(Math.random()*square.length)
  }while(square[appleIndex].classList.contains('snake'))

  square[appleIndex].classList.add('apple')

}

  // function to control snake 
  function move(e){
    square[currentIndex].classList.remove('snake') // removing snake from the grid

    if(e.keyCode === 39){
      direction = 1// going right
    } else if(e.keyCode === 38){
      direction = -width// going up
    } else if(e.keyCode===37){
      direction = -1// going left
    } else if(e.keyCode===40){
      direction = +width// doing down
    }
  }

  document.addEventListener('keyup',move)
  startBtn.addEventListener('click',startGame)


})