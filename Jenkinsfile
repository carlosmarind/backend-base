pipeline {
    agent any
    environment {
        registry = "https://us-central1-docker.pkg.dev"
        registryCredential = 'gcp-registry'
        dockerImage = 'us-central1-docker.pkg.dev/expertis-classroom/docker-repository/backend-base'
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
    }
    stages{
        stage("pipeline de construcion en node"){
            agent {
                docker {
                    image 'node:alpine3.20'
                    reuseNode true
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
        stage("pipeline de construcion en docker"){
           steps{
               script{
                   docker.withRegistry( "${registry}", registryCredential ){
                        sh "docker build -t ${dockerImage}:latest ."
                        sh "docker tag ${dockerImage}:latest ${dockerImage}:${BUILD_NUMBER}"
                        sh "docker push ${dockerImage}:latest"
                        sh "docker push ${dockerImage}:${BUILD_NUMBER}"
                   }
               }
           } 
        }
    }
}
