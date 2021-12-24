/* eslint-disable no-prototype-builtins */
function pick(o, fields) {
  return fields.reduce(function(result, field) {
    if ( o.hasOwnProperty(field) ) {
      result[field] = o[field];
    }
    return result;
  }, {});
}

module.exports = (req, res) => {
  if (req.method === 'GET') {
    console.log(JSON.stringify(req.params)); // urlpath params
    console.log(JSON.stringify(req.queryShadow)); // url params

    if ( req.queryShadow.hasOwnProperty('_field') ) {
			
      if ( !Array.isArray(res.locals.data) ) {
        let pickResult = pick(res.locals.data, req.queryShadow['_field']);
        res.locals.data = pickResult;
        return;
      } else {
        if ( !Array.isArray(req.queryShadow['_field']) ) {
          req.queryShadow['_field'] = [ req.queryShadow['_field'] ];
        }
				
        let result = [];
        res.locals.data.forEach(function(row) {
          result.push(pick(row, req.queryShadow['_field'] ));
        });
				
        res.locals.data = result;
        return;
      }
    }

  }
};