import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errors = new Rate('errors');

export const options = {
  stages: [
    { duration: '1m', target: 20 }, // Naik ke 20 users dalam 1 menit
    { duration: '3m', target: 20 }, // Bertahan di 20 users selama 3 menit
    { duration: '1m', target: 0 }, // Turun ke 0 users dalam 1 menit
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% request harus selesai dalam 500ms
    errors: ['rate<0.1'], // Error rate harus di bawah 10%
  },
};

const BASE_URL = 'https://alkindivv.site';

export default function () {
  // Test halaman utama
  const homeRes = http.get(BASE_URL);
  check(homeRes, {
    'homepage status is 200': (r) => r.status === 200,
    'homepage has correct title': (r) => r.body.includes('AL KINDI'),
  }) || errors.add(1);

  sleep(1);

  // Test halaman blog
  const blogRes = http.get(`${BASE_URL}/blog`);
  check(blogRes, {
    'blog status is 200': (r) => r.status === 200,
    'blog page loads': (r) => r.body.includes('Articles'),
  }) || errors.add(1);

  sleep(1);
}
