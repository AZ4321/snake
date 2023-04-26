
//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;
var score = 0;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //draw board

    document.addEventListener("keyup", changeDirection);
    placeFood();

    setInterval(update, 1000/10); //100 mil/s update
}


function changeDirection(e)
{
    if (e.code == "ArrowUp" && velocityY != 1)
    {
        velocityX = 0;
        velocityY = -1;
    }

    else if (e.code == "ArrowDown" && velocityY != -1)
    {
        velocityX = 0;
        velocityY = 1;
    }

    if (e.code == "ArrowLeft" && velocityX != 1)
    {
        velocityX = -1;
        velocityY = 0;
    }

    if (e.code == "ArrowRight" && velocityX != -1)
    {
        velocityX = 1;
        velocityY = 0;
    }

    if (gameOver)
    {
        score = 0;
        snakeBody = [];
        gameOver = false;
        snakeX = blockSize * 5;
        snakeY = blockSize * 5;
        placeFood();

    }

}


function update() {

    if (gameOver){
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY)
    {
        snakeBody.push([foodX, foodY])
        placeFood();
        score += 1;
    }

    for (let i = snakeBody.length-1; i > 0; i--) { //from tail to head, moving each segment to the left
        snakeBody[i] = snakeBody[i-1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY] //setting the block before the head to be the head
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++)
    {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over condition
    if (snakeX < -1 || snakeY < -1 || snakeX > cols*blockSize-1|| snakeY > rows.blockSize-1)
    {
        gameOver = true;
        //alert("Game Over");
        
    }

    for (let i = 0; i < snakeBody.length; i++) //iterating over elements of the array
    {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1])
        {
            gameOver = true;
            //alert("Game Over");

        }

    }

    //score
    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(score, 5, 35);

    //gameover
    if (gameOver)
    {
        context.fillStyle = "red";
        context.font = "45px sans-serif";
        context.fillText("Game Over", 130, 180);
        
        context.fillStyle = "white";
        context.font = "20px sans-serif";
        context.fillText("Your score: " + score, 190, 210);

        context.fillStyle = "white";
        context.font = "20px sans-serif";
        context.fillText("Try again?", 205, 240);

        
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * cols) * blockSize;
}
