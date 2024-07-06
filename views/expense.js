const form = document.getElementById("expenseForm");

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const amount = document.getElementById("expenseAmount").value;
    const description = document.getElementById("expenseDescription").value; // Corrected typo here
    const category = document.getElementById("category").value;

    const formDetails = {
        amount: amount,
        description: description,
        category: category
    };

    // Create new expense via backend endpoint
    fetch('/api/expenses', { // Corrected endpoint URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDetails)
    })
    .then(response => response.json())
    .then(newExpense => {
        console.log('Expense saved:', newExpense);
        setDetails(newExpense); // Update frontend UI with newly created expense
    })
    .catch(error => console.error('Error saving expense:', error));
});

function setDetails(formDetails) {
    const listParent = document.getElementById("parent-button");
    const createList = document.createElement('li');
    createList.textContent = `Amount Spent: ${formDetails.amount}, Description: ${formDetails.description}, Category: ${formDetails.category}`;

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.marginLeft = '5px';
    deleteButton.style.padding = '5px 10px';
    deleteButton.style.border = '1px solid #ccc';
    deleteButton.style.backgroundColor = '#f0f0f0';
    deleteButton.style.cursor = 'pointer';
    deleteButton.addEventListener('click', function() {
        // Delete expense via backend endpoint
        fetch(`/api/expenses/${formDetails.id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                listParent.removeChild(createList);
            } else {
                throw new Error('Failed to delete expense');
            }
        })
        .catch(error => console.error('Error deleting expense:', error));
    });

    // Edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.style.marginLeft = '5px';
    editButton.style.padding = '5px 10px';
    editButton.style.border = '1px solid #ccc';
    editButton.style.backgroundColor = '#f0f0f0';
    editButton.style.cursor = 'pointer';
    editButton.addEventListener('click', function() {
        // Populate form fields with existing details for editing
        document.getElementById("expenseAmount").value = formDetails.amount;
        document.getElementById("expenseDescription").value = formDetails.description;
        document.getElementById("category").value = formDetails.category;

        // Update expense via backend endpoint
        fetch(`/api/expenses/${formDetails.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: formDetails.amount,
                description: formDetails.description,
                category: formDetails.category
            })
        })
        .then(response => response.json())
        .then(updatedExpense => {
            console.log('Expense updated:', updatedExpense);
            setDetails(updatedExpense); // Update frontend UI with updated expense
        })
        .catch(error => console.error('Error updating expense:', error));
    });

    // Append buttons to the list item
    createList.appendChild(deleteButton);
    createList.appendChild(editButton);

    listParent.appendChild(createList);
}

// Initial load to fetch and display stored expenses
window.onload = function() {
    fetch('studentExpense/expenses')
        .then(response => response.json())
        .then(expenses => {
            expenses.forEach(expense => {
                setDetails(expense);
            });
        })
        .catch(error => console.error('Error fetching expenses:', error));
};