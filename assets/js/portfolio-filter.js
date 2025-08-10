// Portfolio Filter - Simple and Direct Approach
console.log('Portfolio filter script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing portfolio filters...');
    
    // Wait a bit for all elements to be ready
    setTimeout(function() {
        const filterButtons = document.querySelectorAll('#portfolio-flters li');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        console.log('Filter buttons found:', filterButtons.length);
        console.log('Portfolio items found:', portfolioItems.length);
        
        // Log the items and their classes
        portfolioItems.forEach((item, index) => {
            console.log(`Item ${index}:`, item.classList.toString());
        });
        
        if (filterButtons.length > 0 && portfolioItems.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const filterValue = this.getAttribute('data-filter');
                    const buttonText = this.textContent.trim();
                    
                    console.log(`Clicked: ${buttonText} (${filterValue})`);
                    
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => {
                        btn.classList.remove('filter-active');
                    });
                    
                    // Add active class to clicked button
                    this.classList.add('filter-active');
                    console.log('Active class added to:', buttonText);
                    
                    // Apply filter to portfolio items
                    portfolioItems.forEach((item, index) => {
                        if (filterValue === '*') {
                            // Show all items
                            item.style.display = 'block';
                            item.style.opacity = '1';
                            console.log(`Showing item ${index} (All filter)`);
                        } else {
                            // Check if item has the filter class
                            const filterClass = filterValue.replace('.', '');
                            
                            if (item.classList.contains(filterClass)) {
                                // Show item
                                item.style.display = 'block';
                                item.style.opacity = '1';
                                console.log(`Showing item ${index} (has class: ${filterClass})`);
                            } else {
                                // Hide item
                                item.style.display = 'none';
                                item.style.opacity = '0';
                                console.log(`Hiding item ${index} (missing class: ${filterClass})`);
                            }
                        }
                    });
                });
            });
            
            console.log('Portfolio filters initialized successfully!');
        } else {
            console.error('Could not find filter buttons or portfolio items');
        }
    }, 1000);
});

// Also try with window load event as backup
window.addEventListener('load', function() {
    console.log('Window loaded, backup filter initialization...');
    
    setTimeout(function() {
        const filterButtons = document.querySelectorAll('#portfolio-flters li');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        if (filterButtons.length > 0 && portfolioItems.length > 0) {
            // Only initialize if not already done
            let alreadyInitialized = false;
            filterButtons.forEach(button => {
                if (button.hasAttribute('data-filter-initialized')) {
                    alreadyInitialized = true;
                }
            });
            
            if (!alreadyInitialized) {
                console.log('Backup initialization running...');
                filterButtons.forEach(button => {
                    button.setAttribute('data-filter-initialized', 'true');
                    
                    button.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        const filterValue = this.getAttribute('data-filter');
                        console.log('Backup filter clicked:', filterValue);
                        
                        // Remove active class from all buttons
                        filterButtons.forEach(btn => btn.classList.remove('filter-active'));
                        
                        // Add active class to clicked button
                        this.classList.add('filter-active');
                        
                        // Apply filter
                        portfolioItems.forEach(item => {
                            if (filterValue === '*') {
                                item.style.display = 'block';
                                item.style.opacity = '1';
                            } else {
                                const filterClass = filterValue.replace('.', '');
                                if (item.classList.contains(filterClass)) {
                                    item.style.display = 'block';
                                    item.style.opacity = '1';
                                } else {
                                    item.style.display = 'none';
                                    item.style.opacity = '0';
                                }
                            }
                        });
                    });
                });
            }
        }
    }, 2000);
});