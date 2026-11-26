// Live-site mobile check (iPhone 13 and 320 px): horizontal overflow, viewport meta,
// text under 12px, tap targets under 24x24 px and JS errors, for every page in pages.json.
// Usage: node scripts/check-mobile.js pages.json   (pages.json from check-internal-links.py)
const { chromium, devices } = require('playwright');
const pages = require(require('path').resolve(process.argv[2] || 'pages.json')).pages;
(async () => {
  const b = await chromium.launch();
  const out = [];
  for (const [name, opts] of [['iphone', devices['iPhone 13']], ['320', { viewport: { width: 320, height: 700 }, isMobile: true, hasTouch: true }]]) {
    const c = await b.newContext(opts);
    for (const u of pages) {
      const p = await c.newPage(); const errs = [];
      p.on('pageerror', e => errs.push(e.message));
      try { await p.goto(u, { waitUntil: 'domcontentloaded', timeout: 45000 }); await p.waitForTimeout(800); } catch (e) { out.push([name, u, 'LOADFAIL']); await p.close(); continue; }
      const r = await p.evaluate(() => {
        const vw = window.innerWidth;
        const overflow = document.documentElement.scrollWidth - vw;
        const meta = !!document.querySelector('meta[name=viewport][content*="width=device-width"]');
        let small = 0, smallTap = [];
        for (const el of document.querySelectorAll('body *')) {
          const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden') continue;
          if (el.childNodes.length && [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 2) && parseFloat(cs.fontSize) < 12) small++;
          if (el.matches('a,button,[role=button],input,select')) { const bb = el.getBoundingClientRect(); if (bb.width > 0 && bb.height > 0 && bb.height < 24 && bb.width < 24) smallTap.push((el.textContent||el.getAttribute('aria-label')||'').trim().slice(0,20)); }
        }
        const wide = [...document.querySelectorAll('body *')].filter(el => { const bb = el.getBoundingClientRect(); return bb.right > vw + 1 && !el.closest('[class*=overflow-x],.overflow-x-auto,table'); }).slice(0,3).map(el => el.tagName + '.' + (el.className||'').toString().slice(0,40));
        return { overflow, meta, small, smallTap: smallTap.slice(0, 4), nSmallTap: smallTap.length, wide };
      });
      if (r.overflow > 1 || !r.meta || r.small > 0 || r.nSmallTap > 0 || errs.length) out.push([name, u.replace('https://www.dogfoodscout.com', ''), JSON.stringify(r), errs.length ? 'JSERR ' + errs[0].slice(0, 80) : '']);
      await p.close();
    }
    await c.close();
  }
  console.log('issues:', out.length); for (const o of out) console.log(o.join(' | '));
  await b.close();
})();
