const { authenticate } = require("../config/jwt.config");
const EventController = require("../controllers/event.controller");

module.exports = app => {
    app.get("/api/events", EventController.findAllEvents);
    app.get("/api/events/:id", EventController.findOneEvent);
    // app.get("/api/events/:creatorName", EventController.getAllEventsByCreator);
    app.get("/api/new/count", EventController.countNewEvents);
    app.patch("/api/events/edit/:id", EventController.updateExistentEvent);
    // app.get("/api/:eventId/attendees", EventController.getEventAttendees);
    app.post("/api/events/new", EventController.createNewEvent);
    app.delete("/api/delete/events/:id", EventController.deleteAnExistingEvent);
    // Créer un participant pour un événement donné
    app.post('/api/events/:id/register', EventController.createAttendeeForEvent);
    // Obtenir tous les participants pour un événement donné
    app.get('/api/events/:id/attendees', EventController.getAllAttendeesForEvent);
};
