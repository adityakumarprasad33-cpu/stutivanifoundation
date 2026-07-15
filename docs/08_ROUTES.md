# Stuti-Vani Foundation
# Application Routes Architecture

Version: 1.0

---

# Purpose

This document defines the complete routing architecture of the Stuti-Vani Foundation platform.

Every page, dashboard module, API endpoint, protected route, dynamic route, and navigation hierarchy must follow this specification.

The routing architecture is designed to be

• Scalable

• SEO Friendly

• Secure

• Easy to Maintain

• Consistent

---

# Routing Philosophy

The routing system should

Be simple

Be predictable

Support SEO

Support nested layouts

Support role-based protection

Support future scalability

Every route must have one clear purpose.

---

# Framework

Next.js App Router

Use

app/

Never use

pages/

---

# Route Categories

Public

Protected

Dynamic

Authentication

API

Error

---

# Public Routes

/

Homepage

Accessible by everyone.

---

/about

About Foundation

Mission

Vision

Journey

Team

---

/programs

All NGO Programs

---

/programs/[slug]

Program Details

Dynamic Route

Example

/programs/education

/programs/healthcare

---

/projects

All Projects

---

/projects/[slug]

Project Details

Dynamic Route

Example

/projects/girl-child-scholarship

---

/events

All Events

---

/events/[slug]

Event Details

---

/gallery

Photo Gallery

Video Gallery

---

/gallery/[category]

Category Filter

Example

/gallery/education

/gallery/healthcare

---

/impact

Impact Statistics

Annual Reports

Success Stories

---

/blog

Blog Listing

---

/blog/[slug]

Single Blog

SEO Optimized

---

/reports

Reports Download

---

/reports/[year]

Example

/reports/2025

---

/volunteer

Volunteer Application

---

/donate

Donation Page

---

/contact

Contact Page

---

/privacy-policy

Privacy Policy

---

/terms

Terms & Conditions

---

/cookies

Cookie Policy

---

/404

Not Found

---

/500

Server Error

---

# Authentication Routes

/login

Admin Login

---

/forgot-password

Password Reset

---

/reset-password

Password Recovery

---

# Protected Routes

All protected routes require

Authentication

Role Validation

Account Status Validation

---

/dashboard

Dashboard Overview

Roles

Admin

Super Admin

Volunteer

---

/dashboard/profile

Profile

---

/dashboard/settings

Settings

Super Admin Only

---

/dashboard/users

User Management

Super Admin

---

/dashboard/projects

Project Management

---

/dashboard/projects/new

Create Project

---

/dashboard/projects/[id]

Edit Project

---

/dashboard/programs

Program Management

---

/dashboard/blogs

Blog Management

---

/dashboard/blogs/new

Create Blog

---

/dashboard/blogs/[id]

Edit Blog

---

/dashboard/gallery

Gallery Management

---

/dashboard/events

Event Management

---

/dashboard/events/new

Create Event

---

/dashboard/events/[id]

Edit Event

---

/dashboard/reports

Reports Management

---

/dashboard/donations

Donation Management

---

/dashboard/volunteers

Volunteer Management

---

/dashboard/messages

Contact Messages

---

/dashboard/newsletters

Newsletter Subscribers

---

/dashboard/analytics

Analytics

Admin

Super Admin

---

/dashboard/activity

Activity Logs

Super Admin

---

/dashboard/system

System Settings

Super Admin

---

# Future Routes

/campaigns

/campaigns/[slug]

/scholarships

/careers

/partners

/media

/news

/faqs

---

# Dynamic Routes

Programs

/programs/[slug]

Projects

/projects/[slug]

Blogs

/blog/[slug]

Events

/events/[slug]

Reports

/reports/[year]

Gallery

/gallery/[category]

---

# Route Protection

Public

No Authentication

Protected

Authentication Required

Admin

Role Required

Super Admin

Role Required

Volunteer

Limited Access

---

# Metadata

Every route must define

Title

Description

OpenGraph

Twitter Card

Canonical URL

Robots

Keywords

Structured Data

---

# Breadcrumbs

Example

Home

>

Programs

>

Education

Every internal page should have breadcrumbs.

---

# Layout Structure

Public Layout

Navbar

↓

Content

↓

Footer

Dashboard Layout

Sidebar

↓

Topbar

↓

Content

↓

Footer

---

# Navigation Rules

Main Navigation

Maximum

7 items

Secondary links

Footer

Dashboard links

Sidebar

---

# URL Rules

Use lowercase

Use hyphens

Never use spaces

Examples

Good

/projects/health-camp

Bad

/projects/HealthCamp2025

---

# Redirect Rules

Redirect

http

↓

https

Redirect

www

↓

non-www (or vice versa)

Remove duplicate URLs.

---

# Loading Routes

Every page must have

loading.tsx

Skeleton UI

---

# Error Routes

Every page should support

error.tsx

Custom Error UI

---

# Not Found

Support

not-found.tsx

Custom Design

Helpful Navigation

---

# Route Groups

Use route groups when needed

Example

(app)

(auth)

(marketing)

(dashboard)

Do not expose folder names in URLs.

---

# Route Security

Middleware should verify

Authentication

↓

User Exists

↓

Account Status

↓

Role

↓

Permission

↓

Access Granted

---

# SEO Friendly URLs

Good

/blog/how-education-changes-lives

Good

/projects/women-health-awareness

Avoid

/blog?id=123

/projects?project=45

---

# URL Slugs

Automatically generated.

Unique.

Lowercase.

Hyphen separated.

Immutable after publishing whenever possible.

---

# Dashboard Navigation

Dashboard

Projects

Programs

Blogs

Gallery

Events

Reports

Donations

Volunteers

Messages

Analytics

Users

Settings

Logout

---

# Mobile Navigation

Bottom Sheet

Drawer

Sticky CTA

Responsive

---

# Accessibility

Keyboard Navigation

Focus States

Readable URLs

Semantic Links

---

# Performance

Prefetch routes

Lazy load dynamic pages

Optimize metadata

Streaming when appropriate

---

# Final Principle

Every route should have

One purpose

One owner

One clear navigation path

One optimized experience

Routing should feel invisible to the user while remaining predictable for developers.