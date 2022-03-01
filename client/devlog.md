# Devlogs

## 7th October (Patch 2.0.2)

- Caucus is taking part in the hacktoberfest 21, and I am grateful for all the contributions made by the community so far.

## 18th June (Patch 2.0.1)

- Fixed the `ws` URL for the signaling server.
- Disabled Twitter Login because Twitter Oauth is not working for some reason 😑


## 17th June (Patch 2.0)

- Removed bulky Monaco editor and convergence with code-mirror and YJS
- Using WEBRTC Protocol (which does not scale well compared to a central server but maintaining a server on Heroku is a pain in the neck)
- Added Vim and Emacs Keybinds
- Fixed the Bug where the language change did not sync issue [#26](https://github.com/Rishabh-malhotraa/caucus/issues/26)
- Fixed the code duplication issue 🥳🎉
- Fixed the cursor jump issue on deletion

- CLoses [#17](https://github.com/Rishabh-malhotraa/caucus/issues/17) [#13](https://github.com/Rishabh-malhotraa/caucus/issues/13) [#10](https://github.com/Rishabh-malhotraa/caucus/issues/10) (autocomplete only for javascript) [#7](https://github.com/Rishabh-malhotraa/caucus/issues/7) [#6](https://github.com/Rishabh-malhotraa/caucus/issues/6)

## 16th June (Major Changes Coming)

- I have decided to move from convergence to yjs, which is better maintained
- Changing editor from Monaco to code-mirror
  - Vim support
  - Better Supported by YJS (better adapter with better awareness)
  - Autocompletion support with LSP
  - More themes

## 12th JUNE (Roadmap)

- We hit 150 ⭐ 🥳🥳🎉.
- Convergence is causing me a lot of issues, especially when you delete something in Monaco; your cursor changes line, which is really really annoying, and I am thinking of switching to yjs with a bit better cursor management support like convergence and moving from POSTGRESQL to SQLite.
- Maybe I'll do these changes tomorrow, maybe I'll do these changes in a few days, 🤞

## 14th April (UPDATES)

- Added stargazers chart in the readme. The GSOC application period is over, so now I look forward to improving Caucus a bit, but then I feel most of my time would be dedicated to practicing LeetCode Questions, plus I have some tests coming up this week.

## 7th April (UPDATES)

- We have reached 125 stars on Github YAY 🎉️🎉️🎉️

## 26th March 2021 (SSL Certificate Updates)

- Thanks to Harrison, I was able to deploy the convergence-deployment file, which had the Nginx configuration and SSL certificate to Digital Ocean, but I still feel there are some wholes in the deployment, as I wasn't able to login to the console of convergence; nonetheless, I have an HTTPS convergence-omnibus hosted on digital ocean.

## 24th March 2021 (UPDATES)

- Caucus reached 100+ stars on Github YAY! It also has 500+ registered users, 3500 visits on GitHub repo & view, and 12000+ website visits.
- The main priority for me is to get the SSL certificate for the docker container, which is soo annoying man I cannot tell you, DevOps is a different beast in itself D:
- I am stopping development on Caucus for the time being and focusing on GSOC, most likely Navidrome else Accord or maybe Zulip.

## 22nd March 2021 (PATCH 1.02.01)

- I have had such a bad experience hosting my app on Heroku, I'm either moving to GCP or digital ocean because I cannot take this trash anymore, plus for that, I need to change the database server from PostgreSQL to MongoDB because I get like 512 MB on MongoDB cloud, now I understand why architecture design and planning for the project is so important, I hate rewriting code D:

## 18th March 2021 (PATCH 1.02)

- Added Support for natively displaying atcoder or codeforces questions (using Axios and cheerio for scraping since they don't have a public API that sends the data). Also incorporated sockets, so all the users in the rooms have same problem opened.

## 17th March 2021 (PATCH 1.01)

- fixed the sync issue; previously, if another person entered a room in which another person was already typing, the new user did not get all the text which the user once typed. Now the texts get synced when the user enters the room HURRAY 🎉🥳
