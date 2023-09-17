class Account {
  constructor(name, balance) {
    this.name = name;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance = Number(this.balance) + Number(amount);
  }

  withdraw(amount) {
    if (amount <= this.balance) {
      this.balance = Number(this.balance) - Number(amount);
    } else {
      throw new Exception("Insufficient funds");
    }
  }

  checkBalance() {
    console.log(`Your balance is $${this.balance}`);
  }

  transfer(otherAccount, amount) {
    if (amount < this.balance) {
      this.withdraw(amount)
      otherAccount.deposit(amount);
    } else {
      throw new Error("Insufficient funds");
    }
  }
}

let accounts = [];

const accountsDiv = document.querySelector('.accounts');

// Save accounts to localStorage
const saveAccounts = () => {
  localStorage.setItem('accounts', JSON.stringify(accounts));
}

// Load accounts from localStorage
const loadAccounts = () => {
  const accountsData = localStorage.getItem('accounts');

  if (accountsData) {
    const accountsPlain = JSON.parse(accountsData);
    accounts = accountsPlain.map(a => new Account(a.name, Number(a.balance)));
  }
}

const addAccount = () => {
  try {
    const name = document.querySelector('#newAccountName')
    
    if (! confirm('Are you sure?')) {
      return false
    }

    if (accounts.find(a => a.name == name.value)) {
      throw new Error('Account Already Added.')
    }

    accounts.push(new Account(name.value, 0))

    alert('New Account Added!')
    
    saveAccounts();
    showAccounts()

    name.value = ''
  } catch(e) {
    console.log(e)
    alert('Error: ' + e.message)
  }
}

// Delete Selected 
const deleteAccount = (accountName) => {
  try {
    const index = accounts.findIndex(account => account.name === accountName)

    if (index !== -1) {
      accounts.splice(index, 1)
      alert('Account Deleted!')

      saveAccounts();
      showAccounts()
    } else {
      throw new Error('Account not found')
    }
  } catch(e) {
    console.log(e)
    alert('Error: ' + e.message)
  }
}

// Show Accounts in .accounts div
const showAccounts = () => {
  if (accounts.length > 0) {
    accountsDiv.innerHTML = ''
  }

  accounts.forEach((account, index) => {
    const accountEl = `
      <div class="account">
        <span>
        ${account.name}
        </span>
        <strong>
        ${account.balance.toFixed(2)}
        </strong>

        <button onclick="deleteAccount('${account.name}')">Delete</button>
      </div>
    `;

    accountsDiv.insertAdjacentHTML('beforeend', accountEl)
  })
}

// Add Balance on selected account
const addBalance = (accountName, amount) => {
  try {
    const account = accounts.find(a => a.name === accountName)

    if (account) {
      account.deposit(amount)
      alert('Balance Added!')

      saveAccounts();
      showAccounts()
    } else {
      throw new Error('Account not found')
    }
  } catch(e) {
    console.log(e)
    alert('Error: ' + e.message)
  }
}

// Withdraw balance on selected account
const withdrawBalance = (accountName, amount) => {
  try {
    const account = accounts.find(a => a.name === accountName)

    if (account) {
      account.withdraw(amount)
      alert('Balance Withdrawn!')

      saveAccounts();
      showAccounts()
    } else {
      throw new Error('Account not found')
    }
  } catch(e) {
    console.log(e)
    alert('Error: ' + e.message)
  }
}

// Transfer balance from one account to another
const transferBalance = (fromAccountName, toAccountName, amount) => {
  try {
    const fromAccount = accounts.find(a => a.name === fromAccountName)
    const toAccount = accounts.find(a => a.name === toAccountName)

    if (fromAccount && toAccount) {
      fromAccount.transfer(toAccount, amount)
      alert('Balance Transferred!')
      
      saveAccounts();
      showAccounts()
    } else {
      throw new Error('Account/Transfer Account not found')
    }
  } catch(e) {
    console.log(e)
    alert('Error: ' + e.message)
  }
}

// Process Transaction
const processTransaction = () => {
  try {
    const accountName = document.querySelector('#accountName').value
    const transactionType = document.querySelector('#transactionType').value
    const amount = document.querySelector('#amount').value

    if (! confirm("Are your Sure?")) {
      return false
    }

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
  } catch(e) {
    console.log(e)
    alert('Error: ' + e.message)
  }
}

const toggleTransferTo = (show = false) => {
  const el = document.querySelector('.transfer-to')

  if (show) {
    el.style.display = 'flex'  
  } else {
    el.style.display = 'none'
  }
}

document.querySelector('#transactionType')
  .addEventListener('change', (e) => {
    toggleTransferTo(e.target?.selectedOptions[0]?.value == 'transfer')
  })

loadAccounts();
showAccounts()
toggleTransferTo(false);