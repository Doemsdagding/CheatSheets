//darkmode
function toggleMode() {
    const body = document.body;
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');
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