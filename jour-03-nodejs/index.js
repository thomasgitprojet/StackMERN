import { readFile, appendFile } from "node:fs/promises";

async function produitsPrixBas () {
    try {
        const response = await readFile('./produits.json');
        const produits = JSON.parse(response);

        if (!Array.isArray(produits)) {
            throw new Error("Impossible de récupérer les produits");
        }

        const produitsFiltres = produits.filter((produit) => produit.prix <= 50);
        console.log(produitsFiltres);
        return produitsFiltres;
    }catch (error) {
        console.log("error");     
    }
}

produitsPrixBas ();

await appendFile("./log.txt", `[${new Date().toISOString()}] Script exécuté\n`);