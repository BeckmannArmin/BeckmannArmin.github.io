var clickedTime;
var createdTime;
var reactionTime;

$('.startBtn').click(function() {
    createCircle();
});

function createCircle() {
  $('.description-wrapper').hide();
  var time = Math.random();
  time = time * 3000;

  // randomize circle //
  setTimeout(function () {
    if (Math.random() > 0.5) {
      document.getElementById("circle").style.borderRadius = "50%";
      document.getElementById("circle").style.width = "50px";
      document.getElementById("circle").style.height = "50px";
    } else {
      document.getElementById("circle").style.borderRadius = "50%";
      document.getElementById("circle").style.width = "200px";
      document.getElementById("circle").style.height = "200px";
    }
    
    /**
      random position between
      top 0-300 and
      left 0-500
    **/
    
    var top = Math.random();
    top = top * 300;
    var left = Math.random();
    left = left * 500;
    
    // grab the circle ele and randomize the position //
    document.getElementById("circle").style.top = top + "px";
    document.getElementById("circle").style.left = left + "px";

    document.getElementById("circle").style.backgroundColor = "green";

    document.getElementById("circle").style.display = "block";
    
     // get the time when circle is created //
    createdTime = Date.now();
  }, time);
}

// add onclick listener to circle and create new one //
document.getElementById("circle").onclick = function () {
  // get the time when user clicks on circle //
  clickedTime = Date.now();
  
  reactionTime = (clickedTime - createdTime) / 1000;

  document.getElementById("rT").innerHTML =
    "Reaktionszeit: " + reactionTime + "sekunden";

  this.style.display = "none";

  createCircle();
};