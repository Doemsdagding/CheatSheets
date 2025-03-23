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

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none'; 
}

//mobile support
document.addEventListener("DOMContentLoaded", () => {
    const rearrangeTable = () => {
      const rows = document.querySelectorAll("table tbody tr");
  
      rows.forEach((row) => {
        const columnA = row.children[0]; // First column (A)
        const columnB = row.children[1]; // Second column (B)
  
        if (window.innerWidth <= 1000) {
          // Move column B content under column A
          if (columnB && !columnA.querySelector(".mobile-content")) {
            const mobileContent = document.createElement("div");
            mobileContent.className = "mobile-content";
            mobileContent.innerHTML = columnB.innerHTML;
            mobileContent.style.marginTop = "10px"; // Add spacing
            mobileContent.style.color = "#555"; // Optional styling
            columnA.appendChild(mobileContent);
          }
        } else {
          // Remove mobile content if screen is resized back to desktop
          const mobileContent = columnA.querySelector(".mobile-content");
          if (mobileContent) {
            mobileContent.remove();
          }
        }
      });
    };
  
    // Run on page load and on window resize
    rearrangeTable();
    window.addEventListener("resize", rearrangeTable);
  });

  document.addEventListener('DOMContentLoaded', () => {
    const updateTableClickability = () => {
        const tables = document.querySelectorAll('table.inner');

        tables.forEach((table) => {
            if (window.innerWidth <= 1000) {
                // Disable clicks on mobile
                table.classList.add('unclickable');
            } else {
                // Enable clicks on desktop
                table.classList.remove('unclickable');
            }
        });
    };

    // Run on page load and on window resize
    updateTableClickability();
    window.addEventListener('resize', updateTableClickability);
});