const https = require('https');

exports.handler = function (event, context, callback) {
  const {
    url,
    method
  } = event.queryStringParameters;

  const parsedUrl = new URL(url);
  let response = '';

  const {
    host: hostname,
    pathname: path,
  } = parsedUrl;

  const options = {
    hostname: hostname,
    path,
    method: method || 'GET'
  };

  const req = https.request(options, res => {
    res.on('data', d => {
      response = response + d;
    });

    res.on('end', () => {
      return callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*'
        },
        body: JSON.stringify({
          data: response
        })
      });
    });
  });

  req.on('error', error => {
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        data: error
      })
    });
  });

  req.end();
};