
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
                script {
                    GIT_COMMIT_NUMBER = sh (
                        script: 'git rev-list HEAD --count --first-parent',
                        returnStdout: true
                    ).trim()
                }
                sh "docker build -t detibaholli/elefantivideofrontend:latest -t detibaholli/elefantivideofrontend:1.${GIT_COMMIT_NUMBER} ."
            }
        }

        stage('deploy images') {
            steps {
                sh "docker login -u detibaholli -p ${env['DOCKER-HUB-PASSWORD']}"
                sh "docker push detibaholli/elefantivideofrontend:latest"
                sh "docker push detibaholli/elefantivideofrontend:1.${GIT_COMMIT_NUMBER}"
                sh "docker logout"
            }
        }
    }
}
