# Stuti-Vani Foundation
# Component Library

Version: 1.0

---

# Purpose

This document defines the reusable component library used throughout the Stuti-Vani Foundation platform.

Every component should be

• Reusable

• Accessible

• Responsive

• Modular

• Type Safe

• Production Ready

The component library ensures consistency across the application while reducing duplicate code.

---

# Component Philosophy

Every component should

Do one thing well.

Be reusable.

Accept typed props.

Avoid unnecessary state.

Support dark mode.

Be responsive.

Be accessible.

Never hardcode data.

---

# Component Categories

Layout

Navigation

Buttons

Forms

Cards

Typography

Media

Feedback

Data Display

Dashboard

Utilities

Overlays

Animations

---

# Layout Components

## Container

Purpose

Provides consistent page width and horizontal spacing.

Features

Responsive

Centered

Max Width

Padding

---

## Section

Purpose

Standard vertical section wrapper.

Features

Consistent spacing

Background variants

Animation support

---

## Grid

Purpose

Responsive layouts.

Supports

1

2

3

4

6

12 columns

---

## Stack

Purpose

Vertical spacing utility.

---

## Divider

Purpose

Visual separation.

Variants

Horizontal

Vertical

---

# Navigation Components

Navbar

Sidebar

Mobile Drawer

Breadcrumb

Pagination

Footer

Back To Top Button

Navigation Link

Logo

Search Bar

Theme Toggle

User Menu

---

# Typography Components

Heading

Paragraph

Caption

Badge

Label

Quote

Statistic

Section Title

Highlight Text

Gradient Text

---

# Button Components

Primary Button

Secondary Button

Outline Button

Ghost Button

Danger Button

Success Button

Donation Button

Icon Button

Loading Button

Floating Action Button

---

Features

Loading State

Disabled State

Icons

Full Width

Responsive

Keyboard Accessible

---

# Form Components

Text Input

Email Input

Password Input

Phone Input

Search Input

Textarea

Checkbox

Radio Group

Switch

Dropdown

Multi Select

Date Picker

File Upload

Image Upload

Submit Button

Validation Message

Character Counter

---

# Card Components

Project Card

Program Card

Blog Card

Gallery Card

Event Card

Volunteer Card

Partner Card

Testimonial Card

Report Card

Donation Card

Statistic Card

Dashboard Card

User Card

Activity Card

---

Each Card Includes

Image

Title

Description

Metadata

CTA

Hover State

Loading State

---

# Media Components

Image

Responsive Image

Avatar

Video

Gallery Grid

Carousel

Lightbox

Image Placeholder

Video Player

Cloudinary Image

Cloudinary Video

---

# Feedback Components

Toast

Alert

Notification

Snackbar

Success Banner

Error Banner

Warning Banner

Info Banner

Confirmation Dialog

---

# Loading Components

Spinner

Skeleton Card

Skeleton List

Skeleton Table

Skeleton Image

Skeleton Text

Progress Bar

Loading Overlay

Page Loader

---

# Empty States

No Projects

No Blogs

No Events

No Messages

No Donations

No Volunteers

No Search Results

No Gallery

Generic Empty State

---

# Error Components

404

500

Permission Denied

Offline

Network Error

Form Error

Unknown Error

Retry Component

---

# Dashboard Components

Dashboard Layout

Sidebar

Topbar

Stats Grid

Analytics Card

Data Table

Chart Card

Recent Activity

Quick Actions

User Menu

Search

Notifications

---

# Tables

Data Table

Sortable Table

Filter Bar

Pagination

Export Button

Bulk Actions

Table Toolbar

Empty Table

Loading Table

---

# Charts

Bar Chart

Line Chart

Pie Chart

Area Chart

Progress Chart

Donation Chart

Volunteer Chart

Project Progress

---

# Timeline Components

Vertical Timeline

Horizontal Timeline

Activity Timeline

Project Timeline

Milestone Card

---

# Gallery Components

Gallery Grid

Category Filter

Lightbox

Image Modal

Image Card

Video Card

Media Viewer

---

# Blog Components

Blog Grid

Blog Card

Article Header

Author Box

Related Posts

Reading Progress

Share Buttons

Tag List

Table of Contents

---

# Project Components

Project Hero

Progress Bar

Funding Card

Project Gallery

Project Stats

Project Updates

Project Timeline

Donate CTA

---

# Donation Components

Amount Selector

Payment Method

Donation Summary

Receipt Card

Success Screen

Failure Screen

Tax Information

---

# Volunteer Components

Volunteer Form

Skill Selector

Availability Selector

Application Card

Status Badge

Resume Viewer

Approval Card

---

# Contact Components

Contact Form

Contact Card

Google Map

Office Hours

Social Links

FAQ Accordion

---

# Utility Components

Theme Provider

Theme Toggle

Scroll To Top

Copy Button

Share Button

Tooltip

Popover

Dropdown Menu

Context Menu

Command Palette (Future)

---

# Modal Components

Dialog

Drawer

Bottom Sheet

Confirmation Modal

Delete Modal

Preview Modal

Image Modal

Video Modal

---

# Accessibility Requirements

Every component must

Support keyboard navigation.

Have focus states.

Support screen readers.

Include proper ARIA labels.

Meet WCAG AA.

---

# Responsive Rules

Mobile First

Tablet Optimized

Desktop Optimized

Large Screen Support

---

# Dark Mode

Every component must support

Light Theme

Dark Theme

System Theme

---

# Animation Rules

Use Framer Motion.

Animation should

Improve usability.

Not distract users.

Support reduced motion.

---

# Component Naming

PascalCase

Examples

ProjectCard

HeroSection

Navbar

Footer

BlogCard

VolunteerForm

GalleryGrid

---

# File Structure

components/

layout/

navigation/

buttons/

forms/

cards/

feedback/

dashboard/

charts/

gallery/

blog/

project/

donation/

volunteer/

contact/

ui/

shared/

---

# Props Rules

Always use TypeScript interfaces.

Never use any.

Props should be

Minimal

Typed

Reusable

Optional when appropriate

---

# Component Checklist

Every component should

Be reusable

Be responsive

Be accessible

Support dark mode

Support loading states

Support error states

Be documented

Use TypeScript

Avoid duplicate logic

---

# Future Components

AI Chat Widget

Donation Progress Widget

CSR Dashboard Widgets

Volunteer Calendar

Interactive Impact Map

Live Donation Feed

Notification Center

---

# Final Principle

A component should solve one problem exceptionally well.

If two pages need the same UI, build it once and reuse it everywhere.

Consistency is more valuable than variety.