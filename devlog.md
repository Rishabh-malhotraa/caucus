# Devlogs

## 18th June (Patch 2.0.1)

- Fixed the ws url for signalling server.
- Disabled Twitter Login, because Twitter Oauth is not working for some reason 😑


## 17th June (Patch 2.0)

- Removed bulky monaco editor and convergence with code-mirror and YJS
- Using WEBRTC Protocol (which does not scale well compared to a central server but maintaining a server on heroku is a pain in the neck)
- Added Vim and Emacs Keybinds
- Fixed the Bug where the languague change did not sync issue [#26](https://github.com/Rishabh-malhotraa/caucus/issues/26)
- Fixed the code duplication issue 🥳🎉
- Fixed the cursor jump issue on deletion

- CLoses [#17](https://github.com/Rishabh-malhotraa/caucus/issues/17) [#13](https://github.com/Rishabh-malhotraa/caucus/issues/13) [#10](https://github.com/Rishabh-malhotraa/caucus/issues/10) (autocomplete only for javascript) [#7](https://github.com/Rishabh-malhotraa/caucus/issues/7) [#6](https://github.com/Rishabh-malhotraa/caucus/issues/6)

## 16th June (Major Changes Coming)

- I have decided to move from convergence to yjs which is better maintained
- Changing editor from monaco to code-mirror
  - Vim support
  - Better Supported by YJS (better adapter with better awareness)
  - Autocompletion support with LSP
  - More themes

## 12th JUNE (Roadmap)

- We hit 150 ⭐ 🥳🥳🎉.
- Convergence is causing me alot of issues, espcially when you delete something in monaco your cursor changes line which is really really annoying, and I am thinking of switching to yjs with a bit better cursor management support like convergence, and moving from POSTGRESQL to SQLITE.
- Maybe I'll do these changes tomorrow, maybe I'll do these changes in a few days, 🤞

## 14th April (UPDATES)

- Added stargazers chart in the readme, the GSOC application period over so now I look forward to improveing caucus a bit but then I feel most of my time would be dedicated for practising LeetCode Questions plus I have some test coming up this week.

## 7th April (UPDATES)

- We have reached 125 stars on Github YAY 🎉️🎉️🎉️

## 26th March, 2021 (SSL Certificate Updates)

- Thanks to Harrison I was able to deploy the convergence-deployment file which had the nginx configuration and SSL certifcate to Digital Ocean but I still feel there are some wholes in the deployment, as I wasn't able to login to the console of convergence, nonetheless I have a https convergence-omnibus hosted on digital ocean.

## 24th March, 2021 (UPDATES)

- Caucus reached 100+ stars on github YAY! It also has 500+ registered users 3500 visits on github repo & view and 12000+ website visits.
- The main priority for me is to get the SSL certificate for the docker container which is soo annoying man I cannot tell you, devops is a different beast in itself D:
- I am stopping development on Caucus for the time being, and focusing on GSOC most likely Navidrome else Accord or maybe Zulip.

## 22nd March, 2021 (PATCH 1.02.01)

- I have had such a bad experience hosting my app on heroku, I'm either moving to GCP or digital ocean because I cannot take this trash anymore, plus for that I need to chagne the database server from postgresql to mongodb because i get like 512 mb on mongodb cloud, now i understand why architecture design and planning for the project is so important, I hate rewriting code D:

## 18th March, 2021 (PATCH 1.02)

- Added Support for natively displaying atcoder or codeforces question, (using axios and cheerio for scraping since they dont have a public api which sends the data). Also incoporated sockets so all the users in the nrooms have same problem opened.

## 17th March, 2021 (PATCH 1.01)

- fixed the sync issue, previously if another person used to enter a room in which another person was already typing, the new user did not get all the text which was previoulsy typed by the user. Now the texts gets synced when the user enters the room HURRAY 🎉🥳
