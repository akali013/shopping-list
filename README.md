# Shopping List Frontend
This simple app allows users to manage a list of items typically found at grocery stores. A user can add items to a list, change item quantities, check/uncheck items, delete list items, add to the general selection of items, search items, create accounts, and change their associated email and password.

## Technologies Used 
- Frontend: Angular v14.2.13 and [Angular CLI](https://github.com/angular/angular-cli)
- Web server: [nginx](https://nginx.org/en/docs/)
- Containerization: [Docker](https://www.docker.com/) v29.1.3 and [Docker Desktop](https://www.docker.com/products/docker-desktop/) v4.5.5
- [GitHub Actions for Docker image pushing](../.github/workflows/main.yml)
- [Backend Repository](https://github.com/akali013/ShoppingListAPI)

## Motivation
This project is mostly for improving my development skills in Angular, .NET, Microsoft SQL Server, and Docker. It can also be used to actually help people track what groceries they need to buy.

## Features
### Create Account/Log In 🔑
Users can create an account with an email and password when they first use the app:
1. Click the blue Sign Up button.
2. In the Create New Account page, enter an email and password.
3. Click Create Account.
4. Upon successful account creation, a pop up will appear in the bottom right.

With an account, a user can simply log into the app by entering their email and password and then clicking the green Log In button. 

### Navigation 🗺️
Upon logging in, a user will be shown a header and possibly a footer depending on the screen size. For large screens, a user can navigate between these pages by clicking their respective buttons in the header:
- [Shopping List page](#shopping-list-page)
- [Add Items page](#add-items-page)
- [Create Item page](#create-item-page)
- [Settings page](#settings-page-gear)
- [Dark/Light mode](#darklight-mode-moonsun)

If the user has a smaller screen like a mobile device, they can navigate between the above pages and change the app theme using the buttons in the footer.

### Shopping List Page
This page shows the items the user selected in the [Add Items page](#add-items-page) with their associated quantities. If a user has no selected items, then a message will appear stating "No items found." Additionally, a user can search items in their list using the search bar, which will match items that contain the same characters in the search query. For each item entry, a user can edit the quantity of an item by clicking the orange button, entering the new quantity, and clicking the Save button where a confirmation pop up then appears in the bottom right. They can also check/uncheck and delete item entries. Checked items will be highlighted in green and placed at the bottom of the list.

### Add Items Page 
This page shows all the available items that can be added to the user's shopping list. It features a grid of buttons that each represent an item, and when a button is clicked, one of the selected item will be put into the shopping list. Like the [Shopping List page](#shopping-list-page), the search bar at the top of the page can filter items via a search query that has the same characters as the desired item. When an item is selected, a confirmation pop up appears in the bottom right of the page.

### Create Item Page
This page allows users to create new items for the selection in the [Add Items page](#add-items-page) in case they did not find an item they needed. To add an item, users enter the name of it in the input box and click the Add button. If successful, a confirmation pop up will appear in the bottom right. However, if the item already exists, an error pop up will show up instead.

### Settings Page ⚙️
This page lets the user edit their email and password by clicking the orange Edit button, changing the email and password, and then clicking the Save button. When the information is successfully updated, a confirmation pop up appears in the bottom right. Users may also log out of the app by clicking the Log Out button.

### JWT Authentication 🔒
The app supports JSON Web Token (JWT) authentication via a secret and refresh tokens, so users can close the page and still be logged in once they reopen the app. See [Credits](#credits-pray) for implementation details.

### Dark/Light Mode 🌙☀️
The last button in the app header/footer that shows a moon or sun image depending on the current theme toggles the app's theme between light and dark modes.

## Run the App 🟢
To use the app, make sure you have a container runtime like Docker Desktop. Also, you must clone this repository via `git clone https://github.com/akali013/shopping-list` in a terminal.

To start the app, use `docker compose up --build -d` in the `shopping-list` directory.

> [!Note]
> Ensure the [backend](https://github.com/akali013/ShoppingListAPI) is also running. Otherwise, you will see an error pop up stating "Error: Please try again later."

## Credits 🙏
[JWT Refresh Token Authentication Tutorial](https://jasonwatmore.com/post/2022/12/08/angular-14-jwt-authentication-with-refresh-tokens-example-tutorial) by Jason Watmore

[Angular Containerization Docker Guide](https://docs.docker.com/guides/angular/) by Kristiyan Velkov

[Dark/Light Mode](https://v14.material.angular.dev/guide/theming) by the Angular Team

mom and dad
