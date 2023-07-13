
const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
        
        const ballRadius = 10;
        let x = canvas.width / 2;
        let y = canvas.height - 30;

        let dx = 5;
        let dy = -5;

        let rightPressed = false;
        let leftPressed = false;


        const paddleHeight = 20;
        let paddleWidth = 150;
        
        let paddleX = (canvas.width - paddleWidth) / 2;

        const brickRowCount = 6;
        const brickColumnCount = 8;
        const brickWidth = 113;
        const brickHeight = 40;
        const brickPadding = 5;
        const brickOffsetTop = 30;
        const brickOffsetLeft = 30;

       let score = 0;

        let lives = 3;
        
        let levelSpeed = -5;

       const minPaddleWidth = 50
       
       var pause = function() {
        alert("GAME PAUSED, PRESS 'OK' TO CONTINUE")
       }
       
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.closePath();

    }

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
        
        /*
        function drawBricks() {
            for (let c = 0; c < brickColumnCount; c++) {
                for (let r = 0; r < brickRowCount; r++) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
                }
            }
        }
        */
    }


    function drawBricks() {
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status === 1) {
                    const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                    const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    if(bricks[c][r].isBomb ===1) {
                      ctx.fillStyle = "#ff0000";
                    }
                    else{
                      ctx.fillStyle = "#0095DD";
                    }
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }




    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();  
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();
        collisionDetection();
        x += dx;
        y += dy;
        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }

        if (y + dy < ballRadius) {
            dy = -dy;
        } else if (y + dy > canvas.height - ballRadius) {

            if (x > paddleX && x < paddleX + paddleWidth) {
              if(x < paddleX + (paddleWidth / 5)) {
                dx = -7.5;
                
              }
              else if(x < paddleX + (paddleWidth / 5) * 2) {
                dx = -5;
                
              }
              else if(x < paddleX + (paddleWidth / 5) * 3) {
                dx = 0;
                
              }
              else if(x < paddleX + (paddleWidth / 5) * 4) {
                dx = 5;
                
              }


              else if(x < paddleX + (paddleWidth / 5) * 5) {
                dx = 7.5;
                
              }

              dy = -dy; 
            } else {
                lives--;
                if (lives<1) {
                    alert("GAME OVER");
                    document.location.reload();
                } else {
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    dx = 2;
                    dy = -levelSpeed;
                    paddleX = (canvas.width - paddleWidth) / 2;
            
                }

            }


        }

        if (rightPressed) {
            paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
        } else if (leftPressed) {
            paddleX = Math.max(paddleX - 7, 0);
        }

        requestAnimationFrame(draw); 


    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
            if (e.key === "Right" || e.key === "ArrowRight") {
                rightPressed = true;
            } else if (e.key === "Left" || e.key === "ArrowLeft") {
                leftPressed = true;
            }
    }

    function keyUpHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            rightPressed = false;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            leftPressed = false;
        }
    }

    document.addEventListener("mousemove", mouseMoveHandler, false);
    function mouseMoveHandler(e) {
        const relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
        }
    }



function collisionDetection() {
  
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {
        // if a collision happens
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          if (b.isBomb ==1) {
            score--
          }
          else {
            score++
          }

          


          if (score === (brickRowCount * brickColumnCount)-2) {
            alert("YOU WIN, CONGRATULATIONS!");
            document.location.reload();
            
          }else{

            if(b.isBomb == 1){
              lives -= 1
            }
            
            
            // do some other stuff here
            /*
            if (score >= 5 && score < 10){
              paddleWidth = paddleWidth - 10;
            }
            else if (score >= 10){
              paddleWidth -= 10
            }
            */
           
            if (paddleWidth > minPaddleWidth) {
              paddleWidth -= 1
            }

           levelSpeed = dy
           dy+= 1
           /*if (dx < 0) {
            dx -= 1
           }
           /*else if(dx > 0){
            dx += 1
           }*/

          }

        }
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}


const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    let isBomb = 0;
    
    if(r==1 && c == 3 ) isBomb = 1
    bricks[c][r] = { x: 0, y: 0, status: 1, isBomb: isBomb };
  }
}
draw();