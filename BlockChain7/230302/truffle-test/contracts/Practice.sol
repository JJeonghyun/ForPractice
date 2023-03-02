// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Practice{
    string tempText;

    constructor(){
        tempText = "Solidity Code test";
    }

    function getText() public view returns (string memory){ 
        return tempText;
    }   
    function setText(string memory _text) public {
        tempText = _text;
    }
}