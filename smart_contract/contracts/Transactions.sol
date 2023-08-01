// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Transactions {
    uint public count;

    struct TransferStruct {
        address sender;
        address receiver;
        string message;
        uint256 timestamp;
        string keyword;
        uint amount; 
    }

    TransferStruct[] public transactions;

    function addToTransaction(address payable receiver, uint amount, string memory message, string memory keyword) public {
        count += 1;
        TransferStruct memory transaction = TransferStruct({
            sender: msg.sender,
            receiver: receiver,
            message: message,
            amount: amount,
            timestamp: block.timestamp,
            keyword: keyword
        });

        transactions.push(transaction);
    }
    
    function getAllTransaction() public view returns (TransferStruct[] memory) {
        return transactions;
    }
}
