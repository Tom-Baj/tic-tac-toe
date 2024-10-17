const cases = document.querySelectorAll(".case");
const choixTour = document.querySelector(".choix-tour");
const resetButton = document.querySelector(".reinitialiser");

let joueur1 = "X";
let joueur2 = "O";

let tour = 0;
let scoreJoueur1 = 0;
let scoreJoueur2 = 0;

let plateau = ["", "", "", "", "", "", "", "", ""];

function placerSymbole(cell) {
  if (tour % 2 === 0) {
    cell.textContent = joueur1;
    plateau[cell.id] = joueur1;
    cell.classList.add("joueur1");
  } else {
    cell.textContent = joueur2;
    plateau[cell.id] = joueur2;
    cell.classList.add("joueur2");
  }
}

function changerJoueur() {
  if (!gagnant) {
    tour++;
    if (tour % 2 === 0) {
      choixTour.textContent = "C'est au tour du joueur X";
    } else {
      choixTour.textContent = "C'est au tour du joueur O";
    }
  }
}

let gagnant = "";

function verifierVictoire() {
  const victoire = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  for (let combinaison of victoire) {
    const [a, b, c] = combinaison;

    if (plateau[a] && plateau[a] === plateau[b] && plateau[a] === plateau[c]) {
      gagnant = plateau[a];
      cases[a].classList.add("gagnant");
      cases[b].classList.add("gagnant");
      cases[c].classList.add("gagnant");
      break;
    }
  }

  if (gagnant) {
    choixTour.textContent = `Le joueur ${gagnant} a gagné !`;
    cases.forEach((cell) => (cell.style.pointerEvents = "none"));
    if (gagnant === joueur1) {
      scoreJoueur1++;
      document.getElementById("scoreX").textContent = scoreJoueur1;
    } else {
      scoreJoueur2++;
      document.getElementById("scoreO").textContent = scoreJoueur2;
    }
    console.log(
      `Score Joueur X: ${scoreJoueur1}, Score Joueur O: ${scoreJoueur2}`
    );
  }
}

function verifierMatchNul() {
  if (!plateau.includes("") && !gagnant) {
    choixTour.textContent = "Match nul !";
  }
}

function reinitialiserJeu() {
  plateau = ["", "", "", "", "", "", "", "", ""];
  cases.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("joueur1", "joueur2");
  });
  tour = 0;
  gagnant = "";
  choixTour.textContent = "C'est au tour du joueur X";
  cases.forEach((cell) => (cell.style.pointerEvents = "auto"));
  const blink = document.querySelectorAll(".gagnant");

  blink.forEach((cell) => cell.classList.remove("gagnant"));
}

cases.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (cell.textContent === "") {
      placerSymbole(cell);
      verifierVictoire();
      verifierMatchNul();
      changerJoueur();
    }
    console.log(plateau);
  });
});

if (gagnant || !plateau.includes("")) {
  cases.forEach((cell) => (cell.style.pointerEvents = "none"));
}

resetButton.addEventListener("click", reinitialiserJeu);
