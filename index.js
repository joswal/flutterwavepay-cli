const {
    makePayment
} = require('./api/payment');
const readlineSync = require('readline-sync');

let cardNo, Cvv, expiryMonth, expiryYear, Country, email, phoneNumber, firstName, lastName
let Amount = ((Math.random() + 1) * 100).toFixed(2);

console.log(`please enter your card details to pay NGN ${Amount}\n\n`);

const masterCard = /^(?:5[1-5][0-9]{14})$/;
const visaCard = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;

cardNo = readlineSync.question('please enter your card no: ');
while (cardNo.length < 13 || cardNo.length > 16) {
    cardNo = readlineSync.question('please enter your card no correctly ');
    if (!(cardNo.match(masterCard) || cardNo.match(visaCard))) {
        cardNo = readlineSync.question('invalid card, please enter a valid card no ');
    }
}

Cvv = readlineSync.question('please enter your card cvv ');
while (Cvv.length < 3 || Cvv.length > 3) {
    Cvv = readlineSync.question('please enter your card cvv correctly ');
}

expiryMonth = readlineSync.question('please enter your card expiry month: ');
while (expiryMonth.length < 2 || expiryMonth.length > 2) {
    expiryMonth = readlineSync.question('please enter your card expiry month correctly ');
}

expiryYear = readlineSync.question('please enter your card expiry month: ');
while (expiryYear.length < 2 || expiryYear.length > 2) {
    expiryYear = readlineSync.question('please enter your card expiry month correctly ');
}

Country = readlineSync.question('what country are you from?  (enter the two letter abbreviation in block case e.g NG): ');
while (Country.length < 2 || expiryYear.length > 2) {
    Country = readlineSync.question('please enter your country code correctly ');
}

phoneNumber = readlineSync.question('please enter your phone number: ');
while (phoneNumber.length < 11 || expiryYear.length > 11) {
    phoneNumber = readlineSync.question('please enter your phone number correctly ');
}

email = readlineSync.question('please enter your email: ');

firstName = readlineSync.question('please enter your firstname? ');
lastName = readlineSync.question('please enter your lastname? ');

makePayment(cardNo, Cvv, expiryMonth, expiryYear, Country, email, phoneNumber, firstName, lastName, Amount);


process.on('uncaughtException', (ex) => {
    console.log('WE GOT AN UNCAUGHT EXCEPTION')
})
process.on('unhandledRejection', (ex) => {
    console.log('WE GOT AN UNHANDLED EXCEPTION');
    process.exit(1);
})

exports.Amount = Amount;