# Stuti-Vani Foundation
# Accessibility Architecture

Version: 1.0

---

# Purpose

This document defines the accessibility standards for the Stuti-Vani Foundation platform.

The goal is to ensure that every user, regardless of ability, device, or assistive technology, can successfully access and interact with the platform.

Accessibility is a core requirement and must be considered during every stage of design and development.

---

# Accessibility Philosophy

Accessibility is not an optional feature.

Accessibility improves

• User Experience

• SEO

• Performance

• Readability

• Navigation

• Inclusivity

Every user deserves equal access.

---

# Standards

The platform should comply with

WCAG 2.2

Level AA

Where practical, exceed AA requirements.

---

# Accessibility Principles

Perceivable

Operable

Understandable

Robust

Every feature should satisfy these four principles.

---

# Semantic HTML

Always use semantic elements.

Examples

<header>

<nav>

<main>

<section>

<article>

<aside>

<footer>

<button>

<label>

<form>

Never replace semantic elements with generic divs unless necessary.

---

# Heading Structure

One H1

Logical hierarchy

H2

↓

H3

↓

H4

Never skip heading levels.

Every page should have one primary heading.

---

# Images

Every image must include

Meaningful Alt Text

Examples

Good

"Volunteer distributing books to children during an education drive."

Bad

"Image"

"Photo"

"Volunteer"

Decorative images should use

alt=""

---

# Icons

Icons should never communicate information alone.

Every icon should

Include text

or

Have an accessible label

---

# Forms

Every input requires

Visible Label

Unique ID

Associated Label

Validation Message

Instructions when necessary

Never rely on placeholders.

---

# Buttons

Buttons should

Describe the action.

Examples

Donate Now

Become a Volunteer

Download Report

Avoid

Click Here

Submit

Continue

Every button should have

Focus State

Hover State

Keyboard Support

---

# Links

Links should clearly describe destination.

Good

Read our Annual Report

Poor

Click Here

---

# Keyboard Navigation

Everything must be usable without a mouse.

Support

Tab

Shift + Tab

Enter

Escape

Arrow Keys

Space

Never trap keyboard focus.

---

# Focus Management

Visible focus indicators required.

Never remove outline without replacing it.

Focus order must follow the visual layout.

After dialogs close

Return focus to the triggering element.

---

# Skip Navigation

Provide

Skip to Main Content

link at the beginning of every page.

---

# Color Contrast

Minimum

4.5:1

Large Text

3:1

Never rely only on color to communicate meaning.

---

# Dark Mode

Dark mode must maintain

Proper contrast

Readable typography

Accessible colors

Never use pure black backgrounds.

---

# Typography

Minimum body size

16px

Readable line height

1.5–1.7

Avoid justified paragraphs.

Maintain adequate spacing.

---

# Responsive Accessibility

Every feature should work on

Desktop

Tablet

Mobile

Landscape

Portrait

---

# Touch Targets

Minimum size

44px × 44px

Maintain adequate spacing between controls.

---

# Motion

Respect

prefers-reduced-motion

Disable

Parallax

Large transitions

Continuous animations

Essential feedback should remain.

---

# Screen Readers

Every interactive element must

Have accessible names.

Use ARIA only when semantic HTML is insufficient.

Examples

aria-label

aria-labelledby

aria-describedby

Avoid unnecessary ARIA.

---

# Tables

Include

Table Headers

Scope

Caption

Responsive Layout

Never use tables for page layout.

---

# Error Messages

Errors should

Explain what happened.

Explain how to fix it.

Be announced to assistive technologies.

Never rely solely on red text.

---

# Success Messages

Clearly indicate completion.

Announce updates where appropriate.

Provide next steps.

---

# Modals

Trap keyboard focus.

Close with Escape.

Restore focus after closing.

Prevent background interaction.

---

# Notifications

Toast notifications should

Remain visible long enough.

Be announced to screen readers.

Avoid disappearing instantly.

---

# Carousels

Users should

Pause

Navigate

Control

Never autoplay important content without controls.

---

# Video

Provide

Captions

Controls

Meaningful titles

Future

Transcripts

---

# Audio

Provide

Play

Pause

Volume

Future

Transcript

Never autoplay audio.

---

# Charts

Do not rely solely on color.

Provide

Labels

Tooltips

Legends

Accessible summaries

---

# Search

Accessible input.

Keyboard support.

Clear suggestions.

Announce result counts.

---

# Navigation

Every menu should support

Keyboard navigation

Focus indicators

ARIA roles

Logical order

---

# Dashboard Accessibility

Sidebar

Keyboard navigation

Tables

Accessible sorting

Charts

Accessible summaries

Forms

Proper labels

Dialogs

Focus management

---

# Language

Specify

lang="en"

Future

Multi-language support

---

# Browser Zoom

Support

200%

without loss of functionality.

---

# Reading Experience

Short paragraphs

Consistent spacing

Readable typography

Avoid dense blocks of text.

---

# Accessibility Testing

Test with

Keyboard Only

Screen Reader

VoiceOver

NVDA

High Contrast Mode

Reduced Motion

Browser Zoom

Mobile Devices

---

# Automated Testing

Use

Lighthouse

axe DevTools

eslint-plugin-jsx-a11y

Accessibility should be tested continuously.

---

# Accessibility Checklist

✔ Semantic HTML

✔ Proper Headings

✔ Labels

✔ Alt Text

✔ Keyboard Navigation

✔ Focus States

✔ Color Contrast

✔ Screen Reader Support

✔ Responsive Layout

✔ Reduced Motion

✔ Accessible Forms

✔ Accessible Tables

✔ Accessible Charts

✔ Skip Navigation

✔ Error Handling

✔ Zoom Support

---

# Accessibility Anti-Patterns

Never

Remove focus outlines

Use placeholder as label

Depend only on color

Autoplay audio

Create keyboard traps

Use inaccessible custom controls

Ignore screen readers

Use tiny touch targets

Hide important content visually

---

# Definition of Done

A feature is accessible only when

It is fully keyboard usable.

It is screen reader compatible.

It passes automated accessibility tests.

It maintains sufficient contrast.

It supports reduced motion.

It remains usable at 200% zoom.

It follows WCAG 2.2 AA.

---

# Final Principle

Accessibility is about people.

A truly successful platform is one that every person can use with dignity, independence, and confidence.

Design for everyone.

Build for everyone.