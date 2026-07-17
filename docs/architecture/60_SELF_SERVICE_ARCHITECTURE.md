# 60. Self-Service Architecture

## Principles
1. **Empowerment**: Provide volunteers full visibility into their impact, schedule, and compliance status.
2. **Isolation**: The Admin Dashboard and the Volunteer Portal share zero UI components (beyond the base Design System).
3. **Reusability**: Under the hood, they consume the exact same Repositories and Services.

## Modules Exposed
The Portal safely exposes the following modules to the end-user:
- **IAM**: via Profile management.
- **Programs & Events**: via Assignments & Attendance.
- **DAM (Gallery)**: via Documents and Certificates.
- **Analytics**: via Performance scores.

This modular separation guarantees that expanding the Admin CMS does not accidentally break the Volunteer Portal, and vice versa.
