const Web3 = require('web3');
const express = require('express');

const config = require('../../config.json');
const bcalcContractAbi = require('../contract/abi.json');

const host = config.host || process.env.HOST || 'localhost';
const port = config.port || process.env.PORT || '8080';

let web3 = new Web3(config.rpcUrl);
let bcalcContract = new web3.eth.Contract(bcalcContractAbi, config.contractAddress);

let app = express();
app.use(express.static(__dirname + '/../../dist'));


let parseParams = (query) => ({
  a: parseInt(query.a),
  b: parseInt(query.b),
  operation: query.op
});


let validateParams = ({ a, b, operation }) => (!isNaN(a) && !isNaN(b) 
  && ['add', 'subtract', 'multiply', 'divide', 'remainder'].includes(operation))
  && !(b == 0 && (operation == 'divide' || operation == 'remainder'));


app.get('/calc', function(req, res) {
  let params = parseParams(req.query);
  if (!validateParams(params)) {
    res.status(400).send('Invalid request params');
    return;
  }

  bcalcContract.methods[params.operation](params.a, params.b).call().then((result) =>{
    res.send(result);
  }).catch((error) => {
    res.status(500).send("Failed to perform operation");
  });
});

app.listen(port, host, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('Server started on %s:%s', host, port);
});
