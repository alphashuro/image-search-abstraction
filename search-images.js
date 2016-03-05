const url = require('url');
const request = require('request');

const settings = {
  url: "https://www.googleapis.com/customsearch/v1",
  id: "003078234507562250827:vdnbhpezz28",
  key: "AIzaSyAYGxY2rmL2DZN6Qp0qMBkrwxNKTcVLUTE"
}

const searchUrl = `https://www.googleapis.com/customsearch/v1?cx=${settings.id}&key=${settings.key}&searchType=image&q=`;

module.exports = (term, offset, cb) => new Promise((resolve, reject) => {
  if (typeof offset !== 'number' || isNaN(offset)) {
    offset = 1;
  };
  const u = url.resolve(searchUrl+term+`&start=${offset}`,  '');
  console.log(u);
  request(u, (err, res, body) => {
    if (err) {
      if (typeof cb === 'function') cb(err);
      reject(err);
    }

    try {
      const data = JSON.parse(body);
      const items = data.items;
      const result = items.map(i => ({
        url: i.link,
        alt: i.snippet,
        pageUrl: i.image.contextLink
      }));
      if (typeof cb === 'function') cb(null, result);
      resolve(result);
    } catch(e) {
      reject(data);
    }
  });
});
