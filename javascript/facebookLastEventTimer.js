// Also written by us in its entirety
fetch(eventUrl).then(function(response) {
    // Convert to JSON
    return response.json();
}).then(function(j) {
    // Yay, `j` is a JavaScript object
    var events = parseJSON2list(j.events.data);
    var futureEvents = getFutureEvents(events);
    var nextEvent = getNextEvent(futureEvents);
    var nowEvent = getNowEvent(events);
    var today = new Date();

    // Check if there are no events now or in the future. If that is true assume we
    // are open next legal friday
    if (futureEvents.length == 0 && nowEvent.length == 0) {
        var isOpen = false;

        if (today.getDay() == fridayID) {
            var openingTime = getOpeningHour(today);
            var closingTime = getClosingHour(today);

            if (today < openingTime) {
                var nextFriday = openingTime;
            } else if (openingTime < today && today < closingTime) {
                isOpen = true;
                var nextFriday = closingTime
            } else {
                var nextFriday = getNextLegalFriday(today);
            }

        } else if (isClosedForSemester(getNextDayOfWeek(today, fridayID))) {
            document.getElementById("noEvent").innerHTML = "Oi! Det ser ut som semesteret er slutt for denne gang. Du kan finne ut mer om når vi har åpent på <a href='https://www.facebook.com/pg/Realfagskjelleren'>Realfagskjelleren sin facebookside</a>. Sannsynligvis er vi åpen om bare: </p>";
            var nextFriday = getNextLegalFriday(today);
        } else {
            var nextFriday = getNextLegalFriday(today);
        }

        if (isOpen) {
            var temp = document.getElementById("futureEvent");
            temp.id = "notFutureEvent";
            initializeClock("notFutureEvent", closingTime);
            document.getElementById("noEvent").innerHTML = "Kjelleren har ikke annonsert noen fremtidige arrangementer, du kan finne ut mer om når vi har åpent på <a href='https://www.facebook.com/pg/Realfagskjelleren'>Realfagskjelleren sin facebookside</a>. Sannsynligvis er vi åpen nå! Stenger om: </p>";

            document.getElementById("notFutureEvent").style.display = "inline";

        } else {
            initializeClock("futureEvent", nextFriday);
        }
        document.getElementById("noEvent").style.display = "inline";
    } else {
        if (nowEvent.length == 0) {
            var nextEvent = getNextEvent(futureEvents);

            initializeClock("futureEvent", nextEvent.start);
            document.getElementById("timerText").innerHTML = "Kjelleren åpner om:";
        } else {

            var nextEvent = nowEvent;
            var temp = document.getElementById("futureEvent");
            temp.id = "notFutureEvent";

            document.getElementById("timerText").innerHTML = "Kjelleren er åpen! Vi stenger om:";
            initializeClock("notFutureEvent", nextEvent.end);
            document.getElementById("nextEvent").innerHTML = "Arrangement:";
        }
        createEventList("nextEventImageAndTitle", [nextEvent]);

        document.getElementById("nextEvent").style.display = "block";
        document.getElementById("timer").style.display = "inline";
    }
});
