var scorep1 = 0;
var scorep2 = 0;
var initial = 18000;
var count = initial;
var counter;
var allowedToScore = false;
var numBouts = 1;
var winner = ""

function timer() {
    if(count <= 0) {
        clearInterval(counter);
        return;
    }
    count--;
    displayCount(count);
}

function displayCount(count) {
    var res = count / 100;
    document.getElementById("timer").innerHTML = res.toPrecision(count.toString().length) + " seconds";
}

$('#start').on('click', function() {
    clearInterval(counter);
    allowedToScore = true;
    counter = setInterval(timer, 10);
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
});

$('#boutInput').on('change', function() {
    numBouts = $('#boutInput').val();
    console.log(numBouts);
});

displayCount(initial);

var ws1 = new WebSocket("ws://10.42.0.38:5678/"),
messages1 = document.createElement('ul');
ws1.onmessage = function (event) {
var messages1 = document.getElementsByTagName('ul')[0],
    message1 = document.createElement('li'),
    content1 = document.createTextNode(event.data);
message1.appendChild(content1);
messages1.appendChild(message1);
if(allowedToScore == true) {
    if(String(event.data).substr(27) == '1') {
        scorep1 = scorep1 + 1;
        if(scorep1 == numBouts) {
            winner = "p1";
        }
        allowedToScore = false;
        document.getElementById("scorep1").innerHTML = "Score P1: " + scorep1;
        clearInterval(counter);
    }    
}
};

var ws2 = new WebSocket("ws://10.42.0.38:5679/"),
messages2 = document.createElement('ul');
ws2.onmessage = function (event) {
var messages2 = document.getElementsByTagName('ul')[0],
    message2 = document.createElement('li'),
    content2 = document.createTextNode(event.data);
message2.appendChild(content2);
messages2.appendChild(message2);
if(allowedToScore == true) {
    if(String(event.data).substr(27) == '1') {
        scorep2 = scorep2 + 1;
        if(scorep2 == numBouts) {
            winner = "p2";
        }
        allowedToScore = false;
        document.getElementById("scorep2").innerHTML = "Score P2: " + scorep2;
        clearInterval(counter);
    }    
}
};



document.body.appendChild(messages1);
document.body.appendChild(messages2);