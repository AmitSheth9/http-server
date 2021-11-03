const EventEmitter = require('events');
const parseBody = require('../lib/parse-body');

it('returns null if method is not POST or PUT', async () => {
  expect(await parseBody({ method: 'GET' })).toBe(null);
  expect(await parseBody({ method: 'DELETE' })).toBe(null);
});

it('throws if content-type is not application/json', async () => {
  const req = { method: 'POST', headers: {'content-type': 'text/html' } };
  expect.assertions(1);
  try {
    await parseBody(req);
  } catch (e) {
    expect(e).toEqual('Content-Type must be application/json');
  }
    
});
it('returns a deserialized body from req emitted events', async () => {
  const req = new EventEmitter();
  req.headers = { 'content-type': 'application/json' };
  req.method = 'POST';
  const promise = parseBody(req);
  req.emit('data', '{"something":');
  req.emit('data', '"some stuff"}');
  req.emit('end');

  const body = await promise;
  expect(body).toEqual({ something: 'some stuff' });
});

