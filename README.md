<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![All Contributors][all-contributors-shield]](#contributors-)

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://caucus-app.herokuapp.com/">
    <img src="images/logo.png" alt="Logo" width="256" height="256">
  </a>

  <strong>
    <h3 align="center" >caucus</h3>
  </strong>
  <p align="center">
    A Real Time Collaborative Editor with an embedded compiler
    <br />
    <a href="https://github.com/Rishabh-malhotraa/caucus/tree/main/src"><strong>Explore the project »</strong></a>
    <br />
    <br />
    <a href="https://caucus-app.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/Rishabh-malhotraa/caucus/issues">Report Bug</a>
    ·
    <a href="https://github.com/Rishabh-malhotraa/caucus/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

## 📣 Latest Announcements
🆕 5-10-2021: We now have a discussions form, if you want any new feeature to be implemented you can [discuss here](https://github.com/Rishabh-malhotraa/caucus/discussions/50)

🆕 28-09-2021: Caucus is participating in Hacktoberfest 2021 🥳

## About The Project


### Demonstration
[![Product Demonstation][product-demo]](https://caucus-app.herokuapp.com/)

<br/>

### Collaborative Code Editor

[![Product Name Screen Shot][product-screenshoti]](https://caucus-app.herokuapp.com/)

|                                       Login Page                                       |                                   Navigate Rooms Page                                   |
| :------------------------------------------------------------------------------------: |    :-------------------------------------------------------------------------------------: |
| [![Product Name Screen Shot][product-screenshotii]](https://caucus-app.herokuapp.com/) | [![Product Name Screen Shot][product-screenshotiii]](https://caucus-app.herokuapp.com/) |

<br />

### Built With

- [React](https://reactjs.org/docs/getting-started.html)
- [Material UI](https://material-ui.com/getting-started/installation/)
- [yjs](https://yjs.dev/)

Written in TypeScript ♥

## Getting Started

Follow the instructions to set up the project on your local machine.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm

  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/Rishabh-malhotraa/caucus.git
   ```

2. Install NPM packages

   ```sh
   npm install
   ```

3. Start the react server

   ```sh
   npm run start
   ```

## Roadmap

See the [open issues](https://github.com/Rishabh-malhotraa/caucus/issues) for a list of proposed features (and known issues).

### Things To do

- [x] Inital Login Page
- [x] Database hookup with login from oAuth
- [x] Chat Application
- [x] Video Chat Application (the main chunk of work)
- [x] Collaborative Editing (the main chunk of work)
- [x] Resizable Panes
- [x] Code Running (Easy need to just hookup with an api)
- [x] Database with all the leetcode question and sorted based on tags.
- [x] IMP: Sync code using localstorage or sockets when a new person joins in the room, with defaultvalue prop on the monaco editor instance.
- [x] Add SSL certificate to the docker container, andd get rid of the current bootleg shenanigans D: (LetsEncrypt or Cloudflare)
- [x] Add codeforce problem using webscraping thingy
- [x] Add Vim Keybinds
- [x] Add intellisense using Language Server Protocal for atleast C++ and JAVA
- [x] Make a public api to fetch questions, based on scraped data
- [ ] Add a full-screen Zen Mode
- [ ] Change Hosting from Heroku to GCP or Digital Ocean
- [ ] Change Heroku PSQL DB to either ~~MongoDB or Firebase~~ SQLITE.
- [ ] Add Autoformating keybind.
- [ ] ~~Fix the number of users in the room.~~
- [ ] ~~REACH: Add video call functionality (using WEBRTC or something propieteary like Twilo proprietary)~~
- [ ] ~~Add ability to add different tabs on the editor instance just like that on VSCODE~~
- [ ] ~~Integrate the random quote thingy on loading screen from forticodes API~~
- [ ] ~~Fix why the loader gets frozen on intial render -\_-~~

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Refer to this [article](https://medium.com/swlh/guide-to-git-a-practical-approach-27926a1ff564?sk=b54ca413a142c275f5d2901d0384a0db) if you have any difficulty in making a pull request

## License

Distributed under the MIT License. See [`LICENSE`][license-url] for more information.

---

## Contact

Rishabh malhotraa - [@rish_bishhh](https://twitter.com/rish_bishhh) - rmalhotra_be18@thapar.edu

Discord : rishabh.malhotra#4193

Project Link: [https://caucus-app.herokuapp.com/](https://caucus-app.herokuapp.com/)

---

## Stargazers over time

[![Stargazers over time](https://starchart.cc/rishabh-malhotraa/caucus.svg)](https://starchart.cc/rishabh-malhotraa/caucus)

---

## Acknowledgements

- [Heroku](https://www.heroku.com/)
- [Azure](https://azure.microsoft.com/en-us/)
- [notistack](https://www.npmjs.com/package/notistack/)
- [axios](https://www.npmjs.com/package/axios)
- [dog-names](https://www.npmjs.com/package/dog-names)
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
- [MIT License](https://opensource.org/licenses/MIT)
- [SVG Backgrounds](https://www.svgbackgrounds.com/)

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[all-contributors-shield]: https://img.shields.io/badge/all_contributors-8-orange.svg?style=for-the-badge
[contributors-shield]: https://img.shields.io/github/contributors/Rishabh-malhotraa/caucus.svg?style=for-the-badge
[contributors-url]: https://github.com/Rishabh-malhotraa/caucus/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Rishabh-malhotraa/caucus.svg?style=for-the-badge
[forks-url]: https://github.com/Rishabh-malhotraa/caucus/network/members
[stars-shield]: https://img.shields.io/github/stars/Rishabh-malhotraa/caucus.svg?style=for-the-badge
[stars-url]: https://github.com/Rishabh-malhotraa/caucus/stargazers
[issues-shield]: https://img.shields.io/github/issues/Rishabh-malhotraa/caucus.svg?style=for-the-badge
[issues-url]: https://github.com/Rishabh-malhotraa/caucus/issues
[license-shield]: https://img.shields.io/github/license/Rishabh-malhotraa/caucus.svg?style=for-the-badge
[license-url]: https://github.com/Rishabh-malhotraa/caucus/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/rishabh-malhotra-4536a418b
[product-demo]: images/caucus-demonstation.gif
[product-screenshoti]: images/code-editor.png
[product-screenshotii]: images/login-page.png
[product-screenshotiii]: images/navigation-page.png

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://rishabh-malhotraa.github.io/Rishabh-Portfolio-main/"><img src="https://avatars.githubusercontent.com/u/54576074?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rishabh Malhotra</b></sub></a><br /><a href="#infra-Rishabh-malhotraa" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/Rishabh-malhotraa/caucus/commits?author=Rishabh-malhotraa" title="Code">💻</a> <a href="#design-Rishabh-malhotraa" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/MarufSharifi"><img src="https://avatars.githubusercontent.com/u/59383482?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Maruf</b></sub></a><br /><a href="#infra-MarufSharifi" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/Rishabh-malhotraa/caucus/commits?author=MarufSharifi" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/swikars1"><img src="https://avatars.githubusercontent.com/u/20171676?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Swikar Sharma</b></sub></a><br /><a href="https://github.com/Rishabh-malhotraa/caucus/commits?author=swikars1" title="Documentation">📖</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/iamdevvalecha/"><img src="https://avatars.githubusercontent.com/u/71969867?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dev Valecha</b></sub></a><br /><a href="#eventOrganizing-iamdevvalecha" title="Event Organizing">📋</a> <a href="#mentoring-iamdevvalecha" title="Mentoring">🧑‍🏫</a> <a href="#talk-iamdevvalecha" title="Talks">📢</a></td>
    <td align="center"><a href="https://github.com/HarrisonMayotte"><img src="https://avatars.githubusercontent.com/u/48367813?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Harrison Mayotte</b></sub></a><br /><a href="#infra-HarrisonMayotte" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/Rishabh-malhotraa/caucus/pulls?q=is%3Apr+reviewed-by%3AHarrisonMayotte" title="Reviewed Pull Requests">👀</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://bit.ly/adityaarya1"><img src="https://avatars.githubusercontent.com/u/52771727?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Aditya Arya</b></sub></a><br /><a href="#design-Aditya9111" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/mthakur7"><img src="https://avatars.githubusercontent.com/u/89182004?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Manju Thakur</b></sub></a><br /><a href="#design-mthakur7" title="Design">🎨</a></td>
    <td align="center"><a href="https://apexweb.me"><img src="https://avatars.githubusercontent.com/u/68195580?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Apex Web</b></sub></a><br /><a href="#design-chirag3003" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/GaganpreetKaurKalsi"><img src="https://avatars.githubusercontent.com/u/54144759?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gaganpreet Kaur Kalsi</b></sub></a><br /><a href="https://github.com/Rishabh-malhotraa/caucus/commits?author=GaganpreetKaurKalsi" title="Code">💻</a> <a href="#design-GaganpreetKaurKalsi" title="Design">🎨</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
