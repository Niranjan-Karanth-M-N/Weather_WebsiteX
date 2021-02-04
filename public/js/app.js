// const { response } = require("express");

// const { response } = require("express");

// console.log("Client side JS file");
// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const formElement = document.querySelector("form");
const input = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
messageOne.textContent = "";
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = input.value;
  messageOne.textContent = "Loading...!";
  messageTwo.textContent = "";
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageTwo.textContent = "";
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );
});
