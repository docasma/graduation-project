const User = require('../models/userModel');
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.sendStatus(400); // Utilisateur non trouvé
            }

            // Vérification du mot de passe
            const correctPassword = await bcrypt.compare(req.body.password, user.password);
            if (!correctPassword) {
                return res.sendStatus(400); // Mot de passe incorrect
            }

            // Si nous sommes arrivés jusqu'ici, le mot de passe était correct
            const userToken = jwt.sign({
                id: user._id
            }, secret);

            // Réponse avec le cookie userToken et un message JSON
            res.cookie("userToken", userToken, {
                httpOnly: true
            }).json({ message: "Success!" });
        } catch (err) {
            console.error(err);
            res.sendStatus(500); // Erreur interne du serveur
        }
    },
    registerUser: (req, res) => {
        User.create(req.body)
            .then(user => {
                const userToken = jwt.sign({
                    id: user._id
                }, process.env.SECRET_KEY);

                res
                    .cookie("usertoken", userToken, {
                        httpOnly: true
                    })
                    .json({ msg: "success!", user: user });
            })
            .catch(err => {
                if (err.name === 'ValidationError') {
                    const errors = {};
                    for (let field in err.errors) {
                        errors[field] = err.errors[field].message;
                    }
                    return res.status(400).json({ errors });
                }
                console.error(err);
                res.status(500).json({ msg: "Internal Server Error" });
            });
    },

    logout: (req, res) => {
        res.clearCookie('userToken').json({ message: 'You logged out' });
    },

    // Exemple d'utilisation pour récupérer toutes les informations d'un utilisateur par son ID
    getUserById : async (req, res) => {
        const { userId } = req.params;

        try {
            const user = await User.getUserById(userId);

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur serveur' });
        }
    },



// Route pour récupérer les événements d'un utilisateur spécifique
    getUserEvents : async (req, res) => {
        const { id } = req.params;

        try {
            // Récupérer l'utilisateur par son ID
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            // Récupérer les événements liés à cet utilisateur
            const events = await Event.find({ eventCreator: id });

            res.status(200).json(events);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur serveur' });
        }
    },


    // Mettre à jour l'utilisateur
    updateUser: async (req, res) => {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
            res.status(200).json(user);
        } catch (err) {
            console.error(err);
            res.status(400).json(err); // Erreur de validation ou autre
        }
    }
};

    // getLoggedUser: async (req, res) => {
    //     try {
    //         const userId = jwt.verify(req.cookies.userToken, secret).id;
    //         const user = await User.findById(userId);
    //         if (!user) {
    //             return res.status(404).json({ message: 'User not found' });
    //         }
    //         res.status(200).json(user);
    //     } catch (err) {
    //         console.error(err);
    //         res.status(400).json({ message: 'User not found', err });
    //     }
    // },

    // Route pour obtenir les détails d'un utilisateur créateur par son ID
    // getUserCreatorById: async (req,res)=>{
    //     try {
    //         const userId = req.params.userId;
    //         const user = await User.findById(userId).populate('createdEvents');

    //         if (!user) {
    //             return res.status(404).json({ message: "User not found" });
    //         }

    //         // Renvoyer les détails de l'utilisateur
    //         res.status(200).json({ user });
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // },
