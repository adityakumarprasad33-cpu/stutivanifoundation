# Stuti-Vani Foundation
# Authentication & Authorization Architecture

Version: 1.0

---

# Purpose

This document defines the complete authentication and authorization system for the Stuti-Vani Foundation platform.

Authentication verifies identity.

Authorization determines what authenticated users are allowed to do.

The system is designed to be secure, scalable, role-based, and production-ready.

---

# Authentication Philosophy

Only internal users require authentication.

Visitors should never be forced to create an account.

Public users can

• Browse the website

• Donate

• Submit volunteer applications

• Contact the NGO

• Read blogs

• Download reports

Authentication is required only for

• Super Admin

• Admin

• Volunteer (Internal Team)

---

# Authentication Provider

Firebase Authentication

Current Provider

Email + Password

Future Providers

Google Workspace

Microsoft

GitHub

Phone Authentication (Optional)

Do not enable unnecessary providers.

---

# Authentication Flow

User enters email and password

↓

Firebase Authentication

↓

Verify credentials

↓

Fetch Firestore profile

↓

Verify account status

↓

Verify role

↓

Create session

↓

Redirect to Dashboard

---

# Session Management

Use Firebase Authentication session.

Session should persist after refresh.

Automatically restore authentication state.

Automatically redirect unauthenticated users to Login.

---

# Password Policy

Minimum Length

8 Characters

Recommended

12+

Must include

Uppercase

Lowercase

Number

Special Character

Do not allow weak passwords.

---

# Account Status

Every user has a status.

active

inactive

suspended

pending

deleted

Only active users may log in.

---

# User Roles

The platform supports three roles.

---

## Super Admin

Full access.

Can

Manage all users

Create Admins

Delete Admins

Assign roles

Manage settings

Manage projects

Manage blogs

Manage gallery

Manage events

Manage reports

Manage donations

Manage volunteers

View analytics

Manage system configuration

Access activity logs

---

## Admin

Operational management.

Can

Manage projects

Manage blogs

Manage events

Manage gallery

Manage reports

Approve volunteers

View donations

Reply to contact messages

Cannot

Manage Super Admin

Change permissions

Delete admins

Modify system configuration

---

## Volunteer

Internal staff access.

Can

View dashboard

View assigned tasks

Update profile

Upload activity reports

View announcements

Cannot

Delete data

Modify settings

Manage users

View financial information

---

# Authorization Matrix

Feature

Super Admin

Admin

Volunteer

Dashboard

✅

✅

✅

Projects

✅

✅

Read

Blogs

✅

✅

Read

Gallery

✅

✅

Upload

Events

✅

✅

Read

Reports

✅

✅

Read

Users

✅

Read

No

Settings

✅

No

No

Donations

✅

Read

No

Analytics

✅

Read

No

Activity Logs

✅

No

No

---

# Firestore User Document

Example

{
  "uid": "...",
  "displayName": "...",
  "email": "...",
  "role": "admin",
  "status": "active",
  "createdAt": Timestamp,
  "updatedAt": Timestamp,
  "lastLogin": Timestamp
}

---

# Login Page

Features

Minimal Design

Foundation Logo

Email

Password

Remember Session

Forgot Password

Show Password Toggle

Loading State

Error Messages

Dark Mode

Responsive Layout

---

# Forgot Password

User enters email

↓

Firebase sends reset email

↓

User resets password

↓

Login again

---

# Protected Routes

Every dashboard route must require authentication.

Examples

/dashboard

/dashboard/projects

/dashboard/blogs

/dashboard/events

/dashboard/gallery

/dashboard/reports

/dashboard/users

/dashboard/settings

Never allow direct access.

---

# Route Protection

Use Middleware.

Check

Authentication

↓

User Exists

↓

Role

↓

Status

↓

Access Granted

Otherwise

Redirect to Login

---

# Role Validation

Never trust the frontend.

Always verify

Authentication

Role

Account Status

Firestore Document

---

# Idle Session Timeout

Automatically log out after

30 minutes

of inactivity.

Warn the user

2 minutes

before logout.

---

# Failed Login Protection

Maximum Attempts

5

Lock Account

15 Minutes

Log failed attempts.

Future

Enable CAPTCHA after repeated failures.

---

# Activity Logging

Log

Login

Logout

Password Reset

Profile Update

Role Changes

Settings Changes

Content Changes

Never log passwords.

Never log sensitive credentials.

---

# Multi-Device Login

Allowed

Future

Display active sessions.

Allow force logout.

---

# Account Creation

Accounts are created only by

Super Admin.

Public registration is disabled.

---

# Account Deletion

Never permanently delete accounts.

Instead

status = deleted

Retain audit history.

---

# Email Verification

Required

Admin Accounts

Volunteer Accounts

Do not allow login before verification.

---

# Security Features

HTTPS

Secure Cookies

Firebase App Check

Role Verification

Middleware Protection

Input Validation

Rate Limiting

Audit Logs

---

# Error Messages

Good

Incorrect email or password.

Account is inactive.

Password reset email sent.

Avoid

User does not exist.

Wrong password.

These messages reveal too much information.

---

# Future Enhancements

Two-Factor Authentication

Passkeys

Google Workspace SSO

Microsoft Login

Session Dashboard

Device Management

Login History

Security Alerts

---

# Authentication Checklist

✔ Email + Password enabled

✔ Public signup disabled

✔ Role-based access implemented

✔ Middleware protection enabled

✔ Password reset available

✔ Email verification enabled

✔ Activity logging enabled

✔ Account status verification enabled

✔ Secure sessions implemented

✔ Idle timeout configured

---

# Final Principle

Authentication should never be an obstacle for visitors.

Authentication exists only to protect administrative functionality.

Every request must verify

Identity

Role

Permission

Account Status

Security before granting access.

No administrative action should ever rely solely on client-side validation.