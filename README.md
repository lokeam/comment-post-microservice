# Mini Microservices Application

Tiny microservices application built from scratch from that `simulates` a microservices blog architecture for making Social Media posts (titles only) and encouraging end users to comment.

This project is meant as an example educational tool `not` meant to act as a template for future microservices stuff in any sort of production environment.

## Key Features
**Client side** resources include:
- `Posts` (create/list all posts)
- `Comments` (create/list all comments)

**Server side** microservices include:
- `Post Service`
- `Comment Service`
- `Moderation Service` (for blocking flagged posts)
- `EventBus Data Store` (to ferry events from one service to another)
- `Query Service `(to get full listing of all posts and associated comments)
- All services are Dockerized and deployed via Kubernetes.


## Project Roadmap Features
- [ ] Replace JS implementation with TypeScript
- [ ] Create sample Authentication Service

### Implement Kubernetes
- Implement Kubernetes to manage different Docker containers RE:
- [X] Deployments
- [X] NodePort Services
- [X] Cluster IP Services
- [ ] Load Balancing via Ingress-NGINX

### Implement Skaffold (https://skaffold.dev/)
- [ ] Handle workflow for pushing, deploying application

### CI/CD (https://skaffold.dev/)
- [ ] Automated testing via Jest and Github Actions


## Current Basic Usage

1. Each microservice boots individual with `npm start`.
2. Boot each microservice individual, including the client side React app.
3. Observe request/response in server CLI and client console.
4. Docker/Kubernetes:
Note: Dockerhub ID and login credentials needed to use docker and k8s.

```bash
# Build Docker container within service directory:
$ docker build -t YOUR_DOCKER_HUB_ID/SERVICE_NAME

# Push pod to k8s cluster
$ docker push YOUR_DOCKER_HUB_ID/SERVICE_NAME

# Get all Kubernetes deployments
$ kubectl get deployments

# Get all Kubernetes pods
$ kubectl get pods

# Restart individual Kubernetes deployment
$ kubectl rollout restart deployment DEPLOYMENT_NAME

# Restart all Kubernetes deployments
$ kubectl rollout restart deployment
```