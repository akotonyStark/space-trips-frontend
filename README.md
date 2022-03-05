# Strapi Front-End Test

A guide to the source code for theSpacetrip booking application

---

## Table of Content

- [Specifications](#Prerequisites)
- [Installation](#Installation)
- [HowItWorks](#HowItWorks)

## Prerequisites

In order to get the project up and running, make sure you have the following installed on your machine:

- Node
- Docker

## Installation

- In order to start the containers, to get the backend up and running, run the following in a terminal (with the [`docker-compose.yml`] file ):

```sh
$ docker-compose up -d
```

This will run your server on `http://localhost:3000/graphql`.

- In the project directory, you can run:

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3001]to view it in your browser. Port number 3000 will be taken if the server is run first

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## HowItWorks

- The map shows the different Space centers across the world and put a marker at their positions.

- When the user navigates on the map it updates the visible Space centers on the map
- When the user clicks on a marker of the map, the list is scrolled to the selected element and the list item rocket icon bounces for 3s

- When the user clicks on a marker of the map, it shows a popup with the Space center details

- The map communicates with the `<List />` component to scroll to the selected element.

- The searchbar component shows two fields that acts as filters on the map and the list

- The searchbar communicates with the `<List />` component to scroll to the selected element.

- The searchbar communicates with the `<Map />` component to center it on the selected Space center position.

- When the user hovers a card, it changes the color of the according Space center marker on the map

- The list communicates with the `<Map />` component to change the color of the marker from yellow to red

## Enjoy Space Trips
