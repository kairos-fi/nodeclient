import { decrypt } from './decrypt.js'

// Replace with the proper values
const baseURL = process.env.KAIROS_API_URL;
const clientId = process.env.KAIROS_CLIENT_ID;
const clientSecret = process.env.KAIROS_CLIENT_SECRET;

/**
 * Executes an HTTP request to the given URL using
 * the given options asynchronously.
 * @param {string} url URL to perform the request
 * @param {object} options Javascript object with the request options
 * @returns A promise with the resulting JSON
 */
async function doRequest(url, options) {
    try {
        const response = await fetch(url, options)
        if (!response.ok) {
            throw new Error(`${response.status} - ${response.statusText}`);
        }
        const jsonResponse = await response.json();
        return jsonResponse
    } catch(err) {
        throw(err)
    }
}

// ====================================
//               Login
// ====================================
async function doLoginRequest() {
    // POST request data
    const payload = {
        "client_id": clientId
    };
  
    const options = {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
  
    const url = `${baseURL}/login`;
    
    console.log(`Attempt login to: ${url}\n`);
    console.log("With payload: ", payload, "\n");
  
    return doRequest(url, options)
}

// ====================================
//               Token
// ====================================
async function doTokenRequest(challenge) {
    // POST request data
    const payload = {
        "client_id": clientId,
        "client_secret": clientSecret,
        "challenge": challenge
    };
  
    const options = {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
  
    const url = `${baseURL}/token`;
    
    console.log(`Attempt to request a token: ${url}\n`);
    console.log("With payload: ", payload, "\n");
  
    return doRequest(url, options)
}

async function doTransfer(token, payload) {
    // POST request data
    /*const payload = {
        "type": "outbound",
        "internal_account_number": 300000000012078,
        "external_account_number": "164851236789",
        "external_account_name": "Testing Transfer",
        "currency_code": "EUR",
        "amount": 100,
        "detail": "extracting funds from Kairos"
    };*/
  
    const options = {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    };
  
    const url = `${baseURL}/transactions`;
    
    console.log(`Attempt to do transfer: ${url}\n`);
    console.log("With payload: ", payload, "\n");
  
    return doRequest(url, options)
}


import express from 'express';
import bodyParser from 'body-parser'
var app = express()
// parse application/json
app.use(bodyParser.json())

app.post('/transactions', function(request, response){
    console.log("\nKairos API Transaction Run\n");
    console.log("----------------------------------\n");
    (async() => {
        try {
            // Perform the login
            const login = await doLoginRequest()
            // Decrypt the challenge
            const challenge = decrypt(login.challenge)
            // Ask for an access token
            const token = await doTokenRequest(challenge)
    
            console.log(`Here is your token: ${token.access_token}\n`)
    
            const resp = await doTransfer(token.access_token, request.body)
    
            console.log(`Transfer result: ${JSON.stringify(resp)}\n`)

            response.send(request.body);
        }
        catch(err) {
            console.log(err);
        };
    })()
});

app.listen(8080);

