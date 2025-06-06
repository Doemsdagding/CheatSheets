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
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };
//disable modal on mobile
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalLeft = document.querySelector('.modal-zone.modal-left');
    const modalRight = document.querySelector('.modal-zone.modal-right');

    console.log('isMobileDevice:', isMobileDevice());
    console.log('modalLeft:', modalLeft);
    console.log('modalRight:', modalRight);

    if (modal && modalLeft && modalRight && isMobileDevice()) {
        // Disable click functionality for modal zones
        modalLeft.onclick = null;
        modalRight.onclick = null;

        // Optionally, add a class to visually indicate they are disabled
        modalLeft.classList.add('disabled');
        modalRight.classList.add('disabled');
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

// Ensure swipe event listeners are added only once
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');

    if (modal) {
        // Use a flag to ensure listeners are added only once
        if (!modal.dataset.listenersAdded) {
            modal.addEventListener('touchstart', handleTouchStart);
            modal.addEventListener('touchmove', handleTouchMove);
            modal.addEventListener('touchend', handleTouchEnd);

            // Mark that listeners have been added
            modal.dataset.listenersAdded = true;
        }
    }
});
// Swipe support for modals
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 100;
let swipeInProgress = false; 

// Handle touchstart event
function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    touchEndX = touchStartX;
}

// Handle touchmove event
function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
}

// Handle touchend event
function handleTouchEnd() {
    if (!swipeInProgress) {
        swipeInProgress = true; 
        handleSwipe();
        setTimeout(() => {
            swipeInProgress = false; 
        }, 300); 
    }
}

// Detect swipe direction
function handleSwipe() {
    if (touchEndX < touchStartX - swipeThreshold) {
        nextModal();
    } else if (touchEndX > touchStartX + swipeThreshold) {
        previousModal();
    } 
}
//show swipe hint
function showSwipeHint() {
    const swipeHint = document.getElementById('swipe-hint');
    swipeHint.style.display = 'block';
    setTimeout(() => {
        swipeHint.style.display = 'none';
    }, 3000); 
}

