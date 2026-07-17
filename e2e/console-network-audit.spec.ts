import { test, expect } from '@playwright/test';
import { PUBLIC_ROUTES, ADMIN_ROUTES, PORTAL_ROUTES } from './routes';
import * as fs from 'fs';
import * as path from 'path';

// Store results
const auditResults = {
  consoleErrors: [] as any[],
  consoleWarnings: [] as any[],
  networkFailures: [] as any[],
  pageCrashes: [] as any[],
};

const allRoutes = [...PUBLIC_ROUTES, ...ADMIN_ROUTES, ...PORTAL_ROUTES];

test.describe('Global Runtime Audit (Console & Network)', () => {
  
  test.afterAll(async () => {
    // Write results to disk for reporting
    const resultsDir = path.join(__dirname, 'results');
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }
    fs.writeFileSync(
      path.join(resultsDir, 'audit-results.json'),
      JSON.stringify(auditResults, null, 2)
    );
  });

  for (const route of allRoutes) {
    test(`Audit Route: ${route}`, async ({ page }) => {
      const pageErrors: string[] = [];
      const networkErrors: string[] = [];
      const consoleErrors: string[] = [];
      const consoleWarnings: string[] = [];

      // 1. Listen for Unhandled Exceptions (React Hydration, Runtime Crashes)
      page.on('pageerror', (error) => {
        const msg = `[PageError] ${route}: ${error.name} - ${error.message}`;
        pageErrors.push(msg);
        auditResults.pageCrashes.push({ route, error: error.message, stack: error.stack });
      });

      // 2. Listen for Console Errors and Warnings
      page.on('console', (msg) => {
        const type = msg.type();
        const text = msg.text();
        
        // Ignore expected warnings (like Next.js dev server notices)
        if (text.includes('Fast Refresh') || text.includes('HMR')) return;

        if (type === 'error') {
          consoleErrors.push(text);
          auditResults.consoleErrors.push({ route, message: text });
        } else if (type === 'warning') {
          consoleWarnings.push(text);
          auditResults.consoleWarnings.push({ route, message: text });
        }
      });

      // 3. Listen for Failed Network Requests
      page.on('response', (response) => {
        const status = response.status();
        const url = response.url();
        
        // Ignore 3xx redirects
        if (status >= 400) {
          // In development, sometimes specific files might 404, we log them to audit
          networkErrors.push(`[${status}] ${url}`);
          auditResults.networkFailures.push({ route, status, url });
        }
      });

      // 4. Navigate to the route
      await page.goto(route, { waitUntil: 'networkidle' });
      
      // Allow some time for hydration and client-side effects
      await page.waitForTimeout(1000);

      // Verify no critical failures (We won't fail the test immediately, we just collect,
      // but for the sake of the playwright output, we can assert no page errors)
      // Expecting empty arrays means success for that route
      expect(pageErrors, `Page crashed on ${route}`).toHaveLength(0);
      
      // Note: We don't assert on console warnings/errors here because we want to collect them all
      // and report them in the markdown. The user requested we don't fail immediately, just document.
    });
  }
});
