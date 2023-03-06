
if not exist geth geth --datadir "" init genesis.json

set /P ip="Enter ip: "
echo %ip%
pause
geth --datadir "" --http --http.api="miner,personal,eth,net,debug,web3,admin,txpool" --http.corsdomain "*" --port 3030 --networkid "8545" --nat extip:"%ip%" --allow-insecure-unlock --identity="node1" --preload build.js console
pause
