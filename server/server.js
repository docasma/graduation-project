
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const cookieParser = require('cookie-parser');
// const jwtConfig = require("./config/jwt.config");
// require("dotenv").config();
// require("./config/mongoose.config");

// const port = process.env.PORT || 3000;

// // Middleware
// app.use(express.json(), express.urlencoded({ extended: true }), cors());
// app.use(cookieParser());

// // Routes
// require("./routes/userRoutes")(app);
// require("./routes/event.routes")(app);

// // Gestion des erreurs global
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: 'Internal Server Error' });
// });

// app.listen(port, () => console.log(`🌴🌴🌴🌴 Listening on port: ${port}`));
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const jwtConfig = require("./config/jwt.config");
require("dotenv").config();
require("./config/mongoose.config");

const port = process.env.PORT || 3000;

// Configuration CORS
const corsOptions = {
  origin: "http://localhost:3000", // Permet les requêtes depuis ce domaine
  credentials: true, // Permet l'envoi de cookies avec les requêtes
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions)); // Utilisation de la configuration CORS
app.use(cookieParser());

// Routes
require("./routes/userRoutes")(app);
require("./routes/event.routes")(app);

// Gestion des erreurs globale
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => console.log(`🌴🌴🌴🌴 Listening on port: ${port}`));
