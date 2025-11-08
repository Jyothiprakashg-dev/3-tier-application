# POC Presentation – 3‑Tier Food Delivery Application (React + Node + MongoDB)

---

## Slide 1: Objective

**Goal:** Demonstrate CI/CD pipeline for a 3‑tier application deployed on Kubernetes.

**Key Outcomes:**

* Build, test, and deploy React + Node.js + MongoDB
* Dockerized and deployed via Jenkins pipeline
* Validate application reachability & DB connectivity

---

## Slide 2: Architecture Overview

```
[ React (Nginx) ]  <--HTTP-->  [ Node.js API ]  <--Mongo URI-->  [ MongoDB ]
```

**Components:**

* Frontend: React (Nginx container)
* Backend: Node.js + Express
* Database: MongoDB (PVC)
* CI/CD: Jenkins Multibranch Pipeline
* Runtime: Kubernetes (NodePort access)

---

## Slide 3: Technology Stack

| Tier           | Technology        | Description                    |
| -------------- | ----------------- | ------------------------------ |
| Frontend       | React + Nginx     | UI layer served as static site |
| Backend        | Node.js + Express | REST API serving food data     |
| Database       | MongoDB           | Persistent data store          |
| CI/CD          | Jenkins           | Automated build & deploy       |
| Infrastructure | Kubernetes        | Container orchestration        |

---

## Slide 4: Repository Layout

```
3-tier-application/
├─ frontend/ (React)
│  └─ Dockerfile
├─ backend/ (Node.js)
│  └─ Dockerfile
├─ k8s/ (Kubernetes YAMLs)
│  ├─ frontend-deployment.yaml
│  ├─ backend-deployment.yaml
│  └─ mongo-deployment.yaml
└─ Jenkinsfile
```

---

## Slide 5: Dockerization

**Frontend Dockerfile**

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Backend Dockerfile**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]
```

---

## Slide 6: Jenkins Multibranch Pipeline

**Pipeline Features:**

* Branch-based builds (feature → test; main → deploy)
* Docker image build and push
* Auto-deploy to K8s from main branch

**Credentials:**

* DockerHub: `dockerhub-credentials`
* Kubernetes: `kubeconfig`

---

## Slide 7: Jenkinsfile Summary

```groovy
pipeline {
  agent any
  stages {
    stage('Build Frontend') { sh 'docker build -t $USER/food-frontend:$BRANCH .' }
    stage('Build Backend')  { sh 'docker build -t $USER/food-backend:$BRANCH .' }
    stage('Push Images') {
      sh 'docker push $USER/food-frontend:$BRANCH'
      sh 'docker push $USER/food-backend:$BRANCH'
    }
    stage('Deploy to K8s') {
      when { branch 'main' }
      steps { sh 'kubectl apply -f k8s/' }
    }
  }
}
```

---

## Slide 8: Kubernetes Deployment

**MongoDB:** PVC + Deployment + ClusterIP Service
**Backend:** Express app linked to Mongo via `MONGO_URI`
**Frontend:** React app exposed via NodePort 30080

Access the app:

```
kubectl get svc food-frontend -o wide
curl http://<node-ip>:30080
```

---

## Slide 9: CI/CD Workflow

1️⃣ Developer pushes code → GitHub branch triggers Jenkins.
2️⃣ Jenkins builds Docker images → pushes to DockerHub.
3️⃣ On `main` branch → Jenkins deploys to Kubernetes.
4️⃣ Kubernetes pulls updated images → rolling update.

---

## Slide 10: Validation & Testing

* **Frontend** loads UI successfully
* **Backend** returns data from MongoDB
* **PVC** persists data on pod restarts
* **Pipeline** completes automatically per branch

Commands:

```bash
kubectl get pods,svc,deploy
kubectl logs deploy/food-backend
```

---

## Slide 11: Results & Learnings

✅ Jenkins CI/CD automated end-to-end build & deploy
✅ 3-tier architecture deployed successfully
✅ Scalable via Kubernetes Deployments
✅ NodePort access verified on KodeKloud Playground

---

## Slide 12: Next Steps

* Add Ingress Controller + SSL
* Integrate Prometheus + Grafana
* Implement authentication
* Enable Blue-Green deployment strategy
* Add automated tests & static code scans
