  // Fetch events from facebook entirely written by us
fetch(eventUrl).then(function(response) {
  // Convert to JSON
  return response.json();
}).then(function(j) {
  // Parse events and classify them
  var events = parseJSON2list(j.events.data);
  var futureEvents = getFutureEvents(events);
  var nowEvent = getNowEvent(events);
  var pastEvents = getPastEvents(events);
  var nowAndFutureEvents = nowEvent.push.apply(nowEvent, futureEvents);
  // Create lists of past and future events and add them to the id (first parameter)
  createEventList("pastEventsList", pastEvents);
  createEventList("futureEventsList", futureEvents);
});
