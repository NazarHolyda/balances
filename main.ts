import fs from 'fs';
import Web3 from 'web3';
import { CronJob } from 'cron';

const web3 = new Web3('https://mainnet.infura.io/v3/your-infura-project-id');

const job = new CronJob('*/1 * * * *', async () => {
  const address = '0xA145ac099E3d2e9781C9c848249E2e6b256b030D';
  const balances = await Promise.all([
    web3.eth.getBalance(address),
    getERC20TokenBalance('0x6b175474e89094c44da98b954eedeac495271d0f', address), // DAI
    getERC20TokenBalance('0x0d8775f648430679a709e98d2b0cb6250d2887ef', address), // BAT
    getERC20TokenBalance('0x1985365e9f78359a9b6ad760e32412f4a445e862', address), // REP
  ]);

  const [etherBalance, daiBalance, batBalance, repBalance] = balances;
  const data = {
    time: new Date().toISOString(),
    balances: {
      ether: web3.utils.fromWei(etherBalance),
      dai: daiBalance,
      bat: batBalance,
      rep: repBalance,
    },
  };
  const filename = 'balances.json';
  fs.writeFileSync(filename, JSON.stringify(data));
  console.log(`Balances written to ${filename}`);
});

async function getERC20TokenBalance(tokenAddress: string, address: string): Promise<string> {
  const contract = new web3.eth.Contract([
    {
      constant: true,
      inputs: [{ name: '_owner', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: 'balance', type: 'uint256' }],
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'decimals',
      outputs: [{ name: '', type: 'uint8' }],
      type: 'function',
    },
  ], tokenAddress);

  const balance = await contract.methods.balanceOf(address).call();
  const decimals = await contract.methods.decimals().call();
  return balance / 10 ** decimals;
}

job.start();
console.log('Job started');
