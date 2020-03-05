const https = require('https');
const cheerio = require('./modules/cheerio');

exports.handler = function (event, context, callback) {
  const {
    url,
    method
  } = event.queryStringParameters;

  const parsedUrl = new URL(url);
  let response = '';

  const parseData = (data) => {
    console.log(data)
    let $fragment = cheerio.load(`<div id="proxyData">${data}</div>`);

    // title: meta-title | og:title
    let title;
    if ($fragment('#proxyData title')) {
      title = $fragment('#proxyData title').text();
    } else if ($fragment('#proxyData').find('meta[property="og:title"]')) {
      title = $fragment('#proxyData').find('meta[property="og:title"]').attr('content');
    }

    // description: meta-description | og:description
    let description;
    let $content = $fragment("#proxyData").find('meta[name="description"]');
    if ($content && $content.attr('content')) {
      description = $content.attr('content');
    } else if ($fragment.find('meta[property="og:description"]')) {
      description = $fragment.find('meta[property="og:description"]').attr('content')
    }

    // image: og:image | first-image | favicon
    let img;
    let $img = $fragment("#proxyData").find('meta[property="og:image"]');
    if ($img && $img.attr('content')) {
      img = $img.attr('content');
    } else if ($fragment("#proxyData").find('img')) {
      img = $fragment("#proxyData").find('img').first().attr('src');
    } else {
      img = $fragment("#proxyData").find('[rel="icon"]').first().attr('href');
    }

    return { title, description, img };
  };

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
          data: parseData(response)
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