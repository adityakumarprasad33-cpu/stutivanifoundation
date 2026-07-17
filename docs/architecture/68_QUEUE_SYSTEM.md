# 68. Queue System

## Purpose
Notifications must never block the main execution thread of the business logic. If a user registers for an event, the API should return `200 OK` instantly, even if the Email Provider takes 2 seconds to respond.

## LocalQueue Implementation
Currently implemented as an asynchronous `queueMicrotask` Promise queue.
1. `push()` appends the payload to the queue and instantly returns.
2. The internal `startProcessing` loop processes the queue asynchronously.

## Future Extensibility
By wrapping this in `IQueueProvider`, we can easily swap `LocalQueue` out for BullMQ (Redis) or Cloud Tasks if the platform scales across multiple serverless edge nodes.
