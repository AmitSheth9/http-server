



const app = async (req, res) => {
  //const [, resource] = req.url.split('/');
  

  if (req.method === 'POST' && req.url === '/cats') {

    
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      data.toString();
      console.log(data);
    });
    req.on('end', async () => {
      //const cat = JSON.parse(data);
      //console.log(cat);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.parse(data));
    });
  }
};

module.exports = app;
