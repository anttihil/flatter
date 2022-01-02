/* we have a menu button in header that needs an onclick method for 
expanding and collapsing the menu 

Then we need an event listener for clicks such that if menu is expanded, 
then a click on the main content column (not header or the sidebar itself) 
collapses the menu back. 

menu button should have data-expand-id ="navbar"
navbar id should be "navbar"
then getElementById("navbar") and toggle the style.
*/

const main = document.getElementById("main");
const headerMenu = document.getElementById("header-menu");

main.addEventListener("click", function (event) {
  let elementId = event.currentTarget.dataset.hideId;
  console.log(elementId);
  if (!elementId) return;

  let elementToHide = document.getElementById(elementId);
  elementToHide.classList.add("smp:hidden");
});

document.addEventListener("click", function (event) {
  let id = event.target.dataset.toggleSmpHideId;
  if (!id) return;

  let elementToToggle = document.getElementById(id);
  elementToToggle.classList.toggle("smp:hidden");
});

/* main.addEventListener("click", function (event) {
  // these variables catch data-attributes that match to ids of other elements
  for (let dataAttribute in event.currentTarget.dataset) {
    let elem;
    let dataValue = event.currentTarget.dataset[dataAttribute];
    switch (dataAttribute) {
      case "toggleDisplayId":
        elem = document.getElementById(dataValue);
        elem.classList.toggle("hidden");
      case "hideId":
        elem = document.getElementById(dataValue);
        elem.classList.toggle("smp:hidden");
      default:
        break;
    }
  }
}); */

/* document.addEventListener("click", function (event) {
  let elementId = event.target.dataset.hideId;
  console.log(elementId);
  if (!elementId) return;

  let elementToHide = document.getElementById(elementId);
  elementToHide.classList.add("hidden");
}); */
