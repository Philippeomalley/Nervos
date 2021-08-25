

Task7: Port An Existing Ethereum DApp To Polyjuice

Note this app was based on the Dapp University tutorial found here: https://www.youtube.com/watch?v=rzvk2kdjr2I&t=4640s
The github repository for this tutorial can be found here: https://github.com/dappuniversity/eth-todo-list
## Screenshots or video of your application running on Godwoken.
## Instructions on how to use: 

Copy the repository and navigate to the app directory. 
run "npm install" from the terminal to install dependencies
run "yarn dev" or "npm run dev" to run 
make sure your metamask is set to the Godwoken testnet

## Screenshots or video of your application running on Godwoken.

![Alt text](app-running-1.png?raw=true "app running")
![Alt text](app-running-2.png?raw=true "app running")
![Alt text](app-running-3.png?raw=true "app running")
![Alt text](app-running-4.png?raw=true "app running")

## Link to the GitHub repository with your application which has been ported to Godwoken. This must be a different application than the one covered in this guide.

```
https://github.com/Philippeomalley/Nervos/tree/main/task7/app
```

## If you deployed any smart contracts as part of this tutorial, please provide the transaction hash of the deployment transaction, the deployed contract address, and the ABI of the deployed smart contract. (Provide all in text format.)

```
Transaction hash: 0xe0d646732471c863e53e9acdd9badc80f647e8d7cc4ae893ce1aec2c0ab9b17c


Deployed contract address: 0x4842bD0Cae49d85e6a991b0DF2d914907def2144

[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "completed",
          "type": "bool"
        }
      ],
      "name": "TaskCompleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "content",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "completed",
          "type": "bool"
        }
      ],
      "name": "TaskCreated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "taskCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tasks",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "content",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "completed",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_content",
          "type": "string"
        }
      ],
      "name": "createTask",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "toggleCompleted",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
  
  ```
