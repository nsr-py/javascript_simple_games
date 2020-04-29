document.addEventListener('DOMContentLoaded',()=>{
    // card option
    const cardArray=[
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },      
    ]

    const grid = document.querySelector('.grid')
    const result = document.getElementById('result')

    var cardsChosen = []
    var cardsChosenId = []
    var cardsWon = []
// create the board
    function createBoard() {
        for(let i=0; i<cardArray.length; i++){
            var card = document.createElement('img')
            card.setAttribute('src','images/blank.png')
            card.setAttribute('data-id',i)
            card.addEventListener('click',flipCard)
            grid.appendChild(card)
    	}
}
// check the chosen cards
function checkForMatch() {
    var cards = document.querySelectorAll('img')

    if (cardsChosen[0] == cardsChosen[1] ){
        alert("You found a match!!")
        cards[cardsChosenId[0]].setAttribute('src','images/white.png')
        cards[cardsChosenId[1]].setAttribute('src','images/white.png')
        cardsWon.push(cardsChosen)
    }
    else{
        alert("Not a match")
        cards[cardsChosenId[0]].setAttribute('src','images/blank.png')
        cards[cardsChosenId[1]].setAttribute('src','images/blank.png')
    }
    cardsChosen = []
    cardsChosenId = []
    result.textContent = cardsWon.length
    if(result.textContent == cardArray.length/2){
        alert("congratulations you won")
    } 
}

// flip the cards
    function flipCard(){
        var cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src',cardArray[cardId].img)
        if(cardsChosen.length == 2)
            setTimeout(checkForMatch,500)
    }
createBoard()
})