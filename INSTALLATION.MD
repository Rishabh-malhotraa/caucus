# Steps for setting up the project locally (DEPRECATED)

1. Clone the caucus Repository

```sh
git clone https://github.com/Rishabh-malhotraa/caucus.git
```

2. Create a new file .env and copy contents of `.env.example` file to the `.env` file

```sh
touch .env
```

3. Clone the caucus-server from github
```sh
git clone https://github.com/Rishabh-malhotraa/caucus-server.git
```

4. Create the .env file as mentioned in the [readme file](https://github.com/Rishabh-malhotraa/caucus-server#prerequisites)

If you want the oauth to work locally you need to get your own client key and client secret from the oauth provider(check the readme file), you can also skip this step if you dont want to enable oauth and just login to room using login as guest feature

5. Start the react front end by moving opening bash in the client folder and running the following commmand

``` sh
npm run start
```

**Run the CRDT SERVER**
_inside the caucus repository run the following bash command_
``` sh
npx y-websocket-server
```

6. Start the nodejs backend using by running the following code in the server folder6

``` sh
npm run dev
```

7. I recommend opening a workspace on your favorite editor with the server and client folder openend.

If you have any difficulty in setting up the project locally let me know by opening an [issue](https://github.com/Rishabh-malhotraa/caucus/issues) on github, or contacting me on discord.

