
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
                sh "docker build -t detibaholli/elefantivideofrontend:latest -t detibaholli/elefantivideofrontend:1.${env['ELEFANTI-VIDEO-FRONTEND-BUILD-NUMBER']} ."
                
                // script {
                //     elefantifrontendimage = docker.build("detibaholli/elefantivideofrontend")
                // }
            }
        }

        stage('deploy images') {
            steps {
                // script {
                //     docker.withRegistry('https://hub.docker.com/', 'docker-hub') {
                //         elefantifrontendimage.push("${env['ELEFANTI-VIDEO-FRONTEND-BUILD-NUMBER']}")
                //         elefantifrontendimage.push('latest')
                //     }
                // }
                sh "docker login -u detibaholli -p ${env['DOCKER-HUB-PASSWORD']}"
                sh "docker push detibaholli/elefantivideofrontend:latest"
                sh "docker push detibaholli/elefantivideofrontend:1.${env['ELEFANTI-VIDEO-FRONTEND-BUILD-NUMBER']}"
                sh "docker logout"
                // increment variables
                script {
                    env['ELEFANTI-VIDEO-FRONTEND-BUILD-NUMBER'] =
                    env['ELEFANTI-VIDEO-FRONTEND-BUILD-NUMBER'].toInteger() + 1
                }
            }
        }
    }
}
