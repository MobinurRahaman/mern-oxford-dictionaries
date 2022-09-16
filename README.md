
![GitHub release (latest by date)](https://img.shields.io/github/v/release/MobinurRahaman/mern-oxford-dictionaries)
[![GPLv3 License](https://img.shields.io/github/license/MobinurRahaman/mern-oxford-dictionaries)](https://opensource.org/licenses/)
![GitHub issues](https://img.shields.io/github/issues/MobinurRahaman/mern-oxford-dictionaries)
[![Netlify Status](https://api.netlify.com/api/v1/badges/298427a5-c145-457a-be61-ac079a6ffe43/deploy-status)](https://app.netlify.com/sites/gentle-dragon-5c68bc/deploys)

![Logo](https://raw.githubusercontent.com/MobinurRahaman/mern-oxford-dictionaries/main/client/public/logo512.png)


# MERN Oxford Dictionaries

A dictionary PWA built with MERN stack using Oxford Dictionaries API


[View Demo](https://mern-oxford-dictionaries.netlify.app/) • [Report Bug](https://github.com/MobinurRahaman/mern-oxford-dictionaries/issues) • [Request Feature](https://github.com/MobinurRahaman/mern-oxford-dictionaries/issues)
## Screenshots

![ace](https://raw.githubusercontent.com/MobinurRahaman/mern-oxford-dictionaries/main/screenshots/ace.jpg)
![search suggestions ](https://raw.githubusercontent.com/MobinurRahaman/mern-oxford-dictionaries/main/screenshots/search-suggestions.jpg)
![drawer light](https://raw.githubusercontent.com/MobinurRahaman/mern-oxford-dictionaries/main/screenshots/drawer-light.jpg)
![drawer dark](https://raw.githubusercontent.com/MobinurRahaman/mern-oxford-dictionaries/main/screenshots/drawer-dark.jpg)
![abeyance](https://raw.githubusercontent.com/MobinurRahaman/mern-oxford-dictionaries/main/screenshots/abeyance.jpg)
![history](https://raw.githubusercontent.com/MobinurRahaman/mern-oxford-dictionaries/main/screenshots/history.jpg)
![bookmarks](https://raw.githubusercontent.com/MobinurRahaman/mern-oxford-dictionaries/main/screenshots/bookmarks.jpg)
![desktop search suggestions](https://raw.githubusercontent.com/MobinurRahaman/mern-oxford-dictionaries/main/screenshots/desktop-search-suggestions.png)
## Features

- Definitions
- History
- Bookmarks
- Light/dark mode toggle
- PWA (Progressive Web App)


## Run Locally

Clone the project

```bash
  git clone https://github.com/MobinurRahaman/mern-oxford-dictionaries.git
```

Go to the project directory

```bash
 cd mern-oxford-dictionaries
```
Go to the client directory

```bash
  cd client
```
Install dependencies

```bash
  yarn install
```
Create a .env file

Set [environment variable](https://github.com/MobinurRahaman/mern-oxford-dictionaries#environment-variables) as mentioned below

Start the React server

```bash
  yarn start
```
open a new terminal window

Go back to the root project directory

Go to the server directory

```bash
  cd server
```

Install dependencies

```bash
  yarn install
```

Create a .env file

Set [environment variables](https://github.com/MobinurRahaman/mern-oxford-dictionaries#environment-variables) as mentioned below

Run the Node server

```bash
  yarn start
```
Open a browser and go to http://localhost:3000


## Environment Variables

To run this project, you will need to add the following environment variables to your 
#### client/.env file

`REACT_APP_SERVER_BASE_URL`

#### server/.env file
`FRONTEND_URL`

`APP_ID`

`APP_KEY`

`MONGODB_URL`


- Get your `APP_ID` and `APP_KEY` from https://developer.oxforddictionaries.com

- Get your `MONGODB_URL` from https://cloud.mongodb.com

## Built with

- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

## License

Distributed under the  GPL-3.0 License. See [LICENSE](https://github.com/MobinurRahaman/mern-oxford-dictionaries/blob/cf60872265639e6c2696a01ec75cc0ddceaa8528/LICENSE) for more information.
