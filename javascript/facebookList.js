var eventUrl = "https://graph.facebook.com/v2.10/realfagskjelleren?fields=events%7Bname%2Cid%2Cstart_time%2Cend_time%2Ccover%7D&access_token=1933189180280805%7COQMRkHbH7bd80Xwlg9CW6BJECLQ"
var openMonths = [0, 1, 2, 3, 7, 8, 9, 10];
var fridayID = 5;
var saturdayID = 6;

function isClosedForSemester(currentTime = new Date()) {
    var month = currentTime.getMonth();
    var date = currentTime.getDate();
    if (month == 0 && date < 6) {
        return false
    } else if (month == 3 && date > 22) {
        return true
    } else if (month == 10 && date > 23) {
        return true
    } else if (openMonths.includes(month)) {
        return false
    } else {
        return true
    }
}

function getNextDayOfWeek(date, dayOfWeek) {
    var resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
    return resultDate;
}


function getNextLegalFriday(date) {
    // Friday is the fifth day of the week
    var nextFriday = getNextDayOfWeek(date, fridayID);
    if (!isClosedForSemester(nextFriday)) {
        nextFriday.setHours(18, 0, 0); /* We open 6 pm*/
        return nextFriday
    } else {
        var nextFriday = new Date(date.getFullYear(), date.getMonth() +
            1, 1);
        while (!openMonths.includes(nextFriday.getMonth())) {
            nextFriday.setMonth(nextFriday.getMonth() + 1);
        }
        /* If we are in january bump the date by 6 days*/
        if (nextFriday.getMonth() == 0) {
            nextFriday = new Date(nextFriday.getFullYear(), nextFriday.getMonth(), 6);
            nextFriday.setHours(18, 0, 0); /* We open 6 pm */
        }
        return getNextDayOfWeek(nextFriday, fridayID)
    }
}

function isEventNow(startTime, endTime) {
    var currentTime = new Date();
    if (startTime < currentTime && currentTime < endTime) {
        return true
    } else {
        return false
    }
}

function isEventFuture(startTime, endTime) {
    var currentTime = new Date();
    if (currentTime < startTime && currentTime < endTime) {
        return true
    } else {
        return false
    }
}

function isEventPast(startTime, endTime) {
    var currentTime = new Date();
    if (startTime < currentTime && endTime < currentTime) {
        return true
    } else {
        return false
    }
}

function parseJSON2list(jsonFile) {
    events = []
    for (let key in jsonFile) {
        var event = {
            name: jsonFile[key].name,
            start: new Date(jsonFile[key].start_time),
            end: new Date(jsonFile[key].end_time),
            url: "https://facebook.com/" + (jsonFile[key].id).trim(),
            image: jsonFile[key].cover.source
        }
        events.push(event)
    }
    return events;
}

function getNowEvent(events) {
    for (let key in events) {
        var event = events[key]
        if (isEventNow(event.start, event.end)) {
            return event;
        }
    }
    return [];
}

function getFutureEvents(events) {
    var futureEvents = [];
    for (let key in events) {
        var event = events[key];
        if (isEventFuture(event.start, event.end)) {
            futureEvents.push(event)
        }
    }
    return futureEvents;
}

function getPastEvents(events) {
    var pastEvents = [];
    for (let key in events) {
        var event = events[key];
        if (isEventPast(event.start, event.end)) {
            pastEvents.push(event)
        }
    }
    return pastEvents;
}

function getNextEvent(future_events) {
    future_events.sort(function(a, b) {
        return a.end - b.end;
    })
    return future_events[0];
}

function getOpeningHour(date) {
    var opening = new Date(date.getFullYear(),
        date.getMonth(),
        date.getDate());
    opening.setHours(18, 0, 0, 0);
    return opening
}

function getClosingHour(date) {
    var closing = new Date(date.getFullYear(),
        date.getMonth(),
        date.getDate());
    if (closing.getDay() == fridayID || closing.getDay() == saturdayID) {
        closing.setHours(24, 0, 0, 0);
    } else {
        closing.setHours(23, 0, 0, 0);
    }
    return closing
}

function imgCreate(src, alt, title) {
    var img = document.createElement('img');
    img.src = src;
    if (alt != null) img.alt = alt;
    if (title != null) img.title = title;
    return img;
}

function createEventList(id, eventList) {
    var numberOfEvents = eventList.length;
    for (var i = 0; i < numberOfEvents; i++) {
        var event = eventList[i];

        // title
        var eventTitle = document.createElement("h1");
        var eventText = document.createTextNode(event.name);
        eventTitle.appendChild(eventText);

        // Images
        var eventImageContainer = document.createElement("a");
        eventImageContainer.href = event.url;
        var eventImage = imgCreate(event.image, event.name, event.name);
        eventImageContainer.appendChild(eventImage);

        var pastEvents = document.getElementById(id);
        pastEvents.appendChild(eventTitle);
        pastEvents.appendChild(eventImageContainer);

    }
}



fetch(eventUrl).then(function(response) {
    // Convert to JSON
    return response.json();
}).then(function(j) {
    // Yay, `j` is a JavaScript object

    var events = parseJSON2list(j.events.data);

    /* console.log(events["0"].start);*/
    /* console.log(events["0"].start.setDate(events["0"].start.getDate()-8));*/
    /* console.log(events["0"].start.setHours(events["0"].start.getHours()-15));*/
    /* console.log(events["0"].end.setDate(events["0"].end.getDate()-8));*/
    /* console.log(events["0"].end.setHours(events["0"].end.getHours()-15));*/

    var futureEvents = getFutureEvents(events);

    var nowEvent = getNowEvent(events);
    var pastEvents = getPastEvents(events);
    var nowAndFutureEvents = nowEvent.push.apply(nowEvent, futureEvents);

    createEventList("pastEventsList", pastEvents);
    createEventList("futureEventsList", futureEvents);

    /* futureEvents = [];*/
    /* nextEvent = [];*/
    /* nowEvent = [];*/

});