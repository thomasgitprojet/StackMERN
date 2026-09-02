import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Repris tel quel du Jour 9 — l'inscription/connexion n'est pas la
// nouveauté du jour, la relation Tache → User l'est.
export async function register(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Mot de passe trop court" });
    }

    const utilisateurExistant = await User.findOne({ email });
    if (utilisateurExistant) {
      return res.status(400).json({ message: "Email déjà existant" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ id: user._id, email: user.email });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const utilisateurExistant = await User.findOne({ email });
    if (!utilisateurExistant) {
      return res.status(401).json({ message: "Mot de passe ou email incorrect" });
    }

    const passwordValid = await bcrypt.compare(password, utilisateurExistant.password);
    if (!passwordValid) {
      return res.status(401).json({ message: "Mot de passe ou email incorrect" });
    }

    const token = jwt.sign({ id: utilisateurExistant._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
}
