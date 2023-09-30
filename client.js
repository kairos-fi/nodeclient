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

console.log("\nKairos API usage example in Nodejs\n");
console.log("----------------------------------\n");
(async() => {
    try {
        // Perform the login
        const login = await doLoginRequest()
        // Decrypt the challenge
        const challenge = decrypt(login.challenge)
        // Ask for an access token
        const token = await doTokenRequest(challenge)

        console.log(`Here is your token: ${token.access_token}\n`);
    }
    catch(err) {
        console.log(err);
    };
})()
