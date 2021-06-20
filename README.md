# auth-inventory-app

## Introduction

A react native app built with expo which acts as client for [auth-inventory-api](`https://www.github.com/clumsynite/auth-inventory-api`)

## Folder Structure

### Screens

These screen are configures inside [`Navigation.js`](./Navigation.js).

#### [OfflineScreens](./OfflineScreen)

- Offline Screen [`Offline Screen`](./OfflineScreen/index.js)

#### [AuthScreens](./AuthScreens)

- [`Login Screen`](./AuthScreens/Login.js)
- [`Signup Screen`](./AuthScreens/Signup.js)

#### [SecureScreens](./SecureScreens)

- [`Home Screen`](./SecureScreens/Home.js)
- [`Inventory Screen`](./SecureScreens/Inventory.js)

## Reminder

- While locally running your api, make sure to keep the host address same as the one your expo app is runnning on. You can access the url in [`this`](./api/index.js) file

## Features to Improve

- user's profile picture, which is a base64 string can't be stored with react-native-async-storage. So, UserAvatar fetches it for each user from their username
