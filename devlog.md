# 22nd March, 2020 (PATCH 1.02.01)
- I have had such a bad experience hosting my app on heroku, I'm either moving to GCP or digital ocean because I cannot take this trash anymore, plus for that I need to chagne the database server from postgresql to mongodb because i get like 512 mb on mongodb cloud, now i understand why architecture design and planning for the project is so important, I hate rewriting code D:

# 18th March, 2020 (PATCH 1.02)
- Added Support for natively displaying atcoder or codeforces question, (using axios and cheerio for scraping since they dont have a public api which sends the data). Also incoporated sockets so all the users in the nrooms have same problem opened.
# 17th March, 2020 (PATCH 1.01)
- fixed the sync issue, previously if another person used to enter a room in which another person was already typing, the new user did not get all the text which was previoulsy typed by the user. Now the texts gets synced when the user enters the room HURRAY 🎉🥳