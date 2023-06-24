const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".links");
const shorten = document.querySelector(".shorten");
const input = document.querySelector("input");
const sub = document.querySelector(".one_sub");
const two = document.querySelector(".two");
const h2 = document.querySelector("h2");
const small = document.querySelector("small");

hamburger.addEventListener("click", function () {
  menu.classList.toggle("active");
  if (menu.classList.contains("active")) {
    hamburger.setAttribute("src", "./images/icon-close.svg");
  } else {
    hamburger.setAttribute("src", "./images/icon-hamburger.svg");
  }
});

shorten.addEventListener("click", (e) => {
  let inputValue = input.value;
  input.value = "";
  if (input.value.trim() === "") {
    e.preventDefault();
    input.style.border = "2px solid hsl(0, 87%, 67%)";
    small.style.visibility = "visible";
  }

  e.preventDefault();

  fetch(`https://api.shrtco.de/v2/shorten?url=${inputValue}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    })
    .then(function (data) {
      const div = document.createElement("div");
      div.setAttribute("class", "gotten_link");

      const div2 = document.createElement("div");
      div2.setAttribute("class", "last_two");

      const p1 = document.createElement("p");
      p1.setAttribute("class", "original_link");

      const p2 = document.createElement("p");
      p2.setAttribute("class", "short_link");

      p1.textContent = data.result.original_link;
      p2.textContent = data.result.full_short_link;

      div.appendChild(p1);

      div2.appendChild(p2);
      div.appendChild(div2);

      const button = document.createElement("button");
      button.setAttribute("class", "copy");
      button.textContent = "Copy";

      div2.appendChild(button);

      two.insertBefore(div, h2);
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
});
