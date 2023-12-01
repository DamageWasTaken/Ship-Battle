var player = 0;
var playerHittingIsland = false;
var plrdead = false;
var posX = 1; 
var posY = 1;
var rotation = 0;
var speedDecrease = 10;
var repeat = false;
var angle_in_degrees = 0;
var x_relative = 0;
var y_relative = 0;
var highscore = 0;
var interval_1;
var interval_2;
var interval_3;
var interval_4;
var interval_5;
var interval_F;
var enmeyHittingIslands = {
    "enemy1" : false,
    "enemy2" : false,
    "enemy3" : false,
    "enemy4" : false,
    "enemy5" : false,
}


var cannonBall1Properties = {
    x : 0,
    y : 0,
    angle : 0
};
var cannonBall2Properties = {
    x : 0,
    y : 0,
    angle : 0
};
var enemyState = {
    enemy1 : false,
    enemy2 : false,
    enemy3 : false,
    enemy4 : false,
    enemy5 : false
};
var playerAngle = 0;
var canonBall1;
var canonBall2;
var enemy1;
var enemy2;
var enemy3;
var enemy4;
var enemy5;
var interval_cb;
var repeated = 0;
var cbia = false;
var windowHeight;
var windowWidth;
var loopsStated = 0;
var timesLooped1 = 0;
var timesLooped2 = 0;
var timesLooped3 = 0;
var timesLooped4 = 0;
var timesLooped5 = 0;

window.onload = () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    posX = windowWidth / 2;
    posY = windowHeight / 2;
    player = document.getElementById("player");
    enemy1 = document.getElementById("enemy1");
    enemy2 = document.getElementById("enemy2");
    enemy3 = document.getElementById("enemy3");
    enemy4 = document.getElementById("enemy4");
    enemy5 = document.getElementById("enemy5");
    canonBall1 = document.getElementById("canonBall1");
    canonBall2 = document.getElementById("canonBall2");
    canonBall1.style.display = "none";
    canonBall2.style.display = "none";
    enemy1.style.display = "none";
    enemy2.style.display = "none";
    enemy3.style.display = "none";
    enemy4.style.display = "none";
    enemy5.style.display = "none";
    spawnAi();
    spawnAi();
    spawnAi();
    spawnAi();
    spawnAi();
    islandGenerator();
    console.log(document.getElementById("island0").src.split('/').filter(e => e).slice(-1)[0])
}   

function Highscore() {
    highscore += 100;
    document.getElementById("highscore").innerHTML = highscore
    document.getElementById("highscore2").value = highscore
}


function OpenPopUp() {
    var popup = document.getElementById("popup")
    popup.classList.toggle("show")
}

function rad(degrees) {
  var pi = Math.PI;
  return degrees * (pi/180);
}

function randint(min, max) {
    return Math.random() * (max - min) + min;
}

function distanceBetween(x1, y1, x2, y2) {
    return Math.sqrt(Math.abs((x1-x2)*(x1-x2)) + Math.abs((y1-y2)*(y1-y2)));
}

function islandGenerator() {
    for (let i = 0; i < 4; i++) {
        var currentIsland = document.getElementById("island" + i);
        currentIsland.src = "Assets/Island_" + Math.round(randint(1, 7)) + ".png";
        if (i == 0) {
            currentIsland.style.top = randint(0, windowHeight / 2 - currentIsland.offsetHeight) + "px";
            currentIsland.style.left = randint(0, windowWidth / 2 - currentIsland.offsetWidth) + "px";
        } else if (i == 1) {
            currentIsland.style.top = randint(0 , windowHeight / 2 - currentIsland.offsetHeight) + "px";
            currentIsland.style.left = randint(windowWidth / 2, windowWidth - currentIsland.offsetWidth) + "px";
        } else if (i == 2) {
            currentIsland.style.top = randint(windowHeight / 2, windowHeight - currentIsland.offsetHeight) + "px";
            currentIsland.style.left = randint(0, windowWidth / 2 - currentIsland.offsetWidth) + "px";
        } else if (i == 3) {
            currentIsland.style.top = randint(windowHeight / 2, windowHeight - currentIsland.offsetHeight) + "px";
            currentIsland.style.left = randint(windowWidth / 2, windowWidth - currentIsland.offsetWidth) + "px";
        }
        
    }
}


function fierCannons() {
    if (cbia == false) {
        canonBall1.style.display = "inline";
        canonBall2.style.display = "inline";
        cbia = true;
        cannonBall1Properties.x = getMidPoint("player").x;
        cannonBall1Properties.y = getMidPoint("player").y;
        cannonBall1Properties.angle = playerAngle + 90;
        cannonBall2Properties.x = getMidPoint("player").x;
        cannonBall2Properties.y = getMidPoint("player").y;
        cannonBall2Properties.angle = playerAngle - 90;
        canonBall1.style.top = cannonBall1Properties.y + "px";
        canonBall1.style.left = cannonBall1Properties.x + "px";
        canonBall2.style.top = cannonBall2Properties.y + "px";
        canonBall2.style.left = cannonBall1Properties.x + "px";
        moveAi();
        interval_cb = setInterval(() => {
            cannonBall1Properties.y += Math.sin(rad(cannonBall1Properties.angle + 180));
            cannonBall1Properties.x += Math.cos(rad(cannonBall1Properties.angle));
            cannonBall2Properties.y += Math.sin(rad(cannonBall2Properties.angle + 180));
            cannonBall2Properties.x += Math.cos(rad(cannonBall2Properties.angle));
            canonBall1.style.top = cannonBall1Properties.y + "px";
            canonBall1.style.left = cannonBall1Properties.x + "px";
            canonBall2.style.top = cannonBall2Properties.y + "px";
            canonBall2.style.left = cannonBall2Properties.x + "px";
            repeated++;

            if (distanceBetween(cannonBall1Properties.x, cannonBall1Properties.y, getMidPoint("enemy1").x, getMidPoint("enemy1").y) < 60 || distanceBetween(cannonBall2Properties.x, cannonBall2Properties.y, getMidPoint("enemy1").x, getMidPoint("enemy1").y) < 60) {
                enemyState.enemy1 = false;
                Highscore();
                enemy1.style.display = "none";
                spawnAi()
            }
            
            if (distanceBetween(cannonBall1Properties.x, cannonBall1Properties.y, getMidPoint("enemy2").x, getMidPoint("enemy2").y) < 60 || distanceBetween(cannonBall2Properties.x, cannonBall2Properties.y, getMidPoint("enemy2").x, getMidPoint("enemy2").y) < 60) {
                enemyState.enemy2 = false;
                Highscore();
                enemy2.style.display = "none";
                spawnAi()
            }
            
            if (distanceBetween(cannonBall1Properties.x, cannonBall1Properties.y, getMidPoint("enemy3").x, getMidPoint("enemy3").y) < 60 || distanceBetween(cannonBall2Properties.x, cannonBall2Properties.y, getMidPoint("enemy3").x, getMidPoint("enemy3").y) < 60) {
                enemyState.enemy3 = false;
                Highscore();
                enemy3.style.display = "none";
                spawnAi()
            }
            
            if (distanceBetween(cannonBall1Properties.x, cannonBall1Properties.y, getMidPoint("enemy4").x, getMidPoint("enemy4").y) < 60 || distanceBetween(cannonBall2Properties.x, cannonBall2Properties.y, getMidPoint("enemy4").x, getMidPoint("enemy4").y) < 60) {
                enemyState.enemy4 = false;
                Highscore();
                enemy4.style.display = "none";
                spawnAi()
            }
            
            if (distanceBetween(cannonBall1Properties.x, cannonBall1Properties.y, getMidPoint("enemy5").x, getMidPoint("enemy5").y) < 60 || distanceBetween(cannonBall2Properties.x, cannonBall2Properties.y, getMidPoint("enemy5").x, getMidPoint("enemy5").y) < 60) {
                enemyState.enemy5 = false;
                Highscore();
                enemy5.style.display = "none";
                spawnAi()
            }
            if (repeated == 200) {
                cbia = false;
                repeated = 0;
                canonBall1.style.display = "none";
                canonBall2.style.display = "none";
                clearInterval(interval_cb);
            }
        }, 2);
    }

}

function spawnAi() {
    if (enemyState.enemy1 == false) {
        enemy1.style.display = "inline";
        enemyState.enemy1 = true;
        enemy1.style.top = randint(0, windowHeight) + "px";
        enemy1.style.left = randint(0, windowWidth) + "px";
    }else if (enemyState.enemy2 == false) {
        enemy2.style.display = "inline";
        enemyState.enemy2 = true;
        enemy2.style.top = randint(0, windowHeight) + "px";
        enemy2.style.left = randint(0, windowWidth) + "px";
    }else if (enemyState.enemy3 == false) {
        enemy3.style.display = "inline";
        enemyState.enemy3 = true;
        enemy3.style.top = randint(0, windowHeight) + "px";
        enemy3.style.left = randint(0, windowWidth) + "px";
    }else if (enemyState.enemy4 == false) {
        enemy4.style.display = "inline";
        enemyState.enemy4 = true;
        enemy4.style.top = randint(0, windowHeight) + "px";
        enemy4.style.left = randint(0, windowWidth) + "px";
    }else if (enemyState.enemy5 == false) {
        enemy5.style.display = "inline";
        enemyState.enemy5 = true;
        enemy5.style.top = randint(0, windowHeight) + "px";
        enemy5.style.left = randint(0, windowWidth) + "px";
    }
}

function moveAi() {
    var new_angle;

    if (enemyState.enemy1 == true) {

        new_angle = randint(1, 360);
        console.log("----------------------------------------------------");
        console.log(new_angle);
        enemy1.style.transform = "rotate(" + new_angle + "deg)";
        
        console.log(Math.cos(rad(new_angle)));
        console.log(Math.sin(rad(new_angle + 180)));

        
        repeatT("enemy1", 100, Math.cos(rad(new_angle)), Math.sin(rad(new_angle + 180)), new_angle);
    }

    if (enemyState.enemy2 == true) {

        new_angle = randint(1, 360);
        console.log("----------------------------------------------------");
        console.log(new_angle);
        enemy2.style.transform = "rotate(" + new_angle + "deg)";
        
        console.log(Math.cos(rad(new_angle)));
        console.log(Math.sin(rad(new_angle + 180)));

        
        repeatT("enemy2", 100, Math.cos(rad(new_angle)), Math.sin(rad(new_angle + 180)), new_angle);
    }
    if (enemyState.enemy3 == true) {

        new_angle = randint(1, 360);
        console.log("----------------------------------------------------");
        console.log(new_angle);
        enemy3.style.transform = "rotate(" + new_angle + "deg)";
        
        console.log(Math.cos(rad(new_angle)));
        console.log(Math.sin(rad(new_angle + 180)));

        
        repeatT("enemy3", 100, Math.cos(rad(new_angle)), Math.sin(rad(new_angle + 180)), new_angle);
    }
    if (enemyState.enemy4 == true) {

        new_angle = randint(1, 360);
        console.log("----------------------------------------------------");
        console.log(new_angle);
        enemy4.style.transform = "rotate(" + new_angle + "deg)";
        
        console.log(Math.cos(rad(new_angle)));
        console.log(Math.sin(rad(new_angle + 180)));

        
        repeatT("enemy4", 100, Math.cos(rad(new_angle)), Math.sin(rad(new_angle + 180)), new_angle);
    }
    if (enemyState.enemy5 == true) {

        new_angle = randint(1, 360);
        console.log("----------------------------------------------------");
        console.log(new_angle);
        enemy5.style.transform = "rotate(" + new_angle + "deg)";
        
        console.log(Math.cos(rad(new_angle)));
        console.log(Math.sin(rad(new_angle + 180)));

        
        repeatT("enemy5", 100, Math.cos(rad(new_angle)), Math.sin(rad(new_angle + 180)), new_angle);
    }


}


function movement(x, y, angle, elementId) {
    var element = document.querySelector('#' + elementId);
    tempAngle = angle * -1 + 90;
    if (elementId == "player") {
        rotation = angle * -1 + 90;
        playerAngle = Math.abs(angle * -1);
    }
    if (checkOutOfBounds(elementId) == "x" || checkOutOfBounds(elementId) == "y") {
        handleOutOfBounds(checkOutOfBounds(elementId), element, getMidPoint(elementId).x, getMidPoint(elementId).y);
    } else {
        console.log(enmeyHittingIslands)
        if (elementId == "player") {
            if (playerHittingIsland == false) {
                posX += x / speedDecrease;
                posY += y / speedDecrease;
            } else {
                posX -=x / speedDecrease*10;
                posY -= y / speedDecrease*10;
            }
            element.style.top = posY + "px";
            element.style.left = posX + "px";
            element.style.transform = "rotate(" + rotation + "deg)";
        } else if (elementId == "enemy1" || elementId == "enemy2" || elementId == "enemy3" || elementId == "enemy4" || elementId == "enemy5") {
            if (enmeyHittingIslands.elementId == false) {   
                x = +element.style.left.slice(0, -2) + x;
                y = +element.style.top.slice(0, -2) + y;
            } else if (enmeyHittingIslands.elementId == true) {
                
                x = +element.style.left.slice(0, -2) - x*10;
                y = +element.style.top.slice(0, -2) - y*10;
            }
            element.style.top = y + "px";
            element.style.left = x + "px";
            element.style.transform = "rotate(" + angle + 90 + "deg)";
            
        }

        
        var disToIslands = [distanceBetween(getMidPoint(elementId).x, getMidPoint(elementId).y, getMidPoint("island0").x, getMidPoint("island0").y), distanceBetween(getMidPoint(elementId).x, getMidPoint(elementId).y, getMidPoint("island1").x, getMidPoint("island1").y), distanceBetween(getMidPoint(elementId).x, getMidPoint(elementId).y, getMidPoint("island2").x, getMidPoint("island2").y), distanceBetween(getMidPoint(elementId).x, getMidPoint(elementId).y, getMidPoint("island3").x, getMidPoint("island3").y)]
        var tetIsland;
        var tetIslandJNr;


        if (disToIslands[0] < disToIslands[1] && disToIslands[0] < disToIslands[2] && disToIslands[0] < disToIslands[3]) {
            tetIsland = "island0";
            tetIslandJNr = 0;
        } else if (disToIslands[1] < disToIslands[0] && disToIslands[1] < disToIslands[2] && disToIslands[1] < disToIslands[3]) {
            tetIsland = "island1";
            tetIslandJNr = 1;
        } else if (disToIslands[2] < disToIslands[0] && disToIslands[2] < disToIslands[1] && disToIslands[2] < disToIslands[3]) {
            tetIsland = "island2";
            tetIslandJNr = 2;
        } else if (disToIslands[3] < disToIslands[0] && disToIslands[3] < disToIslands[2] && disToIslands[3] < disToIslands[1]) {
            tetIsland = "island3";
            tetIslandJNr = 3;
        }

        if (document.getElementById(tetIsland).src.split('/').filter(e => e).slice(-1)[0] == "Island_1.png") {
            if (distanceBetween(getMidPoint(elementId).x, getMidPoint(elementId).y, getMidPoint(tetIsland).x - (document.getElementById(tetIsland).offsetWidth / 4), getMidPoint(tetIsland).y) < 50 || distanceBetween(getMidPoint(elementId).x, getMidPoint(elementId).y, getMidPoint(tetIsland).x + (document.getElementById(tetIsland).offsetWidth / 4), getMidPoint(tetIsland).y) < 50) {
                if (elementId == "player") {
                    console.log("Hit");
                    playerHittingIsland = true;
                } else if (elementId == "enemy1" || elementId == "enemy2" || elementId == "enemy3" || elementId == "enemy4" || elementId == "enemy5") {
                    enmeyHittingIslands.elementId = true;
                }
            } else {
                if (elementId == "player") {
                console.log("chill dude");
                playerHittingIsland = false;
                } else if (elementId == "enemy1" || elementId == "enemy2" || elementId == "enemy3" || elementId == "enemy4" || elementId == "enemy5") {
                    enmeyHittingIslands.elementId = false;
                    console.log(enmeyHittingIslands)
                }
            }
        } else if (document.getElementById(tetIsland).src.split('/').filter(e => e).slice(-1)[0] == "Island_2.png") {
            if (distanceBetween(getMidPoint(elementId).x, getMidPoint(elementId).y, getMidPoint(tetIsland).x - (document.getElementById(tetIsland).offsetWidth / 4), getMidPoint(tetIsland).y - (document.getElementById(tetIsland).offsetHeight / 4)) < 40 || distanceBetween(getMidPoint(elementId).x, getMidPoint(elementId).y, getMidPoint(tetIsland).x - (document.getElementById(tetIsland).offsetWidth / 4), getMidPoint(tetIsland).y + (document.getElementById(tetIsland).offsetHeight / 4)) < 40 || distanceBetween(getMidPoint(elementId).x, getMidPoint(elementId).y, getMidPoint(tetIsland).x + (document.getElementById(tetIsland).offsetWidth / 4), getMidPoint(tetIsland).y + (document.getElementById(tetIsland).offsetHeight / 4)) < 40) {
                if (elementId == "player") {
                    console.log("Hit");
                    playerHittingIsland = true;
                } else if (elementId == "enemy1" || elementId == "enemy2" || elementId == "enemy3" || elementId == "enemy4" || elementId == "enemy5") {
                    enmeyHittingIslands.elementId = true;
                }
            } else {
                if (elementId == "player") {
                    console.log("chill dude");
                    playerHittingIsland = false;
                } else if (elementId == "enemy1" || elementId == "enemy2" || elementId == "enemy3" || elementId == "enemy4" || elementId == "enemy5") {
                    enmeyHittingIslands.elementId = false;
                }
            }
        } else if (document.getElementById(tetIsland).src.split('/').filter(e => e).slice(-1)[0] == "Island_3.png") {
            if (distanceBetween(getMidPoint(elementId).x, getMidPoint(elementId).y, getMidPoint(tetIsland).x - (document.getElementById(tetIsland).offsetWidth / 4), getMidPoint(tetIsland).y + (document.getElementById(tetIsland).offsetHeight / 4)) < 40 || distanceBetween(getMidPoint(elementId).x, getMidPoint(elementId).y, getMidPoint(tetIsland).x + (document.getElementById(tetIsland).offsetWidth / 4), getMidPoint(tetIsland).y - (document.getElementById(tetIsland).offsetHeight / 4)) < 40) {
                if (elementId == "player") {
                    console.log("Hit");
                    playerHittingIsland = true;
                } else if (elementId == "enemy1" || elementId == "enemy2" || elementId == "enemy3" || elementId == "enemy4" || elementId == "enemy5") {
                    enmeyHittingIslands.elementId = true;
                }
            } else {
                if (elementId == "player") {
                    console.log("chill dude");
                    playerHittingIsland = false;
                } else if (elementId == "enemy1" || elementId == "enemy2" || elementId == "enemy3" || elementId == "enemy4" || elementId == "enemy5") {
                    enmeyHittingIslands.elementId = false;
                }
            }
        } else if (document.getElementById(tetIsland).src.split('/').filter(e => e).slice(-1)[0] == "Island_4.png") {
            if (disToIslands[tetIslandJNr] < 90) {
                if (elementId == "player") {
                    console.log("Hit");
                    playerHittingIsland = true;
                } else if (elementId == "enemy1" || elementId == "enemy2" || elementId == "enemy3" || elementId == "enemy4" || elementId == "enemy5") {
                    enmeyHittingIslands.elementId = true;
                }
            } else {
                if (elementId == "player") {
                    console.log("chill dude");
                    playerHittingIsland = false;
                } else if (elementId == "enemy1" || elementId == "enemy2" || elementId == "enemy3" || elementId == "enemy4" || elementId == "enemy5") {
                    enmeyHittingIslands.elementId = false;
                }
            }
        } else if (document.getElementById(tetIsland).src.split('/').filter(e => e).slice(-1)[0] == "Island_5.png") {
            if (disToIslands[tetIslandJNr] < 80) {
                if (elementId == "player") {
                    console.log("Hit");
                    playerHittingIsland = true;
                } else if (elementId == "enemy1" || elementId == "enemy2" || elementId == "enemy3" || elementId == "enemy4" || elementId == "enemy5") {
                    enmeyHittingIslands.elementId = true;
                }
            } else {
                if (elementId == "player") {
                    console.log("chill dude");
                    playerHittingIsland = false;
                } else if (elementId == "enemy1" || elementId == "enemy2" || elementId == "enemy3" || elementId == "enemy4" || elementId == "enemy5") {
                    enmeyHittingIslands.elementId = false;
                }
            }
        } else if (document.getElementById(tetIsland).src.split('/').filter(e => e).slice(-1)[0] == "Island_6.png") {
            if (distanceBetween(getMidPoint(elementId).x, getMidPoint(elementId).y, getMidPoint(tetIsland).x - (document.getElementById(tetIsland).offsetWidth / 4), getMidPoint(tetIsland).y) < 50 || distanceBetween(getMidPoint(elementId).x, getMidPoint(elementId).y, getMidPoint(tetIsland).x + (document.getElementById(tetIsland).offsetWidth / 4), getMidPoint(tetIsland).y) < 50) {
                if (elementId == "player") {
                    console.log("Hit");
                    playerHittingIsland = true;
                } else if (elementId == "enemy1" || elementId == "enemy2" || elementId == "enemy3" || elementId == "enemy4" || elementId == "enemy5") {
                    enmeyHittingIslands.elementId = true;
                }
            } else {
                if (elementId == "player") {
                    console.log("chill dude");
                    playerHittingIsland = false;
                } else if (elementId == "enemy1" || elementId == "enemy2" || elementId == "enemy3" || elementId == "enemy4" || elementId == "enemy5") {
                    enmeyHittingIslands.elementId = false;
                }
            }
        } else if (document.getElementById(tetIsland).src.split('/').filter(e => e).slice(-1)[0] == "Island_7.png") {
            if (disToIslands[tetIslandJNr] < 80 || distanceBetween(getMidPoint(elementId).x, getMidPoint(elementId).y, getMidPoint(tetIsland).x, getMidPoint(tetIsland).y + (document.getElementById(tetIsland).offsetHeight / 4)) < 80 || distanceBetween(getMidPoint(elementId).x, getMidPoint(elementId).y, getMidPoint(tetIsland).x, getMidPoint(tetIsland).y - (document.getElementById(tetIsland).offsetHeight / 4)) < 80) {
                if (elementId == "player") {
                    console.log("Hit");
                    playerHittingIsland = true;
                } else if (elementId == "enemy1" || elementId == "enemy2" || elementId == "enemy3" || elementId == "enemy4" || elementId == "enemy5") {
                    enmeyHittingIslands.elementId = true;
                }
            } else {
                if (elementId == "player") {
                    console.log("chill dude");
                    playerHittingIsland = false;
                } else if (elementId == "enemy1" || elementId == "enemy2" || elementId == "enemy3" || elementId == "enemy4" || elementId == "enemy5") {
                    enmeyHittingIslands.elementId = false;
                }
            }

        }
    } 
}

function getMidPoint(elementId) {
    var element = document.querySelector('#' + elementId);
    var elementMidY = window.scrollY + element.getBoundingClientRect().top + element.offsetHeight / 2;
    var elementMidX = window.scrollX + element.getBoundingClientRect().left + element.offsetWidth / 2;
    return {
        'x':elementMidX,
        'y':elementMidY
    }
}

function handleOutOfBounds(direction, element, x, y) {
    element.style.opacity = 0;
    console.log("OutOfBounds")
    console.log(element)
    if (direction == "x") {
        if (x < 0) {
            x = windowWidth - 20;
            console.log(1)
        } else {
            x = 0;
            console.log(2)
        }
        element.style.left = x + "px";
        if (element.id == "player") {
            posX = x
        }
    } else {
        if (posY < 0) {
            y = windowHeight - 30;
            console.log(3)
        } else {
            y = -20;
            console.log(4)
        }
        element.style.top = y + "px";
        if (element.id == "player") {
            posY = y
        }
    }
    element.style.opacity = 1;
}

function checkOutOfBounds(element) {
    var midPoint = getMidPoint(element);
    if (midPoint.x > windowWidth || midPoint.x < 0 ) {
        return "x";
    } else if (midPoint.y > windowHeight || midPoint.y < 0) {
        return "y";
    } else {
        return false;
    }
}

var canvas, ctx;

window.addEventListener('load', () => {

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');          
    resize(); 

    document.addEventListener('mousedown', startDrawing);
    document.addEventListener('mouseup', stopDrawing);
    document.addEventListener('mousemove', Draw);

    document.addEventListener('touchstart', startDrawing);
    document.addEventListener('touchend', stopDrawing);
    document.addEventListener('touchcancel', stopDrawing);
    document.addEventListener('touchmove', Draw);
    window.addEventListener('resize', resize);

    document.getElementById("x_coordinate").innerText = 0;
    document.getElementById("y_coordinate").innerText = 0;
    document.getElementById("speed").innerText = 0;
    document.getElementById("angle").innerText = 0;
});

var width, height, radius, x_orig, y_orig;

function resize() {
    width = 90;
    radius = 20;
    height = width;
    canvas.width = width;
    canvas.height = height;
    background();
    joystick(width / 2, height / 2);
}

function background() {
    x_orig = width / 2;
    y_orig = height / 2;
    ctx.beginPath();
    ctx.arc(x_orig, y_orig, radius + 20, 0, Math.PI * 2, true);
    ctx.fillStyle = '#ECE5E5';
    ctx.fill();
}

function joystick(width, height) {
    ctx.beginPath();
    ctx.arc(width, height, radius, 0, Math.PI * 2, true);
    ctx.fillStyle = '#383838';
    ctx.fill();
    ctx.strokeStyle = '#565656';
    ctx.lineWidth = 6;
    ctx.stroke();
}

let coord = { x: 0, y: 0 };
let paint = false;

function getPosition(event) {
    var mouse_x = event.clientX || event.touches[0].clientX;
    var mouse_y = event.clientY || event.touches[0].clientY;
    var wy = window.scrollY + document.querySelector('#canvas').getBoundingClientRect().top; // Y
    var wx = window.scrollX + document.querySelector('#canvas').getBoundingClientRect().left; // X
    coord.y = mouse_y - wy;
    coord.x = mouse_x - wx;
}

function is_it_in_the_circle() {
    var current_radius = Math.sqrt(Math.pow(coord.x - x_orig, 2) + Math.pow(coord.y - y_orig, 2));
    if (radius >= current_radius) {
        return true;
    } else {
        return false;
    }
}


function startDrawing(event) {
    var mouse_x = event.clientX || event.touches[0].clientX;
    var mouse_y = event.clientY || event.touches[0].clientY;
    var wy = y_orig +  window.scrollY + document.querySelector('#canvas').getBoundingClientRect().top; // Y
    var wx = x_orig + window.scrollX + document.querySelector('#canvas').getBoundingClientRect().left; // X
    relativeMouseY = mouse_y - wy;
    relativeMouseX = mouse_x - wx;
    if (relativeMouseY < -40 || relativeMouseY > 40 || relativeMouseX < -40 || relativeMouseX > 40) {
        return;
    } else {
        paint = true;
        getPosition(event);
        repeatT("player", "forever");
        if (is_it_in_the_circle()) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            background();
            joystick(coord.x, coord.y);
            Draw();
        }
    }
}

function repeatT(elementToBeRepeated, repeatAmount, x, y, angle) {
    if (repeatAmount == "forever") {
        interval_F = setInterval(() => {
            movement(x_relative, y_relative, angle_in_degrees, elementToBeRepeated);
        }, 10);
    } else {
        loopsStated++;
        var currentInterval = loopsStated;
        if (currentInterval == 1) {
            interval_1 = setInterval(() => {
                movement(x, y, angle, elementToBeRepeated);
                timesLooped1++;
                if (timesLooped1 == repeatAmount) {
                    timesLooped1 = 0;
                    clearInterval(interval_1);
                    loopsStated--;
                }
            }, 10);
        } else if (currentInterval == 2) {
            interval_2 = setInterval(() => {
                movement(x, y, angle, elementToBeRepeated);
                timesLooped2++;
                if (timesLooped2 == repeatAmount) {
                    timesLooped2 = 0;
                    clearInterval(interval_2);
                    loopsStated--;
                }
            }, 10);
        } else if (currentInterval == 3) {
            interval_3 = setInterval(() => {
                movement(x, y, angle, elementToBeRepeated);
                timesLooped3++;
                if (timesLooped3 == repeatAmount) {
                    timesLooped3 = 0;
                    clearInterval(interval_3);  
                    loopsStated--;
                }
            }, 10);
        } else if (currentInterval == 4) {
            interval_4 = setInterval(() => {
                movement(x, y, angle, elementToBeRepeated);
                timesLooped4++
                if (timesLooped4 == repeatAmount) {
                    timesLooped4 = 0;
                    clearInterval(interval_4);
                    loopsStated--;
                }
            }, 10);
        } else if (currentInterval == 5) {
            interval_5 = setInterval(() => {
                movement(x, y, angle, elementToBeRepeated);
                timesLooped5++;
                if (timesLooped5 == repeatAmount) {
                    timesLooped5 = 0;
                    clearInterval(interval_5);
                    loopsStated--;
                }
            }, 10);
        }
    }
            
}


function stopDrawing() {
    paint = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background();
    joystick(width / 2, height / 2);
    document.getElementById("x_coordinate").innerText = 0;
    document.getElementById("y_coordinate").innerText = 0;
    document.getElementById("speed").innerText = 0;
    document.getElementById("angle").innerText = 0;
    clearInterval(interval_F);
}

function Draw(event) {

    if (paint) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background();
        var x, y, speed;
        var angle = Math.atan2((coord.y - y_orig), (coord.x - x_orig));

        if (Math.sign(angle) == -1) {
            angle_in_degrees = Math.round(-angle * 180 / Math.PI);
        }
        else {
            angle_in_degrees =Math.round( 360 - angle * 180 / Math.PI);
        }


        if (is_it_in_the_circle()) {
            joystick(coord.x, coord.y);
            x = coord.x;
            y = coord.y;
        }
        else {
            x = radius * Math.cos(angle) + x_orig;
            y = radius * Math.sin(angle) + y_orig;
            joystick(x, y);
        }

    
        getPosition(event);

        var speed =  Math.round(100 * Math.sqrt(Math.pow(x - x_orig, 2) + Math.pow(y - y_orig, 2)) / radius);

        x_relative = Math.round(x - x_orig);
        y_relative = Math.round(y - y_orig);
        

        document.getElementById("x_coordinate").innerText =  x_relative;
        document.getElementById("y_coordinate").innerText = y_relative ;
        document.getElementById("speed").innerText = speed;
        document.getElementById("angle").innerText = angle_in_degrees;
    }
} 
