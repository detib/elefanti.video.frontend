
pipeline {
    agent any
    stages {
        stage('clone repository') {
            steps {
                checkout scm
            }
        }
        stage('build images') {
            steps {
                // sh "docker build -t detibaholli/elefantivideofrontend:latest -t detibaholli/elefantivideofrontend:1.${env['ELEFANTI-VIDEO-FRONTEND-BUILD-NUMBER']} -f elefanti.video.frontend/Dockerfile ."
                // sh "docker build -t detibaholli/elefantivideobackend:latest -t detibaholli/elefantivideobackend:1.${env['ELEFANTI-VIDEO-BACKEND-BUILD-NUMBER']} -f elefanti.video.backend/Dockerfile ."
                
                script {
                    elefantifrontendimage = docker.build("detibaholli/elefantivideofrontend")
                }
            }
        }

        stage('deploy images') {
            steps {
                script {
                    docker.withRegistry('https://hub.docker.com/', 'docker-hub-credentials') {
                        elefantifrontendimage.push("${env['ELEFANTI-VIDEO-FRONTEND-BUILD-NUMBER']}")
                        elefantifrontendimage.push('latest')
                    }
                }
                // increment variables
                script {
                    env['ELEFANTI-VIDEO-FRONTEND-BUILD-NUMBER'] =
                    env['ELEFANTI-VIDEO-FRONTEND-BUILD-NUMBER'].toInteger() + 1
                }
            }
        }
    }
}
