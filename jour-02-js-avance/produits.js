const produits = [
  { nom: "Clavier mécanique", prix: 79, categorie: "informatique" },
  { nom: "Souris sans fil", prix: 25, categorie: "informatique" },
  { nom: "Écran 27 pouces", prix: 210, categorie: "informatique" },
  { nom: "Casque audio", prix: 60, categorie: "informatique" },
  { nom: "Chaise de bureau", prix: 150, categorie: "mobilier" },
  { nom: "Bureau réglable", prix: 320, categorie: "mobilier" },
  { nom: "Étagère murale", prix: 45, categorie: "mobilier" },
  { nom: "Cahier ligné", prix: 3, categorie: "papeterie" },
  { nom: "Stylo plume", prix: 12, categorie: "papeterie" },
  { nom: "Bloc-notes", prix: 5, categorie: "papeterie" },
];

// TODO (exercice 2) :
// 1. Avec filter() + map(), récupère la liste des noms des produits
//    d'une catégorie donnée (par exemple "informatique").
// 2. Avec reduce(), calcule le prix total de TOUS les produits.
// 3. Affiche les deux résultats avec console.log().


//1

const nomsProduits = produits
  .filter((produit) => produit.categorie === "informatique")
  .map((produit) => produit.nom);
  

//2

const prixTotal = produits.reduce((total, produit) => total + produit.prix, 0);

//3

console.log(nomsProduits);
console.log(prixTotal);

//4

const augmentationPrix = {
  augmentation: 0,
  incrementer() {
    this.augmentation += 10;
    console.log(this.augmentation);
  }
};

augmentationPrix.incrementer();

const nouveauTotal = produits
  .map((produit) => produit.prix + augmentationPrix.augmentation)
  .reduce((total, prix) => total + prix, 0);

console.log(nouveauTotal);

produits.forEach(() => augmentationPrix.incrementer()); //ceci n'a aucun sens, juste pour l'exemple