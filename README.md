# SweetSpot App

<img src="./assets/ReadMeLogo.png" alt="SweetSpot Logo" width="75"/>
This is the SweetSpot application, a React Native app using Expo that displays places where you can buy/eat things like cake, ice cream, donuts etc. on a map using the Foursquare API.

## Prerequisites

You need to have Node.js and npm installed on your machine. If you don't have these installed, you can download and install them from [here](https://nodejs.org/).

## Setup

Clone this repository to your local machine using `git clone <repository-url>`.

Navigate to the project folder in your terminal and install the required dependencies with:

npm install

## Environmental Variables

You will need to set up a `.env` file in the root of your project and include your Foursquare API key as a variable.

Follow these steps to set up your API key:

1. Sign up on the [Foursquare developers](https://developer.foursquare.com/) page to get your API key.

2. Create a `.env` file in the root of your project.

3. Inside this file, set your API key like so:

REACT_APP_API_KEY=<your-api-key>

Replace `<your-api-key>` with the key you got from the Foursquare developers page.

## Running the App

Once you have completed the setup, you can start the app by running:

npx expo start
