import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// Repris tel quel du Jour 9 — la protection de routes n'est pas la
// nouveauté du jour, l'appliquer aux routes de tâches l'est.
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
