var https = require('https');
var codeHelper = require('./codeHelper');

async function lockDoors(req, res) {
  let code = req.params.code;

  var codeValid = code == process.env.UNLOCK_CODE || await codeHelper.codeValid(code);
  if (codeValid) {
    https.get(process.env.LOCK_URL, function(response) {
      if (response.statusCode == 200) {
        res.send('Door Successfully Locking');
      } else {
        res.status(500).send('Error Locking Door, please call Dan at ' + process.env.ERROR_PHONE);
      }
    });
  } else {
    res.status(401).send('Invalid Door Code, please call Dan at ' + process.env.ERROR_PHONE);
  }
}
async function unlockDoors(req, res) {
  let code = req.params.code;

  var codeValid = code == process.env.UNLOCK_CODE || await codeHelper.codeValid(code);
  if (codeValid) {
    https.get(process.env.UNLOCK_URL, function(response) {
      if (response.statusCode == 200) {
        res.send('Door Successfully Opened, if you still cannot enter please call Dan at ' + process.env.ERROR_PHONE);
      } else {
        res.status(500).send('Error Opening Door, please call Dan at ' + process.env.ERROR_PHONE);
      }
    });
  } else {
    res.status(401).send('Invalid Door Code, please call Dan at ' + process.env.ERROR_PHONE);
  }
}


module.exports = {
  unlockDoors: unlockDoors,
  lockDoors: lockDoors,
}
