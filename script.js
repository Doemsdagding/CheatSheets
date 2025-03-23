// Apply the saved mode on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedMode = localStorage.getItem('theme'); // Get the saved theme from localStorage
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
document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('table.inner').forEach(table => {
        table.addEventListener('click', (event) => {
            event.stopPropagation(); 
            openModal(table.outerHTML); 
        });
    });
});

function openModal(tableHtml) {
    const modal = document.getElementById('modal');
    const modalTableContainer = document.getElementById('modal-table-container');
    modalTableContainer.innerHTML = tableHtml; 
    modal.style.display = 'flex'; 
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none'; 
}