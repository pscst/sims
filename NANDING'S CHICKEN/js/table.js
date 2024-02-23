const search = document.querySelector('.input-group input');
const tablerows = document.querySelectorAll('tbody tr');
const table_headings = document.querySelectorAll('thead th.main_th');
const noResultsMessage = document.getElementById('noResultsMessage');

// Searching for specific data of HTML table
search.addEventListener('input', searchTable);

function searchTable() {
    let anyVisibleRows = false;

    tablerows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search.value.toLowerCase();

        const isVisible = table_data.indexOf(search_data) >= 0;
        row.classList.toggle('hide', !isVisible);
        row.style.setProperty('--delay', isVisible ? (i / 25 + 's') : '0s');
        
        if (isVisible) {
            anyVisibleRows = true;
        }
    });

    document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
        visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
    });

    // Toggle visibility of no results message
    noResultsMessage.classList.toggle('hidden', anyVisibleRows);
}


// Sorting | Ordering data of HTML table

table_headings.forEach((head, i) => {
    let sort_asc = true;
    head.onclick = () => {
        table_headings.forEach(head => head.classList.remove('active'));
        head.classList.add('active');

        document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
        tablerows.forEach(row => {
            row.querySelectorAll('td')[i].classList.add('active');
        });

        head.classList.toggle('asc', sort_asc);
        sort_asc = head.classList.contains('asc') ? false : true;

        sortTable(i, sort_asc);
    };
});

function sortTable(column, sort_asc) {
    [...tablerows]
        .sort((a, b) => {
            let first_row = a.querySelectorAll('td')[column].textContent,
                second_row = b.querySelectorAll('td')[column].textContent;

            // Convert values to numbers for numeric sorting
            let num1 = parseFloat(first_row);
            let num2 = parseFloat(second_row);

            // Check if the conversion is successful before comparing
            if (!isNaN(num1) && !isNaN(num2)) {
                return sort_asc ? num1 - num2 : num2 - num1;
            } else {
                // If the conversion fails, fall back to string comparison
                return sort_asc ? first_row.localeCompare(second_row) : second_row.localeCompare(first_row);
            }
        })
        .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
}


// Pagination

let itemsPerPage = 30;
let currentPage = 1;
const table_rows = document.querySelectorAll('.table_body table tbody tr');

function showPage(pageNumber) {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  table_rows.forEach((row, i) => {
    row.classList.toggle('hide', i < startIndex || i >= endIndex);
    row.style.setProperty('--delay', (i % itemsPerPage) / 25 + 's');
  });

  // Update pagination information
  const totalEntries = table_rows.length;
  const currentPageEntries = Math.min(itemsPerPage, totalEntries - startIndex);
  const startEntry = startIndex + 1;
  const endEntry = startIndex + currentPageEntries;

  document.getElementById('paginationInfo').textContent = `Showing ${startEntry} to ${endEntry} out of ${totalEntries}`;
  
  // Reset horizontal scroll position
  document.querySelector('.table_body table').scrollLeft = 0;

}


function updatePaginationButtons() {
  document.getElementById('prevBtn').disabled = currentPage === 1;
  document.getElementById('nextBtn').disabled = currentPage === Math.ceil(table_rows.length / itemsPerPage);
}

document.getElementById('prevBtn').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    showPage(currentPage);
    updatePaginationButtons();
  }
});

document.getElementById('nextBtn').addEventListener('click', () => {
  if (currentPage < Math.ceil(table_rows.length / itemsPerPage)) {
    currentPage++;
    showPage(currentPage);
    updatePaginationButtons();
  }
});

function updateItemsPerPage() {
  itemsPerPage = parseInt(document.getElementById('perPage').value);
  currentPage = 1; // Reset to the first page when changing items per page
  showPage(currentPage);
  updatePaginationButtons();
  updatePaginationInfo(); // Call the function to update pagination information
}

function updatePaginationInfo() {
  const totalEntries = table_rows.length;
  document.getElementById('paginationInfo').textContent = `Showing 1 to ${itemsPerPage} out of ${totalEntries}`;
}


// Initial setup
showPage(currentPage);
updatePaginationButtons();
updatePaginationInfo();


