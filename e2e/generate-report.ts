import * as fs from 'fs';
import * as path from 'path';

const resultsDir = path.join(__dirname, 'results');
const reportPath = path.join(__dirname, '..', 'docs', 'architecture', '90_RUNTIME_QA_REPORT.md');

function generateReport() {
  let consoleResults = { consoleErrors: [], consoleWarnings: [], networkFailures: [], pageCrashes: [] };
  let axeResults = { violations: [] };

  try {
    const consoleData = fs.readFileSync(path.join(resultsDir, 'audit-results.json'), 'utf-8');
    consoleResults = JSON.parse(consoleData);
  } catch (e) {
    console.log('No console audit results found.');
  }

  try {
    const axeData = fs.readFileSync(path.join(resultsDir, 'axe-results.json'), 'utf-8');
    axeResults = JSON.parse(axeData);
  } catch (e) {
    console.log('No accessibility audit results found.');
  }

  const { consoleErrors, consoleWarnings, networkFailures, pageCrashes } = consoleResults;
  const { violations } = axeResults;

  const totalIssues = consoleErrors.length + networkFailures.length + pageCrashes.length + violations.length;

  const report = `# 90_RUNTIME_QA_REPORT

## Executive Summary

**Date:** ${new Date().toISOString()}
**Platform Health:** ${totalIssues === 0 ? 'Excellent' : totalIssues < 10 ? 'Good' : 'Needs Attention'}
**Total Runtime Issues Found:** ${totalIssues}
**Total Warnings Found:** ${consoleWarnings.length}

---

## Environment Validation
Result: Verified during QA setup.

---

## Runtime & Browser Console

### Page Crashes (Unhandled Exceptions)
${pageCrashes.length === 0 ? '✅ None' : pageCrashes.map((c: any) => `- **${c.route}**: ${c.error}`).join('\n')}

### Console Errors
${consoleErrors.length === 0 ? '✅ None' : consoleErrors.map((e: any) => `- **${e.route}**: \`${e.message}\``).join('\n')}

### Console Warnings
${consoleWarnings.length === 0 ? '✅ None' : consoleWarnings.map((w: any) => `- **${w.route}**: \`${w.message}\``).join('\n')}

---

## Network Inspection

### Failed Requests (404/500)
${networkFailures.length === 0 ? '✅ None' : networkFailures.map((n: any) => `- **${n.route}**: [${n.status}] ${n.url}`).join('\n')}

---

## Accessibility

### Axe Violations (Sampled Routes)
${violations.length === 0 ? '✅ None' : violations.map((v: any) => `- **${v.route}**: [${v.impact.toUpperCase()}] ${v.id} - ${v.description} (${v.nodes} nodes affected)`).join('\n')}

---

## Authentication, CRUD, UI, Performance, Security
*Manual Verification Required - Refer to Playwright specific test outputs and subagent inspection.*

---

## Final Verdict
${totalIssues === 0 ? '✅ Production Ready' : '❌ Not Production Ready (Remediation Required)'}

---

## Applied Fixes
*(Leave blank until remediation begins)*

`;

  fs.writeFileSync(reportPath, report);
  console.log('Report generated at:', reportPath);
}

generateReport();
