



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
    req.on('end', () => {
      res.setHeader('Content-Type', 'application/json');
      res.end(data);
    });
    //const cat = JSON.parse(data);
    //console.log(cat);
    
   
  }
};

module.exports = app;
