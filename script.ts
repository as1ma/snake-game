"use strict"

class SnakePart{

    x: number = 0
    y:number = 0

    constructor(x:number,y:number){
        this.x = x
        this.y = y
    }
}

let c = <HTMLCanvasElement>document.getElementById("myCanvas")
let ctx = <CanvasRenderingContext2D>c.getContext("2d")

let speed = 7
let tileCount = 20
let tileSize = c.width / tileCount - 2
let headX= 10
let headY =  10
const snakeParts:any = []
let tailLength = 2

let xVelocity = 0
let yVelocity = 0

let appleX = 5
let appleY = 5

let score = 0

const sound = new Audio ("bite.mp3") // Sound effect obtained from https://www.zapsplat.com


function drawGame(){
    changeSnakePosition() 
    let result = isGameOver()
    if(result){
        return
    }
    clearScreen()
    
    checkAppleCollision()
    drawApple()  
    drawSnake()
    drawScore()

    if(score > 2){
        speed = 11
    }

    if(score > 5){
        speed = 15
    }
    setTimeout(drawGame,1000/speed)
}

function clearScreen(){
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,c.width,c.height)
}

function isGameOver(){
    let gameOver = false

    if(yVelocity === 0 && xVelocity === 0){
        return false
    }

    for(let i =0;i<snakeParts.length;i++){
        let part = snakeParts[i]
        if(part.x === headX && part.y === headY){
            gameOver = true
            break
        }
    }
    if(gameOver){

        // ctx.fillStyle = "red"
        // ctx.fillRect(0,0,c.width,c.height)

        // ctx.fillStyle = "black"
        // ctx.fillRect(0,0,c.width,c.height)

        ctx.fillStyle = "white"
        ctx.font = "50px monospace"
        ctx.fillText("GAME OVER", c.width / 4, c.height / 2)
    }
    return gameOver
}

// function resetGame(){
//     document.location.reload() 
// }
function drawSnake(){
    ctx.fillStyle = "red"
    ctx.fillRect(headX * tileCount, headY*tileCount, tileSize, tileSize)
    
    for(let i = 0; i < snakeParts.length; i++){
        let part:any = snakeParts[i]
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }

    snakeParts.push(new SnakePart(headX,headY))
    if(snakeParts.length > tailLength){
        snakeParts.shift() //removes furthest item from snake parts if more than tail size 
    }
}

function changeSnakePosition(){
    // if(headY < 0){
    //     headY = c.height
    // }

    if(headX === tileCount+4){
        headX = 0 + xVelocity
    }else if(headY === tileCount+4){
        headY = 0 + yVelocity
    }else if(headX < 0){
        headX = 24 + xVelocity
    }else if(headY < 0){
        headY = 24 + yVelocity
    }else{
        headX = headX + xVelocity
        headY = headY + yVelocity
    }
}
document.body.addEventListener("keydown", keyDown)

function keyDown(event:any){

    //up
    if(event.keyCode == 38){
        if(yVelocity == 1){
            return
        }
        yVelocity = -1
        xVelocity = 0
    }

    //down
    if(event.keyCode == 40){
        if(yVelocity == -1){
            return
        }
        yVelocity = 1
        xVelocity = 0
    }

    //left
    if(event.keyCode == 37){
        if(xVelocity == 1){
            return
        }
        yVelocity = 0
        xVelocity = -1
    }

    //right
    if(event.keyCode == 39){
        if(xVelocity == -1){
            return
        }
        yVelocity = 0
        xVelocity = 1
    
    }
}

function drawApple(){
    ctx.fillStyle = "Blue"
    ctx.fillRect(appleX * tileCount,appleY * tileCount, tileSize, tileSize)
}

function checkAppleCollision(){

    if(appleX === headX && appleY === headY){
        appleX = Math.floor(Math.random() * tileCount)
        appleY = Math.floor(Math.random() * tileCount)
        tailLength++
        score++
        sound.play()
    }
}

function drawScore(){
    ctx.fillStyle = "white"
    ctx.font = "10px tahoma"
    ctx.fillText("Score: "+score, c.width-50, 10)
}

drawGame()
// var rightPressed = false;
// var leftPressed = false;
// var upPressed = false;
// var downPressed = false;

// let X = 0
// let Y = 0

// document.addEventListener('keydown', keyDownHandler, false);
// // document.addEventListener('keyup', keyUpHandler, false);

// function keyDownHandler(event:KeyboardEvent) {
//     if(event.keyCode == 39) {
//         rightPressed = true;
//     }
//     else if(event.keyCode == 37) {
//         leftPressed = true;
//     }
//     if(event.keyCode == 40) {
//     	downPressed = true;
//     }
//     else if(event.keyCode == 38) {
//     	upPressed = true;
//     }
// }

// function draw() {
//     ctx.clearRect(0, 0, 500,500);
//     if(rightPressed) {
//         X += 5;
//     }
//     else if(leftPressed) {
//         X -= 5;
//     }
//     if(downPressed) {
//         Y += 5;
//     }
//     else if(upPressed) {
//         Y -= 5;
//    
//     ctx.drawImage(img, X, Y);
//     requestAnimationFrame(draw);
// }

// function drawSegment(){
//     ctx.beginPath();
//     ctx.fillStyle = "#FF0000";
//     ctx.fillRect(20, 20, 15, 15);
//     ctx.stroke();
// }

// function moveSnake(){
//     //use keyboard arrows to move snake
// }

// drawSegment()
// //snake - store length in array? individual squares for segments and use if and loops when apple eaten
// //apples - in random places in the canvas
// //snake gets longer after apples eaten
// //keep track of how many apples are eaten and display score
// // restart game and snake

// classic Nokia snake game that I made to understand basic game development. Followed a tutorial, but implemented some aspects myself (such as css, setting up HTML canvas, making the "snake" be able to come from opposite side when touching a wall etc).

// Sound effect obtained from https://www.zapsplat.com