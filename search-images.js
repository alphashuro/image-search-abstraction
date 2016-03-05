const url = require('url');
const request = require('request');

const settings = {
  url: "https://www.googleapis.com/customsearch/v1",
  id: "003078234507562250827:vdnbhpezz28",
  key: "AIzaSyAYGxY2rmL2DZN6Qp0qMBkrwxNKTcVLUTE"
}

const searchUrl = `https://www.googleapis.com/customsearch/v1?cx=${settings.id}&key=${settings.key}&searchType=image&q=`;

module.exports = (term, cb) => new Promise((resolve, reject) => {
  const u = url.resolve(searchUrl+term, '');
  request(u, (err, res, body) => {
    if (err) {
      if (typeof cb === 'function') cb(err);
      reject(err);
    }

    const data = JSON.parse(body);
    const items = data.items;
    const result = items.map(i => ({
      url: i.link,
      alt: i.snippet,
      pageUrl: i.image.contextLink
    }));
    if (typeof cb === 'function') cb(null, result);
    resolve(result);
  });
});
