

document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.add-btn');
    const modal = document.getElementById('crud-modal');
    const updateModal = document.getElementById('updateRecords');
    const updateButtons = document.querySelectorAll('.edit-btn');

    // Add event listener for the add button
    addButton.addEventListener('click', function() {
        toggleModal(modal);
    });

    // Loop through each edit button and attach event listener
    updateButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            toggleModal(updateModal);
        });
    });

    // Add event listener for the close button in the update modal
    const updateCloseButton = updateModal.querySelector('.close-btn');
    updateCloseButton.addEventListener('click', function() {
        closeModal(updateModal);
    });

    // Add event listener for the close button in the main modal
    const mainCloseButton = modal.querySelector('.close-btn');
    mainCloseButton.addEventListener('click', function() {
        closeModal(modal);
    });

    function toggleModal(modal) {
        modal.classList.toggle('hidden');
        modal.classList.add('bg-gray-900/50', 'z-40', 'justify-center', 'items-center', 'flex');
        document.body.classList.toggle('overflow-hidden');
    }

    function closeModal(modal) {
        modal.classList.add('hidden');
        modal.classList.remove('bg-gray-900/50', 'z-40', 'justify-center', 'items-center', 'flex');
        document.body.classList.remove('overflow-hidden');
    }
});

function confirmSubmit(message) {
    return confirm(message);
}
