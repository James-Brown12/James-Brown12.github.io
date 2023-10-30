(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }
  
  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
  })

  /**
   * Scroll with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Home type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skillsContent = select('.skills-content');

  if (skillsContent) {
  new Waypoint({
    element: skillsContent, // Element to watch
    handler: function(direction) {
      if (direction === 'down') {
        let progress = select('.progress .progress-bar', true);

        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    },
    offset: '80%' // Trigger when the element is 80% from the top of the viewport
  });

  // Create a waypoint for when the element is scrolled back up, reset the animation
  new Waypoint({
    element: skillsContent,
    handler: function(direction) {
      if (direction === 'up') {
        let progress = select('.progress .progress-bar', true);

        progress.forEach((el) => {
          // Reset the width to 0% when scrolling back up
          el.style.width = '0%';
        });
      }
    },
    offset: 'bottom-in-view' // Trigger when the element is at the bottom of the viewport
  });
  }

  /**
   * Porfolio filter
   */
  // Select the portfolio container and filter buttons in the global scope
  const portfolioContainer = document.querySelector('.portfolio-container');
  const portfolioFilters = document.querySelectorAll('.portfolio-filters li');
  
  // Add click event listeners to the filter buttons
  portfolioFilters.forEach(filter => {
    filter.addEventListener('click', function () {
      // Remove the 'active' class from all filter buttons
      portfolioFilters.forEach(item => {
        item.classList.remove('active');
      });

      // Add the 'active' class to the clicked filter button
      this.classList.add('active');

      // Get the filter value from the data-filter attribute
      const filterValue = this.getAttribute('data-filter');
      console.log('Filter Value:', filterValue); // Add this line for debugging
      // Select all portfolio items
      const portfolioItems = portfolioContainer.querySelectorAll('.portfolio-item');
      
      // Show or hide portfolio items based on the filter value
      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
          item.style.opacity = 1; 
        } else {
          item.style.opacity = 0;
          setTimeout(() => {
            item.style.display = 'none';
          }, 500);
         
        }
      });
    });
  });


})()