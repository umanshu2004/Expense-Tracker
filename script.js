
const form = document.getElementById('expense-form');
const list = document.getElementById('expenses-list');
const totalDisplay = document.getElementById('total');
const filterCategory = document.getElementById('filter-category');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function updateExpenses(filtered = 'All') {
  list.innerHTML = '';
  let total = 0;
  expenses.forEach((exp, index) => {
    if (filtered === 'All' || exp.category === filtered) {
      const div = document.createElement('div');
      div.className = 'expense-item';
      div.innerHTML = `
        <span>${exp.date} - ${exp.title} - ₹${exp.amount} (${exp.category})</span>
        <span class="expense-actions">
          <button onclick="editExpense(${index})">Edit</button>
          <button onclick="deleteExpense(${index})">Delete</button>
        </span>
      `;
      list.appendChild(div);
      total += parseFloat(exp.amount);
    }
  });
  totalDisplay.textContent = `Total: ₹${total}`;
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const amount = document.getElementById('amount').value;
  const category = document.getElementById('category').value;
  const date = document.getElementById('date').value;
  expenses.push({ title, amount, category, date });
  form.reset();
  updateExpenses(filterCategory.value);
});

filterCategory.addEventListener('change', () => {
  updateExpenses(filterCategory.value);
});

function deleteExpense(index) {
  expenses.splice(index, 1);
  updateExpenses(filterCategory.value);
}

function editExpense(index) {
  const exp = expenses[index];
  document.getElementById('title').value = exp.title;
  document.getElementById('amount').value = exp.amount;
  document.getElementById('category').value = exp.category;
  document.getElementById('date').value = exp.date;
  deleteExpense(index);
}

updateExpenses();
