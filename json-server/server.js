const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./json-server/mock-db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// server.use((req, res, next) => {
//   req.queryShadow = JSON.parse(JSON.stringify(req.query));
//   next();
// });

/* eslint-disable no-prototype-builtins */
// function pick(o, fields) {
//   return fields.reduce(function(result, field) {
//     if ( o.hasOwnProperty(field) ) {
//       result[field] = o[field];
//     }
//     return result;
//   }, {});
// }

// server.use((req,res,next)=>next(), async (req, res, next) => {
//   // eslint-disable-next-line no-unused-vars
//   const x = await next();
//   console.log(req);
//   if (req.method === 'GET') {
//     console.log(JSON.stringify(req.params)); // urlpath params
//     console.log(JSON.stringify(req.queryShadow)); // url params

//     if ( req.queryShadow.hasOwnProperty('_field') ) {
			
//       if ( !Array.isArray(res.locals.data) ) {
//         let pickResult = pick(res.locals.data, req.queryShadow['_field']);
//         res.locals.data = pickResult;
//         return;
//       } else {
//         if ( !Array.isArray(req.queryShadow['_field']) ) {
//           req.queryShadow['_field'] = [ req.queryShadow['_field'] ];
//         }
				
//         let result = [];
//         res.locals.data.forEach(function(row) {
//           result.push(pick(row, req.queryShadow['_field'] ));
//         });
				
//         res.locals.data = result;
//         return;
//       }
//     }

//   }
// });

server.use(router);

// eslint-disable-next-line no-unused-vars
server.use((req,res,next) => {
  console.log(req, res);
});

server.listen(3000, () => {
  console.log('JSON Server is running');
});
