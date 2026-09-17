// Vercel Serverless Cron Handler: SEO Refresh & IndexNow Sentinel
// Runs on scheduled intervals via Vercel Cron ("0 2 * * *")

module.exports = async (req, res) => {
  // 1. Verify Vercel Cron Authorization if CRON_SECRET is configured
  const authHeader = req.headers['authorization'];
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized: Invalid CRON_SECRET' });
  }

  const DOMAIN = 'fabwashing.com';
  const INDEXNOW_KEY = 'e4b1a6c891f74352a9e1d8847291a5e1';
  const KEY_LOCATION = `https://${DOMAIN}/${INDEXNOW_KEY}.txt`;

  const CORE_PAGES = [
    `https://${DOMAIN}/`,
    `https://${DOMAIN}/patna/bailey-road`,
    `https://${DOMAIN}/patna/saguna-more`,
    `https://${DOMAIN}/patna/boring-road`,
    `https://${DOMAIN}/patna/kankarbagh`,
    `https://${DOMAIN}/reorder`,
    `https://${DOMAIN}/refer`
  ];

  const SYSTEM_RESOURCES = [
    `https://${DOMAIN}/sitemap.xml`,
    `https://${DOMAIN}/robots.txt`,
    `https://${DOMAIN}/llms.txt`,
    KEY_LOCATION
  ];

  const ALL_URLS = [...CORE_PAGES, ...SYSTEM_RESOURCES];

  // 2. Submit Core Pages to IndexNow (Bing, Copilot, Perplexity, Yandex, Seznam)
  const indexNowPayload = {
    host: DOMAIN,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: CORE_PAGES
  };

  let indexNowResult = null;
  try {
    const indexNowResponse = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'FabWashing-SEORefresh-Bot/1.0'
      },
      body: JSON.stringify(indexNowPayload)
    });

    indexNowResult = {
      endpoint: 'https://api.indexnow.org/indexnow',
      status: indexNowResponse.status,
      statusText: indexNowResponse.statusText,
      // IndexNow returns 200 (submitted), 202 (accepted for processing), or error code
      success: [200, 202].includes(indexNowResponse.status)
    };
  } catch (err) {
    indexNowResult = {
      endpoint: 'https://api.indexnow.org/indexnow',
      error: err.message,
      success: false
    };
  }

  // Fallback direct ping to Bing if primary aggregator had an issue
  if (!indexNowResult.success) {
    try {
      const bingResponse = await fetch('https://www.bing.com/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(indexNowPayload)
      });
      indexNowResult.bingFallback = {
        status: bingResponse.status,
        success: [200, 202].includes(bingResponse.status)
      };
    } catch (err) {
      indexNowResult.bingFallback = { error: err.message, success: false };
    }
  }

  // 3. Automated SEO Crawlability & Health Audit
  const auditResults = [];
  for (const url of ALL_URLS) {
    const startTime = Date.now();
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'FabWashing-SEO-Sentinel/1.0 (+https://fabwashing.com/llms.txt)'
        },
        redirect: 'follow'
      });
      const latencyMs = Date.now() - startTime;
      const contentType = response.headers.get('content-type') || '';

      auditResults.push({
        url,
        status: response.status,
        ok: response.ok,
        latencyMs,
        contentType: contentType.split(';')[0]
      });
    } catch (err) {
      auditResults.push({
        url,
        status: 0,
        ok: false,
        latencyMs: Date.now() - startTime,
        error: err.message
      });
    }
  }

  const passedChecks = auditResults.filter(r => r.ok).length;
  const totalChecks = auditResults.length;
  const healthStatus = passedChecks === totalChecks ? 'HEALTHY' : 'DEGRADED';

  // 4. Return Execution Summary
  return res.status(200).json({
    service: 'FabWashing SEO Refresh & IndexNow Sentinel',
    timestamp: new Date().toISOString(),
    healthStatus,
    score: `${passedChecks}/${totalChecks} endpoints OK`,
    indexNow: indexNowResult,
    monitoredUrls: CORE_PAGES.length,
    audit: auditResults
  });
};
