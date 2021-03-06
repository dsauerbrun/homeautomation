var https = require('https');
var axios = require('axios');
var codeHelper = require('./codeHelper');

async function lockDoors(req, res) {
  let code = req.params.code;

  var codeValid = code == process.env.UNLOCK_CODE || await codeHelper.codeValid(code);
  if (codeValid) {
    axios.post(process.env.LOCK_URL).then(function(response) {
      if (response.status == 200) {
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
    axios.post(process.env.UNLOCK_URL).then(function(response) {
      if (response.status !== 200) {
        res.status(500).send('Error Opening Door, please call Dan at ' + process.env.ERROR_PHONE);
      }
    });
    axios.post(process.env.UNBOLT_URL).then(function(response) {
      if (response.status == 200) {
        res.send('Door Successfully Opened and will automatically lock in 5 minutes, if you still cannot enter please call Dan at ' + process.env.ERROR_PHONE);
        setTimeout(function() {
         // auto-lock the door after 5 minutes(I do this because people keep testing the code and leaving the door unlocked)
          axios.post(process.env.LOCK_URL).then(function() {});

        }, 300000);
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
