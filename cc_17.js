// Task 1: Create a Customer Class

class Customer {
    constructor(name, email) {
        this.name = name; // customers name
        this.email = email; // customers email
        this.purchaseHistory = []; // array of all purchase amounts
    }

    addPurchase(amount) { // adds purchase history
        if (typeof amount === 'number' && amount > 0) {
            this.purchaseHistory.push(amount);
        } else {
            console.error('Invalid purchase amount');
        }
    }

    getTotalSpent() { // calculates total amount spent 
        return this.purchaseHistory.reduce((total, amount) => total + amount, 0);
    }
}

console.log('Task 1: Customer Class'); // shows how the class functions
const customer1 = new Customer('Kendall Mcdaniel', 'kmcdaniel@gmail.com');
customer1.addPurchase(100);
customer1.addPurchase(200);
customer1.addPurchase(150);
console.log(`Customer: ${customer1.name}, Total Spent: $${customer1.getTotalSpent()}`);

// Task 2: Create a SalesRep Class

class SalesRep {
    constructor(name) {
        this.name = name; // name of the sales rep 
        this.clients = []; // array to store customers 
    }

    addClient(customer) { // adds a customer to sales rep clients list
        if (customer instanceof Customer) {
            this.clients.push(customer);
        } else {
            console.error('Invalid customer object');
        }
    }

    getClientTotal(name) { // gives you total of what was spent by a specific client
        const client = this.clients.find(c => c.name === name); // finds client
        return client ? client.getTotalSpent() : 0; // returns total if its found
    }
}
console.log('\nTask 2: SalesRep Class'); // shows sales rep functionality
const salesRep1 = new SalesRep('Josh Ofili');
salesRep1.addClient(customer1); // adds the previous customer
console.log(`Sales Rep: ${salesRep1.name}`);
console.log(`Clients: ${salesRep1.clients.map(c => c.name).join(', ')}`);
console.log(`Total spent by Kendall Mcdaniel: $${salesRep1.getClientTotal('Kendall Mcdaniel')}`);

// Task 3: Create a VIPCustomer Class

class VIPCustomer extends Customer {
    constructor(name, email, vipLevel) {
        super(name, email);
        this.vipLevel = ['Gold', 'Platinum'].includes(vipLevel) ? vipLevel : 'Gold';
    }

    getTotalSpent() {
        const baseTotal = super.getTotalSpent(); // grabs base total 
        return baseTotal * 1.10; // 10% loyalty bonus
    }
}
console.log('\nTask 3: VIPCustomer Class'); // shows vipclass functionality
const vipCustomer1 = new VIPCustomer('Malachi Rohling', 'mrohling@gmail.com', 'Platinum');
vipCustomer1.addPurchase(300);
vipCustomer1.addPurchase(400);
console.log(`VIP Customer: ${vipCustomer1.name}, Level: ${vipCustomer1.vipLevel}`);
console.log(`Total Spent with bonus: $${vipCustomer1.getTotalSpent().toFixed(2)}`);


// Task 4: Build a Client Report System

console.log('\nTask 4: Client Report System');

const customer2 = new Customer('Dontae Smallwood', 'dsmallwood@gmail.com'); // creates a regular customer
customer2.addPurchase(50);
customer2.addPurchase(75);
customer2.addPurchase(200);

const vipCustomer2 = new VIPCustomer('Jalen Poole', 'jpoole@gmail.com', 'Gold'); // creates another vip customer
vipCustomer2.addPurchase(600);
vipCustomer2.addPurchase(250);


salesRep1.addClient(customer2); // adds all customers to sales rep
salesRep1.addClient(vipCustomer1);
salesRep1.addClient(vipCustomer2);


const totalRevenue = salesRep1.clients.reduce((total, customer) => { // calculates total revenue from all clients
    return total + (customer instanceof VIPCustomer ? customer.getTotalSpent() : customer.getTotalSpent()); // handles regular and vip customers 
}, 0); // starts from 0

console.log(`Total Revenue from all customers: $${totalRevenue.toFixed(2)}`);


const highSpendingCustomers = salesRep1.clients.filter(customer => { // identifies high spending customers
    return customer.getTotalSpent() > 500;
});

console.log('\nHigh-spending customers (>$500):'); // displays high spending customers 
highSpendingCustomers.forEach(customer => {
    console.log(`- ${customer.name}: $${customer.getTotalSpent().toFixed(2)}`);
});

const customerSummary = salesRep1.clients.map(customer => { // creates a summary with important information
    return {
        name: customer.name,
        totalSpent: customer.getTotalSpent().toFixed(2),
        type: customer instanceof VIPCustomer ? 'VIP' : 'Regular'
    };
});

console.log('\nCustomer Summary:'); // displays summary as a table
console.table(customerSummary);