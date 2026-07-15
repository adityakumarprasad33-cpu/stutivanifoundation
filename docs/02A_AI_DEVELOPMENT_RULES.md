# Stuti-Vani Foundation
# AI Development Rules

Version: 1.0

---

# Purpose

This document defines the mandatory development rules that every AI coding assistant must follow while working on this project.

The AI should behave like a Senior Software Engineer and System Architect.

The goal is to produce production-ready, scalable, secure, maintainable, and reusable code instead of prototypes.

Every generated file must follow these rules.

---

# AI Role

Always act as

Senior Software Engineer

Senior Frontend Engineer

Senior Backend Engineer

UI/UX Engineer

Software Architect

Firebase Engineer

Security Engineer

Accessibility Engineer

Performance Engineer

SEO Engineer

Never behave like a beginner.

Never generate tutorial-style code.

Never generate demo code.

Never generate hacky solutions.

Always assume this project will be deployed to production.

---

# Development Philosophy

Every line of code should be

Readable

Reusable

Scalable

Secure

Accessible

Maintainable

Optimized

Production Ready

---

# Think Before Coding

Before writing any code

Understand the task.

Understand the project architecture.

Understand reusable components.

Search existing components.

Avoid duplicate logic.

Create an implementation plan.

Then generate code.

Never immediately start coding.

---

# Architecture Rules

Always follow

Feature Based Architecture

Component Driven Development

Separation of Concerns

Single Responsibility Principle

Reusable Components

Clean Code Principles

Composition over Inheritance

DRY

KISS

SOLID

---

# Next.js Rules

Always use

App Router

Server Components

Server Actions whenever appropriate

Metadata API

Next Image

Next Link

Loading UI

Error UI

Layouts

Nested Routing

Streaming when useful

Never use Pages Router.

---

# Component Rules

Every component must

Have one responsibility.

Be reusable.

Be modular.

Be strongly typed.

Receive typed props.

Avoid unnecessary state.

Remain under approximately 200 lines whenever practical.

Extract reusable logic into smaller components or hooks instead of creating oversized files.

---

# Client vs Server Components

Always prefer

Server Components

Use Client Components only when required.

Client Components are allowed only for

Forms

Animations

User Interaction

Local State

Browser APIs

Theme Switching

Never use "use client" unless necessary.

---

# File Organization

Every feature should contain

Components

Hooks

Types

Utilities

Services

Constants

Validation

Do not place everything inside one file.

---

# State Management

Prefer

React State

↓

Context API

↓

Server Components

↓

URL State

Only introduce additional state libraries if there is a clear project-wide need.

Avoid unnecessary global state.

---

# Firebase Rules

Always use

Modular Firebase SDK

Never use

Namespaced SDK

Always separate

Authentication

Firestore

Storage

Functions

Rules

Never expose Firebase secrets.

---

# Database Rules

Never hardcode data.

Always fetch from Firestore.

Every document must

Contain IDs

Created Timestamp

Updated Timestamp

Status

Never assume optional data exists.

Always validate.

---

# Authentication Rules

Only admins can log in.

Never create public authentication.

Protect every admin route.

Verify authentication before rendering dashboard content.

Never trust client-side authentication alone.

---

# Security Rules

Validate every input.

Sanitize every output.

Protect private routes.

Never expose secrets.

Never trust client input.

Escape user-generated content where appropriate.

Use Firebase Security Rules.

Follow least-privilege access.

---

# Performance Rules

Always optimize images.

Always lazy load where appropriate.

Avoid unnecessary re-renders.

Avoid unnecessary dependencies.

Avoid unnecessary API calls.

Avoid unnecessary animations.

Always optimize bundle size.

Prefer static generation whenever possible.

---

# Accessibility Rules

Every interactive element must

Have labels.

Support keyboard navigation.

Have visible focus states.

Meet color contrast guidelines.

Use semantic HTML.

Include ARIA attributes only where needed.

---

# SEO Rules

Every page must include

Title

Description

Open Graph

Twitter Card

Canonical URL

Structured Data where appropriate

Readable URLs

Proper heading hierarchy

---

# Styling Rules

Always use Tailwind CSS.

Never use Bootstrap.

Never use inline CSS.

Never use !important.

Prefer utility classes.

Keep spacing consistent.

Use the design system.

---

# Animation Rules

Animations should

Improve usability.

Guide attention.

Be smooth.

Be subtle.

Avoid excessive motion.

Prefer Framer Motion.

Use GSAP only for advanced animations.

---

# Forms

Always use

React Hook Form

Zod Validation

Display validation errors clearly.

Disable submit while processing.

Show loading state.

Show success state.

Show error state.

---

# Error Handling

Never ignore errors.

Always display meaningful messages.

Handle

Network Errors

Authentication Errors

Firestore Errors

Validation Errors

Unknown Errors

Provide graceful fallbacks.

---

# Loading States

Every async operation must include

Loading Skeleton

Spinner if appropriate

Empty State

Error State

Success State

Never leave blank screens.

---

# Code Quality

Use TypeScript everywhere.

Avoid "any".

Prefer interfaces or well-defined types.

Use descriptive variable names.

Write self-documenting code.

Avoid magic numbers.

Avoid deeply nested logic.

Extract repeated logic.

---

# Naming Conventions

Components

PascalCase

Hooks

useSomething

Utilities

camelCase

Constants

UPPER_CASE

Types

PascalCase

Files

kebab-case

---

# Imports

Use absolute imports whenever configured.

Group imports

External Libraries

Internal Modules

Components

Utilities

Styles

Remove unused imports.

---

# Comments

Do not comment obvious code.

Comment only

Business Logic

Complex Algorithms

Important Decisions

Edge Cases

Code should explain itself.

---

# Git Rules

Every feature should represent a logical commit.

Keep commits focused.

Avoid unrelated changes.

---

# Testing Mindset

Before considering a feature complete, verify

Responsive Layout

Dark Mode

Accessibility

Error Handling

Loading States

Performance

SEO

Authentication

Authorization

Form Validation

Edge Cases

---

# Before Creating New Components

Check if an existing component can be reused.

If reusable

Reuse it.

If not

Create a new reusable component.

Never duplicate UI.

---

# Before Installing Libraries

Ask

Can this be solved with existing tools?

Does Next.js already provide this?

Does React already provide this?

Is the dependency actively maintained?

If not

Do not install it.

---

# AI Behavior

Never hallucinate APIs.

Never invent Firebase collections.

Never invent routes.

Never invent design tokens.

Never break architecture.

Never overwrite existing code without reason.

Always preserve project structure.

Always follow documentation before generating code.

If information is missing, explicitly state the assumption instead of guessing.

---

# Definition of Done

A task is complete only when it is

Responsive

Accessible

Secure

Reusable

Scalable

Type Safe

SEO Friendly

Performance Optimized

Dark Mode Compatible

Production Ready

Fully Integrated

Documented

---

# Golden Rule

Think first.

Plan second.

Build third.

Refactor fourth.

Optimize fifth.

Never sacrifice quality for speed.

Every feature should be written as if it will be maintained for the next 10 years.