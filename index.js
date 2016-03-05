const app = require('express')();
const search = require('./search-images');

app.get('/api/imagesearch/:search', (req, res) => {
  // const offset = req.query.offset ? JSON.parse(req.query.offset) : 1;
  search(req.params.search, +req.query.offset)
  .then(data => {
    res.send(JSON.stringify(data));
  })
  .catch(err => {
    console.log(err);
  });
});

const server = app.listen(process.env.PORT || 8080, () => {
  const port = server.address().port;
  console.log(`listening on port ${port}`);
});
