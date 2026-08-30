import { chromium } from 'playwright-core';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL = process.env.SITE_URL || 'https://yangyingquan7826.github.io/our-love-wrapped/';

const VIEWPORTS = [
  { name: 'iPhone SE/8  375x667', w: 375, h: 667 },
  { name: 'iPhone 12-14  390x844', w: 390, h: 844 },
  { name: 'iPhone 11/XR  414x896', w: 414, h: 896 },
  { name: 'iPhone ProMax 428x926', w: 428, h: 926 },
  { name: 'Android Pixel 360x780', w: 360, h: 780 },
  { name: 'Android 小屏  360x640', w: 360, h: 640 },
];

const UA_IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
const UA_ANDROID = 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });
  let failCount = 0;

  for (const vp of VIEWPORTS) {
    const isIOS = vp.name.startsWith('iPhone');
    const ctx = await browser.newContext({
      viewport: { width: vp.w, height: vp.h },
      userAgent: isIOS ? UA_IPHONE : UA_ANDROID,
      deviceScaleFactor: isIOS ? 3 : 2.625,
      isMobile: true,
      hasTouch: true,
    });
    const page = await ctx.newPage();
    try {
      await page.goto(URL + '?t=' + Date.now(), { waitUntil: 'domcontentloaded', timeout: 90000 });
      await page.waitForSelector('input', { timeout: 30000 });
      await page.evaluate(() => document.fonts.ready);
      await page.fill('input', '0102');
      await page.click('button[type=submit]');
      await page.waitForSelector('.scene', { timeout: 15000 });
      await page.waitForTimeout(1200);

      const result = await page.evaluate(() => {
        const scenes = [...document.querySelectorAll('.scene')];
        const rows = scenes.map((s, i) => {
          const cls = s.className.replace('scene', '').trim() || '-';
          return { i, cls, ov: s.scrollHeight - s.clientHeight };
        });
        // 第二次：display:none 隐藏 absolute 装饰元素（真正移除布局），测文档流真实溢出
        const abs = [];
        document.querySelectorAll('.scene *').forEach((el) => {
          if (getComputedStyle(el).position === 'absolute') { abs.push([el, el.style.display]); el.style.display = 'none'; }
        });
        const flowOv = scenes.map((s, i) => ({ i, ov: s.scrollHeight - s.clientHeight }));
        abs.forEach(([el, d]) => { el.style.display = d; });
        return { rows, flowOv };
      });

      const totalBad = result.rows.filter(r => r.ov > 2);
      const flowBad = result.flowOv.filter(r => r.ov > 2);

      console.log('\n=== ' + vp.name + ' ===');
      if (totalBad.length === 0 && flowBad.length === 0) {
        console.log('  ✓ 全部无溢出（含装饰元素与文档流）');
      } else {
        console.log('  总溢出(含absolute装饰): ' + (totalBad.length ? totalBad.map(r => '#' + r.i + r.cls + '=' + r.ov).join(', ') : '无'));
        console.log('  文档流溢出(真实文字/内容): ' + (flowBad.length ? flowBad.map(r => '#' + r.i + '=' + r.ov).join(', ') : '无'));
        if (flowBad.length) failCount += flowBad.length;
      }
    } catch (e) {
      console.log('\n=== ' + vp.name + ' === 测试失败: ' + e.message.slice(0, 120));
      failCount++;
    } finally {
      await ctx.close();
    }
  }

  await browser.close();
  console.log('\n========== 汇总 ==========');
  console.log(failCount === 0 ? '所有视口所有场景均无真实文字溢出 ✓' : `仍有 ${failCount} 处需要处理 ✗`);
})();
