"use strict";

//NOTES APP

const cardDescription = document.querySelector(".Description");
const cardTitle = document.querySelector(".title");
const row = document.querySelector(".row");
const saveBtn = document.querySelector(".btn-success");

let arr = [];
let num = 0;

saveBtn.addEventListener("click", function (e) {
  e.preventDefault();
  makeNotes();
  location.reload();
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
  const arrCopy = arr.flat(arr.length);

  localStorage.setItem("notes", JSON.stringify(arrCopy));

  notesLoadHTML(myObj.title, myObj.description, myObj.num);
  num++;
  cardDescription.value = cardTitle.value = "";
};
//prettier-ignore

// for loading data from local storage
const loadLocalStorage =function() {
    //prettier-ignore
    const data = localStorage.getItem("notes")? JSON.parse(localStorage.getItem("notes")): ''
    if(!data)return
  // console.log(data,'local storage data')

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
deleteBtn.forEach((btn) =>{ btn.addEventListener("click", function (e) {
    e.target.closest(".col-sm-6").remove()
    const btnNum = e.target.dataset.no;
    // console.log(btnNum)
    const filterArr = arr.flat(arr.length)
    console.log(filterArr.splice(+btnNum, 1));
  const data=  filterArr.filter((val) =>val);
  // console.log(data)
  arr=[]
  arr.push(data)
  localStorage.removeItem('notes')
  localStorage.setItem('notes',JSON.stringify(data))
  location.reload()
  })}
);

function notesLoadHTML(title, value, index) {
  const html = `
  <div class="col-sm-6 m-2">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${value}</p>
        <button href="#" data-no="${index}" class="btn btn-danger delete">Delete</button>
        <button type="button" class="btn btn-primary modal-btn" data-bs-toggle="modal" data-bs-target="#exampleModal"
    data-bs-whatever="@mdo">Edit</button>
      </div>
    </div>
   `;
  num = index;
  row.insertAdjacentHTML("afterend", html);
}

/******creating modal to edit notes again after creating ******/

//using modal title ,description,and update btn to push every thing
const modalTitle = document.querySelector(".modal_title");
const modalDescr = document.querySelector(".modal_description");
const updateModalBtn = document.querySelector(".Update-btn");

//taking modal btn from js-HTML then using queryselectorAll s
const modalBtn = document.querySelectorAll(".modal-btn");
// console.log(modalBtn);
modalBtn.forEach((val) => {
  val.addEventListener("click", function (e) {
    //selecting dataset-no. to find the element in array
    const dataNo = e.target.closest(".card").querySelector(".delete")
      .dataset.no;
    // console.log(+dataNo);
    // getting value from array on edit button click and the value will be passed to modal input tag /\
    const noteData = arr.flat(arr.length).forEach((val, i) => {
      if (i === +dataNo) {
        // console.log(val.title, val.description);
        modalTitle.value = val.title;
        modalDescr.textContent = val.description;
      }
    });

    //using event listner on update btn for pushing the changed data to notesDataInModal then pass it
    updateModalBtn.addEventListener("click", function (e) {
      //object created to get modal title and description
      if (!modalTitle.value && !modalDescr.value) return;
      const notesDataInModal = {
        title: modalTitle.value,
        description: modalDescr.value,
        num: +dataNo,
      };

      console.log(
        notesDataInModal.title,
        notesDataInModal.description
        // notesDataInModal.num
      );
      // pushing notesDataInModal object in arr before pushing we have to store it and then change and after that push it

      const modalArr = arr.flat(arr.length);
      modalArr.splice(+dataNo, 1, notesDataInModal);
      console.log(modalArr);
      arr = [];
      arr.push(modalArr);
      localStorage.removeItem("notes");
      localStorage.setItem("notes", JSON.stringify(modalArr));
      location.reload()
    });
  });
});


