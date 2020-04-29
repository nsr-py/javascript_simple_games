document.addEventListener('DOMContentLoaded',()=>{
  const squares = document.querySelectorAll('.grid div')
  const scoreDisplay = document.querySelectorAll('#result')
  let width = 15
  let height = 15
  // let laserInterval
  let interval 
  let shipIndex = 202
  let direction = 1   
  let result = 0
  let invadersTakenDown = []
  
  let currentInvaderIndex = 0
  let invaders = [
  0,1,2,3,4,5,
  15,16,17,18,19,20,
  30,31,32,33,34,35,]

  // draw invaders and ship
  invaders.forEach(index => squares[index].classList.add('invader'))

  squares[shipIndex].classList.add('ship')

  // moving ship
  function moveShip(e){
    squares[shipIndex].classList.remove('ship')
    switch(e.keyCode){
      case 37:
        if(shipIndex%width!==0) shipIndex -= 1
        break
      case 39:
        if(shipIndex%width!==width-1) shipIndex += 1
        break
    }
    squares[shipIndex].classList.add('ship')
  }

  document.addEventListener('keydown',moveShip)

  // moving invaders
  function moveInvaders(e){
  leftEdge = invaders[0] % width === 0    
  rightEdge = invaders[invaders.length-1] % width === 14
  if(leftEdge && direction===-1||rightEdge && direction===1){
    direction = width
  } else if(direction===width){
    if(leftEdge) direction = 1
    if(rightEdge) direction = -1
    }
  for (let i = 0; i < invaders.length; i++) {
      squares[invaders[i]].classList.remove('invader')
      invaders[i] += direction
    }

  for (let i = 0; i < invaders.length; i++) {
      

      if(!(invadersTakenDown.includes(i)))
        {squares[invaders[i]].classList.add('invader')}
    }


  if(invaders[length-1]>squares.length-4*width-1){
    // game over you loose
    clearInterval(interval)
  }
  }
  
  interval = setInterval(moveInvaders,500)

  // shooting lasers
  function shoot(e){
    
    let laserInterval
    let laserIndex = shipIndex
    
    function moveLaser(){
    // collision
    squares[laserIndex].classList.remove('laser')
    laserIndex -= width
    squares[laserIndex].classList.add('laser')
    if(squares[laserIndex].classList.contains('invader')){
      clearInterval(laserInterval)
      invadersTakenDown.push(invaders.indexOf(laserIndex))
      squares[laserIndex].classList.remove('laser','invader')
      squares[laserIndex].classList.add('boom')
      setTimeout(()=> squares[laserIndex].classList.remove('boom'),250)
      
    }
    if(laserIndex<width){
      clearInterval(laserInterval)
      squares[laserIndex].classList.remove('laser')
    }
    }


// Have to kow why this creates a bug whereas the switch case does not althought they are both logically the same 
    // document.addEventListener('keyup',e=>{
    //   if(e.keyCode === 32){
    //     laserInterval = setInterval(moveLaser,100)
    //   }
    // })

    switch(e.keyCode){
      case 32:
      laserInterval = setInterval(moveLaser,100)
    }
  }

  document.addEventListener('keyup',shoot)
})