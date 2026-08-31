// Middleware de protection de routes.
//
// Import dont tu auras besoin (à ajouter toi-même) :
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

// À toi d'écrire la fonction ci-dessous (et de l'exporter) :
//
// export function verifierToken(req, res, next) { ... }

export async function verifierToken(req, res, next) {
    try {
        const autHeader = req.headers.authorization;
        if (!autHeader) {
            return res.status(401).json({ message: "Token absent" });
        }

        const tokenUser = autHeader.split(" ")[1];
        const decoded = jwt.verify(tokenUser, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "Utilisateur introuvable" });
        }
        req.user = user;
        next();
           
    } catch (error) {
        next(error);
    }
}
//
// Doit lire l'en-tête Authorization ("Bearer <token>"), vérifier le token
// avec jwt.verify(), et soit appeler next() en attachant les infos décodées
// à req.user, soit répondre 401 si le token est absent ou invalide.
