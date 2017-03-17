var sessionTime = 60,
	breakTime = 60,
	sessionOn = true,
	clockStart = false,
	startTimer,
	seconds = 60;

$("#start").click(function(){
	if(!clockStart) {
		if($("#phase").html() === "&nbsp;") {
			$("#phase").html("Session");
			setDisplay();
		}
		
		startTimer = setInterval(timeOn, 1000);
		clockStart = true;
		$("#start").html("<h3>Pause</h3>");
		$("input").prop("disabled", true);
	} else {
		clearInterval(startTimer);
		clockStart = false;
		$("#start").html("<h3>Start</h3>");
	}
});

$("#reset").click(function(){
	$("#work-hours, #rest-hours, #work-sec, #rest-sec").val(0);
	$("#work-min, #rest-min").val(1);
	sessionTime = 60;
	breakTime = 60;
	seconds = 60;
	clockStart = false;
	clearInterval(startTimer);
	$("#phase").html("&nbsp;");
	$("#start").html("<h3>Start</h3>");
	$("#hours, #minutes, #seconds").html("00");
	$("input").prop("disabled", false);
});


$("input").change(function(){
	if($(this).val() < 0) {
		$(this).val(0);
	} else if($(this).val() >= 60 && $(this).data("hours") !== "yes") {
		$(this).val(59);
	}

	if($(this).attr("class") === "session") {
		var hours = $("#work-hours").val()*60*60;
		var minutes = $("#work-min").val()*60;
		var sec = parseInt($("#work-sec").val());
		sessionTime = hours+minutes+sec;
		seconds = sessionTime;
	} else {
		var hours = $("#rest-hours").val()*60*60;
		var minutes = $("#rest-min").val()*60;
		var sec = parseInt($("#rest-sec").val());
		breakTime = hours+minutes+sec;
	}
});

function timeOn() {
	if(seconds === -1) {
		if(sessionOn) {
			sessionOn = false;
			seconds = breakTime;
			console.log("Break time");
			$("#phase").html("Break");
		} else {
			sessionOn = true;
			seconds = sessionTime;
			console.log("Session time");
			$("#phase").html("Session");
		}
	}
	setDisplay();
	seconds--;
}

function setDisplay() {
	// Math.floor prevents remaining seconds from being added to hours and minutes. IE: 90 seconds will round down to 1 minute rather than 1.50 minutes.
	var hour = Math.floor(seconds/3600); 
	var min = Math.floor(seconds/60);
	var sec = seconds%60;
	$("#hours").html(zero(hour)+hour);
	$("#minutes").html(zero(min)+min);
	$("#seconds").html(zero(sec)+sec);
}

function zero(n) {
	if(n < 10) {
		return "0";
	} else {
		return "";
	}
}