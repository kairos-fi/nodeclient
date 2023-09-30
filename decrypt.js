import nodeRSA from 'node-rsa';

/**
 * Decrypt the given message using the provided private key.
 * This method uses {@link https://en.wikipedia.org/wiki/Optimal_asymmetric_encryption_padding OAEP}
 * @param {string} privateKey RSA Private key to decrypt the given data
 * @param {string} encryptedData The data with the encrypted message
 * @returns A Buffer with the message decrypted
 */
function rsaDecrypt(privateKey, encryptedData) {
    const rsa = new nodeRSA(privateKey);
    // Configure RSA OAEP settings
    rsa.setOptions({
        environment: 'browser',
        encryptionScheme: {
            scheme: 'pkcs1_oaep',
            hash: 'sha256'
        }
    });
    return rsa.decrypt(encryptedData);
}

/**
 * Decrypts the given base64 encrypted challenge using the private key
 * @param {string} challenge the base64 encoded challenge obtained from login
 * @returns unencrypted challenge
 */
export function decrypt(challenge) {
    const decrypted = rsaDecrypt(process.env.RSA_PRIVATE_KEY, challenge)
    return decrypted.toString("utf8")
}
