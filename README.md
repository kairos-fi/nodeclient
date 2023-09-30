# Kairos API Node Client
Node.js example of a client designed for integration with the Kairos API. Please note that this code is intended solely for educational purposes and is not suitable for production use. Its primary goal is to provide you with insights into the authentication process and API interaction mechanisms, ensuring a deeper understanding of the integration workflow.

## Getting started
This is a pretty basic Nodejs client to connect and interact with the [Kairos API](https://kairos-api.readme.io/)

### Prerequisites
1. Follow the instructions on [Kairos API - Getting Started](https://kairos-api.readme.io/reference/getting-started) guide
2. [Node.js](https://nodejs.org/en/) _(version > 18.x)_ installed
3. Following environment variables setup on your device:
    - RSA_PRIVATE_KEY: Your private key generated as part of the application process.
    - KAIROS_API_URL: Base URL of the Kairos API.
    - KAIROS_CLIENT_ID: The client ID you received from Kairos team after successful application.
    - KAIROS_CLIENT_SECRET: The client secret you received from Kairos team after successful application.

### Run the client
1. Go to the folder where you clone this repository and run this command in your terminal:
```bash
npm install
```
2. Run the client:
```bash
node client.js
```
