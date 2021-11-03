const request = require('supertest');
const { rm, mkdir } = require('fs/promises');
const app = require('../lib/app');
// eslint-disable-next-line no-unused-vars
const SimpleDb = require('../lib/simple-db');

const rootDir = './lib/store';



describe('cat CRUD API', () => {
  beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });
  /*
  afterAll(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });
  */
  it('creates a new cat and returns it via POST', async () => {
    const cat = { name: 'felix', age: 9 };
    const db = new SimpleDb(rootDir);
    await db.save(cat);
    const res = await request(app).post('/cats').send(cat);

    expect(res.body).toEqual({ ...cat, id: expect.any(String) });
  });
  it('gets all cats', async () => {
    const cats = [{ name: 'felix', age: 9, id: expect.any(String) }, { name: 'sahil', age: 6, id: expect.any(String) }, { name: 'sam', age: 3, id: expect.any(String) }];
    const db = new SimpleDb(rootDir);
    await db.save(cats[0]);
    await db.save(cats[1]);
    await db.save(cats[2]);
    const res = await request(app).get('/cats');

    expect(res.body).toEqual(expect.arrayContaining(cats));
  });

  it('gets cat by id', async () => {
    const cat = { name: 'felix', age: 7, color: 'black' };
    const db = new SimpleDb(rootDir);
    await db.save(cat);

    const res = await request(app).get(`/cats/${cat.id}`);

    expect(res.body).toEqual(cat);
  });

  it('deletes cat by id', async () => {
    const cat = { name: 'felix', age: 7, color: 'black' };
    const db = new SimpleDb(rootDir);
    await db.save(cat);

    await request(app).delete(`/cats/${cat.id}`);
    console.log(await db.get(cat.id));
    expect(await db.get(cat.id)).toEqual(null);

  });

  it('updates a cat by id using put', async () => {
    const cat = { name: 'felix', age: 6, color: 'yellow' };
    const db = new SimpleDb(rootDir);
    await db.save(cat);
    console.log(await db.getAll());
    
    const res = await request(app).put(`/cats/${cat.id}`).send({ name: 'charles', age: 6, color: 'yellow', id: cat.id });
    console.log(await db.getAll());
    expect(res.body).toEqual(await db.get(cat.id));
  });
 
});
