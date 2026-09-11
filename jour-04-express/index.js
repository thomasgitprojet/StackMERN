import express from "express";

const app = express();  // app est un objet créé par Express

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next(); // sans ça, plus rien ne se passe après
});

app.use(express.json());

const taches = [
  { id: 1, titre: "Créer le serveur Express" },
  { id: 2, titre: "Lire la documentation Express" },
  { id: 3, titre: "Modifier une route existante" },
];

app.get("/", (req, res) => { // déclaration de route   (req, res) => {} fonction callback en deuxième argument ou handler
    res.send("Bonjour");
});

app.listen(3000, () => console.log("serveur sur le port 3000"));

app.get("/api/taches", (req, res) => {
  res.json(taches);
});

app.post("/api/taches", (req, res) => {
  const nouvelleTache = {
    id: taches.length + 1,
    titre: req.body.titre,
  };
  taches.push(nouvelleTache);
  res.status(201).json(nouvelleTache);
});