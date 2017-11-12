fetch(eventUrl).then(function(response) {
    // Convert to JSON
    return response.json();
}).then(function(j) {
    // Yay, `j` is a JavaScript object

    var events = parseJSON2list(j.events.data);
    var futureEvents = getFutureEvents(events);
    var nowEvent = getNowEvent(events);
    var pastEvents = getPastEvents(events);
    var nowAndFutureEvents = nowEvent.push.apply(nowEvent, futureEvents);

    createEventList("pastEventsList", pastEvents);
    createEventList("futureEventsList", futureEvents);
});
