// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract InputCalc{
    int private result;

    event Result(int result);

    constructor(){
        result = 0;
    }

    function getResult() public view returns (int){ 
        return result;
    }   
   function add(int _input) public {
    result += _input;
    emit Result(result);
  }

  function minus(int _input) public {
    result -= _input;
    emit Result(result);
  }
   function multiply(int _input) public {
    result *= _input;
    emit Result(result);
  }

  function division(int _input) public {
    result /= _input;
    emit Result(result);
  }
}