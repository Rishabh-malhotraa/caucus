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
  <a href="http://caucus-app.herokuapp.com/">
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
    <a href="http://caucus-app.herokuapp.com/">View Demo</a>
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

## About The Project

<br/>

### Collaborative Code Editor  
 [![Product Name Screen Shot][product-screenshotI]](http://caucus-app.herokuapp.com/)

|  Login Page | Navigate Rooms Page
|:-------------------------:|:-------------------------:
 [![Product Name Screen Shot][product-screenshotII]](http://caucus-app.herokuapp.com/)|[![Product Name Screen Shot][product-screenshotIII]](http://caucus-app.herokuapp.com/)  

<br />


### Built With

* [React](https://reactjs.org/docs/getting-started.html)
* [Material UI](https://material-ui.com/getting-started/installation/)
* [ConvergenceLabs](https://convergencelabs.com/)

Written in TypeScript ♥

## Getting Started

Follow the instructions to set up the project on your local machine.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* npm

  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/Rishabh-malhotraa/caucus.git
   ```

2. Install NPM packages

   ``` sh
   npm install
   ```

3. Start the react server

   ``` sh
   npm run start
   ```
  
4. Add Enviroment Variables 
    ```
    REACT_APP_CLIENT_URL = https://localhost:3000
    REACT_APP_SERVER_URL = https://localhost:5000
    REACT_APP_CONVERGENCE_URL = https://localhost:8080 
    ```

5. Download Docker Desktop and then download convergence omnibus from docker hub and then start the server 

    ``` sh
    docker pull convergencelabs/convergence-omnibus
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
- [x] Add codeforce problem using webscraping thingy
- [ ] Option to remove the minimap
- [ ] Change Hosting from Heroku to GCP or Digital Ocean
- [ ] Add SSL certificate to the docker container, andd get rid of the current bootleg shenanigans D: (LetsEncrypt or Cloudflare)
- [ ] Change Heroku PSQL DB to either MongoDB or Firebase.
- [ ] Add Autoformating keybind.
- [ ] Add Vim Keybinds
- [ ] Add a full-screen Zen Mode
- [ ] Make a public api to fetch questions, based on scraped data
- [ ] Add ability to add different tabs on the editor instance just like that on VSCODE
- [ ] Add intellisense using Language Server Protocal for atleast C++ and JAVA 
- [ ] Fix the number of users in the room.
- [ ] REACH: Add video call functionality (using WEBRTC or something propieteary like Twilo proprietary)
- [ ] Integrate the random quote thingy on loading screen from forticodes API
- [ ] Fix why the loader gets frozen on intial render -_-

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

Rishabh malhotraa - [@CaffeinatedRish](https://twitter.com/CaffeinatedRish) - rmalhotra_be18@thapar.edu

Project Link: [http://caucus-app.herokuapp.com/](http://caucus-app.herokuapp.com/)

---

## Stargazers over time

[![Stargazers over time](https://starchart.cc/rishabh-malhotraa/caucus.svg)](https://starchart.cc/rishabh-malhotraa/caucus)

---

## Acknowledgements

* [Heroku](https://www.heroku.com/)
* [Azure](https://azure.microsoft.com/en-us/)
* [notistack](https://www.npmjs.com/package/notistack/)
* [axios](https://www.npmjs.com/package/axios)
* [dog-names](https://www.npmjs.com/package/dog-names)
* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
* [MIT License](https://opensource.org/licenses/MIT)
* [SVG Backgrounds](https://www.svgbackgrounds.com/)
  
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
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
[product-screenshotI]: images/code-editor.png
[product-screenshotII]: images/login-page.png
[product-screenshotIII]: images/navigation-page.png
