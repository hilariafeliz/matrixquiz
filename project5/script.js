var c = document.createElement('canvas');
var ctx = c.getContext('2d');
var cw = c.width = 400;
var ch = c.height = 58;
document.body.appendChild(c);

ctx.font = 'normal 20px monospace';
ctx.textAlign = 'left';
ctx.textBaseline = 'top';
ctx.fillStyle = '#fff';
ctx.strokeStyle = 'rgba(0, 0, 0, .3)';
ctx.shadowColor = '#3f3';
var page = 0;

// ... multiple messages... //
var messagesArray = new Array(
    "",
    "",
    "████████████████████████████",
    "The Matrix Movie: Trivia Quiz",
    "████████████████████████████",
    "The matrix has you . . . .",
    "████████████████████████████",
    "Follow the white rabbit . . . .",
);

// ...cursor style... //
var cursor = new Array(
    "",
    "█",
    "",
    "█",
    "",
    "█",
    "",
    "█",
    "_",
    "",
    "\n",
    "█",
    "*Jack Rugile*",
    "█"

);



var messageArray = messagesArray[page].split('');
var totalMessages = messagesArray.length - 1;
var messageLength = messageArray.length;
var pointer = 0;
var typeTick = 0;
var typeTickMax = 0;

var minTick = 5;
var maxTick = 50;
var typeResetTick = 0;
var typeResetMax = 200;

var updateTypeTick = function () {


    if (pointer < messageLength) {
        if (typeTick < typeTickMax) {
            typeTick++;
        } else {
            typeTick = 0;
            pointer++;
            typeTickMax = Math.floor((Math.random() * maxTick) + minTick);;

        }
    } else {
        if (typeResetTick < typeResetMax) {
            typeResetTick++;
        } else {
            typeResetTick = 0;
            typeTick = 0;
            pointer = 0;

            // ...change message... //      
            if (page < totalMessages) page++;
            else page = 0;

            messageArray = messagesArray[page].split('');
            messageLength = messageArray.length;

        }
    }
}

var renderMessage = function () {

    var text;

    switch (cursor[page]) {

        case "\n":   // ... NO ANIMATION
            text = messageArray.slice(0, messageLength);
            break;


        default:
            text = messageArray.slice(0, pointer);
            text[pointer] = cursor[page];
            break;


    }



    ctx.shadowBlur = 9;
    ctx.fillText(text.join(''), 20, 20);
    ctx.shadowBlur = 0;

}

var renderLines = function () {
    ctx.beginPath();
    for (var i = 0; i < ch / 2; i += 1) {
        ctx.moveTo(0, (i * 2) + .5);
        ctx.lineTo(cw, (i * 2) + .5);
    }
    ctx.stroke();
}

var loop = function () {
    ctx.clearRect(0, 0, cw, ch);
    updateTypeTick();
    renderMessage();
    renderLines();
    setTimeout(loop, 2);
}

loop();












// Questions will be asked
const Questions = [{
    id: 0,
    q: "When was the original Matrix released?",
    a: [{ text: "1997", isCorrect: false },
    { text: "1998", isCorrect: false },
    { text: "1999", isCorrect: true },
    { text: "2000", isCorrect: false }
    ]

},
{
    id: 1,
    q: "Humanity is trapped inside a simulation known as the Matrix, but what century of our history does it simulate?",
    a: [{ text: "21st", isCorrect: false, isSelected: false },
    { text: "22nd", isCorrect: false },
    { text: "23rd", isCorrect: false },
    { text: "20th", isCorrect: true }
    ]

},
{
    id: 2,
    q: "Which of the following does Morpheus tell Neo will “show [him] how deep the rabbit hole goes”?",
    a: [{ text: "green", isCorrect: false },
    { text: "red", isCorrect: false },
    { text: "blue", isCorrect: true },
    { text: "purple", isCorrect: false }
    ]

}

]

// Set start
var start = true;

// Iterate
function iterate(id) {

    // Getting the result display section
    var result = document.getElementsByClassName("result");
    result[0].innerText = "";

    // Getting the question
    const question = document.getElementById("question");


    // Setting the question text
    question.innerText = Questions[id].q;

    // Getting the options
    const op1 = document.getElementById('op1');
    const op2 = document.getElementById('op2');
    const op3 = document.getElementById('op3');
    const op4 = document.getElementById('op4');


    // Providing option text
    op1.innerText = Questions[id].a[0].text;
    op2.innerText = Questions[id].a[1].text;
    op3.innerText = Questions[id].a[2].text;
    op4.innerText = Questions[id].a[3].text;

    // Providing the true or false value to the options
    op1.value = Questions[id].a[0].isCorrect;
    op2.value = Questions[id].a[1].isCorrect;
    op3.value = Questions[id].a[2].isCorrect;
    op4.value = Questions[id].a[3].isCorrect;

    var selected = "";

    // Show selection for op1
    op1.addEventListener("click", () => {
        selected = op1.value;
    })

    // Show selection for op2
    op2.addEventListener("click", () => {
        selected = op2.value;
    })

    // Show selection for op3
    op3.addEventListener("click", () => {
        selected = op3.value;
    })

    // Show selection for op4
    op4.addEventListener("click", () => {
        selected = op4.value;
    })
  
    // Grabbing the evaluate button
    const evaluate = document.getElementsByClassName("evaluate");

    // Evaluate method
    evaluate[0].addEventListener("click", () => {
        if (selected == "true") {
            result[0].innerHTML = "True";
            result[0].style.color = "red";
        } else {
            result[0].innerHTML = "False";
            result[0].style.color = "red";
        }
    })
}

if (start) {
    iterate("0");
}

// Next button and method
const next = document.getElementsByClassName('next')[0];
var id = 0;

next.addEventListener("click", () => {
    start = false;
    if (id < 2) {
        id++;
        iterate(id);
        console.log(id);
}


    /*reset button to first q
    const reset = document.getElementsByClassName('reset')[2];
    var id = 2;
    
    reset.addEventListener("click", () => {
    //start = false;
    if (id > 2) {
        id++;
        iterate(id);
        console.log(id);
    }*/

})
