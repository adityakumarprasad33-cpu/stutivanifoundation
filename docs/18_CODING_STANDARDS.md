# Stuti-Vani Foundation
# Coding Standards

Version: 1.0

---

# Purpose

This document defines the official coding standards for the Stuti-Vani Foundation platform.

Every developer and AI coding assistant must follow these standards to ensure

• Consistency

• Maintainability

• Scalability

• Security

• Readability

• Performance

Code quality is more important than code quantity.

---

# Development Philosophy

Write code for humans first.

Computers only execute it.

Future developers should understand the code without needing explanations.

Always optimize for readability.

---

# General Principles

Follow

SOLID

DRY

KISS

YAGNI

Composition over Inheritance

Single Responsibility

Avoid premature optimization.

---

# Language

Use

TypeScript

Strict Mode

Never use JavaScript files.

Allowed

.ts

.tsx

Never use

.js

.jsx

---

# Type Safety

Never use

any

Avoid

unknown

unless necessary.

Always create

Interfaces

Types

Enums

Generics

Prefer explicit typing.

---

# Naming Conventions

Components

PascalCase

Example

ProjectCard

DonationSummary

---

Hooks

useCamelCase

Example

useProjects

useAuth

usePagination

---

Functions

camelCase

Example

createProject

publishBlog

approveVolunteer

---

Variables

camelCase

Example

projectTitle

userEmail

isAuthenticated

---

Constants

UPPER_SNAKE_CASE

Example

MAX_UPLOAD_SIZE

DEFAULT_PAGE_SIZE

---

Enums

PascalCase

Example

UserRole

ProjectStatus

DonationStatus

---

Files

kebab-case

Example

project-card.tsx

donation-summary.tsx

---

Folders

kebab-case

Example

project-management

blog-editor

gallery-upload

---

# File Organization

One responsibility per file.

Avoid files larger than

300 lines

Split when necessary.

---

# Component Standards

One component

One purpose

Each component should

Receive typed props

Be reusable

Be testable

Support dark mode

Support accessibility

Support loading states

---

# Component Structure

Imports

↓

Types

↓

Constants

↓

Component

↓

Helper Functions

↓

Export

Maintain consistent order.

---

# Import Rules

Order imports

1.

React / Next.js

2.

Third Party Libraries

3.

Internal Services

4.

Hooks

5.

Components

6.

Utilities

7.

Types

8.

Styles

Separate groups with one blank line.

Remove unused imports.

---

# Exports

Prefer

Named Exports

Use default exports only when appropriate for framework conventions (for example, Next.js page and layout files).

---

# Functions

Functions should

Do one thing.

Remain small.

Use descriptive names.

Return early when possible.

Avoid deeply nested logic.

---

# Comments

Write comments only when necessary.

Comment

Business Logic

Complex Algorithms

Important Decisions

Avoid commenting obvious code.

---

# Error Handling

Never ignore errors.

Use

try/catch

Return meaningful messages.

Log unexpected failures.

Never expose internal errors to users.

---

# Async Code

Always use

async

await

Avoid

.then()

chains unless appropriate.

Handle all promise rejections.

---

# React Standards

Prefer

Server Components

Use Client Components only when necessary.

Avoid unnecessary state.

Avoid unnecessary effects.

Avoid prop drilling where possible.

---

# Hooks

Create custom hooks for reusable logic.

Never call hooks conditionally.

Prefix every hook with

use

---

# State Management

Priority

React State

↓

Context API

↓

Server Components

↓

External Libraries (only when justified)

Keep state close to where it is used.

---

# Styling

Tailwind CSS only.

Never use

Bootstrap

Inline CSS

!important

Maintain spacing consistency.

---

# Forms

React Hook Form

+

Zod

Always validate

Client

Server

Display helpful validation messages.

---

# Accessibility

Every component should

Support keyboard navigation

Have focus states

Use semantic HTML

Include accessible labels

Meet WCAG AA

---

# Security

Validate every input.

Sanitize user content.

Protect sensitive operations.

Never expose secrets.

Use environment variables.

---

# Firestore

Never query Firestore directly inside UI components.

Always use the Service Layer.

Use transactions when required.

Use pagination.

Optimize queries.

---

# Cloudinary

Store only

publicId

secureUrl

Metadata

Never store Base64.

Never expose API Secret.

---

# Performance

Lazy load heavy components.

Memoize expensive calculations.

Optimize images.

Avoid unnecessary renders.

Remove dead code.

---

# Folder Structure

Follow the documented architecture.

Never create random folders.

Keep related files together.

---

# Logging

Log only

Errors

Warnings

Important Operations

Never log

Passwords

Tokens

Secrets

Personal Information

---

# Testing Mindset

Before completing a feature verify

Functionality

Responsiveness

Accessibility

Performance

Security

Dark Mode

Loading States

Error States

---

# Git Standards

One feature

One commit

Write meaningful commit messages.

Examples

feat(projects): add project management dashboard

fix(auth): prevent inactive users from logging in

refactor(gallery): extract upload service

---

# Code Review Checklist

✔ No TypeScript errors

✔ No ESLint errors

✔ No duplicate logic

✔ Responsive

✔ Accessible

✔ Reusable

✔ Secure

✔ Optimized

✔ Dark Mode Compatible

✔ Proper Naming

✔ Typed

✔ Tested

---

# Anti-Patterns

Never

Duplicate code

Hardcode values

Use magic numbers

Ignore errors

Create massive components

Mix business logic with UI

Call Firebase directly from components

Store secrets in code

Disable TypeScript

Disable ESLint

Ignore accessibility

---

# Refactoring

Refactor when

Code is duplicated

Components become too large

Logic becomes difficult to understand

Performance suffers

Architecture becomes inconsistent

---

# AI Coding Rules

Every AI-generated file must

Follow project architecture

Use existing components

Use TypeScript

Be production-ready

Avoid placeholders

Avoid TODO comments

Avoid mock implementations unless explicitly requested

Never overwrite existing functionality without reason.

---

# Definition of Done

Code is complete only when

It compiles successfully

It passes linting

It follows architecture

It is type-safe

It is responsive

It is accessible

It is secure

It is documented

It is reusable

It is production-ready

---

# Golden Rules

Readable code over clever code.

Consistency over personal preference.

Reusability over duplication.

Security before convenience.

Performance without sacrificing maintainability.

Think before writing code.

Refactor before complexity grows.

Build software that future developers will enjoy maintaining.

---

# Final Principle

Every line of code represents the reputation of the project.

Write code that is clean, intentional, maintainable, and worthy of production deployment.

Quality is not added later.

Quality is written from the very first line.