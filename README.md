# Mini Microservices Application

Tiny microservices application built from scratch from that `simulates` a microservices blog architecture for making Social Media posts (titles only) and encouraging end users to comment.

This project is meant as an example educational tool `not` meant to act as a template for future microservices stuff in any sort of production environment.

**Client side** resources include:
- `Posts` (create/list all posts)
- `Comments` (create/list all comments)

**Server side** microservices include:
- `Post Service`
- `Comment Service`
- `Moderation Service` (for blocking flagged posts)
- `EventBus Data Store` (to ferry events from one service to another)
- `Query Service `(to get full listing of all posts and associated comments)

Posts titles are displayed clientside along with number of comments as well a tiny form to add comments.


## Usage

1. Each microservice boots individual with `npm start`.
2. Boot each microservice individual, including the client side React app.
3. Observe request/response in server CLI and client console.