# Stuti-Vani Foundation
# Project Architecture

Version: 1.0

---

# Purpose

This document defines the official project architecture for the Stuti-Vani Foundation platform.

It establishes how the application is organized, how modules interact, where files belong, and the architectural rules every developer and AI coding assistant must follow.

The objective is to build a codebase that remains maintainable, scalable, readable, and production-ready for years.

---

# Architecture Philosophy

The project follows

• Feature Driven Development

• Component Driven Development

• Clean Architecture

• Separation of Concerns

• Single Responsibility Principle

• Domain-Based Organization

Every feature should own its

Components

Hooks

Services

Validation

Types

Utilities

Tests (future)

---

# High Level Architecture

Client

↓

Next.js App Router

↓

Features

↓

Services

↓

Firebase

↓

Firestore

↓

Cloud Functions

↓

Cloudinary

---

# Technology Stack

Frontend

Next.js 15

React 19

TypeScript

Tailwind CSS

shadcn/ui

Framer Motion

Backend

Firebase

Authentication

Firestore

Cloud Functions

Analytics

App Check

Media

Cloudinary

Hosting

Vercel

Payments

Razorpay

Email

Resend

---

# Root Directory

project-root/

app/

components/

features/

hooks/

lib/

services/

types/

constants/

utils/

styles/

public/

docs/

middleware.ts

next.config.ts

package.json

README.md

---

# App Directory

app/

Contains

Routes

Layouts

Templates

Loading UI

Error UI

Metadata

Examples

app/

layout.tsx

page.tsx

loading.tsx

error.tsx

not-found.tsx

dashboard/

projects/

blog/

---

# Features

Each business feature owns its code.

features/

auth/

projects/

programs/

blogs/

gallery/

events/

donations/

volunteers/

reports/

dashboard/

analytics/

settings/

contact/

newsletter/

---

# Feature Structure

Example

features/projects/

components/

hooks/

services/

types/

validation/

utils/

constants/

actions/

schemas/

index.ts

Every feature follows the same structure.

---

# Components

Shared UI components.

components/

ui/

layout/

navigation/

feedback/

shared/

charts/

forms/

providers/

---

# UI Components

components/ui/

Button

Card

Badge

Input

Textarea

Avatar

Dialog

Sheet

Tabs

Table

Skeleton

Toast

Tooltip

Pagination

These components should remain generic.

---

# Layout Components

components/layout/

Navbar

Footer

Sidebar

Container

Section

DashboardLayout

PageHeader

---

# Shared Components

components/shared/

ProjectCard

BlogCard

GalleryGrid

VolunteerForm

DonationCard

PartnerLogo

StatisticCard

These may depend on business models but remain reusable.

---

# Hooks

hooks/

useTheme

useMediaQuery

useDebounce

usePagination

useSearch

useScroll

Only generic hooks belong here.

Feature-specific hooks stay inside their feature folders.

---

# Services

services/

auth/

firebase/

cloudinary/

analytics/

email/

payment/

search/

Services communicate with external systems.

Business logic belongs inside feature services.

---

# Lib

lib/

firebase/

validators/

permissions/

seo/

logger/

formatters/

config/

cache/

Lib contains infrastructure and shared utilities.

---

# Types

types/

user.ts

project.ts

blog.ts

gallery.ts

donation.ts

event.ts

volunteer.ts

report.ts

settings.ts

Avoid duplicate type definitions.

---

# Constants

constants/

routes.ts

roles.ts

permissions.ts

colors.ts

breakpoints.ts

validation.ts

navigation.ts

Never hardcode reusable values.

---

# Utilities

utils/

slug.ts

date.ts

currency.ts

image.ts

download.ts

clipboard.ts

helpers.ts

Utility functions should be pure.

---

# Styles

styles/

globals.css

animations.css (minimal)

Tailwind handles most styling.

Avoid large CSS files.

---

# Public

public/

icons/

images/

logos/

manifest/

robots.txt

favicon.ico

Only static assets belong here.

---

# Documentation

docs/

Contains

Architecture

Design System

Security

Performance

Roadmap

Developer Documentation

This directory is the project's knowledge base.

---

# Aliases

Use

@/components

@/features

@/hooks

@/services

@/lib

@/types

@/utils

Never use long relative imports like

../../../../../

---

# Dependency Rules

Allowed

Page

↓

Feature

↓

Service

↓

Firebase

↓

Cloudinary

Not Allowed

Service

↓

Component

Feature

↓

Page

Component

↓

Page

Dependencies should always point downward.

---

# Business Logic

Business logic belongs inside

Features

Services

Never inside UI components.

---

# Validation

Validation belongs inside

validation/

Use

Zod

Never duplicate validation schemas.

---

# State Management

Priority

Server Components

↓

React State

↓

Context API

↓

External Libraries (only if necessary)

Keep state close to where it is used.

---

# Data Fetching

Server Components first.

Client fetching only when required.

Always fetch through Services.

Never query Firebase directly inside components.

---

# Routing

App Router only.

Every route owns

layout.tsx

page.tsx

loading.tsx

error.tsx

metadata

---

# Security

Protected routes

Middleware

Role validation

Service validation

Firestore Rules

Cloud Functions

Every layer validates requests.

---

# Error Handling

Each feature should include

Loading

Empty

Error

Success

Fallback

Never leave users without feedback.

---

# Performance

Lazy Loading

Code Splitting

Image Optimization

Caching

Pagination

Virtualization

Streaming

Server Components

---

# Testing Strategy (Future)

Unit Tests

Integration Tests

End-to-End Tests

Accessibility Tests

Performance Tests

Visual Regression Tests

---

# Logging

Use a centralized logging utility.

Never use random console.log statements.

Development logs should not appear in production.

---

# Configuration

Keep all configuration in one place.

Examples

Firebase

Cloudinary

Navigation

SEO

Environment

Permissions

---

# Build Rules

No TypeScript errors.

No ESLint errors.

No duplicate code.

No circular dependencies.

No unused files.

No dead code.

---

# Project Growth

The architecture should support

100,000+ users

Thousands of media files

Multiple administrators

Future mobile application

Future multilingual support

Future AI integrations

Without major restructuring.

---

# Architectural Principles

Every feature owns itself.

Every component has one responsibility.

Every service communicates with external systems.

Every dependency has a clear direction.

Every module should be independently understandable.

---

# Definition of Good Architecture

An unfamiliar developer should understand

Where code belongs

How data flows

Where to add features

How to reuse components

Without asking questions.

---

# Final Principle

Architecture is the foundation of software quality.

A clean architecture enables faster development, easier maintenance, better security, and long-term scalability.

Every new feature should strengthen the architecture—not weaken it.