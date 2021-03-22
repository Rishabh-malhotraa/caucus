# Steps for setting up the project locally

1. Clone the caucus Repository

``` sh
git clone https://github.com/Rishabh-malhotraa/caucus.git
```

2. Install Docker Desktop Client 

https://www.docker.com/products/docker-desktop

Download Convergence Omnibus from Docker Hub

``` sh
docker pull convergencelabs/convergence-omnibus
```

![docker-setup]

and then start the docker image using the docker client

the convergence server should be running on localhost:8080 by default but you can also change it. Read the [documentation.](https://hub.docker.com/r/convergencelabs/convergence-omnibus) 


3. Create a new file .env and copy contents of .env.example file to the .env file

``` sh
touch .env
```

4. Clone the caucus-server from github

``` sh
git clone https://github.com/Rishabh-malhotraa/caucus-server.git 
```

5. Create the .env file as mentioned in the readme file

If you want the oauth to work locally you need to get your own client key and client secret from the oauth provider(check the readme file), you can also skip this step if you dont want to enable oauth and just loogin to room using login as guest feature

6. Start the react front end by moving opening bash in the client folder and running the following commmand

```
npm run start
```

7. Start the nodejs backend using by running the following code in the server folder

```
npm run dev
```

8. I recommend opening a workspace on github with the server and client folder openend.


If you have any difficulty in setting up the project localyly let me know by opening an [issue](https://github.com/Rishabh-malhotraa/caucus/issues) on github. 



[docker-setup]: images/docker-setup.png
