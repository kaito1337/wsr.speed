for (let i = 0; i < eth.accounts.length; i++) {
    const account = eth.accounts[i];
    personal.unlockAccount(account, "123", 0);
    console.log(account)
}
miner.start();