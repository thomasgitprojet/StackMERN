const compteur = {
  valeur: 0,
  incrementer() {
    this.valeur++;
    console.log(this.valeur);
  },
};

compteur.incrementer();

// const fonctionIsolee = compteur.incrementer;
// fonctionIsolee();

// setTimeout(compteur.incrementer, 1000);
setTimeout(() => compteur.incrementer(), 1000);