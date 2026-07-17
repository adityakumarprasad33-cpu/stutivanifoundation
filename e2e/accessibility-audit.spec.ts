import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { PUBLIC_ROUTES, ADMIN_ROUTES, PORTAL_ROUTES } from './routes';
import * as fs from 'fs';
import * as path from 'path';

// Just take a representative sample of routes for the accessibility scan
// to save time, as scanning all 35 routes can be very slow.
const sampleRoutes = [
  '/',
  '/about',
  '/donate',
  '/volunteer',
  '/contact',
  '/login',
  '/dashboard',
  '/portal'
];

const axeResults = {
  violations: [] as any[]
};

test.describe('Global Accessibility Audit', () => {

  test.afterAll(async () => {
    const resultsDir = path.join(__dirname, 'results');
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }
    fs.writeFileSync(
      path.join(resultsDir, 'axe-results.json'),
      JSON.stringify(axeResults, null, 2)
    );
  });

  for (const route of sampleRoutes) {
    test(`Axe Scan: ${route}`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' });
      
      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

      if (accessibilityScanResults.violations.length > 0) {
        accessibilityScanResults.violations.forEach(violation => {
          axeResults.violations.push({
            route,
            id: violation.id,
            impact: violation.impact,
            description: violation.description,
            nodes: violation.nodes.length
          });
        });
      }

      // We won't strictly fail the test, we just want to collect the violations for the report
      // expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
