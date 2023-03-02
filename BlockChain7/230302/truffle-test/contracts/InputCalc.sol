// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract InputCalc{
    int private result;

    constructor(){
        result = 0;
    }

    function getResult() public view returns (int){ 
        return result;
    }   
   function add(int _input) public {
    result += _input;
  }

  function minus(int _input) public {
    result -= _input;
  }
   function multiply(int _input) public {
    result *= _input;
  }

  function division(int _input) public {
    result /= _input;
  }
}