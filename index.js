const app = require('express')();
const search = require('./search-images');

app.get('/api/imagesearch/:search', (req, res) => {
  search(req.query.search).then(data => {
    res.send(data);
  });
});

const server = app.listen(process.env.PORT || 8080, () => {
  const port = server.address().port;
  console.log(`listening on port ${port}`);
});
