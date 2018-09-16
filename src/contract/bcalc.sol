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
