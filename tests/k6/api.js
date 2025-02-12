import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errors = new Rate('errors');

export const options = {
  stages: [
    { duration: '30s', target: 10 }, // Naik ke 10 users dalam 30 detik
    { duration: '1m', target: 10 }, // Bertahan di 10 users selama 1 menit
    { duration: '30s', target: 0 }, // Turun ke 0 users dalam 30 detik
  ],
  thresholds: {
    http_req_duration: ['p(95)<200'], // 95% request harus selesai dalam 200ms
    errors: ['rate<0.1'], // Error rate harus di bawah 10%
  },
};

const BASE_URL = 'https://alkindivv.site/api';

export default function () {
  // Test API page views
  const viewsRes = http.get(`${BASE_URL}/page-views`);
  check(viewsRes, {
    'page-views status is 200': (r) => r.status === 200,
    'page-views returns JSON': (r) =>
      r.headers['Content-Type'].includes('application/json'),
    'page-views has views object': (r) => {
      const body = JSON.parse(r.body);
      return body.hasOwnProperty('views');
    },
  }) || errors.add(1);

  sleep(1);

  // Test increment page view
  const payload = JSON.stringify({
    slug: 'test-page',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const incrementRes = http.post(`${BASE_URL}/page-views`, payload, params);
  check(incrementRes, {
    'increment status is 200': (r) => r.status === 200,
    'increment returns number': (r) => {
      const body = JSON.parse(r.body);
      return typeof body.views === 'number';
    },
  }) || errors.add(1);

  sleep(1);
}
