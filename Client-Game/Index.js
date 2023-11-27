var Enemy = 0;
var Plr = 0;
var HP = 3;
var SPD = 3;
var plrdead = false;
var posX = 0; 
var posY = 0;
var rotation = 0;


function Shoot() {
    
}

function AI() {

}

function rPLUS() {
if (rotation < 360) {
    rotation = rotation+1;
}
else {
    rotation = 0;
}
}

function rMINUS() {
    if (rotation = 0) {
        rotation = rotation-1;
    }
    else {
        rotation = 0;
    } 
}


function moveX() {
posX = posX+1;
}

function moveY() {
posY = posY+1;
}

function changeHP() {
HP = HP-1;
}

function reduceSPD() {
SPD = SPD-1;
}

while (HP >= 1) {

}