# 71. Email System

## Branding Compliance
All emails extend the core `<EmailLayout>`. This ensures the logo, header color, font stack, and legal footer are identical regardless of whether it's a Donation Receipt or a Welcome Email.

## Previews
Each template accepts a `previewText` prop, injecting a hidden `<div>` at the very top of the HTML tree to optimize the inbox preview snippet for the user.
