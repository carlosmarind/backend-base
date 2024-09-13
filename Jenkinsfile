pipeline {
    agent any
    environment {
        registry = "https://us-central1-docker.pkg.dev"
        registryCredential = 'gcp-registry'
        dockerImage = 'us-central1-docker.pkg.dev/expertis-classroom/docker-repository/backend-base'
    }
    stages{
        stage("pipeline de construcion en node"){
            agent {
                docker {
                    image 'node:alpine3.20'
                }
            }
            stages{
                stage('Install'){
                    steps{
                        sh 'npm install'
                    }
                }
                stage('Test'){
                    steps{
                        sh 'npm run test'
                    }
                }
                stage('Build'){
                    steps{
                        sh 'npm run build'
                    }
                }
            }
        }
    }
}