# Stuti-Vani Foundation
# Technology Stack & Architecture

Version: 1.0

---

# Purpose

This document defines the official technology stack for the Stuti-Vani Foundation platform.

Every contributor, AI coding assistant, and developer must follow this document.

The objective is to ensure consistency, scalability, maintainability, performance, and long-term sustainability.

---

# Architecture Overview

The platform follows a modern Full Stack architecture built using:

• Next.js App Router

• Firebase Backend

• TypeScript

• Tailwind CSS

• Server Components

• Component Driven Development

• Mobile First Design

---

# Frontend Framework

## Next.js 15

Purpose

Modern React Framework

Reasons

• Server Components

• App Router

• SEO

• Performance

• Image Optimization

• Streaming

• Production Ready

Use

Routing

Layouts

Metadata

SSR

Static Generation

Dynamic Routes

Image Optimization

---

# Programming Language

## TypeScript

Purpose

Type Safety

Reasons

Better Developer Experience

Strong Typing

Safer Refactoring

Fewer Runtime Errors

Better AI Generated Code

Rules

Never use JavaScript files.

Always use

.ts

.tsx

---

# Styling

## Tailwind CSS

Purpose

Utility-first styling

Reasons

Fast

Reusable

Responsive

Production Optimized

Easy Theme Support

Consistent Design

Rules

Never write inline styles.

Never use Bootstrap.

Never use jQuery.

Avoid custom CSS unless absolutely necessary.

---

# UI Components

## Shadcn UI

Purpose

Accessible Components

Reasons

Beautiful

Reusable

Customizable

Accessible

Developer Friendly

Components

Buttons

Inputs

Cards

Dialogs

Tabs

Dropdowns

Toast

Sidebar

Accordion

Sheet

Calendar

Popover

Navigation Menu

Avatar

Table

Pagination

Breadcrumb

---

# Icons

Lucide React

Reasons

Lightweight

Modern

Consistent

Tree Shakeable

---

# Animations

Framer Motion

Purpose

Micro Interactions

Page Transitions

Scroll Animations

Hover Effects

Loading States

Guidelines

Animations should improve usability.

Never distract users.

---

# Advanced Animations

GSAP

Use only when necessary.

Examples

Hero Animations

Timeline

Complex Scroll Effects

Parallax

Do not use GSAP for basic animations.

Prefer Framer Motion first.

---

# Backend

Firebase

Purpose

Backend as a Service

Services Used

Authentication

Firestore

Storage

Hosting (optional)

Analytics

Cloud Functions

Cloud Messaging (future)

Reasons

Fast Development

Scalable

Reliable

Serverless

Production Ready

---

# Database

Cloud Firestore

Purpose

NoSQL Cloud Database

Collections

users

projects

gallery

blogs

events

volunteers

messages

donations

reports

settings

Advantages

Realtime

Offline Support

Scalable

Easy Integration

---

# Authentication

Firebase Authentication

Methods

Email Password

Google (future)

Rules

Only admins can log in.

Public users do not require accounts.

---

# File Storage

Firebase Storage

Stores

Images

Videos

Reports

Documents

Certificates

Team Photos

Project Images

---

# Analytics

Google Analytics

Firebase Analytics

Track

Visitors

Page Views

Clicks

Donations

Volunteer Registrations

Traffic Sources

Performance

---

# Forms

React Hook Form

Reasons

Fast

Performant

Minimal Re-renders

Easy Validation

---

# Validation

Zod

Purpose

Schema Validation

Benefits

Type Safe

Reusable

Secure

---

# State Management

Use React State whenever possible.

Use Context API for global UI state.

Examples

Theme

Sidebar

User Session

Notifications

Avoid unnecessary global state.

Do not introduce Redux unless future scale requires it.

---

# Data Fetching

Use Firebase SDK.

For server-side data:

Server Components

Server Actions (when applicable)

Client Components only when interaction is required.

---

# Images

Next Image Component

Benefits

Optimization

Lazy Loading

Responsive Images

WebP

Automatic Sizing

---

# Fonts

Google Fonts

Recommended

Inter

Geist

Poppins

Use only one primary font family.

---

# Theme

Light Mode

Dark Mode

System Preference

Persistent User Preference

---

# Folder Organization

Feature Based

Example

src/

app/

components/

features/

hooks/

services/

firebase/

lib/

types/

constants/

styles/

utils/

---

# Environment Variables

Never expose secrets.

Store all sensitive values inside

.env.local

Examples

Firebase Keys

Analytics Keys

API Keys

Email Service Keys

---

# Code Quality

ESLint

Prettier

Strict TypeScript

Consistent Formatting

Reusable Components

Clean Architecture

---

# Version Control

Git

GitHub

Branch Strategy

main

development

feature/*

fix/*

release/*

---

# Deployment

Primary

Vercel

Alternative

Firebase Hosting

Requirements

HTTPS

Automatic Builds

Preview Deployments

Environment Variables

---

# Browser Support

Chrome

Firefox

Edge

Safari

Latest Two Versions

---

# Performance Goals

First Contentful Paint

< 1.5 seconds

Largest Contentful Paint

< 2.5 seconds

Cumulative Layout Shift

< 0.1

Lighthouse Score

95+

Accessibility

95+

SEO

100

Best Practices

100

---

# Security

HTTPS Only

Firebase Rules

Secure Authentication

Input Validation

Output Sanitization

Environment Variables

Role Based Access

---

# Scalability

The architecture must support

100,000+ visitors

Multiple admins

Thousands of donations

Thousands of gallery images

Future mobile app

Future multilingual support

Future AI assistant

---

# Technologies That Must Never Be Used

Bootstrap

jQuery

Inline CSS

Inline JavaScript

Large UI Libraries

Class Components

Hardcoded Data

Unsecured APIs

Anonymous Admin Access

---

# Technology Philosophy

Choose technologies that are:

Modern

Well Maintained

Production Ready

Secure

Accessible

Scalable

Developer Friendly

Community Supported

Long-Term Stable

Every technology included in this project must solve a real problem.

Avoid unnecessary dependencies.

Prefer simplicity over complexity.

Build for maintainability before adding features.