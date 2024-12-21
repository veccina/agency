/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
    // API URL
    const API_URL = 'http://localhost:3000/api/portfolio';

// Fetch and render portfolio items
    async function fetchPortfolioItems() {
        try {
            const response = await fetch(API_URL);
            const items = await response.json();
            renderPortfolio(items);
        } catch (error) {
            console.error('Error fetching portfolio items:', error);
        }
    }

// Render portfolio items to the DOM
    function renderPortfolio(items) {
        const portfolioContainer = document.querySelector('#portfolio .row');
        portfolioContainer.innerHTML = ''; // Clear existing items

        items.forEach(item => {
            const portfolioItem = `
            <div class="col-lg-4 col-sm-6 mb-4">
                <div class="portfolio-item">
                    <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal${item.id}">
                        <div class="portfolio-hover">
                            <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                        </div>
                        <img class="img-fluid" src="${item.image}" alt="${item.title}" />
                    </a>
                    <div class="portfolio-caption">
                        <div class="portfolio-caption-heading">${item.title}</div>
                        <div class="portfolio-caption-subheading text-muted">${item.description}</div>
                    </div>
                </div>
            </div>
        `;
            portfolioContainer.innerHTML += portfolioItem;
        });
    }

// Initialize fetch on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', fetchPortfolioItems);
// Handle form submission
    document.querySelector('#addPortfolioForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.querySelector('#portfolioTitle').value;
        const description = document.querySelector('#portfolioDescription').value;
        const image = document.querySelector('#portfolioImage').value;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description, image }),
            });

            if (response.ok) {
                fetchPortfolioItems(); // Refresh portfolio items
                e.target.reset(); // Clear form
            } else {
                console.error('Error adding portfolio item:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });


});
