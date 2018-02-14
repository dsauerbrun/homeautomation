
async function createCode(req, res) {
  let passcode = req.params.passcode;
  let code = req.params.code;
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;

  if (passcode == process.env.UNLOCK_CODE) {
    await knex('access_codes').insert({
      code: code,
      start_date: startDate,
      end_date: endDate,
    });
    res.send('Success');
  } else {
    res.send('bad passcode')
  }

}

async function expireCode(req, res) {
  let passcode = req.params.passcode;
  let code = req.params.code;
  if (passcode == process.env.UNLOCK_CODE) {
    await knex('access_codes').update({expired: true}).where('code', code);
  }

  res.end();
}

module.exports = {
  createCode: createCode,
  expireCode: expireCode,
}
