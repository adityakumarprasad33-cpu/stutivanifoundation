# Analytics Engine

## Overview
The Analytics Engine is responsible for deriving insights from aggregated data.

## Cache Layer
The `AnalyticsCacheService` intercepts calls for high-volume endpoints (e.g. `getExecutiveSummary`). Currently using an in-memory TTL mechanism, it abstracts the eventual switch to Redis or a managed memory cache.

## Global Filter Engine
A context-driven filter engine (`AnalyticsFilterProvider`) wraps all dashboards. Filters include Date Ranges, Locations, Projects, and Campaigns. Dashboards pull this context and pass it to Aggregators to regenerate the metrics.

## AI Preparation
The `ai-analytics.types.ts` scaffolding prepares data interfaces for future AI pipelines:
- Organization Health Score
- Funding/Volunteer Forecasting
- Risk Detection
- Sentiment Summaries
