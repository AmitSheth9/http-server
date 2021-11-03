const parseBody = require('./parse-body');
const SimpleDb = require('./simple-db');

const db = new SimpleDb('./lib/store');

const catRouter = {
  async post(req, res) {
    const cat = await parseBody(req);
    await db.save(cat);
    const savedCat = await db.get(cat.id);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(savedCat)); 
  },
  async get(req, res) {
    const [,, id] = req.url.split('/');

    if (id) {
      const cat = await db.get(id);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(cat));
    }
    else {
      const allCats = await db.getAll();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(allCats));
    }
  },
  async delete(req, res) {
    const [,, id] = req.url.split('/');
    const cat = await db.get(id);
    await db.delete(id);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(cat));

  },
  async put(req, res) {
    const cat = await parseBody(req);
    await db.update(cat);
    const savedCat = await db.get(cat.id);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(savedCat));

  }
};
module.exports = catRouter;
