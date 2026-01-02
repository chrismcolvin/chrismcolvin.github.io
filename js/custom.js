// Table of contents scroll tracker
window.addEventListener('DOMContentLoaded', () => {

	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			const id = entry.target.getAttribute('id');
			if (entry.intersectionRatio > 0) {
				document.querySelector(`nav#TableOfContents li a[href*="#${id}"]`).parentElement.classList.add('active');
			} else {
				document.querySelector(`nav#TableOfContents li a[href*="#${id}"]`).parentElement.classList.remove('active');
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


// Photoroll View Toggle
function photorollToggle() {
  // Get the article
  const article = document.querySelector('article.photoroll');

  // If it exists...
  if(article) {
    // Get the toggle
    const toggle = article.querySelector('.photoroll h2.view-switcher');

    // If it exists...
    if(toggle) {
      // listen for clicks
      toggle.addEventListener('click', function() {
        // Toggle class
        if(toggle.classList.contains('grid')) {
          toggle.classList.add('roll');
          toggle.classList.remove('grid');
          article.classList.add('roll');
          article.classList.remove('grid');
        } else {
          toggle.classList.remove('roll');
          toggle.classList.add('grid');
          article.classList.remove('roll');
          article.classList.add('grid');
        }
      })
    }
  }
}


// Portfolio filters
function filtersFn() {
  // Get the filter buttons
  const filterBtns = document.querySelectorAll('button.filter');
  // Get the filter items
  const filterItems = document.querySelectorAll('[data-filter]');

  // If there are any...
  if(filterBtns.length > 0 && filterItems.length > 0) {
    // For each button
    filterBtns.forEach(function(filterBtn) {
      // When clicked
      filterBtn.addEventListener('click', function() {
        // Get the ID
        const btnID = this.getAttribute('id');

        // Add active class, but remove the active class from all other buttons
        filterBtns.forEach(function(filterBtn) {
          filterBtn.classList.remove('active');
        })
        this.classList.add('active');

        // For each filter item
        filterItems.forEach(function(filterItem) {
          // If the filter data does not match the button ID, otherwise don't hide
          if(filterItem.getAttribute('data-filter') != btnID) {
            filterItem.classList.add('hide');
          } else {
            filterItem.classList.remove('hide');
          }
        })

        // However, if 'All' is clicked, show all
        if(btnID === 'all') {
          filterItems.forEach(function(filterItem) {
            filterItem.classList.remove('hide');
          })
        }
      })
    })
  } else {
    console.warn('No filters found!');
  }
}


// Run Scripts
window.addEventListener('load', function () {
  // Add scripts here
  homeSocial();
  imgLinks();
  photorollToggle();
  filtersFn();
}, false);