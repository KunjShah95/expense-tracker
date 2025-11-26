# Expense Tracker

A comprehensive and user-friendly web application designed to help individuals manage their personal finances effectively. This application allows users to track their income and expenses, visualize their spending habits through dynamic charts, and maintain a record of their financial transactions.

## Features

* **User Authentication:** Secure registration and login system. User sessions are managed to ensure data privacy between different users on the same device.
* **Dashboard Overview:** A centralized hub displaying your current financial status, including Total Balance, Total Income, and Total Expenses.
* **Visual Analytics:** Interactive Doughnut chart (powered by Chart.js) providing a clear visual representation of your Income vs. Expenses.
* **Transaction Management:**
  * Add new transactions with descriptions, amounts, and currency types (Dollar/Rupees).
  * View a history of recent transactions.
  * Delete unwanted or incorrect transactions.
* **Data Persistence:** All user data and transactions are stored locally in the browser's `localStorage`, ensuring data remains available even after refreshing the page or closing the browser.
* **Responsive Design:** Fully responsive interface that works seamlessly on desktops, tablets, and mobile devices.
* **Informational Pages:** Includes dedicated Home, About Us, Services, and Contact pages.

## Technologies Used

* **HTML5:** For the structural foundation of the application.
* **CSS3:** For styling and responsive layout design.
* **JavaScript (ES6+):** For application logic, DOM manipulation, and local storage management.
* **Chart.js:** For rendering dynamic and interactive financial charts.
* **Font Awesome:** For iconography.

## Getting Started

To run this project locally, you do not need any complex backend setup or database installation.

1. **Clone the repository:**

    ```bash
    git clone https://github.com/KunjShah95/expense-tracker.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd expense-tracker
    ```

3. **Launch the Application:**
    * Simply open the `index.html` file in your preferred web browser (Chrome, Firefox, Edge, etc.).

## Usage Guide

1. **Registration:**
    * Open the application and navigate to the "Register" page.
    * Create a new account by providing a username, email, password, and phone number.
2. **Login:**
    * Use your registered email and password to log in.
3. **Dashboard:**
    * Upon successful login, you will be redirected to the Dashboard.
    * **Add Transaction:** Use the form to enter a description, amount, and select the currency type. Click "Add Transaction".
    * **View Summary:** Watch as your Balance, Income, and Expense totals update automatically.
    * **Analyze:** Check the chart to see the breakdown of your finances.
    * **Manage:** Scroll down to the transaction list to view details or delete specific entries using the trash icon.
4. **Logout:**
    * Click the "Logout" button in the dashboard header to securely end your session.

## Project Structure

```txt
expense-tracker/
├── index.html          # Landing page
├── login.html          # User login page
├── register.html       # User registration page
├── dashboard.html      # Main application dashboard
├── about.html          # About Us page
├── contact.html        # Contact Us page
├── services.html       # Services overview page
├── styles.css          # Global stylesheets
├── script.js           # Main application logic
└── README.md           # Project documentation
```

## Future Improvements

* **Export Data:** Ability to export transaction history as CSV or PDF.
* **Categories:** Add custom categories for expenses (e.g., Food, Transport, Utilities).
* **Dark Mode:** Implement a toggle for dark/light theme.
* **Cloud Sync:** Integrate with a backend database for cross-device synchronization.

## Author

### Kunj Shah

* GitHub: [KunjShah95](https://github.com/KunjShah95)

---
&copy; 2024 Expense Tracker. All rights reserved.
