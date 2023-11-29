var player = 0;
var plrdead = false;
var posX = 1; 
var posY = 1;
var rotation = 0;
var speedDecrease = 4;
var repeat = false;
var angle_in_degrees = 0;
var x_relative = 0;
var y_relative = 0;
var interval_;
var cb1x = 0;
var cb1y = 0;
var cb1a = 0;
var cb2x = 0;
var cb2y = 0;
var cb2a = 0;
var enemy1Alive = false;
var enemy2Alive = false;
var enemy3Alive = false;
var enemy4Alive = false;
var enemy5Alive = false;
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

window.onload = () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
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




function fierCannons() {
    if (cbia == false) {
        canonBall1.style.display = "inline";
        canonBall2.style.display = "inline";
        cbia = true;
        cb1x = getMidPoint("player").x;
        cb1y = getMidPoint("player").y;
        cb1a = playerAngle + 90;
        cb2x = getMidPoint("player").x;
        cb2y = getMidPoint("player").y;
        cb2a = playerAngle - 90;
        canonBall1.style.top = cb1y + "px";
        canonBall1.style.left = cb1x + "px";
        canonBall2.style.top = cb2y + "px";
        canonBall2.style.left = cb1x + "px";

        interval_cb = setInterval(() => {
            cb1y += Math.sin(rad(cb1a + 180));
            cb1x += Math.cos(rad(cb1a));
            cb2y += Math.sin(rad(cb2a + 180));
            cb2x += Math.cos(rad(cb2a));
            canonBall1.style.top = cb1y + "px";
            canonBall1.style.left = cb1x + "px";
            canonBall2.style.top = cb2y + "px";
            canonBall2.style.left = cb2x + "px";
            repeated++;

            if (distanceBetween(cb1x, cb1y, getMidPoint("enemy1").x, getMidPoint("enemy1").y) < 60 || distanceBetween(cb2x, cb2y, getMidPoint("enemy1").x, getMidPoint("enemy1").y) < 60) {
                enemy1Alive = false
                enemy1.style.display = "none";
            }
            
            if (distanceBetween(cb1x, cb1y, getMidPoint("enemy2").x, getMidPoint("enemy2").y) < 60 || distanceBetween(cb2x, cb2y, getMidPoint("enemy2").x, getMidPoint("enemy2").y) < 60) {
                enemy2Alive = false
                enemy2.style.display = "none";
            }
            
            if (distanceBetween(cb1x, cb1y, getMidPoint("enemy3").x, getMidPoint("enemy3").y) < 60 || distanceBetween(cb2x, cb2y, getMidPoint("enemy3").x, getMidPoint("enemy3").y) < 60) {
                enemy3Alive = false
                enemy3.style.display = "none";
            }
            
            if (distanceBetween(cb1x, cb1y, getMidPoint("enemy4").x, getMidPoint("enemy4").y) < 60 || distanceBetween(cb2x, cb2y, getMidPoint("enemy4").x, getMidPoint("enemy4").y) < 60) {
                enemy4Alive = false
                enemy4.style.display = "none";
            }
            
            if (distanceBetween(cb1x, cb1y, getMidPoint("enemy5").x, getMidPoint("enemy5").y) < 60 || distanceBetween(cb2x, cb2y, getMidPoint("enemy5").x, getMidPoint("enemy5").y) < 60) {
                enemy5Alive = false
                enemy5.style.display = "none";
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
    if (enemy1Alive == false) {
        enemy1.style.display = "inline";
        enemy1Alive = true;
        enemy1.style.top = randint(0, windowHeight) + "px";
        enemy1.style.left = randint(0, windowWidth) + "px";
    }else if (enemy2Alive == false) {
        enemy2.style.display = "inline";
        enemy2Alive = true;
        enemy2.style.top = randint(0, windowHeight) + "px";
        enemy2.style.left = randint(0, windowWidth) + "px";
    }else if (enemy3Alive == false) {
        enemy3.style.display = "inline";
        enemy3Alive = true;
        enemy3.style.top = randint(0, windowHeight) + "px";
        enemy3.style.left = randint(0, windowWidth) + "px";
    }else if (enemy4Alive == false) {
        enemy4.style.display = "inline";
        enemy4Alive = true;
        enemy4.style.top = randint(0, windowHeight) + "px";
        enemy4.style.left = randint(0, windowWidth) + "px";
    }else if (enemy5Alive == false) {
        enemy5.style.display = "inline";
        enemy5Alive = true;
        enemy5.style.top = randint(0, windowHeight) + "px";
        enemy5.style.left = randint(0, windowWidth) + "px";
    }
}

function moveAi() {
    if (enemy1Alive == true) {
        enemy1.style.top = (+enemy1.style.top.slice(0,-2) + randint(-50, 50)) + "px";
        enemy1.style.left = (+enemy1.style.left.slice(0,-2) + randint(-50, 50)) + "px";
    }
    if (enemy2Alive == true) {
        enemy2.style.top = (+enemy2.style.top.slice(0,-2) + randint(-50, 50)) + "px";
        enemy2.style.left = (+enemy2.style.left.slice(0,-2) + randint(-50, 50)) + "px";
    }
    if (enemy3Alive == true) {
        enemy3.style.top = (+enemy3.style.top.slice(0,-2) + randint(-50, 50)) + "px";
        enemy3.style.left = (+enemy3.style.left.slice(0,-2) + randint(-50, 50)) + "px";
    }
    if (enemy4Alive == true) {
        enemy4.style.top = (+enemy4.style.top.slice(0,-2) + randint(-50, 50)) + "px";
        enemy4.style.left = (+enemy4.style.left.slice(0,-2) + randint(-50, 50)) + "px";
    }
    if (enemy5Alive == true) {
        enemy5.style.top = (+enemy5.style.top.slice(0,-2) + randint(-50, 50)) + "px";
        enemy5.style.left = (+enemy5.style.left.slice(0,-2) + randint(-50, 50)) + "px";
    }


}

function movement(x, y, angle, elementId) {
    var element = document.querySelector('#' + elementId);
    if (elementId == "player") {
        rotation = angle * -1 + 90;
        playerAngle = Math.abs(angle * -1);
    }
    if (checkOutOfBounds(elementId) == "x" || checkOutOfBounds(elementId) == "y") {
        handleOutOfBounds(checkOutOfBounds(elementId), element);
    } else {
        posX += x / speedDecrease;
        posY += y / speedDecrease;
        element.style.top = posY + "px";
        element.style.left = posX + "px";
        element.style.transform = "rotate(" + rotation + "deg)";    
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

function handleOutOfBounds(direction, element) {
    element.style.opacity = 0;
    if (direction == "x") {
        if (posX < 0) {
            posX = windowWidth - 10;
        } else {
            posX = 0;
        }
        element.style.left = posX + "px";
    } else {
        if (posY < -40) {
            posY = windowHeight -70;
        } else {
            posY = 0;
        }
        element.style.top = posY + "px";
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
        repeatT("player");
        if (is_it_in_the_circle()) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            background();
            joystick(coord.x, coord.y);
            Draw();
        }
    }
}

function repeatT(elementToBeRepeated) {
    interval_ = setInterval(() => {
        movement(x_relative, y_relative, angle_in_degrees, elementToBeRepeated);
    }, 10);
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
    clearInterval(interval_);
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
