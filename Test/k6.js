import http from "k6/http"

import { sleep, check } from 'k6';

// export default function () {
//   for (let id = 1; id <= 10; id++) {
//     http.get(`http://localhost:3001/parks/products/${id}`);
//   }
// }

// export default function () {
//   const res = http.get('http://localhost:3001/parks/products/40344');
//   check(res, {
//     'is status 200': (response) => response.status === 200,
//     'verify products id': (r) =>
//     r.body.includes(40344),
//     'verify products name': (r) =>
//     r.body.includes('Rachelle Backpack'),
//     'verify products slogan': (r) =>
//     r.body.includes('Accusantium et est et repudiandae adipisci non eos harum ut.'),
//     'verify products category': (r) =>
//     r.body.includes('Stitching'),
//     'verify products default_price': (r) =>
//     r.body.includes('112'),

//   });
// }

export let options = {
  //A boolean specifying whether should ignore TLS verifications for VU connections
  insecureSkipTLSVerify: true,
  //A boolean specifying whether should ignore TLS verifications for VU connections
  noConnectionReuse: false,
  //Execution scenarios are primarily configured via the scenarios key of the exported options object in your test scripts
  scenarios: {
    constant_request_rate: {
      //A fixed number of iterations are executed in a specified period of time.
      executor: 'constant-arrival-rate',
      //k6 tries to start rate iterations every timeUnit period.
      rate: '10',
      timeUnit: '1s',
      //note: 1000 iterations per second
      //The total duration of the scenario
      duration: '60s',
      //The number of VUs to pre-allocate before the test starts.
      preAllocatedVUs: 20,
      //The maximum number of VUs to allow during the test run.
      maxVUs: 200
    },
  },
};

// export default function () {
//   http.get('http://localhost:3001/products');
//   sleep(1);
// }

// export default function () {
//   http.get('http://localhost:3001/parks/products/40345/styles');
//   sleep(1);

// }
export default function () {
  http.get('http://localhost:3001/parks/products?page=2&count=3');
  sleep(1);
}

// export default function () {
//   http.get('http://localhost:3001/parks/products/40344/related');
//   sleep(1);

// }




//Running a 30-second, 10-VU(virtual user) load test
//VUs are essentially parallel while(true) loop
// k6 run --vus 10 --duration 30s k6.js