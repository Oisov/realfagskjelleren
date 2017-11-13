// These methods were all except one written by us

var eventUrl = "https://graph.facebook.com/v2.10/realfagskjelleren?fields=events%7Bname%2Cid%2Cstart_time%2Cend_time%2Ccover%7D&access_token=1933189180280805%7COQMRkHbH7bd80Xwlg9CW6BJECLQ"
var openMonths = [0, 1, 2, 3, 7, 8, 9, 10];
var fridayID = 5;
var saturdayID = 6;

// Checks if it is closed for the semester for a given date
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

// Returns the date of the next occurence of a dayOfWeek. 0 <= dayOfWeek <= 6
function getNextDayOfWeek(date, dayOfWeek) {
    var resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
    return resultDate;
}

// Finds the next Friday Realfagskjelleren will be open
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

// Parse a JSON file of events into an event list
function parseJSON2list(jsonFile) {
    events = []
    for (let key in jsonFile) {
        var event = {
            name: (jsonFile[key].name).replace(/(\r\n|\n|\r)/gm, ""),
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

// Creates an image element with provided parameters
function imgCreate(src, alt, title) {
    var img = document.createElement('img');
    img.src = src;
    if (alt != null) img.alt = alt;
    if (title != null) img.title = title;
    return img;
}

// Returns a formated string of the date provided
function monthNameDate(date) {
    var monthDate = date.getDate();
    var monthName = date.toLocaleString("no", {
        month: "long"
    });
    return monthDate + ". " + monthName;

}

// Adds zeroes in front of value to match the length of length.
// Used for time formating. Taken from an answer on StackExchange, lost the source
function pad(value, length) {
    return (value.toString().length < length) ? pad("0"+value, length):value;
}

// Takes in an id and a list of events, distributes and formats
// relevant info before adding to list
function createEventList(id, eventList) {
    var numberOfEvents = eventList.length;
    console.log(numberOfEvents);
    for (var i = 0; i < numberOfEvents; i++) {
        var event = eventList[i];

        // Create the container for event information
        var eventContainer = document.createElement('div');
        eventContainer.className = "eventTitleContainer";

        // Left element of the event information, the event time
        var eventLeftTitle = document.createElement('p');
        eventLeftTitle.className = "eventTitleLeft";
        var eventStart = pad(event.start.getHours(), 2) + ":" +
          pad(event.start.getMinutes(), 2);
        var eventEnd = pad(event.end.getHours(), 2)+":"+pad(event.end.getMinutes(),2);
        var r = document.createTextNode(eventStart + " - " + eventEnd)
        eventLeftTitle.appendChild(r);

        // Center element of the event information, the event name
        var eventCenterTitle = document.createElement('p');
        eventCenterTitle.className = "eventTitleCenter";
        var s = document.createTextNode(event.name);
        eventCenterTitle.appendChild(s);

        // Right element of the event information, the event date
        var eventRightTitle = document.createElement('p');
        eventRightTitle.className = "eventTitleRight";
        var t = document.createTextNode(monthNameDate(event.start));
        eventRightTitle.appendChild(t);

        // Append information to container
        eventContainer.appendChild(eventLeftTitle);
        eventContainer.appendChild(eventCenterTitle);
        eventContainer.appendChild(eventRightTitle);

        // Create container for event image
        var eventImageContainer = document.createElement("a");
        eventImageContainer.href = event.url;
        eventImageContainer.target = "_blank";

        // Create image from event and add to container
        var eventImage = imgCreate(event.image, event.name, event.name);
        eventImageContainer.appendChild(eventImage);

        // Add the event info and image to parameter id
        var pastEvents = document.getElementById(id);
        pastEvents.appendChild(eventContainer);
        pastEvents.appendChild(eventImageContainer);
    }
}
