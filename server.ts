import * as http from 'http';
import * as url from 'url';
import * as bodyParser from 'body-parser';

const port = 5000;

interface Cheese {
  id: number;
  name: string;
  imageUrl: string;
  pricePerKilo: number;
  color: string;
}
const apiString = '/api/cheese';
const cheeseService = {
  getCheeseList: (): Cheese[] => [
    {
      id: 1,
      name: 'Cheddar',
      imageUrl: 'https://www.cheese.com/media/img/cheese/cheddar_large.jpg',
      pricePerKilo: 85,
      color: 'Pale Yellow',
    },
    {
      id: 2,
      name: 'Gouda',
      imageUrl: 'https://www.cheese.com/media/img/cheese/gouda_large.jpg',
      pricePerKilo: 75,
      color: 'Yellow',
    },
  ],
  getCheese: (id: number): Cheese | null => {
    const cheese: Cheese = {
      id: id,
      name: 'Cheddar',
      imageUrl: 'https://www.cheese.com/media/img/cheese/cheddar_large.jpg',
      pricePerKilo: 85,
      color: 'Pale Yellow',
    };
    return cheese.id === id ? cheese : null;
  },
  addCheese: (cheese: Cheese): Cheese => {
    const newId = cheeseService.getCheeseList().length + 1;
    return { ...cheese, id: newId };
  },
  updateCheese: (id: number, cheese: Cheese): Cheese => cheese,
  deleteCheese: (id: number): boolean => id === 1,
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url!, true);
  const method = req.method!;
  const path = parsedUrl.pathname!;
  const id = parsedUrl.query['id'] as string;

  if (method === 'GET' && path === '/api/cheese/all') {
    try {
      const cheeseList = cheeseService.getCheeseList();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(cheeseList));
    } catch (error) {
      res.writeHead(500);
      res.end((error as Error).message);
    }
  } else if (method === 'GET' && path.startsWith(apiString)) {
    try {
      const cheese = cheeseService.getCheese(Number(id));
      if (cheese) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(cheese));
      } else {
        res.writeHead(404);
        res.end('Cheese not found');
      }
    } catch (error) {
      res.writeHead(500);
      res.end((error as Error).message);
    }
  } else if (method === 'POST' && path === apiString) {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const cheese = JSON.parse(body) as Cheese;
        const newCheese = cheeseService.addCheese(cheese);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newCheese));
      } catch (error) {
        res.writeHead(500);
        res.end((error as Error).message);
      }
    });
  } else if (method === 'PUT' && path.startsWith(apiString)) {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const cheese = JSON.parse(body) as Cheese;
        const updatedCheese = cheeseService.updateCheese(Number(id), cheese);
        if (updatedCheese) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(updatedCheese));
        } else {
          res.writeHead(404);
          res.end('Cheese not found');
        }
      } catch (error) {
        res.writeHead(500);
        res.end((error as Error).message);
      }
    });
  } else if (method === 'DELETE' && path.startsWith(apiString)) {
    try {
      const result = cheeseService.deleteCheese(Number(id));
      if (result) {
        res.writeHead(200);
        res.end('Cheese deleted');
      } else {
        res.writeHead(404);
        res.end('Cheese not found');
      }
    } catch (error) {
      res.writeHead(500);
      res.end((error as Error).message);
    }
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`Cheese API running at http://localhost:${port}`);
});
