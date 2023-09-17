# JavaScript Account Management Application

[https://val-account-manager.netlify.app](https://val-account-manager.netlify.app)

This application is a simple yet powerful tool for managing multiple accounts. It allows users to add, delete, deposit, withdraw, and transfer funds between accounts. The application is built using JavaScript, HTML, and CSS.
Overview

```javascript
class Account {
  constructor(name, balance) {
    this.name = name;
    this.balance = balance;
  }
  // methods for deposit, withdraw, checkBalance, and transfer
}
```

The application is built around a JavaScript <strong>Account</strong> class, which is defined in the `index.js` file. Each Account object has a name and a balance, and methods for depositing and withdrawing funds, checking the balance, and transferring funds to another account.

The application maintains an array of Account objects, which are stored in the browser's `localStorage`. This allows the application to persist data across sessions.


## Error Handling
___

The application uses try-catch statements to handle errors. For example, when adding a new account, the application first checks if an account with the same name already exists. If it does, an error is thrown and caught, and an alert is displayed to the user.

```javascript
try {
  // check if account already exists
  if (accounts.find(a => a.name == name.value)) {
    throw new Error('Account Already Added.')
  }
  // code to add account
} catch(e) {
  console.log(e)
  alert('Error: ' + e.message)
}
```

## Switch Statements
___

The application uses a switch statement in the processTransaction function to handle different types of transactions: deposit, withdraw, and transfer. The function first retrieves the transaction type from a dropdown menu in the HTML form, and then calls the appropriate function based on the transaction type.

```javascript
switch(transactionType) {
  case 'deposit':
    addBalance(accountName, amount)
    break
  case 'withdraw':
    withdrawBalance(accountName, amount)
    break
  case 'transfer':
    const transferTo = document.querySelector('#transferTo').value
    transferBalance(accountName, transferTo, amount)
    break
  default:
    throw new Error('Transaction Not Supported')
}
```

## How to Use
___

- You can add a new account by entering a name in the "Account Name" field and clicking "Add". 
- To perform a transaction, select an account and a transaction type (deposit, withdraw, or transfer), enter an amount, and click "Submit". 
- If you select "transfer", you will also need to select a second account to transfer funds to. The current balance of each account is displayed on the page.

## Conclusion
___
In conclusion, this application demonstrates how to use JavaScript classes, switch statements, and try-catch statements to create a simple account management system. It also shows how to use local storage to persist data across sessions.