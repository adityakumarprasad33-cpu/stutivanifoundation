# Stuti-Vani Foundation
# Firebase Architecture & Configuration

Version: 1.0

---

# Purpose

This document defines the Firebase architecture, services, configuration, project organization, development workflow, and best practices for the Stuti-Vani Foundation platform.

Firebase is responsible for

• Authentication

• Firestore Database

• Cloud Functions

• Analytics

• App Check

Firebase Storage is NOT used in this project.

All media assets are stored in Cloudinary.

---

# Firebase Services

The platform uses the following Firebase services.

✅ Authentication

✅ Firestore Database

✅ Cloud Functions

✅ Analytics

✅ App Check

Future

Cloud Messaging

Remote Config

Crashlytics

---

# Architecture

Client

↓

Next.js

↓

Firebase SDK

↓

Authentication

Firestore

Cloud Functions

Analytics

↓

Cloudinary (Media Storage)

---

# Firebase Project

Project Name

Stuti-Vani Foundation

Project ID

To be configured

Environment

Development

Staging

Production

Every environment must use a separate Firebase project.

Never use Production for testing.

---

# Project Structure

firebase/

config/

firebase.ts

auth.ts

firestore.ts

functions.ts

analytics.ts

app-check.ts

collections.ts

types.ts

---

# Environment Variables

All Firebase configuration must be stored inside

.env.local

Never hardcode credentials.

Example

NEXT_PUBLIC_FIREBASE_API_KEY=

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=

NEXT_PUBLIC_FIREBASE_PROJECT_ID=

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=

NEXT_PUBLIC_FIREBASE_APP_ID=

NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

Never commit .env files.

---

# Firebase Initialization

Create only one Firebase instance.

Singleton Pattern required.

Never initialize Firebase multiple times.

Export

app

auth

db

functions

analytics

---

# Authentication

Provider

Email Password

Future

Google

Microsoft

GitHub

Only administrators can authenticate.

Public users do not require accounts.

---

# User Roles

super_admin

admin

volunteer

Every authenticated user must have a role stored in Firestore.

Never rely solely on Authentication claims.

---

# Firestore

Collections

users

projects

programs

blogs

gallery

events

donations

volunteers

contact_messages

partners

reports

settings

notifications

activity_logs

Collection names

lowercase

plural

No spaces

No camelCase

---

# Firestore Data Rules

Every document should contain

createdAt

updatedAt

status

createdBy

updatedBy

Every timestamp must use

serverTimestamp()

Never use client time.

---

# Firestore Best Practices

Keep documents small.

Avoid deeply nested data.

Prefer references.

Paginate queries.

Use indexes.

Avoid duplicate information.

Never store images.

Store Cloudinary URLs only.

---

# Firestore Reads

Optimize reads.

Avoid reading entire collections.

Always query using

limit()

where()

orderBy()

Use pagination.

Avoid unnecessary listeners.

---

# Firestore Writes

Batch writes whenever possible.

Use transactions for

Donation updates

Counters

Financial data

Never perform multiple dependent writes without transactions.

---

# Cloud Functions

Purpose

Secure server-side operations.

Examples

Send donation receipt

Notify administrators

Generate reports

Verify payments

Newsletter emails

Cleanup operations

Future scheduled jobs

Never expose sensitive logic to the frontend.

---

# Analytics

Track

Homepage Visits

Project Views

Donation Clicks

Donation Success

Volunteer Registrations

Contact Form Submission

Newsletter Signup

Blog Views

Downloads

Search Queries

Scroll Depth

Performance

Do not collect unnecessary personal information.

---

# App Check

Enable Firebase App Check.

Use reCAPTCHA Enterprise (or latest supported provider).

Protect

Firestore

Cloud Functions

Analytics

Future APIs

---

# Authentication Flow

Admin enters credentials

↓

Firebase Authentication

↓

Verify account

↓

Fetch Firestore profile

↓

Verify role

↓

Create session

↓

Redirect Dashboard

---

# Firestore Flow

Client Request

↓

Validation

↓

Firestore Query

↓

Response

↓

UI Update

Every query should include proper error handling.

---

# Error Handling

Handle

Permission Denied

Unauthenticated

Network Errors

Offline

Timeout

Rate Limit

Unknown Errors

Display user-friendly messages.

Log technical errors internally.

---

# Offline Support

Enable Firestore offline persistence when appropriate.

Gracefully handle reconnects.

Never lose pending user actions.

---

# Security Principles

Never trust client data.

Always validate server-side.

Use Firestore Security Rules.

Restrict admin operations.

Protect Cloud Functions.

Keep secrets on the server.

---

# Performance

Enable Firestore indexes.

Optimize queries.

Reduce reads.

Reduce writes.

Use caching where appropriate.

Avoid duplicate listeners.

---

# Backup Strategy

Firestore Export

Daily

Retention

30 Days

Cloudinary assets backed up separately.

---

# Logging

Log

Authentication Events

Admin Actions

Project Updates

Blog Changes

Donation Processing

Cloud Function Errors

Logs should never contain sensitive information.

---

# Monitoring

Monitor

Authentication failures

Firestore usage

Cloud Function execution

Analytics events

Performance metrics

App Check violations

---

# Development Workflow

Developer

↓

Feature Branch

↓

Local Development

↓

Firebase Emulator (Preferred)

↓

Testing

↓

GitHub

↓

Preview Deployment

↓

Production

Never develop directly on Production.

---

# Firebase Emulator

Use Firebase Emulator Suite for

Authentication

Firestore

Functions

Testing

Avoid unnecessary usage of the production database during development.

---

# Versioning

Separate

Development

Staging

Production

Configurations.

Never reuse production credentials.

---

# Naming Conventions

Firestore Collections

lowercase_plural

Functions

camelCase

Documents

auto-id

Fields

camelCase

Environment Variables

UPPERCASE

---

# Integration with Cloudinary

Firestore stores only

publicId

secureUrl

assetType

width

height

format

Cloudinary manages

Storage

Optimization

Transformation

CDN

Media Delivery

---

# Future Integrations

Resend

Razorpay

Google Maps

Google reCAPTCHA

Google Search Console

Google Tag Manager

Cloudinary

---

# Checklist

✔ Firebase initialized once

✔ Environment variables configured

✔ Firestore structured

✔ Authentication secured

✔ Cloud Functions isolated

✔ Analytics enabled

✔ App Check enabled

✔ Emulator configured

✔ Production environment separated

✔ Cloudinary integrated

---

# Final Principle

Firebase is the application's backend infrastructure—not its file storage system.

Authentication, database operations, analytics, and server-side logic belong in Firebase.

Media management belongs in Cloudinary.

Every Firebase integration must prioritize security, scalability, maintainability, and performance.