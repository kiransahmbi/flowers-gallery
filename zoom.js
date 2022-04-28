"use strict"; // interpret document contents in JavaScript strict mode

/* global variables */
var photoOrderArray = window.opener.photoOrder;
var figFilename = "images/IMG_0" + photoOrderArray[2] + ".jpg";
var favouritesArray = window.opener.favouritesArray;
var favouriteBtnContainer = document.querySelector("#favourites-btn-container");
var favouriteBtn = document.querySelector("#favourites-btn");


/* populate img element and create event listener */
function pageSetup() {
   document.getElementsByTagName("img")[0].src = figFilename; // assign filename to img element
   createEventListener();
}

/* close window */
function closeWin() {
   window.close();
}

/* create event listener for close button */
function createEventListener() {
   var closeWindowDiv = document.getElementById("close-window-container");
   if (closeWindowDiv.addEventListener) {
     closeWindowDiv.addEventListener("click", closeWin, false); 
   } else if (closeWindowDiv.attachEvent)  {
     closeWindowDiv.attachEvent("onclick", closeWin);
   }

   if (favouritesArray.includes(figFilename)) {
      favouriteBtn.src = "images/after_favorite.png";
   }
   else {
      favouriteBtn.src = "images/before_favorite.png";
   }
}

/* add img src value and create event listener when page finishes loading */
window.onload = pageSetup;

//If favourite button is clicked, add to favourites or remove.
favouriteBtnContainer.addEventListener("click", () => {
   if (favouritesArray.includes(figFilename)) {
      favouriteBtn.src = "images/before_favorite.png";
      window.opener.removeFromFavourites(figFilename);
      window.close();
   }
   else {
      if (window.opener.favouritesArray.length == 5) {
         alert("You have added a maximum of 5 favourites. Please remove one to proceed");
      }
      else {
         favouriteBtn.src = "images/after_favorite.png";
         window.opener.addToFavourites(figFilename);
         window.close();
      }
      
   }
});