
	//Variablen anlegen und initialisieren
	var experimentActive = false;

    var circle = document.getElementById("circle");
    var area = document.getElementById("area");
    var descriptionWrapper = document.getElementById("description-wrapper");
    var startStudyBtn = document.getElementById("startStudy");

	var timer = 0;
	var startZeit;

	var zeiten = [new Array(),new Array(),new Array(),new Array(),new Array()];
	var runs = 0;

	//Speichert die click_errors pro Größe
	// 0 = 5px
	// 1 = 10px
	// 2 = 20px
	// 3 = 30px
	// 4 = 50px
	var click_errors = [0,0,0,0,0];

	var mailtext = "";

	//Startet die Erhebung
	function startExperiment() {
		//Initialisiert das Experiment
		runs = 0;
		click_errors = [0,0,0,0,0];
		mailtext = "mailto:arbe0006@stud.hs-kl.de";
		experimentActive = true;
		zeiten = [new Array(),new Array(),new Array(),new Array(),new Array()];

		//Hide buttons and other elements
		startStudyBtn.setAttribute("class","is--hidden button");
		document.getElementById("send_mail").setAttribute("class","button is--hidden");
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

		if(runs <= 20) {
			size = 50;
			setzesize(50);
		} else if (runs <= 40) {
			size = 30;
			setzesize(30);
		} else if (runs <= 60) {
			size = 20;
			setzesize(20);
		} else if (runs <= 80) {
			size = 10;
			setzesize(10);
		} else {
			size = 5;
			setzesize(5);
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

	//Prueft den distance zwischen den Kreisen
	function checkDistance(oldX, oldY, oldsize, newX, newY, newsize) {
		var minimal = oldsize + 30 + newsize;
		var diffX = oldX - newX;
		var diffY = oldY - newY;
		var distance = Math.sqrt(Math.pow(diffX,2) + Math.pow(diffY,2));
		return (distance >= minimal);
	}

	//Positioniere Ball an Position
	function positionCircle(posX, posY) {
		var ball = circle;
		ball.style.position = "absolute";
		ball.style.left = posX+'px';
		ball.style.top = posY+'px';
	}

	//Setze size des Balls
	function setzesize(size) {
		var ball = circle;
		ball.style.width  = size+'px';
		ball.style.height = size+'px';
	}

	//Beendet Erhebung und wertet Zwischenergebnisse aus
	function stopExperiment() {
		//Auswertung
		for(var size = 0; size < 5; ++size) {
			//Durchschnittszeit
			var durchschnittszeit = 0.0;
			for (var i = 0; i < zeiten[size].length; ++i) {
				durchschnittszeit += zeiten[size][i];
			}
			durchschnittszeit = Math.round(durchschnittszeit / (zeiten[size].length));


			document.getElementById("size_"+size).innerHTML = "Größe: "+getsize(size)+"px<br/>click_errors: " + click_errors[size] + "<br/>Durchschnittszeit: " + durchschnittszeit;

			mailtext = mailtext + "size%3A"+getsize(size)+"px%0A";
			mailtext = mailtext + "click_errors%3A"+click_errors[size]+"%0A";
			mailtext = mailtext + "Durchschnittszeit%3A"+durchschnittszeit+"ms%0A";
		}
		//Ausgabe der Ergebnisse
		document.getElementById("result").setAttribute("class","");
		experimentActive = false;

		//Darstellung der GUI-Elemente
		document.getElementById("send_mail").setAttribute("class","button");
		document.getElementById("sender").setAttribute("href",mailtext);
		startStudyBtn.setAttribute("class","button");
		startStudyBtn.innerHTML = "Restart study";
		circle.setAttribute("class","hidden");
}

	function getsize(size) {
		switch(size) {
			case 0: return 5; break;
			case 1: return 10; break;
			case 2: return 20; break;
			case 3: return 30; break;
			case 4: return 50; break;
		}
	}

	//ermittle Zeit und starte newen Test
	function clickBall() {
		if(experimentActive) {
			var klickzeit = new Date().getTime();
			var zeitdiff = klickzeit - startZeit;

			if(runs <= 20) {
				click_errors[0] = click_errors[0] - 1;
				zeiten[0].push(zeitdiff);
			} else if(runs <= 40) {
				click_errors[1] = click_errors[1] - 1;
				zeiten[1].push(zeitdiff);
			} else if(runs <= 60) {
				click_errors[2] = click_errors[2] - 1;
				zeiten[2].push(zeitdiff);
			} else if(runs <= 80) {
				click_errors[3] = click_errors[3] - 1;
				zeiten[3].push(zeitdiff);
			} else {
				click_errors[4] = click_errors[4] - 1;
				zeiten[4].push(zeitdiff);
			}

			if(runs < 100){
				startStudy();
			} else {
				stopExperiment();
			}
		}
	}

	//ermittle Zeit und starte newen Test
	function clickHintergrund() {
		if(runs <= 20) {
			click_errors[0] = click_errors[0] + 1;
		} else if(runs <= 40) {
			click_errors[1] = click_errors[1] + 1;
		} else if(runs <= 60) {
			click_errors[2] = click_errors[2] + 1;
		} else if(runs <= 80) {
			click_errors[3] = click_errors[3] + 1;
		} else {
			click_errors[4] = click_errors[4] + 1;
		}
	}

	circle.addEventListener("click", clickBall);
	area.addEventListener("click", clickHintergrund);
	startStudyBtn.addEventListener("click", startExperiment);
