<!--
*** Thanks for checking out the caucus. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
-->

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://caucus.netlify.app/">
    <img src="images/logo.png" alt="Logo" width="256" height="256">
  </a>

  <strong>
    <h3 align="center" >caucus</h3>
  </strong>
  <p align="center">
    A Real Time Collaborative Editor with an embeded compiler
    <br />
    <a href="https://github.com/Rishabh-malhotraa/caucus-server/tree/main/src"><strong>Explore the project »</strong></a>
    <br />
    <br />
    <a href="https://caucus.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/Rishabh-malhotraa/caucus-server/issues">Report Bug</a>
    ·
    <a href="https://github.com/Rishabh-malhotraa/caucus-server/issues">Request Feature</a>
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

## About The Project

<br/>

### Collaboratice Code Editor

[![Product Name Screen Shot][product-screenshoti]](https://caucus.netlify.app/)

|                                    Login Page                                    |                                Navigate Rooms Page                                |
| :------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------: |
| [![Product Name Screen Shot][product-screenshotii]](https://caucus.netlify.app/) | [![Product Name Screen Shot][product-screenshotiii]](https://caucus.netlify.app/) |

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
   git clone https://github.com/Rishabh-malhotraa/caucus-server.git
   ```

2. Install NPM packages

   ```sh
   npm install
   ```

3. Start the react server

   ```sh
   npm run dev
   ```

4. Add Enviroment Variables

   ```
    GITHUB_KEY_CLIENTID = get your key from  https://github.com/settings/applications
    GITHUB_KEY_CLIENTSECRET= https://github.com/settings/applications
    GOOGLE_KEY_CLIENTID= https://console.cloud.google.com/apis/credentials
    GOOGLE_KEY_CLIENTSECRET= https://console.cloud.google.com/apis/credentials
    TWITTER_KEY_CONSUMERKEY = https://developer.twitter.com/en/portal/projects
    TWITTER_KEY_CONSUMERSECRET =https://developer.twitter.com/en/portal/projects
    JDOODLE_CLIENTID=https://www.jdoodle.com/
    JDOOLDE_CLIENTSECRET= https://www.jdoodle.com/
    COOKIE_KEYS= your-cookie-secrert
    PROD= false
    DATABASE_URL = postgresql://postgres:password@localhost:5432/rtce
    CLIENT_URL = http://localhost:3000
    JDOODLE_URL = https://api.jdoodle.com/v1/execute
    SERVER_URL = http://localhost:5000
   ```

## Roadmap

See the [open issues](https://github.com/Rishabh-malhotraa/caucus-server/issues) for a list of proposed features (and known issues).

### Things To do

- [x] Inital Login Page
- [x] Database hookup with login from oAuth
- [x] Chat Application
- [x] Video Chat Application (the main chunk of work)
- [x] Collaborative Editing (the main chunk of work)
- [x] Resizable Panes
- [x] Code Running (Easy need to just hookup with an api)
- [x] Database with all the leetcode question and sorted based on tags.

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

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

Rishabh malhotraa - [@CaffeinatedRish](https://twitter.com/CaffeinatedRish) - rmalhotra_be18@thapar.edu

Project Link: [https://caucus.netlify.app/](https://caucus.netlify.app/)

---

## Acknowledgements

- [Heroku](https://www.heroku.com/)
- [Azure](https://azure.microsoft.com/en-us/)
- [knex](https://www.npmjs.com/package/knex)
- [socket.io](https://www.npmjs.com/package/socket.io)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
- [MIT License](https://opensource.org/licenses/MIT)
- [SVG Backgrounds](https://www.svgbackgrounds.com/)

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Rishabh-malhotraa/caucus-server.svg?style=for-the-badge
[contributors-url]: https://github.com/Rishabh-malhotraa/caucus-server/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Rishabh-malhotraa/caucus-server.svg?style=for-the-badge
[forks-url]: https://github.com/Rishabh-malhotraa/caucus-server/network/members
[stars-shield]: https://img.shields.io/github/stars/Rishabh-malhotraa/caucus-server.svg?style=for-the-badge
[stars-url]: https://github.com/Rishabh-malhotraa/caucus-server/stargazers
[issues-shield]: https://img.shields.io/github/issues/Rishabh-malhotraa/caucus-server.svg?style=for-the-badge
[issues-url]: https://github.com/Rishabh-malhotraa/caucus-server/issues
[license-shield]: https://img.shields.io/github/license/Rishabh-malhotraa/caucus-server.svg?style=for-the-badge
[license-url]: https://github.com/Rishabh-malhotraa/caucus-server/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/rishabh-malhotra-4536a418b
[product-screenshoti]: images/code-editor.png
[product-screenshotii]: images/login-page.png
[product-screenshotiii]: images/navigation-page.png
