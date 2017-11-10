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
