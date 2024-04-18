const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

module.exports.authenticate = (req, res, next) => {
    // Vérifier si le token est présent dans les cookies de la requête
    const token = req.cookies.userToken;
    if (!token) {
        return res.status(401).json({ verified: false, message: 'Unauthorized access - Token missing' });
    }

    // Vérifier si le token est valide
    jwt.verify(token, secret, (err, payload) => {
        if (err) {
            return res.status(401).json({ verified: false, message: 'Unauthorized access - Invalid token' });
        } else {
            // Si le token est valide, ajoutez les données du payload à la requête pour une utilisation ultérieure
            userId = payload.id;
            // Ajoutez l'identifiant de l'utilisateur à la requête pour une utilisation ultérieure
            req.userId = userId;
            // Passez à l'étape suivante du middleware
            next();
        }
    });
};

// Fonction pour créer et signer un token JWT avec l'ID de l'utilisateur
module.exports.generateToken = (userId) => {
    const payload = { id: userId };
    const options = {
        expiresIn: '2h', // Optionnel : définir une expiration pour le token
    };

    return jwt.sign(payload, secret, options);
};

// const payload = {id: user._id};
// //   notice that we're using the SECRET_KEY from our .env file
// const userToken = jwt.sign(payload, process.env.SECRET_KEY);
// const jwt = require("jsonwebtoken");
// const secret = process.env.SECRET_KEY;

// module.exports. authenticate=(req, res, next)=> {
//     // expiresIn: '2h', // Exemple de durée de validité du token
//     // algorithm: 'HS256', // Exemple d'algorithme de chiffrement

//     jwt.verify(req.cookies.userToken, secret, (err, payload) => {

//         if (err) { 
//             res.status(401).json({ verified: false, message: 'Unauthorized access' });
//         } else {
//             next();
//         }
//     });
   
// };



// module.exports.authenticate= (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ message: 'No token provided' });
//     }

//     try {
//         const decoded = jwt.verify(token, SECRET_KEY);
//         req.user = decoded; // Stockez les informations de l'utilisateur dans req.user
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: 'Invalid token' });
//     }
// };
  

