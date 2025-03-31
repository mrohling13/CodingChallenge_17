// Task 1: Create a Customer Class

class Customer {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.purchaseHistory = [];
    }

    addPurchase(amount) {
        if (typeof amount === 'number' && amount > 0) {
            this.purchaseHistory.push(amount);
        } else {
            console.error('Invalid purchase amount');
        }
    }

    getTotalSpent() {
        return this.purchaseHistory.reduce((total, amount) => total + amount, 0);
    }
}

console.log('Task 1: Customer Class');
const customer1 = new Customer('Kendall Mcdaniel', 'kmcdaniel@gmail.com');
customer1.addPurchase(100);
customer1.addPurchase(200);
customer1.addPurchase(150);
console.log(`Customer: ${customer1.name}, Total Spent: $${customer1.getTotalSpent()}`);

// Task 2: Create a SalesRep Class

class SalesRep {
    constructor(name) {
        this.name = name;
        this.clients = [];
    }

    addClient(customer) {
        if (customer instanceof Customer) {
            this.clients.push(customer);
        } else {
            console.error('Invalid customer object');
        }
    }

    getClientTotal(name) {
        const client = this.clients.find(c => c.name === name);
        return client ? client.getTotalSpent() : 0;
    }
}
console.log('\nTask 2: SalesRep Class');
const salesRep1 = new SalesRep('Josh Ofili');
salesRep1.addClient(customer1);
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
        const baseTotal = super.getTotalSpent();
        return baseTotal * 1.10; // 10% loyalty bonus
    }
}
console.log('\nTask 3: VIPCustomer Class');
const vipCustomer1 = new VIPCustomer('Malachi Rohling', 'mrohling@gmail.com', 'Platinum');
vipCustomer1.addPurchase(300);
vipCustomer1.addPurchase(400);
console.log(`VIP Customer: ${vipCustomer1.name}, Level: ${vipCustomer1.vipLevel}`);
console.log(`Total Spent with bonus: $${vipCustomer1.getTotalSpent().toFixed(2)}`);
