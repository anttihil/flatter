"use strict";

const navOverlay = document.getElementById("navOverlay");
const headerMenu = document.getElementById("headerMenu");
const navbar = document.getElementById("navbar");

navOverlay.addEventListener("click", function (event) {
  navbar.classList.add("hidden");
  navOverlay.classList.add("hidden");
  navOverlay.classList.remove("opacity-50");
  navOverlay.classList.add("opacity-0");
});

headerMenu.addEventListener("click", function (event) {
  navbar.classList.remove("hidden");
  navOverlay.classList.remove("hidden");
  navOverlay.classList.remove("opacity-0");
  navOverlay.classList.add("opacity-50");
});
