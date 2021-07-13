//Define variabnles and initialize objects
var experimentActive = false;

var circle = document.getElementById("circle");
var area = document.getElementById("area");
var descriptionWrapper = document.getElementById("description-wrapper");
var startStudyBtn = document.getElementById("startStudy");

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var BB = canvas.getBoundingClientRect();

const CURRENT_DIFFICULTY = {
    easy: {
       color: "black"
    },
    middle: {
        color: "blue"
    },
    medium: {
        color: "orange"
    },
    hard: {
        color: "red"
    },
    extreme: {
        color: "purple"
    }
};

var timer = 0;
var startZeit;
var trial = 0;

var timesArr = [
  new Array(),
  new Array(),
  new Array(),
  new Array(),
  new Array(),
];
var runs = 0;
var totalRuns = 0;

//Safe the clicking errors for each iteration of the different circle sizes
var click_errors = [0, 0, 0, 0, 0];

//Initialize all objects
function initStudy() {
  //Enter fullscreen mode to reduce distractions with same colored icons as the circle
  openFullscreen(document.documentElement);
  //Init our study with 0 runs
  runs = 0;
  //The clicking errors made by the user
  click_errors = [0, 0, 0, 0, 0];
  experimentActive = true;
  //The times array to store all of our times for each iteration
  timesArr = [new Array(), new Array(), new Array(), new Array(), new Array()];

  //Hide buttons and other elements
  startStudyBtn.setAttribute("class", "is--hidden button");

  document.getElementById("result").setAttribute("class", "is--hidden");
  descriptionWrapper.setAttribute("class", "is--hidden");

  /** Start our study after 6 seconds
   * because the fullscreen overlay might block the appearance of our circle
   */
  startTimer();
  setTimeout(() => {
    circle.setAttribute("class", "");
    startStudy();
    drawCanvas();
  }, 6000);
}

//Start our study
function startStudy() {
  //Clear all inputs before proceeding
  clearInputs();
  startZeit = new Date().getTime();
  runs = runs + 1;

  var ball = circle;

  //Layout witdh of the circle
  var size = 0;
  size = ball.offsetWidth;

  // Runs - each run 10 clicks
  if (runs <= 1) {
    size = 50;
    setSize(50);
  } else if (runs <= 2) {
    size = 30;
    setSize(30);
  } else if (runs <= 3) {
    size = 20;
    setSize(20);
  } else if (runs <= 4) {
    size = 10;
    setSize(10);
  } else {
    size = 5;
    setSize(5);
  }

  /** Calculate a random position for our circle
   *  between the left hand side to the left side of the vertical scrollbar
   *  and the elements height
   */
  var x = 0;
  var y = 0;
  do {
    x = Math.floor(Math.random() * (document.body.offsetWidth - size));
    y = Math.floor(Math.random() * (document.body.offsetHeight - size));
  } while (
    checkDistance(ball.offsetLeft, ball.offsetTop, size, x, y, size) == false
  );

  //Position circle absolute
  positionCircle(x, y);
}

//Distance between our circles
function checkDistance(oldX, oldY, oldsize, newX, newY, newsize) {
  var minimal = oldsize + 30 + newsize;
  var diffX = oldX - newX;
  var diffY = oldY - newY;
  var distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  return distance >= minimal;
}

//Position our ball absolute
function positionCircle(posX, posY) {
  var ball = circle;
  ball.style.position = "absolute";
  ball.style.left = posX + "px";
  ball.style.top = posY + "px";
}

//Sets the size - width, height - of our circle element
function setSize(size) {
  var ball = circle;
  ball.style.width = size + "px";
  ball.style.height = size + "px";
}


function stopExperiment_2() {
    //closeFullscreen();
    //Evaluation for every size of the circle
    for (var size = 0; size < 5; ++size) {
      //Average time
      var averageTime = 0.0;
      for (var i = 0; i < timesArr[size].length; ++i) {
        averageTime += timesArr[size][i];
      }
      averageTime = Math.round(averageTime / timesArr[size].length);

      // 2) inserts them in our input fields which only we - the authors - see
      document.getElementById("input__" + size).value =
        "Größe: " +
        getsize(size) +
        "px<br/>click_errors: " +
        click_errors[size] +
        "<br/>Durchschnittszeit: " +
        averageTime;
    }
     // 3) convert canvas to img and
     var dataURL = canvas.toDataURL("image/png");
     document.getElementById("inp_img").value = dataURL;
  }

  function stopExperiment_3() {
    //closeFullscreen();
    //Evaluation for every size of the circle
    for (var size = 0; size < 5; ++size) {
      //Average time
      var averageTime = 0.0;
      for (var i = 0; i < timesArr[size].length; ++i) {
        averageTime += timesArr[size][i];
      }
      averageTime = Math.round(averageTime / timesArr[size].length);

      // 2) inserts them in our input fields which only we - the authors - see
      document.getElementById("input___" + size).value =
        "Größe: " +
        getsize(size) +
        "px<br/>click_errors: " +
        click_errors[size] +
        "<br/>Durchschnittszeit: " +
        averageTime;
    }
  }

//Stop experiment
function stopExperiment() {
  closeFullscreen();
  //Evaluation for every size of the circle
  for (var size = 0; size < 5; ++size) {
    //Average time
    var averageTime = 0.0;
    for (var i = 0; i < timesArr[size].length; ++i) {
      averageTime += timesArr[size][i];
    }
    averageTime = Math.round(averageTime / timesArr[size].length);

    //sets the different values for all of our sizes and
    // 1) inserts them into our "results" wrapper element which the user see
    document.getElementById("size_" + size).innerHTML =
      "Größe: " +
      getsize(size) +
      "px<br/>Fehler: " +
      click_errors[size] +
      "<br/>Durchschnittszeit: " +
      averageTime +
      " ms";
    // 2) inserts them in our input fields which only we - the authors - see
    document.getElementById("input_" + size).value =
      "Größe: " +
      getsize(size) +
      "px<br/>click_errors: " +
      click_errors[size] +
      "<br/>Durchschnittszeit: " +
      averageTime;
  }

  //removes the hidden-Class from our result wrapper and displays it
  document.getElementById("result").setAttribute("class", "");
  //experiment is over
  experimentActive = false;

  //Buttons
  startStudyBtn.setAttribute("class", "button");
  startStudyBtn.innerHTML = "Experiment neustarten";
  circle.setAttribute("class", "is--hidden");
  checkDisabled();
}

//switch case statement for the different sizes: 5,10,20,30,50
function getsize(size) {
  switch (size) {
    case 0:
      return 5;
    case 1:
      return 10;
    case 2:
      return 20;
    case 3:
      return 30;
    case 4:
      return 50;
  }
}

/** Calculates the difference from tht time
 * when the circle appeares and the user clicked it
 * and stores them into our timesArr arrays
 * and click_errors arrays
 */
function clickBall() {
  if (experimentActive) {
    var klickzeit = new Date().getTime();
    //Difference between the time the circle has been clicked and the time we started our expirement
    // e.g. startStudy()
    var zeitdiff = klickzeit - startZeit;
    // The trial to make the user stay motivated during the experiment
    trial = trial + 1;
    $("#trial-label").text("Kreis " + trial + " von 50");
    //We grab the position of our circle and pass it into our helper function
    var position = $("#circle");
    drawDotOnCanvas(position);
    //We have to substract 1 from our values because the click on the circle counts somehow
    //We change the color of the strokes for each difficulty
    if (runs <= 1) {
      click_errors[4] = click_errors[4] - 1;
      timesArr[4].push(zeitdiff);
      ctx.strokeStyle = CURRENT_DIFFICULTY.easy.color;
    } else if (runs <= 2) {
      click_errors[3] = click_errors[3] - 1;
      timesArr[3].push(zeitdiff);
      ctx.strokeStyle = CURRENT_DIFFICULTY.middle.color;
    } else if (runs <= 3) {
      click_errors[2] = click_errors[2] - 1;
      timesArr[2].push(zeitdiff);
      ctx.strokeStyle = CURRENT_DIFFICULTY.medium.color;
    } else if (runs <= 4) {
      click_errors[1] = click_errors[1] - 1;
      timesArr[1].push(zeitdiff);
      ctx.strokeStyle = CURRENT_DIFFICULTY.hard.color;
    } else {
      click_errors[0] = click_errors[0] - 1;
      timesArr[0].push(zeitdiff);
      ctx.strokeStyle = CURRENT_DIFFICULTY.extreme.color;
    }

    if (runs < 5) {
      startStudy();
    } else {
      //stopExperiment();
      totalRuns = totalRuns + 1;
        doAnotherRun();
    }
  }
}

function doAnotherRun() {
    if (totalRuns === 1) {
        runs = 0;
        startTimer();
        setTimeout(() => {
          stopExperiment_2();
        }, 6000);
    } else if(totalRuns === 2) {
        runs = 0;
        startTimer();
        setTimeout(() => {
        stopExperiment_3();
      }, 6000);
        
    } else if (totalRuns === 3){
        stopExperiment();
    }
}


//Detect clicks on our background and add them to the corresponding click_errors array
function clickHintergrund() {
  if (runs <= 1) {
    click_errors[4] = click_errors[4] + 1;
  } else if (runs <= 2) {
    click_errors[3] = click_errors[3] + 1;
  } else if (runs <= 3) {
    click_errors[2] = click_errors[2] + 1;
  } else if (runs <= 4) {
    click_errors[1] = click_errors[1] + 1;
  } else {
    click_errors[0] = click_errors[0] + 1;
  }
}

// Checks if any inputs have been made and disable or enable submit button accordingly
function checkDisabled() {
  var gender = $(".placeholder");
  var age = $("input#age");
  var playerType = $(".placeholder-player");

  if (age.val().length > 0) {
    $("label#age").css({ "text-decoration": "line-through" });
  } else {
    $("label#age").css({ "text-decoration": "" });
  }

  if (
    gender.text() === "" ||
    gender.text() === "Geschlecht" ||
    playerType.text() === "" ||
    playerType.text() === "Typ" ||
    age.val() === ""
  ) {
    $("button[type=submit]").prop("disabled", true);
  } else {
    $("button[type=submit]").prop("disabled", false);
  }

  $("button[type=submit]:disabled").click(function () {
    if (gender.text() === "" || gender.text() === "Geschlecht") {
      return false;
    } else return;
  });
}

//Clear all inputs after study completed
function clearInputs() {
  var gender = $(".placeholder");
  var age = $("input#age");
  var playerType = $(".placeholder-player");

  age.val("");
  gender.text("Geschlecht");
  playerType.text("Typ");

  $(".strikethrough-player").css({ "text-decoration": "" });
  $(".strikethrough").css({ "text-decoration": "" });
}

//Enter fullscreen mode - Browser support
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

//Leave fullscreen mode - Browser support
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}

// fun stuff
function displayGifPc() {
  $("img#pc-gamer").removeClass("is--hidden");
  $("img#console-gamer").addClass("is--hidden");
}

function undisplayGiftPc() {
  $("img#pc-gamer").addClass("is--hidden");
}

function displayGifConsole() {
  $("img#console-gamer").removeClass("is--hidden");
  $("img#pc-gamer").addClass("is--hidden");
}

function undisplayGiftConsole() {
  $("img#console-gamer").addClass("is--hidden");
}

//Add eventlistener to our objects
circle.addEventListener("click", clickBall);
area.addEventListener("click", clickHintergrund);
startStudyBtn.addEventListener("click", function () {
  if (this.innerHTML === "Experiment neustarten") {
    if (
      confirm(
        "Deine Ergebnisse wurden noch nicht an uns übermittelt. Bist du sicher, dass du dennoch das Experiment neustarten willst?"
      )
    ) {
      initStudy();
    } else {
      //do nothing -stay
    }
  } else {
    initStudy();
  }
});


//Canvas helper functions
function drawDotOnCanvas(pos) {
    var offset = pos.offset();
    var width = pos.width();
    var height = pos.height();

    var centerX = offset.left + width / 2;
    var centerY = offset.top + height / 2;

    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, 2*Math.PI);
    ctx.fill();
}


function getMousePos(canvas, evt) {
    return {
      x: evt.clientX - BB.left,
      y: evt.clientY - BB.top
    };
}

//Method to track the paths between circle clicks
function drawCanvas() {

  resizeCanvas();

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  var offsetX = BB.left;
  var offsetY = BB.top;

  var lastX, lastY;
  var isDown = false;

  canvas.onmousemove = handleMousemove;
  canvas.onmousedown = handleMouseDown;

  function handleMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();

    var pos = getMousePos(canvas, e);
    var posx = pos.x;
    var posy = pos.y;
    //Error colors
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(posx, posy, 10, 0, 2*Math.PI);
    ctx.fill();
  }

  function handleMousemove(e) {
    e.preventDefault();
    e.stopPropagation();

    var mouseX = e.clientX - offsetX;
    var mouseY = e.clientY - offsetY;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();

    lastX = mouseX;
    lastY = mouseY;
  }
}
