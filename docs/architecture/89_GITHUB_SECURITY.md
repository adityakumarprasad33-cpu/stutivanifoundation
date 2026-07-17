# 89_GITHUB_SECURITY

This document outlines the security configuration that must be applied to the Stuti-Vani Foundation GitHub repository immediately upon making it public.

## 1. Branch Protection Rules

Navigate to **Settings > Branches > Add branch protection rule**.

Target Branch: `main`

**Required Settings:**
- [x] Require a pull request before merging
  - [x] Require approvals (Minimum 1)
  - [x] Dismiss stale pull request approvals when new commits are pushed
- [x] Require status checks to pass before merging
  - [x] Require branches to be up to date before merging
  - Add status checks for: `build`, `lint`, `typecheck` (assuming GitHub actions are configured)
- [x] Require conversation resolution before merging
- [x] Do not allow bypassing the above settings

## 2. Secret Scanning & Security Alerts

Navigate to **Settings > Code security and analysis**.

**Required Settings:**
- [x] Dependabot alerts (Enable)
- [x] Dependabot security updates (Enable)
- [x] Secret scanning (Enable)
  - *This will automatically scan commits for known API key formats (AWS, Stripe, etc.) and block/alert if found.*
- [x] Secret scanning as a push protection (Enable)

## 3. Vulnerability Reporting

Add a `SECURITY.md` file to the root of the repository to provide instructions for security researchers on how to safely disclose vulnerabilities without creating public issues.

**Example SECURITY.md content:**
```markdown
# Security Policy

## Supported Versions
Only the latest branch (`main`) is currently supported with security updates.

## Reporting a Vulnerability
Please do not report security vulnerabilities through public GitHub issues.

Instead, please send an email to `security@stutivanifoundation.org` with details of the vulnerability. We will acknowledge receipt within 48 hours and provide a timeline for remediation.
```

## 4. Gitignore Enforcement

Ensure the `.gitignore` file remains strict. If a developer accidentally tracks a sensitive file, it must be removed from the git history, not just added to `.gitignore`.

If a secret is ever accidentally committed:
1. Consider the secret compromised immediately.
2. Rotate the secret at the provider (Firebase, Razorpay, etc.).
3. Do not rely solely on removing it from Git history, as bots scrape public repositories continuously.
