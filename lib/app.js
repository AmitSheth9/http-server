
const catRouter = require('./cat-router');

//route routes dynamically using cats then using method tolowercase
const routes = {
  cats: catRouter
};

const app = async (req, res) => {
  console.log(req.method);
  console.log(req.url);
  const [, resource] = req.url.split('/');
  const route = routes[resource];

  if (route) {
    try {
      const routeHandler = route[req.method.toLowerCase()];
      await routeHandler (req, res);
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      res.end(err.message);
    }
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
  

  /*

  if (req.method === 'POST' && req.url === '/cats') {
    
    
  
    req.on('end', async () => {
      
      console.log(cat);
      
      await db.save(cat);
      const savedCat = await db.get(cat.id);
      console.log(savedCat);
      res.setHeader('Content-Type', 'application/json');
      res.write('hello');
      // res.end('tester');
    });
    //const cat = JSON.parse(data);
    //console.log(cat);
    
   
  }
  else if(req.method === 'GET' && req.url === '/cats') {
    
    console.log('test');
    const allCats = await db.getAll();
    console.log(allCats);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(allCats));

    
  }

  else if(req.method === 'GET' && req.url === `/cats/${resource}`){
    const catData = await db.get(resource);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(catData));
  }
  */
};

module.exports = app;
