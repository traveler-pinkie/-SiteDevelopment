import Model from './model.js';

function updateCommunityTitle(communityName) {
  document.getElementById("communityheaderLF").innerHTML = communityName;
}

window.onload = function () {
  document.addEventListener("DOMContentLoaded", () => {
    var aTags = document.querySelectorAll('.myAnchor');
    aTags.forEach(tag => {
      tag.addEventListener('click', function () {
        var communityName = this.innerHTML;
        updateCommunityTitle(communityName);
      });
    });






    // window.M = new Model(); // CMK added this for testing, feel free to remove/replace
    // console.log(M); // CMK added this for testing, feel free to remove/replace


  });
}
