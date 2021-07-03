
	//Variablen anlegen und initialisieren
	var experimentActive = false;

    var circle = document.getElementById("circle");
    var area = document.getElementById("area");
    var descriptionWrapper = document.getElementById("description-wrapper");
    var startStudyBtn = document.getElementById("startStudy");

	var timer = 0;
	var startZeit;

	var timesArr = [new Array(),new Array(),new Array(),new Array(),new Array()];
	var runs = 0;

	//Safe the clicking errors for each iteration of the different circle sizes
	// 0 = 5px
	// 1 = 10px
	// 2 = 20px
	// 3 = 30px
	// 4 = 50px
	var click_errors = [0,0,0,0,0];

	//Start our study
	function initStudy() {
		//Init our study with 0 runs
		runs = 0;
        //The clicking errors made by the user
		click_errors = [0,0,0,0,0];
		experimentActive = true;
        //The times array to store all of our times for each iteration
		timesArr = [new Array(),new Array(),new Array(),new Array(),new Array()];

		//Hide buttons and other elements
		startStudyBtn.setAttribute("class","is--hidden button");

		circle.setAttribute("class","");
		document.getElementById("result").setAttribute("class","is--hidden");
		descriptionWrapper.setAttribute("class","is--hidden");

		//Start test
		startStudy();
	}

	//Start test
	function startStudy() {
		startZeit = new Date().getTime();
		runs = runs + 1;

		var ball = circle;

		//Setze Größe
		var size = 0;
		size = ball.offsetWidth;

        // Runs - each run 10 clicks
		if(runs <= 1) {
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

		//Wähle Position
		var x = 0;
		var y = 0;
		do{
			x = Math.floor(Math.random()*(document.body.offsetWidth - size));
			y = Math.floor(Math.random()*(document.body.offsetHeight - size));
		}
		while(checkDistance(ball.offsetLeft,ball.offsetTop,size,x,y,size) == false);

		//Setze Position
		positionCircle(x,y);
	}

	//Distance between our circles
	function checkDistance(oldX, oldY, oldsize, newX, newY, newsize) {
		var minimal = oldsize + 30 + newsize;
		var diffX = oldX - newX;
		var diffY = oldY - newY;
		var distance = Math.sqrt(Math.pow(diffX,2) + Math.pow(diffY,2));
		return (distance >= minimal);
	}

	//Position our ball absolute
	function positionCircle(posX, posY) {
		var ball = circle;
		ball.style.position = "absolute";
		ball.style.left = posX+'px';
		ball.style.top = posY+'px';
	}

	//Sets the size - width, height - of our circle element
	function setSize(size) {
		var ball = circle;
		ball.style.width  = size+'px';
		ball.style.height = size+'px';
	}

	//Beendet Erhebung und wertet Zwischenergebnisse aus
	function stopExperiment() {
		//Evaluation for every size of the circle
		for(var size = 0; size < 5; ++size) {
			//Average time
			var averageTime = 0.0;
			for (var i = 0; i < timesArr[size].length; ++i) {
				averageTime += timesArr[size][i];
			}
			averageTime = Math.round(averageTime / (timesArr[size].length));

            //sets the different values for all of our sizes and
            // 1) inserts them into our "results" wrapper element which the user see
			document.getElementById("size_"+size).innerHTML = "Größe: "+getsize(size)+"px<br/>Fehler: " + click_errors[size] + "<br/>Durchschnittszeit: " + averageTime;
            // 2) inserts them in our input fields which only we - the authors - see
			document.getElementById("input_"+size).value = "Größe: "+getsize(size)+"px<br/>click_errors: " + click_errors[size] + "<br/>Durchschnittszeit: " + averageTime;

		}

        //removes the hidden-Class from our result wrapper and displays it
		document.getElementById("result").setAttribute("class","");
        //experiment is over
		experimentActive = false;

		//Buttons
		startStudyBtn.setAttribute("class","button");
		startStudyBtn.innerHTML = "Restart study";
		circle.setAttribute("class","hidden");
        checkDisabled();
}

    //switch case statement for the different sizes: 5,10,20,30,50
	function getsize(size) {
		switch(size) {
			case 0: return 5;
			case 1: return 10;
			case 2: return 20;
			case 3: return 30;
			case 4: return 50;
		}
	}

	//ermittle Zeit und starte newen Test
	function clickBall() {
		if(experimentActive) {
			var klickzeit = new Date().getTime();
			var zeitdiff = klickzeit - startZeit;

			if(runs <= 1) {
				click_errors[4] = click_errors[4] - 1;
				timesArr[4].push(zeitdiff);
			} else if(runs <= 2) {
				click_errors[3] = click_errors[3] - 1;
				timesArr[3].push(zeitdiff);
			} else if(runs <= 3) {
				click_errors[3] = click_errors[2] - 1;
				timesArr[2].push(zeitdiff);
			} else if(runs <= 4) {
				click_errors[2] = click_errors[1] - 1;
				timesArr[1].push(zeitdiff);
			} else {
				click_errors[1] = click_errors[0] - 1;
				timesArr[0].push(zeitdiff);
			}

			if(runs < 5){
				startStudy();
			} else {
				stopExperiment();
			}
		}
	}

	function clickHintergrund() {
        console.log("click");
		if(runs <= 1) {
			click_errors[4] = click_errors[4] + 1;
		} else if(runs <= 2) {
			click_errors[3] = click_errors[3] + 1;
		} else if(runs <= 3) {
			click_errors[2] = click_errors[2] + 1;
		} else if(runs <= 4) {
			click_errors[1] = click_errors[1] + 1;
		} else {
			click_errors[0] = click_errors[0] + 1;
		}
	}

    // Checks if any inputs have been made
    function checkDisabled() {
        var gender = $('.placeholder');
        var age = $('input#age');
		var playerType = $('.placeholder-player');

		if (age.val().length > 0) {
			$('label#age').css({'text-decoration':"line-through"});
		} else {
			$('label#age').css({'text-decoration':""});
		}

        if (gender.text() === '' || gender.text() === 'gender' || playerType.text() === '' || playerType.text() === 'type' || age.val() === '') {
            $("button[type=submit]").prop("disabled", true);
        } else  {
            $("button[type=submit]").prop("disabled", false)
        };

        $("button[type=submit]:disabled").click(function () {
            if (gender.text() === '' || gender.text() === 'gender') {
                return false;
            }
            else return;
        });
    }

	function displayGifPc() {
		$('img#pc-gamer').removeClass('is--hidden');
		$('img#console-gamer').addClass('is--hidden');
	}

	function undisplayGiftPc() {
		$('img#pc-gamer').addClass('is--hidden');
	}

	function displayGifConsole() {
		$('img#console-gamer').removeClass('is--hidden');
		$('img#pc-gamer').addClass('is--hidden');
	}

	function undisplayGiftConsole() {
		$('img#console-gamer').addClass('is--hidden');
	}

	circle.addEventListener("click", clickBall);
	area.addEventListener("click", clickHintergrund);
	startStudyBtn.addEventListener("click", initStudy);
