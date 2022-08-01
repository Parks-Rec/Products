import http from "k6/http"

import { sleep, check } from 'k6';

// export default function () {
//   for (let id = 1; id <= 10; id++) {
//     http.get(`http://localhost:3001/parks/products/${id}`);
//   }
// }

export default function () {
  const res = http.get('http://localhost:3001/parks/products/40344');
  check(res, {
    'is status 200': (response) => response.status === 200,
    'verify products id': (r) =>
    r.body.includes(40344),
    'verify products name': (r) =>
    r.body.includes('Rachelle Backpack'),
    'verify products slogan': (r) =>
    r.body.includes('Accusantium et est et repudiandae adipisci non eos harum ut.'),
    'verify products category': (r) =>
    r.body.includes('Stitching'),
    'verify products default_price': (r) =>
    r.body.includes('112'),

  });
}



// export default function () {
//   http.get('http://localhost:3001/products');
//   sleep(1);
// }

// export default function () {
//   http.get('http://localhost:3001/parks/products/40345/styles');
//   sleep(1);

// }
// export default function () {
//   http.get('http://localhost:3001/parks/products?page=2&count=3');
//   sleep(1);
// }

// export default function () {
//   http.get('http://localhost:3001/parks/products/40344/related');
//   sleep(1);
//   console.log(JSON.stringify(res.headers))
// }




//Running a 30-second, 10-VU(virtual user) load test
//VUs are essentially parallel while(true) loop
// k6 run --vus 10 --duration 30s k6.js