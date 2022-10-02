"use strict";

//NOTES APP

const cardDescription = document.querySelector(".Description");
const cardTitle = document.querySelector(".title");
const row = document.querySelector(".row");
const saveBtn = document.querySelector(".btn-primary");

let arr = [].flat(2);

let num = 0;
saveBtn.addEventListener("click", function (e) {
  e.preventDefault();
  makeNotes();
});

const makeNotes = function (e) {
  if (!cardDescription.value && !cardTitle.value) return;
  if (!arr) return;

  const myObj = {
    description: cardDescription.value,
    title: cardTitle.value,
    num: num,
  };
  arr.push(myObj);
  const arrCopy = arr.flat(num);
  localStorage.setItem("notes", JSON.stringify(arrCopy));

  notesLoadHTML(myObj.title, myObj.description, myObj.num);
  num++;
  cardDescription.value = cardTitle.value = "";
};
//prettier-ignore

//IFFE for loading data from local storage
const loadLocalStorage =function() {
    //prettier-ignore
    const data = localStorage.getItem("notes")? JSON.parse(localStorage.getItem("notes")): ''
    if(!data)return
  console.log(data,'local storage data')

    arr.push(data);
    // makeNotes()
    reloadNotes()
  }
loadLocalStorage();

function reloadNotes() {
  const loadArray = arr.flat(arr.length).forEach((value, i) => {
    notesLoadHTML(value.title, value.description, i);
  });
}

const deleteBtn = document.querySelectorAll(".delete");
//prettier-ignore
deleteBtn.forEach((btn) => btn.addEventListener("click", function (e) {
    e.target.closest(".col-sm-6").remove()
    const btnNum = e.target.dataset.no;
    console.log(arr.flat(arr.length))
    const filterArr = arr.flat(arr.length).filter(val=> val.indexof(arr.splice(+btnNum,1)) !==  +btnNum);
  console.log(filterArr)
  })
);

function notesLoadHTML(title, value, index) {
  const html = `
  <div class="col-sm-6 m-2">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${value}</p>
        <button href="#" data-no="${index}" class="btn btn-primary delete">Delete</button>
      </div>
    </div>

   `;
  num = index;
  row.insertAdjacentHTML("afterend", html);
}
