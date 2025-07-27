pipeline {
  agent any

  environment {
    DOCKERHUB_USER = credentials('dockerhub-user')   // Jenkins Credential ID
    FRONTEND_IMAGE = "${DOCKERHUB_USER}/food-frontend:${env.BRANCH_NAME}"
    BACKEND_IMAGE  = "${DOCKERHUB_USER}/food-backend:${env.BRANCH_NAME}"
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Frontend Docker Image') {
      steps {
        dir('frontend') {
          sh "docker build -t ${FRONTEND_IMAGE} ."
        }
      }
    }

    stage('Build Backend Docker Image') {
      steps {
        dir('backend') {
          sh "docker build -t ${BACKEND_IMAGE} ."
        }
      }
    }

    stage('Push Images to DockerHub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-user', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
          sh """
            echo $PASS | docker login -u $USER --password-stdin
            docker push ${FRONTEND_IMAGE}
            docker push ${BACKEND_IMAGE}
          """
        }
      }
    }

    /*
    stage('Deploy to Kubernetes') {
      when {
        branch 'main'
      }
      steps {
        sh '''
          kubectl apply -f k8s/mongo-deploy.yaml
          kubectl set image -f k8s/frontend-deploy.yaml frontend=${FRONTEND_IMAGE} --local -o yaml | kubectl apply -f -
          kubectl set image -f k8s/backend-deploy.yaml backend=${BACKEND_IMAGE} --local -o yaml | kubectl apply -f -
        '''
      }
    }
    */
  }

  post {
    failure {
      echo 'Build failed!'
    }
  }
}
