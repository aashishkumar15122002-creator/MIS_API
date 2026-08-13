const { config } = require('../src/config');
const { createCustomer } = require('../src/store');

const name = process.argv.slice(2).join(' ') || 'Demo Company';
const result = createCustomer({
  name,
  trialDays: config.trialDays
});

console.log('Trial customer created');
console.log(`Company: ${result.customer.name}`);
console.log(`Customer ID: ${result.customer.id}`);
console.log(`Trial ends: ${result.customer.trialEndsAt}`);
console.log(`API key: ${result.apiKey}`);
console.log(`Connect token: ${result.connectToken}`);
console.log('');
console.log('Save the API key and connect token now.');
