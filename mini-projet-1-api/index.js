import express from "express";
import tachesRoutes from "./routes/taches.routes.js";

const app = express();
app.use(express.json());
app.use("/api/taches", tachesRoutes);

app.listen(3000, () => console.log("serveur sur le port 3000"));