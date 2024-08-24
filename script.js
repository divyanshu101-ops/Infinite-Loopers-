// GSAP Animation for the Search Bar
document.addEventListener('DOMContentLoaded', () => {
    const searchIcon = document.getElementById("search-icon");
    const searchInput = document.getElementById("search-input");
    const searchContainer = document.querySelector(".search-container");
    const searchResults = document.getElementById("search-results");

    // Initial state
    gsap.set(searchInput, {
        width: 0,
        opacity: 0,
        padding: 0,
        ease: "power1.inOut",
        duration: 0.4
    });

    // Hover Animation
    searchIcon.addEventListener('mouseenter', () => {
        gsap.to(searchInput, {
            width: "500px",
            opacity: 1,
            padding: "25px 30px",
            duration: 0.4,
            ease: "power1.out"
        });
    });

    // Animation on Mouse Out
    searchContainer.addEventListener('mouseleave', () => {
        gsap.to(searchInput, {
            width: 0,
            opacity: 0,
            padding: 0,
            duration: 0.4,
            ease: "power1.in"
        });
        // Hide search results when input is hidden
        gsap.to(searchResults, {
            opacity: 0,
            visibility: 'hidden',
            duration: 0.3
        });
    });

    // Fetch and display search results
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        
        if (query) {
            // Example: Replace with actual API call or search logic
            const results = getSearchResults(query);
            
            // Display search results
            if (results.length > 0) {
                searchResults.innerHTML = results.map(result => `
                    <a href="${result.url}" class="result-item">${result.name}</a>
                `).join('');
                // Show search results
                gsap.to(searchResults, {
                    opacity: 1,
                    visibility: 'visible',
                    duration: 0.3
                });
            } else {
                searchResults.innerHTML = '<div class="result-item">No results found</div>';
                gsap.to(searchResults, {
                    opacity: 1,
                    visibility: 'visible',
                    duration: 0.3
                });
            }
        } else {
            // Hide search results when query is empty
            gsap.to(searchResults, {
                opacity: 0,
                visibility: 'hidden',
                duration: 0.3
            });
        }
    });

    // Dummy search results function
    function getSearchResults(query) {
        // Replace with real data fetching logic
        const dummyData = [
            { name: 'Action Movie 1', url: '#action1' },
            { name: 'Action Movie 2', url: '#action2' },
            { name: 'Comedy Show 1', url: '#comedy1' },
            { name: 'Drama Film 1', url: '#drama1' },
            // Add more dummy data as needed
        ];

        return dummyData.filter(item => item.name.toLowerCase().includes(query));
    }
});
