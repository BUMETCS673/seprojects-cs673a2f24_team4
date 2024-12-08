import { test } from 'tap';
import { build } from '../helper';

test('default root route', async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: '/api/v1/about',
  });
  t.same(JSON.parse(res.payload), {
    version: '0.0.1',
    name: 'resumAI',
  });
});
