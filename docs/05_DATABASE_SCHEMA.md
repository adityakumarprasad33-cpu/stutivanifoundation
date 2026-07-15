# Stuti-Vani Foundation
# Firestore Database Schema

Version: 1.0

---

# Purpose

This document defines the Firestore database architecture for the Stuti-Vani Foundation platform.

The database is designed to be

• Scalable

• Secure

• Maintainable

• Cost Efficient

• Easy to Query

• Future Ready

The schema follows Firebase best practices.

---

# Database Philosophy

The database should

Avoid duplication

Be easy to maintain

Support future features

Minimize Firestore reads

Support indexing

Support analytics

Support role-based access

---

# Firestore Structure

Collections

users

projects

blogs

events

gallery

programs

donations

volunteers

contact_messages

testimonials

partners

reports

newsletters

settings

notifications

activity_logs

---

# Collection

users

Purpose

Stores authenticated users.

Fields

uid

displayName

email

phoneNumber

photoURL

role

status

createdAt

updatedAt

lastLogin

createdBy

Example

{
  "uid": "abc123",
  "displayName": "Abhishek Kumar",
  "email": "admin@example.com",
  "phoneNumber": "+919876543210",
  "photoURL": "...",
  "role": "super_admin",
  "status": "active",
  "createdAt": Timestamp,
  "updatedAt": Timestamp,
  "lastLogin": Timestamp
}

Roles

super_admin

admin

volunteer

---

# Collection

projects

Purpose

Stores NGO projects.

Fields

title

slug

shortDescription

description

coverImage

gallery

category

status

goalAmount

raisedAmount

currency

beneficiaries

location

startDate

endDate

featured

createdBy

createdAt

updatedAt

Example

{
"title":"Girl Child Scholarship",
"slug":"girl-child-scholarship",
"goalAmount":500000,
"raisedAmount":235000,
"featured":true
}

Status

active

completed

draft

archived

---

# Collection

programs

Purpose

Education

Healthcare

Women Empowerment

Relief

Skill Development

Fields

title

slug

icon

description

banner

createdAt

updatedAt

---

# Collection

blogs

Fields

title

slug

excerpt

content

coverImage

author

tags

category

published

featured

views

readingTime

seo

createdAt

updatedAt

---

# Collection

events

Fields

title

slug

description

location

venue

googleMaps

banner

gallery

eventDate

registrationRequired

registrationLimit

status

createdAt

updatedAt

---

# Collection

gallery

Fields

title

category

imageURL

thumbnailURL

altText

featured

uploadedBy

createdAt

Categories

Education

Healthcare

Workshop

Camp

Relief

Events

---

# Collection

donations

Fields

donationId

name

email

phone

amount

currency

paymentMethod

paymentGateway

paymentId

transactionId

status

anonymous

receiptURL

createdAt

Statuses

pending

success

failed

refunded

---

# Collection

volunteers

Fields

applicationId

fullName

email

phone

city

state

skills

availability

experience

resumeURL

status

createdAt

updatedAt

Statuses

pending

approved

rejected

---

# Collection

contact_messages

Fields

name

email

phone

subject

message

read

replied

createdAt

---

# Collection

testimonials

Fields

name

designation

organization

photo

message

featured

rating

createdAt

---

# Collection

partners

Fields

name

logo

website

category

description

featured

createdAt

Categories

CSR

Education

Healthcare

Government

NGO

Corporate

---

# Collection

reports

Fields

title

year

category

pdfURL

thumbnail

published

createdAt

Categories

Annual Report

Audit Report

Financial Report

Impact Report

Policy

---

# Collection

newsletters

Fields

email

subscribedAt

status

source

---

# Collection

settings

Purpose

Global Website Configuration

Document

general

Fields

siteName

tagline

phone

email

address

logo

favicon

socialLinks

seo

analytics

maintenanceMode

---

# Collection

notifications

Fields

title

message

type

read

receiver

createdAt

---

# Collection

activity_logs

Purpose

Audit Trail

Fields

userId

action

module

documentId

ipAddress

device

createdAt

Examples

Created Blog

Deleted Project

Updated Gallery

Changed Settings

---

# Firestore Relationships

users

↓

creates

↓

projects

blogs

gallery

events

reports

---

projects

↓

contains

↓

gallery

donations

updates

---

events

↓

may contain

↓

registrations

gallery

---

# Timestamp Rules

Every collection must contain

createdAt

updatedAt

Never store timestamps as strings.

Always use Firebase Timestamp.

---

# Naming Conventions

Collection Names

lowercase

plural

Document IDs

Auto Generated

Slugs

kebab-case

---

# Required Fields

Every document must contain

status

createdAt

updatedAt

createdBy

Where applicable

---

# Soft Delete

Never permanently delete important records.

Instead

status = archived

or

isDeleted = true

---

# Query Optimization

Always query using indexes.

Avoid deep nesting.

Avoid unnecessary subcollections.

Keep documents below Firestore size limits.

---

# Future Collections

beneficiaries

campaigns

csr_partners

scholarships

courses

volunteer_tasks

attendance

media

comments

chat

mobile_notifications

---

# Firestore Best Practices

Keep documents small.

Avoid duplication.

Prefer references over copying data.

Store images in Firebase Storage.

Store URLs inside Firestore.

Never store Base64.

Paginate large queries.

Use composite indexes where necessary.

---

# Final Principle

The Firestore schema should support future growth without requiring structural redesign.

Every collection should be optimized for scalability, security, maintainability, and real-world production use.