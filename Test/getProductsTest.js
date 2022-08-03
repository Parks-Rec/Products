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
      executor: 'constant-arrival-rate',  //A fixed number of iterations are executed in a specified period of time.
      rate: '20',  //k6 tries to start rate iterations every timeUnit period.
      timeUnit: '1s',
      //note: 1000 iterations per second
      duration: '60s',  //The total duration of the scenario
      preAllocatedVUs: 20,    //The number of VUs to pre-allocate before the test starts.
      maxVUs: 200    //The maximum number of VUs to allow during the test run.
    },
  },
};

export default function () {
  http.get('http://localhost:3001/parks/products');
}
//