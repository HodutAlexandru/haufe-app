##Readme
App name: haufe-app
###Repo
- Application repository: `https://github.com/HodutAlexandru/haufe-app`
###Description
- This is a web application developed with NodeJs and React deployed on nginx server.
###Build and run
- Before building and running the application dependencies needs to be installed. There are 2 steps
required for that:
    - [ ] In root dir execute command `npm install` or `npm i`
    - [ ] In client dir under the root folder execute the same `npm install` command
- In order to build and run the application make sure you have docker and docker-compose 
installed locally to your system and then just simply run the following command: `docker-compose up'.
- When the application is started for the first time it will took several minutes to download all images
and required dependencies.
- To test it locally, simply navigate to: `http://localhost:8000`.
###Stoping the application
- In order to stop the application simply kill the current process and run `docker-compose down` command.