
const simpleDb = require('./simple-db');
const db = new simpleDb('./lib/store');

const app = async (req, res) => {
  //const [, resource] = req.url.split('/');
  console.log(req.method);
  console.log(req.url);

  if (req.method === 'POST' && req.url === '/cats') {
    
    
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      data.toString();
      console.log(data);
      
  
    });
    req.on('end', async () => {
      const cat = JSON.parse(data);
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
};

module.exports = app;
