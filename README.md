# BCalc - Blockchain Calculator

## Description

Webserver (Express) that serves simple web application (React) for performing arithmetic operations with two integers.
All calculations are delegated to smart contract (web3) deployed in Rinkeby test net.

Tested on Node 10.10.0; Chrome, Safari.

## Smart contract source (./src/contract/bcalc.sol)
```
pragma solidity ^0.4.25;

contract BCalc {
    function add(int a, int b) public pure returns (int) {
        return a + b;
    }

    function subtract(int a, int b) public pure returns (int) {
        return a - b;
    }

    function multiply(int a, int b) public pure returns (int) {
        return a * b;
    }

    function divide(int a, int b) public pure returns (int) {
        require(b != 0, 'Division by zero');
        return a / b;
    }

    function remainder(int a, int b) public pure returns (int) {
        require(b != 0, 'Division by zero');
        return a % b;
    }
}

```

## Configuration

### config.json:
Parameters:
 - rpcUrl (string) - RPC endpoint;
 - contractAddress (string) - address of deployed BCalc contract;
 - host (string, optional, default 'localhost') - server host;
 - port (int, optional, defailt '8080') - server port.

Example:
```
{
  "rpcUrl": "<infura.endpoint>",
  "contractAddress": "0xf8a502910e75ecfbfb66ba7c817ebaf84e9de08b",
  "host": "localhost",
  "port": 80
}
```

## Run
```
npm install
npm start
```
