const app = require('express')();
const search = require('./search-images');

const latest = [];

app.get('/api/imagesearch/:search', (req, res) => {
  const term = req.params.search;
  latest.push({
    term,
    when: new Date()
  });
  search(term, +req.query.offset)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    console.log(err);
    res.send(err);
  });
});

app.get('/api/latest/imagesearch/', (req, res) => {
  res.send(latest.slice(-10));
});

const server = app.listen(process.env.PORT || 8080, () => {
  const port = server.address().port;
  console.log(`listening on port ${port}`);
});
