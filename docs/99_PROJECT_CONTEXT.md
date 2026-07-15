# Stuti-Vani Foundation
# Project Context
Version: 1.0

---

# Project Overview

Stuti-Vani Foundation is a modern NGO platform built to increase transparency, improve public trust, simplify administration, encourage donations, and strengthen community engagement.

This is not a traditional NGO website.

It is a premium, production-grade web platform designed with modern software engineering principles.

The platform should feel comparable to products built by

• Stripe

• Linear

• Apple

• Notion

• Vercel

while preserving the warmth, trust, and compassion expected from a non-profit organization.

---

# Primary Mission

Build India's most trustworthy and technologically advanced NGO platform.

The platform should

Increase Donations

Increase Volunteer Participation

Improve Transparency

Attract CSR Partners

Showcase Real Impact

Provide an exceptional user experience

---

# Core Principles

Everything must be

Professional

Minimal

Accessible

Secure

Scalable

Maintainable

Responsive

Production Ready

Never sacrifice quality for speed.

---

# Technology Stack

Framework

Next.js 15 (App Router)

Language

TypeScript

Styling

Tailwind CSS

shadcn/ui

Animation

Framer Motion

Icons

Lucide React

Backend

Firebase

Authentication

Firestore

Cloud Functions

Analytics

App Check

Media

Cloudinary

Payments

Razorpay

Email

Resend

Hosting

Vercel

---

# Architecture

The application follows

Feature Driven Development

Component Driven Development

Clean Architecture

Service Layer Architecture

Server Components First

Every feature owns

Components

Hooks

Services

Validation

Types

Utilities

---

# Folder Architecture

app/

components/

features/

services/

hooks/

lib/

types/

utils/

constants/

styles/

public/

docs/

Never create random folders.

Always follow the documented architecture.

---

# Data Flow

User

↓

UI

↓

Feature

↓

Service

↓

Firebase

↓

Firestore

↓

Cloud Functions

↓

Cloudinary

Never access Firebase directly from components.

---

# Authentication

Firebase Authentication

Role Based

Roles

Super Admin

Admin

Volunteer

Visitors never require accounts.

---

# Database

Cloud Firestore

Collections

users

projects

programs

blogs

gallery

events

donations

volunteers

reports

partners

messages

settings

notifications

activity_logs

Media is stored only in Cloudinary.

Firestore stores references.

---

# Design Philosophy

Minimal

Elegant

Modern

Professional

Whitespace Driven

Premium

Inspired by

Apple

Stripe

Linear

Vercel

Notion

Technology should never overpower the NGO's mission.

---

# Motion Philosophy

Motion exists only to improve usability.

Use

Framer Motion

Avoid unnecessary animations.

Always respect reduced-motion preferences.

---

# UI Philosophy

Simple

Readable

Accessible

Responsive

Dark Mode

Semantic HTML

Every screen should answer

Where am I?

What can I do?

What should I do next?

---

# Coding Standards

Always

Use TypeScript

Use Tailwind

Use reusable components

Use Service Layer

Use Zod

Use React Hook Form

Use named exports where appropriate

Never

Use any

Duplicate code

Hardcode secrets

Call Firebase directly from components

Use Bootstrap

Use jQuery

Mix UI with business logic

---

# Security

Validate every input.

Authorize every request.

Protect every admin route.

Use App Check.

Protect Cloud Functions.

Use signed Cloudinary uploads.

Store secrets only in environment variables.

---

# Performance

Target

Lighthouse

95+

Core Web Vitals

Passed

Optimize

Images

Fonts

JavaScript

Firestore Queries

Bundle Size

Animations

---

# Accessibility

Target

WCAG 2.2 AA

Support

Keyboard Navigation

Screen Readers

Focus States

Reduced Motion

Semantic HTML

---

# SEO

Every page should include

Metadata

Structured Data

Open Graph

Twitter Cards

Canonical URL

Readable URLs

Dynamic metadata

---

# Deployment

Development

↓

Staging

↓

Production

Hosted on

Vercel

Never deploy untested code.

---

# AI Development Rules

Always understand the architecture before coding.

Never generate placeholder code.

Never create duplicate components.

Always search for reusable components first.

Always preserve project architecture.

Always write production-ready code.

---

# Documentation

The following documents define the project.

00_PROJECT_VISION

01_PRODUCT_REQUIREMENTS

02_TECH_STACK

02A_AI_DEVELOPMENT_RULES

03_DESIGN_SYSTEM

03A_BRAND_GUIDELINES

03B_MOTION_SYSTEM

04_UI_UX_GUIDELINES

05_DATABASE_SCHEMA

06_FIREBASE_SETUP

07_AUTH_SYSTEM

08_ROUTES

09_COMPONENT_LIBRARY

10_ADMIN_DASHBOARD

11_API_STRUCTURE

12_SECURITY

13_PERFORMANCE

14_SEO

15_ACCESSIBILITY

16_DEPLOYMENT

17_FEATURE_ROADMAP

18_CODING_STANDARDS

19_PROJECT_ARCHITECTURE

20_AI_ENGINEERING_GUIDELINES

21_CLOUDINARY_ARCHITECTURE

These documents are the single source of truth.

If any generated code conflicts with these documents, the documentation takes precedence.

---

# Current Development Status

Architecture Phase

Completed

Design System

Completed

Database Design

Completed

Authentication Design

Completed

Component Library

Completed

Dashboard Architecture

Completed

Deployment Strategy

Completed

Coding Standards

Completed

Project Architecture

Completed

The project is now ready for implementation.

---

# AI Instructions

Before writing code

Understand the feature.

Review the architecture.

Identify reusable components.

Identify existing services.

Follow the documented folder structure.

Maintain consistency.

Never bypass the Service Layer.

Never invent database collections.

Never invent routes.

Never invent environment variables.

Never introduce unnecessary dependencies.

Generate code that is ready to merge into the production branch.

---

# Definition of Success

The project should

Feel premium.

Load quickly.

Be accessible.

Be secure.

Be scalable.

Be maintainable.

Build trust.

Increase donations.

Increase volunteer engagement.

Help the foundation create measurable social impact.

---

# Final Principle

Technology exists to amplify the mission of Stuti-Vani Foundation.

Every design decision, architectural choice, and line of code should strengthen transparency, trust, accessibility, and long-term sustainability.

When in doubt, choose the solution that is simpler, more maintainable, and provides the best experience for the people who rely on this platform.