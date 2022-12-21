# Cryptography Tool
This is a tool that can be used to encrypt and decrypt messages using the AES 256 algorithm.

It can use a password that is of any size because the key gets procedurally generated with the password as the seed (the random number generator itself gets seeded using `cyrb128` with the password as the input string then random bytes get generated using `sfc32`).

The implementation of everything can be found in `./common.js`.

There are two scripts `./encrypt.js` and `./decrypt.js` that can be used as command line tools to preform the operations available in `./common.js`.

## Setup
To use this project you need `node` and `npm` installed.

All the dependencies need to be installed before you can run the scripts, to do that run:

```sh
npm install
```

## Encryption
If you want to use the encryption tool (`./encrypt.js`) you can call it with:
```sh
node encrypt.js
```

* It will first ask you for the data / message that you want to encrypt.
* Then it will ask you for the password that will be used for decryption.
* At the end it will output the encrypted text encoded in hexadecimal representation.

## Decryption
If you want to decrypt something already encrypted you can use the decryption tool (`./decrypt.js`), you can call it with:
```sh
node decrypt.js
```

* It will first ask you for the data you want to decrypt.
* Then it will ask you for the password that was used for encryption.
* At the end it will output the previously encrypted data / message as plain text.