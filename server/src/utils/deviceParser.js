const { UAParser } = require('ua-parser-js');

function parseUserAgent(uaString) {
  if (!uaString) {
    return {
      device_type: 'desktop',
      os: 'Unknown OS',
      browser: 'Unknown Browser',
    };
  }

  const parser = new UAParser(uaString);
  const result = parser.getResult();

  // Device type
  let deviceType = result.device?.type || 'desktop';
  if (!['mobile', 'tablet', 'smarttv', 'wearable', 'embedded'].includes(deviceType)) {
    // Check heuristic if UA has mobile or android
    const ua = uaString.toLowerCase();
    if (ua.includes('mobile') || ua.includes('iphone') || ua.includes('android')) {
      deviceType = 'mobile';
    } else if (ua.includes('ipad') || ua.includes('tablet')) {
      deviceType = 'tablet';
    } else if (ua.includes('bot') || ua.includes('crawler') || ua.includes('spider')) {
      deviceType = 'bot';
    } else {
      deviceType = 'desktop';
    }
  }

  // OS
  let os = result.os?.name || 'Unknown OS';
  if (result.os?.version) {
    os += ` ${result.os.version}`;
  }

  // Browser
  let browser = result.browser?.name || 'Unknown Browser';
  if (result.browser?.version) {
    const majorVer = result.browser.version.split('.')[0];
    browser += ` ${majorVer}`;
  }

  return {
    device_type: deviceType,
    os,
    browser,
  };
}

module.exports = {
  parseUserAgent,
};
