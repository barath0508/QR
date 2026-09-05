// GeoIP & IP lookup helper with privacy masking and smart fallback

const MOCK_LOCATIONS = [
  { country: 'United States', city: 'San Francisco', region: 'California' },
  { country: 'United States', city: 'New York', region: 'New York' },
  { country: 'Germany', city: 'Berlin', region: 'Berlin' },
  { country: 'United Kingdom', city: 'London', region: 'England' },
  { country: 'Japan', city: 'Tokyo', region: 'Kanto' },
  { country: 'India', city: 'Bengaluru', region: 'Karnataka' },
  { country: 'Canada', city: 'Toronto', region: 'Ontario' },
  { country: 'Australia', city: 'Sydney', region: 'NSW' },
  { country: 'France', city: 'Paris', region: 'Île-de-France' },
  { country: 'Singapore', city: 'Singapore', region: 'Central' },
];

let mockIdx = 0;

function maskIp(ip) {
  if (!ip) return '127.0.0.xxx';
  if (ip.includes(':')) {
    // IPv6
    const parts = ip.split(':');
    return parts.slice(0, 3).join(':') + ':xxxx:xxxx';
  }
  // IPv4
  const parts = ip.split('.');
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`;
  }
  return 'xxx.xxx.xxx.xxx';
}

function resolveLocationFromReq(req) {
  // Check Cloudflare / CDN headers
  const cfCountry = req.headers['cf-ipcountry'];
  const cfCity = req.headers['cf-ipcity'];
  const cfRegion = req.headers['cf-region'];

  if (cfCountry && cfCountry !== 'XX') {
    return {
      country: cfCountry,
      city: cfCity || 'Unknown City',
      region: cfRegion || 'Unknown Region',
    };
  }

  // Check Vercel headers
  const vercelCountry = req.headers['x-vercel-ip-country'];
  const vercelCity = req.headers['x-vercel-ip-city'];
  const vercelRegion = req.headers['x-vercel-ip-country-region'];

  if (vercelCountry) {
    return {
      country: vercelCountry,
      city: vercelCity || 'Unknown City',
      region: vercelRegion || 'Unknown Region',
    };
  }

  // Localhost / Development Fallback: cycle through realistic demo locations
  const picked = MOCK_LOCATIONS[mockIdx % MOCK_LOCATIONS.length];
  mockIdx++;
  return picked;
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || req.ip || '127.0.0.1';
}

module.exports = {
  maskIp,
  resolveLocationFromReq,
  getClientIp,
};
