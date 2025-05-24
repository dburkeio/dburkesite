var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth - 2;
ctx.canvas.height = window.innerHeight - 40;

var width = ctx.canvas.width;
var height = ctx.canvas.height;

var d;

var height_midpoint = ctx.canvas.height / 2;
var width_midpoint = ctx.canvas.width / 2;
var edge_padding = 20;
var myRadius = height_midpoint - 20;

var currentMin = 0;

function drawClock() {

    //draw outside circle
    ctx.beginPath();
    ctx.arc(width_midpoint, height_midpoint, myRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgb(100,255,0)";
    ctx.stroke();

    //draw inner circle where hands meet
    drawCircle(width_midpoint, height_midpoint, 6, "black", "black");

    var quarterColors = "rgb(0,0,255)";
    var smallFillColor = "rgb(0,255,255)";
    var smallEdgeColor = "rgb(0,0,255)";

    drawCircle(width_midpoint, edge_padding, 10, quarterColors, quarterColors); //12
    drawCircle(width_midpoint + myRadius, height_midpoint, 10, quarterColors, quarterColors); //3
    drawCircle(width_midpoint, height_midpoint + myRadius, 10, quarterColors, quarterColors); //6
    drawCircle(width_midpoint - myRadius, height_midpoint, 10, quarterColors, quarterColors); //9

    for (var i = 30; i < 360; i += 30) //draw hour markers
    {
        if (i % 90 != 0) //don't draw over 3,6,9,12
        {
            drawCircle(getTimeCoordinateX(myRadius, i), getTimeCoordinateY(myRadius, i), 5, smallEdgeColor, smallFillColor);
        }
    }

}

function drawCircle(center_x, center_y, radius, border_color, fill_color) {
    ctx.beginPath();
    ctx.arc(center_x, center_y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = border_color;
    ctx.stroke();
    ctx.fillStyle = fill_color;
    ctx.fill();
}

function drawMinute() {
    d = new Date();
    var minute = d.getMinutes();
    var radius = myRadius - 20;
    var degrees = 0;
    degrees = minute * 6; //times 6 because / by 60 and multiply by 360
    drawHour(minute);
    if (minute <= 15)
        degrees = 90 - degrees;
    else {
        degrees = 450 - degrees;
    }

    drawLine(radius, degrees);
}

function drawHour(minuteDegrees) {
    d = new Date();
    var hour = d.getHours();
    var radius = myRadius - 70;
    var degrees = 0;

    if (hour >= 12) {
        hour = hour - 12;
    }

    degrees = hour * 30 + (minuteDegrees / 2);

    if (degrees <= 15)
        degrees = 90 - degrees;
    else {
        degrees = 450 - degrees;
    }

    drawLine(radius, degrees);

}

function drawLine(radius, degrees) {
    var xspot, yspot;
    var radians = degrees * Math.PI / 180;


    xspot = width_midpoint + (radius * Math.cos(radians));
    xspot = round(xspot);
    yspot = height_midpoint - (radius * Math.sin(radians));
    yspot = round(yspot);

    ctx.strokeStyle = "#101";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(width_midpoint, height_midpoint);
    ctx.lineTo(xspot, yspot);
    ctx.stroke();
}

function getTimeCoordinateX(radius, degrees) {
    var radians = degrees * Math.PI / 180;
    var xspot = width_midpoint + (radius * Math.cos(radians));
    return (round(xspot));
}

function getTimeCoordinateY(radius, degrees) {
    var radians = degrees * Math.PI / 180;
    var yspot = height_midpoint - (radius * Math.sin(radians));
    return (round(yspot));
}

function debugPrint(x) {
    document.getElementById("stuff").innerHTML = x;
}

function round(x) {
    return Math.floor(x + 0.5);
}

var main = function() {
    ctx.clearRect(0, 0, width, height);

    drawClock();
    drawMinute();
    requestAnimationFrame(main);

}


var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

main();