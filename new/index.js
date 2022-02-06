function mainNav() {
  var mobileToggleContainer = document.querySelector('.main-menu-toggle-container');
  var mobileToggle = document.querySelector('.main-menu-toggle');
  var mobileMenu = document.querySelector('nav');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', function (event) {
      mobileToggleContainer.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    })
  }
}
mainNav();


function date() {
  let year = new Date().getFullYear();
  var cr   = document.querySelector('.copyright span');

  cr.innerHTML = year;
}
date();