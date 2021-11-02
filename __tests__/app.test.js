const request = require('supertest');
const { rm, mkdir } = require('fs/promises');
const app = require('../lib/app');
// eslint-disable-next-line no-unused-vars
const SimpleDb = require('../lib/simple-db');

const rootDir = './lib/store';

describe('cat CRUD API', () => {
  /*beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });
  */
  /*afterAll(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });*/
  it.skip('creates a new cat and returns it via POST', async () => {
    const cat = { name: 'felix', age: 9 };
    //const db = new SimpleDb()
    const res = await request(app).post('/cats').send(cat);

    expect(res.body).toEqual({ ...cat, id: expect.any(String) });
  });
  it('gets a dog by id', async () => {
    const cats = [{ name: 'felix', age: 9, id: expect.any(String) }, { name: 'felix', age: 9, id: expect.any(String) }, { name: 'felix', age: 9, id: expect.any(String) }];
    const res = await request(app).get('/cats');

    expect(res.body).toEqual(cats);
  });

  it('get')
});
