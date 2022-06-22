class Card {

    constructor({ position, value, gameContainer }) {
        this.gameContainer = gameContainer
        this.position = position
        this.width = CARD_WIDTH
        this.height = CARD_HEIGHT
        this.image = new Image()
        this.image.src = './img/cardsprites.png'
        this.scale = 1.00
        this.cardWidth = CARD_WIDTH
        this.cardHeight = CARD_HEIGHT
        //value 1-52
        this.value = value
        this.tableNum = 0

    }
    setTableNum(tableNum){
        this.tableNum = tableNum
    }

    getTableNum(){
        return this.tableNum
    }


    getBJValue(){

        if(this.value <= 0 || this.value >= 53){
            console.log("Error: an unknown value assigned to card")
            return -1
        }
        if(this.value >= 1 && this.value <= 4){
            return 2
        }else if(this.value <= 8){
            return 8
        }else if(this.value <= 12){
            return 3
        }else if(this.value <= 16){
            return 9
        }else if(this.value <= 20){
            return 4
        }else if(this.value <= 24){
            return 10
        }else if(this.value <= 28){
            return 5
        }else if(this.value <= 32){
            return 10
        }else if(this.value <= 36){
            return 6
        }else if(this.value <= 40){
            return 10
        }else if(this.value <= 44){
            return 7
        }else if(this.value <= 48){
            return 10
        }else if(this.value <= 52){
            //By default, ace is 1
            return 1
        }

    }

    getScale(){
        return this.scale
    }

    setValue(value){
        this.value = value
    }

    getValue(){
        return this.value
    }

    getPosition(){
        return this.position
    }

    getWidth(){
        return this.cardWidth * this.scale
    }

    getHeight(){
        return this.cardHeight  * this.scale
    }

    setWidth(width){
        this.cardWidth = width * this.scale
    }

    setHeight(height){
        this.cardHeight = height * this.scale
    }

    setPosition(position){
        this.position = position
    }

    getPositionX(){
        return this.position.x
    }

    getPositionY(){
        return this.position.y
    }

    setPositionX(x){
        this.position.x = x
    }

    setPositionY(y){
        this.position.y = y
    }

    setScale(scale){
        this.scale = scale
    }

    calcCropWidth(value){
        var width = ((value - 1) % 8) * CARD_WIDTH
        return width
    }
    
    calcCropHeight(value){
        var height
        if(value < 9){
            height = 0
        }else if(value < 17){
            height = 1
        }else if(value < 25){
            height = 2
        }else if(value < 33){
            height = 3
        }else if(value < 41){
            height = 4
        }else if(value < 49){
            height = 5
        }else{
            height = 6
        }
        height = height * 81
        return height
    }

    


    draw() {
        // const canvas = document.querySelector('canvas')
        // var c = canvas.getContext('2d')
        

        var game1 = document.getElementById("gameContainer1")
        var myGame1 = game1.getContext("2d")

        var game2 = document.getElementById("gameContainer2")
        var myGame2 = game2.getContext("2d")
        
        //console.log(table1.getTableNum())
        var tableNumber = this.getTableNum()
        if(tableNumber== 1){
            myGame1.drawImage(
                this.image,
    
                //2-8
                //3-9
                //4-10
                //5-J
                //6-Q
                //7-K
                //A
    
                //suit offset
                //spade - club - diamond - heart
    
                this.calcCropWidth(this.value), // crop x pos
                this.calcCropHeight(this.value), // crop y pos
                CARD_WIDTH , // crop width
                CARD_HEIGHT, // crop height
                this.position.x,
                this.position.y,
                this.cardWidth * this.scale,
                this.cardHeight * this.scale
            )
        }
        if(tableNumber == 2){
            myGame2.drawImage(
                this.image,
    
                //2-8
                //3-9
                //4-10
                //5-J
                //6-Q
                //7-K
                //A
    
                //suit offset
                //spade - club - diamond - heart
    
                this.calcCropWidth(this.value), // crop x pos
                this.calcCropHeight(this.value), // crop y pos
                CARD_WIDTH , // crop width
                CARD_HEIGHT, // crop height
                this.position.x,
                this.position.y,
                this.cardWidth * this.scale,
                this.cardHeight * this.scale
            )
        }
        


        
        
    }

    update() {
        
        this.draw()
        

    }

}



class Table{
    constructor(gameContainer, tableNum){

        this.gameContainer = gameContainer

        this.tableNum = tableNum

        this.playerHand = []
        this.hostHand = []

        this.cardStackOffsetHost = 10
        this.cardStackOffsetPlayer = 10

        this.cardWidth = CARD_WIDTH
        this.cardHeight = CARD_HEIGHT

        if(this.tableNum == 1){
            this.gameContainer = document.getElementById('gameContainer1')
        }else if(this.tableNum == 2){
            this.gameContainer = document.getElementById('gameContainer2')
        }
    }


    //table.function()
    //table1.assignTableNumValue(tableNum)
    setTableNum(tableNum){
        for(var i = 0; i <= this.playerHand.length - 1; i++){
            this.playerHand[i].setTableNum(tableNum)
        }
        for(var i = 0; i <= this.hostHand.length - 1; i++){
            this.hostHand[i].setTable(tableNum)
        }
    }

    setPlayerHand(playerHand){
        this.playerHand = playerHand
    }
    setHostHand(hostHand){
        this.hostHand = hostHand
    }

    getTableNum(){
        return this.tableNum
    }

    getGameContainer(){
        return this.gameContainer
    }

    getGameContainerWidth(){
        return gameContainer.width
    }

    getGameContainerHeight(){
        return gameContainer.height
    }

    getPlayerHand(){
        return this.playerHand
    }

    getHostHand(){
        return this.hostHand
    }

    generateRandomCard() {
        var card = new Card({
            position: {
                x: 0,
                y: 0,
            },
            value: this.generateRandomCardInteger(),
            gameContainer: this.gameContainer
        })
        card.setTableNum(this.tableNum)
        return card
    }

    generateRandomCardInteger(){
        let int = (Math.floor(Math.random() * 52) + 1)
        return int
    }
    
    startingDeal(){
        this.playerHand.push(this.generateRandomCard())
        this.playerHand.push(this.generateRandomCard())
        this.hostHand.push(this.generateRandomCard())
        this.hostHand.push(this.generateRandomCard())
    }

    getHandTotal(array){
        var sum = 0
        var numAces = 0
        for(i = 0; i <= array.length - 1; i++){
            sum = sum + array[i].getBJValue()
            if(array[i].getBJValue() == 1){
                numAces++
            }
        }
        for(i = 0; i < numAces; i++){
            if(sum + 10 <= 21){
                sum = sum + 10
            }
        }
        return sum
    }

    setCardPositions(){
        var width = this.gameContainer.width
        var height = this.gameContainer.height
        // in between =
        for(var i = 0; i <= this.playerHand.length - 1; i++){
            var totalLength = (this.cardStackOffsetPlayer * (this.playerHand.length - 1)) + this.cardWidth * this.playerHand[i].getScale()
            var xPos = width / 2  - totalLength / 2
            var x = xPos + i * this.cardStackOffsetPlayer
            this.playerHand[i].setPositionX(parseInt(x))
            var y = height - 25 - this.cardHeight
            this.playerHand[i].setPositionY(parseInt(y))
        }
    
        for(var i = 0; i <= this.hostHand.length - 1; i++){
            var totalLength = (this.cardStackOffsetHost * (this.hostHand.length - 1)) + this.cardWidth * this.hostHand[i].getScale()
            var xPos = width / 2 - totalLength / 2
            var x = xPos + i * this.cardStackOffsetHost
            this.hostHand[i].setPositionX(parseInt(x))
            var y = 25
            this.hostHand[i].setPositionY(parseInt(y))
        }
    
    }

    setScale(){
        var gameContainer

        if(this.tableNum == 1){
            gameContainer = document.getElementById('gameContainer1')
        }else if(this.tableNum == 2){
            gameContainer = document.getElementById('gameContainer2')
        }

        var width = gameContainer.width - 80
        var height = gameContainer.height - 80
    
        //console.log(scale)
        for(var i = 0; i <= this.playerHand.length - 1; i++){
            var totalLength = (this.cardStackOffsetPlayer * (this.playerHand.length - 1)) + this.cardWidth * this.playerHand[i].getScale() - 50
            if(totalLength > width && this.cardStackOffsetPlayer >= 0){
                this.cardStackOffsetPlayer = this.cardStackOffsetPlayer - 1
            }else if(totalLength * 1.5 < width && this.cardStackOffsetPlayer <= 100){
                this.cardStackOffsetPlayer = this.cardStackOffsetPlayer + 1
            }
        }
    
        for(var i = 0; i <= this.hostHand.length - 1; i++){
            var totalLength = (this.cardStackOffsetHost * (this.hostHand.length - 1)) + this.cardWidth * this.hostHand[i].getScale()
            if(totalLength > width && this.cardStackOffset >= 0){
                this.cardStackOffsetHost = this.cardStackOffsetHost - 1
            }else if(totalLength * 1.5 < width && this.cardStackOffsetHost <= 100){
                this.cardStackOffsetHost = this.cardStackOffsetHost + 1
            }
        }
    
    
        
    }

    animate() {
        var game1 = document.getElementById("gameContainer1")
        var myGame1 = game1.getContext("2d")

        var game2 = document.getElementById("gameContainer2")
        var myGame2 = game2.getContext("2d")

        var playerScore1 = document.getElementById('playerScore1')
        var hostScore1 = document.getElementById('hostScore1')

        var playerScore2 = document.getElementById('playerScore2')
        var hostScore2 = document.getElementById('hostScore2')

 
        this.setScale()
        this.setCardPositions()
        this.resizeCanvas()
    
        for(let i = 0; i <= this.playerHand.length - 1; i++){
            this.playerHand[i].update()
        }
    
        for(let i = 0; i <= this.hostHand.length - 1; i++){
            this.hostHand[i].update()
        }




        playerScore1.textContent = "Player: " + table1.getHandTotal(table1.playerHand)
        hostScore1.textContent = "Dealer: " + table1.getHandTotal(table1.hostHand)

        playerScore2.textContent = "Player: " + table2.getHandTotal(table2.playerHand)
        hostScore2.textContent = "Dealer: " + table2.getHandTotal(table2.hostHand)

        //var playerScore1 = document.getElementById('playerScore1')
        //
        //
        

        
    
    }

    resizeCanvas(){
        game1 = document.getElementById("gameContainer1")

        game2 = document.getElementById("gameContainer2")
    }


    delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    
}


//Main
/*
const card = new Card({
    position: {
        x: 500,
        y: 500
    },
    value: 1
})
*/

const canvas = document.querySelector('canvas')
var c = canvas.getContext('2d')

const CARD_WIDTH = 50
const CARD_HEIGHT = 81

var game

game = document.getElementById("gameContainer1")
var game1 = game.getContext("2d")

game = document.getElementById("gameContainer2")
var game2 = game.getContext("2d")



/* 
var card = new Card({
            position: {
                x: 0,
                y: 0,
            },
            value: this.generateRandomCardInteger()
        })
*/

const table1 = new Table(
    game1, // gameCanvas
    1 // tableNum
)

const table2 = new Table(
    game2,
    2
)


function Main(){

    table1.startingDeal()
    table2.startingDeal()
    
    consolePrint()

    animate()

}

Main()


function consolePrint(){
    console.log("Table 1 - PlayerHand:")
    for(i = 0; i <= table1.playerHand.length - 1; i++){
        console.log(table1.playerHand[i].getBJValue())
    }
    console.log("Table 2 - PlayerHand:")
    for(i = 0; i <= table2.playerHand.length - 1; i++){
        console.log(table2.playerHand[i].getBJValue())
    }
    console.log(table2.getPlayerHand())
    
}



function hitButton(table){
    var playerHand = table.getPlayerHand()
    playerHand[playerHand.length] = table.generateRandomCard()
    table.setPlayerHand(playerHand)
    //table.playerHand[table.playerHand.length].push(table.generateRandomCard())
    var playerScore1 = document.getElementById('playerScore1')
    var hostScore1 = document.getElementById('hostScore1')
    var playerScore2 = document.getElementById('playerScore2')
    var hostScore2 = document.getElementById('hostScore2')

    playerScore1.textContent = table1.getHandTotal(table1.playerHand)
    hostScore1.textContent = table1.getHandTotal(table1.hostHand)
    playerScore2.textContent = table2.getHandTotal(table2.playerHand)
    hostScore2.textContent = table2.getHandTotal(table2.hostHand) 
    
}

function animate() {
    window.requestAnimationFrame(this.animate)
    var game1 = document.getElementById("gameContainer1")
    myGame1 = game1.getContext("2d")

    var game2 = document.getElementById("gameContainer2")
    myGame2 = game2.getContext("2d")
 
    myGame1.clearRect(0,0,game1.width,game1.height)
    myGame2.clearRect(0,0,game2.width,game2.height)

    table1.animate()
    table2.animate()
}



window.onload = function() {
    resizeCanvas()
}


window.onresize = function() {
    //table1.resizeCanvas()
    //table2.resizeCanvas()
    resizeCanvas()
}
  


function resizeCanvas(){
    game1.width = 550
    game1.height = 300
    game2.width = 550
    game2.height = 300
}

function assignAllTableNumbers(){

}

 
