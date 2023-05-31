// Simplify logging
function log(e) {
  console.log(e);
}


// Table of contents scroll tracker
window.addEventListener('DOMContentLoaded', () => {

	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			const id = entry.target.getAttribute('id');
			if (entry.intersectionRatio > 0) {
				document.querySelector(`nav#TableOfContents li a[href="#${id}"]`).parentElement.classList.add('active');
			} else {
				document.querySelector(`nav#TableOfContents li a[href="#${id}"]`).parentElement.classList.remove('active');
			}
		});
	});

	// Track all sections that have an `id` applied
	document.querySelectorAll('.content-section h1[id], .content-section h2[id], .content-section h3[id], .content-section h4[id], .content-section h5[id], .content-section h6[id]').forEach((section) => {
		observer.observe(section);
	});
});


// Select the home social icon parents
function homeSocial() {
  const icons = document.querySelectorAll('svg.home-social');

  if(icons) {
    icons.forEach(function(icon) {
      icon.parentElement.parentElement.classList.add('home-social');
    })
  }
}


// Image Popup Links
function imgLinks() {
  const imgs      = document.querySelectorAll('.content-section figure');
  const imgHolder = document.querySelector('.img-holder');
  const imgClose  = document.querySelector('.img-close');

  imgs.forEach(function(img) {
    const link    = img.querySelector('a');

    if(link) {
      const linkRef = link.getAttribute('href');
      
      link.addEventListener('click', function(e) {
        e.preventDefault();
        imgHolder.classList.add('active');
        imgClose.classList.add('active');
        imgHolder.innerHTML = '<img src="' + linkRef + '">';
  
        imgClose.addEventListener('click', function() {
          imgHolder.classList.remove('active');
          imgClose.classList.remove('active');
        })
  
        imgHolder.addEventListener('click', function(e) {
          if(e.target === imgHolder.querySelector('img')) {
            // Do nothing
          } else {
            imgHolder.classList.remove('active');
            imgClose.classList.remove('active');
          }
        })
      })
    }
  })
}


// Run Scripts
window.addEventListener('load', function () {
  // Add scripts here
  homeSocial();
  imgLinks();
}, false);