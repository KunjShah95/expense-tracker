document.addEventListener("DOMContentLoaded", function () {
    const USERS_KEY = 'expenseTracker_users';
    const CURRENT_USER_KEY = 'expenseTracker_currentUser';
    const TRANSACTIONS_KEY = 'expenseTracker_transactions';

    function getUsers() {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    }

    function saveUsers(users) {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    function getCurrentUser() {
        return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    }

    function setCurrentUser(user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }

    function logoutUser() {
        localStorage.removeItem(CURRENT_USER_KEY);
        window.location.href = 'login.html';
    }

    function getTransactions() {
        return JSON.parse(localStorage.getItem(TRANSACTIONS_KEY)) || [];
    }

    function saveTransactions(transactions) {
        localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    const path = window.location.pathname;
    const page = path.split("/").pop();

    if (page === 'register.html' || document.getElementById('register-form')) {
        if (getCurrentUser()) {
            window.location.href = 'dashboard.html';
            return;
        }
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener("submit", function (event) {
                event.preventDefault();

                const username = document.getElementById("username").value.trim();
                const email = document.getElementById("email").value.trim();
                const password = document.getElementById("password").value;
                const phone = document.getElementById("number").value.trim();

                if (!username || !email || !password || !phone) {
                    alert("Please fill in all fields.");
                    return;
                }

                if (!validateEmail(email)) {
                    alert("Please enter a valid email address.");
                    return;
                }

                if (password.length < 8) {
                    alert("Password must be at least 8 characters long.");
                    return;
                }

                const users = getUsers();
                if (users.some(u => u.email === email)) {
                    alert("Email already registered. Please login.");
                    return;
                }

                const newUser = { username, email, password, phone };
                users.push(newUser);
                saveUsers(users);

                alert("Registration successful! Redirecting to login.");
                window.location.href = 'login.html';
            });
        }
    }

    if (page === 'login.html' || document.getElementById('login-form')) {
        if (getCurrentUser()) {
            window.location.href = 'dashboard.html';
            return;
        }
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener("submit", function (event) {
                event.preventDefault();

                const email = document.getElementById("email").value.trim();
                const password = document.getElementById("password").value;

                if (!email || !password) {
                    alert("Please fill in all fields.");
                    return;
                }

                const users = getUsers();
                const user = users.find(u => u.email === email && u.password === password);

                if (user) {
                    setCurrentUser(user);
                    alert("Login successful!");
                    window.location.href = 'dashboard.html';
                } else {
                    alert("Invalid email or password.");
                }
            });
        }
    }

    if (page === 'dashboard.html' || document.getElementById('transactionForm')) {
        const currentUser = getCurrentUser();

        if (!currentUser) {
            alert("You must be logged in to view the dashboard.");
            window.location.href = 'login.html';
            return;
        }

        const userIdElement = document.getElementById('userId');
        if (userIdElement) {
            userIdElement.textContent = currentUser.username;
        }

        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", function (e) {
                e.preventDefault();
                logoutUser();
            });
        }

        const transactionForm = document.getElementById('transactionForm');
        const transactionList = document.getElementById('transactionList');
        let myChart = null;

        function updateSummary(transactions) {
            const amounts = transactions.map(t => parseFloat(t.amount));
            
            const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
            
            const income = amounts
                .filter(item => item > 0)
                .reduce((acc, item) => (acc += item), 0)
                .toFixed(2);

            const expense = (
                amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
            ).toFixed(2);

            document.getElementById('totalBalance').innerText = `$${total}`;
            document.getElementById('totalIncome').innerText = `+$${income}`;
            document.getElementById('totalExpense').innerText = `-$${expense}`;

            updateChart(income, expense);
        }

        function updateChart(income, expense) {
            const ctx = document.getElementById('expenseChart').getContext('2d');
            
            if (myChart) {
                myChart.destroy();
            }

            myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Income', 'Expense'],
                    datasets: [{
                        data: [income, expense],
                        backgroundColor: ['#2ecc71', '#e74c3c'],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        }
                    }
                }
            });
        }

        function deleteTransaction(id) {
            let transactions = getTransactions();
            transactions = transactions.filter(t => t.id !== id);
            saveTransactions(transactions);
            renderTransactions();
        }

        function renderTransactions() {
            const allTransactions = getTransactions();
            const userTransactions = allTransactions.filter(t => t.userEmail === currentUser.email);
            
            updateSummary(userTransactions);
            transactionList.innerHTML = '';

            userTransactions.forEach(t => {
                const li = document.createElement('li');
                li.className = 'transaction-item';

                const infoDiv = document.createElement('div');
                infoDiv.style.display = 'flex';
                infoDiv.style.alignItems = 'center';
                infoDiv.style.width = '100%';
                infoDiv.style.justifyContent = 'space-between';

                const leftDiv = document.createElement('div');
                
                const descSpan = document.createElement('span');
                descSpan.className = 'transaction-desc';
                descSpan.textContent = t.description;
                leftDiv.appendChild(descSpan);

                const dateSpan = document.createElement('span');
                dateSpan.className = 'transaction-date';
                dateSpan.textContent = ` (${t.date})`;
                dateSpan.style.fontSize = '0.8em';
                dateSpan.style.color = '#999';
                leftDiv.appendChild(dateSpan);

                infoDiv.appendChild(leftDiv);

                const rightDiv = document.createElement('div');
                rightDiv.style.display = 'flex';
                rightDiv.style.alignItems = 'center';

                const amountSpan = document.createElement('span');
                amountSpan.className = 'transaction-amount';
                
                let displayAmount = t.amount;
                if (t.type === 'dollar') {
                    displayAmount = `$${parseFloat(t.amount).toFixed(2)}`;
                } else if (t.type === 'rupees') {
                    displayAmount = `₹${parseFloat(t.amount).toFixed(2)}`;
                }

                if (parseFloat(t.amount) < 0) {
                    amountSpan.classList.add('negative');
                    amountSpan.textContent = '- ' + displayAmount.replace('-', ''); 
                } else {
                    amountSpan.textContent = '+ ' + displayAmount;
                }
                
                rightDiv.appendChild(amountSpan);

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
                deleteBtn.onclick = () => deleteTransaction(t.id);
                rightDiv.appendChild(deleteBtn);

                infoDiv.appendChild(rightDiv);
                li.appendChild(infoDiv);
                transactionList.appendChild(li);
            });
        }

        renderTransactions();

        if (transactionForm) {
            transactionForm.addEventListener('submit', function (event) {
                event.preventDefault();
                const description = document.getElementById('transactionDescription').value.trim();
                const amount = document.getElementById('transactionAmount').value;
                const type = document.getElementById('transactionType').value;

                if (!description || !amount || !type) {
                    alert('Please fill in all fields.');
                    return;
                }

                const newTransaction = {
                    id: Date.now(),
                    userEmail: currentUser.email,
                    description,
                    amount,
                    type,
                    date: new Date().toISOString().slice(0, 10)
                };

                const transactions = getTransactions();
                transactions.push(newTransaction);
                saveTransactions(transactions);

                renderTransactions();
                transactionForm.reset();
            });
        }
    }

    const contactForms = document.querySelectorAll('.contact-form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
        });
    });
});
   