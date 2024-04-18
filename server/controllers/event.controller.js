// the controller does the CRUD for the DB
// import the model here
const Event = require("../models/event.model")
const { generateToken } = require("../config/jwt.config");

module.exports ={
    findAllEvents: (req, res) => {
        Event.find()
            .then((allEvents) => {
                if (!allEvents || allEvents.length === 0) {
                    return res.status(404).json({ message: 'No events found' });
                }
                res.status(200).json(allEvents);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },

    findOneEvent: (req, res) => {
        Event.findOne({ _id: req.params.id })
            .then(oneSinglEvent => {
                if (!oneSinglEvent) {
                    return res.status(404).json({ message: 'Event not found' });
                }
                res.status(200).json(oneSinglEvent);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },
  
    // CREATE 
    createNewEvent : (req, res) => {
        Event.create(req.body)
                .then((oneEvent) => {
                    console.log(">>>Event.create()= >>>", oneEvent)
                    res.status(200).json(oneEvent)
                })
                .catch((err) => {
                    res.status(400).json(err)
                })
        },
    

    // compter le nombre de nouveaux événements;je comprnds pas pourquoi interfere dans l affichage des tableaux!!
    countNewEvents : async (req, res) => {
    try {
        
        // compter le nombre d'événements créés aujourd'hui
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Remettre à zéro l'heure pour obtenir le début de la journée

        const newEventsCount = await Event.countDocuments({ eventDate: { $gte: today } });

        res.status(200).json({ success: true, count: newEventsCount });
    } catch (error) {
        console.error('Failed to count new events:', error);
        res.status(500).json({ success: false, message: 'Failed to count new events' });
    }
},



// UPDATE
    updateExistentEvent : (req, res) => {
        Event.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
                .then(updateEvent => {
                    res.status(200).json(updateEvent)
                })
                .catch(err => {
                    res.status(400).json(err)
                })
    },

   
// // DELETE
    deleteAnExistingEvent : (req, res) => {
        Event.deleteOne({ _id: req.params.id })
                .then(result => {
                    res.status(200).json(result)
                })
                .catch(err => {
                    res.status(400).json(err)
                })
    },
    
     
    createAttendeeForEvent: (req, res) => {
        const { id } = req.params;
        const { firstName, lastName, email, phoneNumber } = req.body;

        // Vérification des champs requis
        if (!firstName || !lastName || !email) {
            return res.status(400).json({ message: 'First name, last name, and email are required' });
        }

        // Validation de l'email
        const isValidEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        if (typeof email !== 'string' || !isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Validation de la longueur minimale pour firstName et lastName
        if (firstName.length < 3 || lastName.length < 3) {
            return res.status(400).json({ message: 'First name and last name must have at least 3 characters' });
        }

        // Vérification de la longueur minimale pour phoneNumber si fourni
        if (phoneNumber && phoneNumber.length < 8) {
            return res.status(400).json({ message: 'Phone number must have at least 8 characters' });
        }

        // Vérification si l'attendee est déjà inscrit à l'événement
        Event.findOne({ _id: id, 'attendees.email': email })
            .then(event => {
                if (event) {
                    return res.status(400).json({ message: 'You are already registered for this event' });
                }

                // Création du nouvel attendee
                const newAttendee = { firstName, lastName, email, phoneNumber };

                // Ajout de l'attendee à l'événement
                Event.updateOne(
                    { _id: id },
                    { $addToSet: { attendees: newAttendee } }
                )
                    .then(result => {
                        if (result.nModified === 0) {
                            return res.status(404).json({ message: 'Event not found' });
                        }
                        return res.status(200).json({ message: 'Attendee added successfully' });
                    })
                    .catch(err => {
                        res.status(400).json({ message: 'Failed to create attendee', error: err });
                    });
            })
            .catch(err => {
                res.status(400).json({ message: 'Failed to check attendee registration', error: err });
            });
    },



    
    // Obtenir tous les participants pour un événement donné
    getAllAttendeesForEvent: (req, res) => {
        Event.findById({_id:req.params.id})
            .then(event => {
                if (!event) {
                    return res.status(404).json({ message: 'Event not found' });
                }

                res.status(200).json(event.attendees);
            })
            .catch(err => {
                res.status(400).json({ message: 'Failed to get attendees', error: err });
            });
    }


}