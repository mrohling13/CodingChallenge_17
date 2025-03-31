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