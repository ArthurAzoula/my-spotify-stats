module.exports.home =
  (_, res) => {
    const options = {
      root: 'public',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };
    res.send('<h1>Hello World</h1>');
  }