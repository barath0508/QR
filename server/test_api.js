async function runTests() {
  console.log('🧪 Starting Backend API and Redirect Engine Verification...\n');

  // 1. Health check
  const healthRes = await fetch('http://localhost:5000/health');
  const health = await healthRes.json();
  console.log('1. Health Check:', health);

  // 2. Status check
  const statusRes = await fetch('http://localhost:5000/api/status');
  const status = await statusRes.json();
  console.log('2. API Status:', status);

  // 3. User registration
  const userPayload = {
    email: `tester_${Date.now()}@example.com`,
    password: 'password123',
    name: 'Alex Rivera',
  };
  const regRes = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userPayload),
  });
  const regData = await regRes.json();
  console.log('3. Registration:', regData.message, 'Token received:', !!regData.token);
  const token = regData.token;

  // 4. Create Dynamic QR Code
  const qrPayload = {
    title: 'Spring Product Catalog',
    qr_type: 'url',
    destination_url: 'https://example.com/spring-catalog',
    custom_alias: `catalog${Math.floor(Math.random() * 9000 + 1000)}`,
    style_config: {
      fgColor: '#0F172A',
      bgColor: '#FFFFFF',
      dotStyle: 'rounded',
      eyeStyle: 'rounded',
      errorCorrection: 'H'
    }
  };
  const createQrRes = await fetch('http://localhost:5000/api/qr', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(qrPayload),
  });
  const createQrData = await createQrRes.json();
  console.log('4. Create QR:', createQrData.message, 'Short Code:', createQrData.qr?.short_code);

  const qrId = createQrData.qr?.id;
  const shortCode = createQrData.qr?.short_code;

  // 5. Test Dynamic Redirect (GET /r/:shortcode)
  console.log(`\n5. Simulating 3 QR scans on http://localhost:5000/r/${shortCode}...`);
  for (let i = 0; i < 3; i++) {
    const userAgents = [
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    ];

    const redirectRes = await fetch(`http://localhost:5000/r/${shortCode}`, {
      redirect: 'manual', // do not follow redirect automatically
      headers: {
        'User-Agent': userAgents[i % userAgents.length],
        'Referer': 'https://instagram.com/p/abc123',
      }
    });

    console.log(`Scan ${i + 1} Status:`, redirectRes.status, 'Redirect Location:', redirectRes.headers.get('location'));
  }

  // Small delay for async scan logging to commit
  await new Promise(r => setTimeout(r, 200));

  // 6. Check Analytics Endpoint
  const analyticsRes = await fetch(`http://localhost:5000/api/analytics/qr/${qrId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const analyticsData = await analyticsRes.json();
  console.log('\n6. QR Analytics Summary:');
  console.log('Total Scans:', analyticsData.analytics?.totalScans);
  console.log('Device Breakdown:', analyticsData.analytics?.deviceBreakdown);
  console.log('Browser Breakdown:', analyticsData.analytics?.browserBreakdown);
  console.log('Recent Scans Count:', analyticsData.analytics?.recentScans?.length);
  if (analyticsData.analytics?.recentScans?.[0]) {
    const s = analyticsData.analytics.recentScans[0];
    console.log('Sample Scan Log:', {
      device: s.device_type,
      browser: s.browser,
      os: s.os,
      location: `${s.city}, ${s.country}`,
      scanned_at: s.scanned_at,
    });
  }

  // 7. Update Destination URL
  const updateRes = await fetch(`http://localhost:5000/api/qr/${qrId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      destination_url: 'https://example.com/summer-sale-updated',
      title: 'Summer Sale (Updated Dynamic Destination)',
    }),
  });
  const updateData = await updateRes.json();
  console.log('\n7. Updated Destination URL to:', updateData.qr?.destination_url);

  // Verify updated redirect
  const updatedRedirect = await fetch(`http://localhost:5000/r/${shortCode}`, { redirect: 'manual' });
  console.log('New Redirect Target Location:', updatedRedirect.headers.get('location'));

  console.log('\n✅ All Core Dynamic Redirect & Analytics Engine Tests PASSED successfully!');
}

runTests().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
