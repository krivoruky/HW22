const formElem = document.forms[0];
const titleElem = formElem.title;
const notesElem = formElem.notes;
const cardsElem = document.querySelector(".cards");

let allCards = JSON.parse(localStorage.getItem("cards") ?? "[]");

const resultDoneElem = document.querySelector(".navigation_done_add");
let isDoneCounter = allCards.filter(card => card.isDone).length;
resultDoneElem.innerText = isDoneCounter;

const resultCancelElem = document.querySelector(".navigation_cancelled_add");
let isCanceledCounter = allCards.filter(card => card.isCanceled).length;
resultCancelElem.innerText = isCanceledCounter;

rerender();

formElem.addEventListener("submit", event => {
  event.preventDefault();
  if (titleElem.value === "") return;
  allCards.push({
    title: titleElem.value,
    notes: notesElem.value,
    isDone: false,
    isCanceled: false,
  });
  localStorage.setItem("cards", JSON.stringify(allCards));
  rerender();
});

function rerender() {
  titleElem.value = "";
  notesElem.value = "";
  cardsElem.innerText = "";
  for (let i = 0; i < allCards.length; i++) {
    if (allCards[i].isDone || allCards[i].isCanceled) {
      continue;
    }
    const card = document.createElement("div");
    const doneElem = document.createElement("h2");
    const cardTitleElem = document.createElement("div");
    const doneElemButton = document.createElement("div");
    const cancelledElem = document.createElement("h2");
    const cancelledElemButton = document.createElement("div");

    doneElemButton.addEventListener("click", event => {
      resultDoneElem.innerText = ++isDoneCounter;
      allCards[i].isDone = true;
      localStorage.setItem("cards", JSON.stringify(allCards));
      card.remove();
    });
    cancelledElemButton.addEventListener("click", event => {
      resultCancelElem.innerText = ++isCanceledCounter;
      allCards[i].isCanceled = true;
      localStorage.setItem("cards", JSON.stringify(allCards));
      card.remove();
    });

    card.classList.add("card");
    doneElem.classList.add("title");
    cardTitleElem.classList.add("cardTitle");
    doneElemButton.classList.add("done");
    cancelledElem.classList.add("notes");
    cancelledElemButton.classList.add("cancelled");

    cardsElem.append(card);
    card.append(doneElemButton, cancelledElemButton, cardTitleElem);
    cardTitleElem.append(doneElem, cancelledElem);

    doneElem.innerText = allCards[i].title;
    cancelledElem.innerText = allCards[i].notes;
    doneElemButton.innerText = "✔";
    cancelledElemButton.innerText = "✖";
  }
}
