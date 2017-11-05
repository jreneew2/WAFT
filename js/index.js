var scorep1 = 0;
var scorep2 = 0;
var initial = 18000;
var count = initial;
var counter;
var allowedToScore = false;
var timeforp1 = new Date();
var timeforp2 = new Date();
var numBouts = $('#boutInput').val();
var audio = new Audio("res/beep.mp3")

function timer() {
    if(count <= 0) {
        clearInterval(counter);
        return;
    }
    count--; 
    displayCount(count);
}


$(document).keypress(function(e) {
    if(e.which === 122) {
        clearInterval(counter);
        allowedToScore = true;
        counter = setInterval(timer, 10);
        $("#p1Light").css('background-color', 'gray'); 
        $("#p2Light").css('background-color', 'gray');   
    }
    if(e.which === 120) {
        allowedToScore = false;
        clearInterval(counter);
    }
    if(e.which === 099) {
        allowedToScore = false;
        clearInterval(counter);
        count = initial;
        displayCount(count); 
        scorep1 = 0;
        scorep2 = 0;
        document.getElementById("scorep1").innerHTML = "Score P1: " + scorep1;
        document.getElementById("scorep2").innerHTML = "Score P2: " + scorep2;
        $("#p1Light").css('background-color', 'gray');
        $("#p2Light").css('background-color', 'gray');   
    }
});

function displayCount(count) {
    var res = count / 100;
    document.getElementById("timer").innerHTML = res.toPrecision(count.toString().length) + " seconds";
}

$('#start').on('click', function() {
    clearInterval(counter);
    allowedToScore = true;
    counter = setInterval(timer, 10);
    $("#p1Light").css('background-color', 'gray'); 
    $("#p2Light").css('background-color', 'gray');               
});

$('#stop').on('click', function() {
    allowedToScore = false;
    clearInterval(counter);
});

$('#reset').on('click', function() {
    allowedToScore = false;
    clearInterval(counter);
    count = initial;
    displayCount(count); 
    scorep1 = 0;
    scorep2 = 0;
    document.getElementById("scorep1").innerHTML = "Score P1: " + scorep1;
    document.getElementById("scorep2").innerHTML = "Score P2: " + scorep2;
    $("#p1Light").css('background-color', 'gray');
    $("#p2Light").css('background-color', 'gray');                           
});

$('#boutInput').on('change', function() {
    numBouts = $('#boutInput').val();
    console.log(numBouts);
});

function checkForDoubleTouch(player, timeForPlayer) {
    if(player == "p1") {
        if(Math.abs(timeForPlayer - getTimeForp2()) < 100) {
            return true;
        }
    }
    if(player == "p2") {
        if(Math.abs(timeForPlayer - getTimeForp1()) < 100) {
            return true;
        }
    }
}

function getTimeForp2() {
    return timeforp2;
}

function getTimeForp1() {
    return timeforp1;
}

displayCount(initial);

var ws1 = new WebSocket("ws://10.42.0.38:5678/"),
messages1 = document.createElement('ul');
ws1.onmessage = function (event) {
    timeforp1 = Date.parse(String(event.data).substring(0, 27));
    console.log("timep1: " + timeforp1);    
    if(allowedToScore) {
        if(String(event.data).substr(27) == '1') {
            audio.play();
            if(checkForDoubleTouch("p1", timeforp1) == true) {
                scorep2 = scorep2 + 1;
                document.getElementById("scorep2").innerHTML = "Score P2: " + scorep2;                
            }
            scorep1 = scorep1 + 1;
            document.getElementById("scorep1").innerHTML = "Score P1: " + scorep1; 
            $("#p1Light").css('background-color', 'green');           
            if(scorep1 == numBouts) {
                winner = "p1";
                alert("Winner is player 1!");
            }
            allowedToScore = false;
            clearInterval(counter);
        }    
    }
};

var ws2 = new WebSocket("ws://10.42.0.38:5679/"),
messages2 = document.createElement('ul');
ws2.onmessage = function (event) {
    timeforp2 = Date.parse(String(event.data).substring(0, 27));
    console.log("timep2: " + timeforp2);
    if(allowedToScore) {
        if(String(event.data).substr(27) == '1') {
            audio.play();
            if(checkForDoubleTouch("p2", timeforp2) == true) {
                scorep1 = scorep1 + 1;
                document.getElementById("scorep1").innerHTML = "Score P1: " + scorep1;                
            }            
            scorep2 = scorep2 + 1;
            document.getElementById("scorep2").innerHTML = "Score P2: " + scorep2;
            $("#p2Light").css('background-color', 'red');                       
            if(scorep2 == numBouts) {
                winner = "p2";
                alert("Winner is player 2!");
            }
            allowedToScore = false;
            clearInterval(counter);
        }    
    }
};