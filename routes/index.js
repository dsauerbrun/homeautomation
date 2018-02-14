var express = require('express');
var router = express.Router();
var locks = require('../actions/locks');
var codes = require('../actions/codes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('wewd');
});

router.get('/unlock/:code', locks.unlockDoors);
router.get('/lock/:code', locks.lockDoors);
router.post('/codes/:passcode/:code', codes.createCode);
router.post('/codes/expire/:passcode/:code', codes.expireCode);

module.exports = router;
