var Enemy = 0;
var Plr = 0;
var HP = 3;
var SPD = 3;
var plrdead = false;
var posX = 0; 
var posY = 0;
var rotation = 0;


function Shoot() {
    l
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


function moveXP() {
if (posX >0) {
    posX = posX+1;
} else {
    posX = 0;
}
}

function moveYP() {
if (posY >0) {
    posY = posY+1;
} else {
    posY = 0;
}
}

function moveXM() {
if (posX >0) {
    posX = posX-1;
} else {
    posX = 0;
}
}
    
function moveYM() {
if (posY >0) {
    posY = posY-1;
} else {
    posY = 0;
}
}

function changeHP() {
HP = HP-1;
}

function reduceSPD() {
SPD = SPD-1;
}

while (HP >= 1) {
    break
}