async function codeValid(code) {
  var codeValid = await knex('access_codes').where('code', code).andWhere('start_date', '<', knex.fn.now()).andWhere('end_date', '>', knex.fn.now()).andWhere('expired', false).first();
  return codeValid;
}

module.exports = {
  codeValid: codeValid,
}
