const API_URL = 'https://script.google.com/macros/s/AKfycbx3MOhX5PlMdMxGA8Z_nBbIt9tuqpvZpFgrpREKJTN9DcJpcAQwHXz7iYkJqskpsd06/exec';



async function fetchUsers() {
 try{
   const response = await fetch(API_URL)
   const users = await response.json();
   return users;
  }catch(err){
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fillCards();
  const next = document.getElementById("next");
  const prev = document.getElementById("prev");
  next.addEventListener("click", function () {
    const currCard = document.querySelector(".card.view");
    const nextCard = currCard.nextElementSibling
      ? currCard.nextElementSibling
      : document.querySelector(".card-container").firstElementChild;
    currCard.classList.remove("view");
    nextCard.classList.add("view");
  });

  setInterval(function(){

    const currCard = document.querySelector(".card.view");
    const nextCard = currCard.nextElementSibling
      ? currCard.nextElementSibling
      : document.querySelector(".card-container").firstElementChild;
    currCard.classList.remove("view");
    nextCard.classList.add("view");

  }, 8000)

  prev.addEventListener("click", function () {
    const currCard = document.querySelector(".card.view");
    const prevCard = currCard.previousElementSibling
      ? currCard.previousElementSibling
      : document.querySelector(".card-container").lastElementChild;
    currCard.classList.remove("view");
    prevCard.classList.add("view");
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prev.click();
    else if (e.key === "ArrowRight") next.click();
    else return false;
  });
});

function fillCards() {

fetchUsers().then(datas => {

  const container = document.querySelector(".card-container");
  datas.forEach((data) => {
    const card = document.createElement("div"),
      cardImage = document.createElement("div"),
      img = document.createElement("img"),
      url = document.createElement("a");
    img.setAttribute("src", data.image);
    img.setAttribute("alt", data.title);
    url.textContent = data.title;
    url.setAttribute("href", data.url);
    url.setAttribute("target", "_parent");
    card.classList.add("card");
    cardImage.classList.add("card-image");
    if (data.title === datas[0].title) {
      card.classList.add("view");
    }
    cardImage.appendChild(img);
    card.appendChild(cardImage);
    card.appendChild(url);
    container.appendChild(card);
  });
})
}
