# balances
ERC20 tokens and the balance
To implement a simple web server with a GET endpoint that returns the balances of all ERC20 tokens and the balance of Ethereum native tokens for a given address
Replace "your-infura-project-id" with your own Infura project ID.
Make a GET request to http://localhost:3000/balances/0xA145ac099E3d2e9781C9c848249E2e6b256b030D (replace the address with the one you want to query).
The response will be a JSON object with the balances of Ether, DAI, BAT, and REP tokens for the given address.


Replace "your-infura-project-id" with your own Infura project ID.
Set the address in the code to the address you want to query.
The job will run every minute and write the latest balances to a file called "balances.json" in the current directory.
The contents of the file will be a JSON entity with the latest balances and the time they were fetched.
