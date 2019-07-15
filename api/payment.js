const Ravepay = require('ravepay');
const config = require('config');


let merchantKey = config.get('merchantKey');
let privateKey = config.get('privateKey');

const rave = new Ravepay(merchantKey, privateKey);

function makePayment(cardNo, Cvv, expiryMonth, expiryYear, Country, email, phoneNumber, firstName, lastName, Amount) {

    console.log("\n please wait while processing transaction....\n");

    let curr;

    switch (Country) {
        case "NG":
            curr = "NGN";
            break;
        case "GH":
            curr = "GHS";
            break;
        case "UG":
            curr = "UGX";
            break;
        case "KE":
            curr = "KES";
            break;
        case "US":
            curr = "USD";
            break
        case "OT":
            curr = readlineSync.question('enter the three letter abbreviation of your currency in block case e.g NG');
            break;
        default:
            curr = "NGN";
            break;
    }


    rave.Card.charge({
        "cardno": cardNo,
        "cvv": Cvv,
        "expirymonth": expiryMonth,
        "expiryyear": expiryYear,
        "currency": curr,
        "country": Country,
        "amount": Amount,
        "email": email,
        "phonenumber": phoneNumber,
        "firstname": firstName,
        "lastname": lastName,
        "IP": "355426087298442",
        "txRef": "MC-" + Date.now(),
        merchantKey,
        "meta": [{
            metaname: "samplePayment",
            metavalue: "123949494DC"
        }],
        "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment",
        "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
    }).then(resp => {
        if (resp.body.status == "success") {
            console.log("\n successfully connected to payment gateway \n");
        } else {
            console.log("\n failed to connect \n");
        }


        rave.Card.validate({
            "transaction_reference": resp.body.data.flwRef,
            "otp": 12345
        }).then(response => {
            if (result.status == "failed") status = "failed";
            let result = response.body.data.tx;
            console.log(result);
            console.log(` ${result.customerId} payment of ${result.currency} ${result.amount} with ${result.paymentType} ${status}`);

        })

    }).catch(err => {
        console.log(err);

    })
}

exports.makePayment = makePayment;