// Apply the saved mode on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedMode = localStorage.getItem('theme'); 
    if (savedMode === 'dark-mode') {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    }

    // Add event listeners for table modals (if needed)
    document.querySelectorAll('table.inner').forEach(table => {
        table.addEventListener('click', (event) => {
            event.stopPropagation();
            openModal(table.outerHTML);
        });
    });
});
//darkmode
function toggleMode() {
    const body = document.body;
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');

    // Save the current mode to localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
    } else {
        localStorage.setItem('theme', 'light-mode');
    }
}
//modal
let modalTables = [];
let currentModalIndex = 0;

// Initialize modal tables on page load
document.addEventListener('DOMContentLoaded', () => {
    modalTables = Array.from(document.querySelectorAll('table.inner'));
});

// Open modal with specific table content
function openModal(tableHtml, index) {
    const modal = document.getElementById('modal');
    const modalTableContainer = document.getElementById('modal-table-container');
    const nextButton = document.querySelector('.modal-next');
    const backButton = document.querySelector('.modal-back');

    modalTableContainer.innerHTML = tableHtml;
    modal.style.display = 'flex';
    currentModalIndex = index;

    // Hide the "Next" button if it's the last modal
    if (currentModalIndex === modalTables.length - 1) {
        nextButton.style.display = 'none';
    } else {
        nextButton.style.display = 'block';
    }
    // Hide the "Back" button if it's the first modal
    if (currentModalIndex === 0) {
        backButton.style.display = 'none';
    } else {
        backButton.style.display = 'block';
    }

    modal.addEventListener('click', (event) => {
        const isModalZone = event.target.classList.contains('modal-zone');
        if (event.target === modal && !isModalZone) {
            closeModal();
        }
    });

    //show swipe hint
    if (isMobileDevice()) {
        showSwipeHint();
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Go to the next modal
function nextModal() {
    if (currentModalIndex < modalTables.length - 1) {
        currentModalIndex++;
        const nextTableHtml = modalTables[currentModalIndex].outerHTML;
        openModal(nextTableHtml, currentModalIndex);
    }
}
// Go to the previous modal
function previousModal() {
    if (currentModalIndex > 0) {
        currentModalIndex--;
        const previousTableHtml = modalTables[currentModalIndex].outerHTML;
        openModal(previousTableHtml, currentModalIndex);
    }
}

// Add event listeners to tables
document.addEventListener('DOMContentLoaded', () => {
    modalTables.forEach((table, index) => {
        table.addEventListener('click', (event) => {
            event.stopPropagation();
            openModal(table.outerHTML, index);
        });
    });
});

//download html
function downloadTemplate() {
    const link = document.createElement('a');
    link.href = 'HTMLTEMPLATE.html'; 
    link.download = 'HTMLTEMPLATE.html'; 
    link.click();
}

//mobile support on load
function isMobileDevice() {
    //const userAgent = navigator.userAgent || window.opera; // Removed navigator.vendor
   // return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    return true
}

// Disable modals on mobile devices
document.addEventListener('DOMContentLoaded', () => {
    if (isMobileDevice()) {
        const modals = document.querySelectorAll('#modal');
        modals.forEach(modal => {
            modal.style.pointerEvents = 'none'; // Disable clicks for the modal

            // Re-enable pointer events for the modal close button
            const closeButtons = modal.querySelectorAll('.modal-close'); // Adjust selector to match your close button
            closeButtons.forEach(button => {
                button.style.pointerEvents = 'auto'; // Re-enable clicks for the close button
            });

            // Allow clicking outside the modal to close it
            modal.addEventListener('click', (event) => {
                const isModalZone = event.target.classList.contains('modal-zone');
                if (event.target === modal && !isModalZone) {
                    closeModal();
                }
            });
        });
    }
});

// Automatically open the first modal on smaller screens
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth < 1000 && modalTables.length > 0) {
        // Open the first modal
        const firstTableHtml = modalTables[0].outerHTML;
        openModal(firstTableHtml, 0);
    }
});
/// Resize support with significant change detection
let resizeTimeout;
let lastWidth = window.innerWidth;

window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const currentWidth = window.innerWidth;
        const widthChangeThreshold = 100;

        if (Math.abs(currentWidth - lastWidth) > widthChangeThreshold) {
            lastWidth = currentWidth;

            if (window.innerWidth < 1000 && modalTables.length > 0) {
                const modal = document.getElementById('modal');
                if (modal.style.display === 'none') {
                    const firstTableHtml = modalTables[0].outerHTML;
                    openModal(firstTableHtml, 0);
                }
            }
        }
    }, 200); 
});

//swipe mobile support
let touchStartX = 0;
let touchEndX = 0;

// Detect swipe direction
function handleSwipe() {
    const swipeThreshold = 50; 
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left: Go to the next modal
        nextModal();
    } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right: Go to the previous modal
        previousModal();
    }
}

// Add touch event listeners to the modal
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');

    modal.addEventListener('touchstart', (event) => {
        touchStartX = event.touches[0].clientX; 
    });

    modal.addEventListener('touchmove', (event) => {
        touchEndX = event.touches[0].clientX; 
    });

    modal.addEventListener('touchend', () => {
        handleSwipe(); // 
    });
});


function showSwipeHint() {
    const swipeHint = document.getElementById('swipe-hint');
    swipeHint.style.display = 'block';
    setTimeout(() => {
        swipeHint.style.display = 'none';
    }, 6000); 
}

