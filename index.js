const addItems = document.querySelector(".add-items"); // form to get input
const itemsList = document.querySelector(".plates"); // list to add to
const items = JSON.parse(localStorage.getItem("items")) || []; // keeps list after page refresh

function addItem(e) {
  e.preventDefault();
  const text = this.querySelector("[name=item]").value;
  const item = { text, done: false }; // const item = { text: text, done: false };

  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `<li><input type="checkbox" data-index = ${i} id = "item${i}" ${
        plate.done ? "checked" : " "
      }><label for="item${i}">${plate.text}</label></li>`;
    })
    .join("");
}
// Listen for a click on .plates <ul> (parent) vs on <li> (child)
function toggleDone(e) {
  if (!e.target.matches("input")) return;
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);

populateList(items, itemsList);

//Check/uncheck all box
