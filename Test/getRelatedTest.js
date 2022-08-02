import http from "k6/http"

import { sleep, check } from 'k6';

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
      rate: '30',
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

export default function () {
  http.get('http://localhost:3001/parks/products/939170/related');
  sleep(1);

}