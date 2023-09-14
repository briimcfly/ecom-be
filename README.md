# E-Commerce Back End 
Back End code for an e-commerce site

## User Story 
`AS` A manager at an internet retail company <br>
`I WANT` a back end for my e-commerce website that uses the latest technologies <br>
`SO THAT` my company can compete with other e-commerce companies <br>

## Acceptance Criteria 
`GIVEN` a functional Express.js API <br>
`WHEN` I add my database name, MySQL username, and MySQL password to an environment variable file <br>
`THEN` I am able to connect to a database using Sequelize <br>
`WHEN` I enter schema and seed commands <br>
`THEN` a development database is created and is seeded with test data <br>
`WHEN` I enter the command to invoke the application <br>
`THEN` my server is started and the Sequelize models are synced to the MySQL database <br>
`WHEN` I open API GET routes in Insomnia Core for categories, products, or tags <br>
`THEN` the data for each of these routes is displayed in a formatted JSON <br>
`WHEN` I test API POST, PUT, and DELETE routes in Insomnia Core <br>
`THEN` I am able to successfully create, update, and delete data in my database <br>

## Overview
The goal of this project was to create the back end for an e-commerce company. The back end allows for CREATE, READ, UPDATE, and DELETE on Categories, Products, and Tags. Additionally, the e-commerce company can link products to multiple tags, tags to many products. 

[Link to Video Demo](https://www.youtube.com/watch?v=GMWdPppzEXs&ab_channel=BryanBickel)

https://github.com/briimcfly/ecom-be/assets/7972240/3463bb9a-0245-4933-8702-791e75f42b56

## Installation 
To get started, clone the repository from the provided link. Then, enter the project directory and use your preferred package manager to install the necessary dependencies.

## Usage
After completing the installation, start the application and run source db/schema.sql to build the database, then source db/seeds.sql to seed the tables.

## Technologies Used 
* npm
* mysql
* sequelize

## Reflection 
This project has allowed me to apply the core skills I have recently learned and put them into practice. During development, I had the opportunity to deepen my understanding of the Mysql and Sequelize. Additionally, I developed a deeper appreciation for for the importance code commenting, and the development principal DRY. (Don't repeat yourself).
