/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
import gateway, {formatErrors, createResultObject,} from './gateway';

export default function(app) {
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth').default);


  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });


  app.post('/checkout', function (req, res) {
    let transactionErrors;
    let amount = req.body.amount; // In production you should not take amounts directly from clients
    let nonce = req.body.payment_method_nonce;

    gateway.transaction.sale({
      amount: amount,
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true
      }
    }, function (err, result) {
      if (result.success || result.transaction) {
        res.redirect('/checkout/new');

      } else {
        transactionErrors = result.errors.deepErrors();
        req.flash('error', {msg: formatErrors(transactionErrors)});
        res.redirect('checkout/new');
      }
    });
  });

  app.post('/api/client_token/new', function (request, response) {
    gateway.clientToken.generate({}, function (err, res) {
      if (err) throw err;
      response.json(res.clientToken);
      console.log(res.clientToken);
    });
  });

  app.get('/checkout/show/:id', function (req, res) {
    let result;
    let transactionId = req.params.id;

    gateway.transaction.find(transactionId, function (err, transaction) {
      result = createResultObject(transaction);
      res.render('checkout/show/new', {transaction: transaction, result: result});
    });
  });
};
