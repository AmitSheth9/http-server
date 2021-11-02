const request = require('supertest');
const { rm, mkdir } = require('fs/promises');
const app = require('../lib/app');
// eslint-disable-next-line no-unused-vars
const SimpleDb = require('../lib/simple-db');

const rootDir = `${__dirname}/store`;

describe('cat CRUD API', () => {
  beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });
  afterAll(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });
  it('creates a new cat and returns it via POST', async () => {
    const cat = { name: 'felix', age: 9 };
    const res = await request(app).post('/cats').send(cat);

    expect(res.body).toEqual(cat);
  });
});
