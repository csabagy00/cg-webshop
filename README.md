# CG WebShop

## About the project

It is my first pet project during my Codecool journey, which is a basic webshop where the users can create accounts for the web page, log in with those accounts, browse and order items that are available in the webshop. It has also been deployed to Render.com with a CI/CD pipeline, but it is still in development.

## Features

  - **Registration and Login:** Users need an account to reach certain features 
  - **Order multiple items:** User can order multipl items with one order
  - **Search:** User can browse between the items (no account needed)
  - **Account roles:** There are User or Admin roles for the accounts
  - **Admin account**: Can access Admin features

## Built with
  - **React.js**
  - **ASP.NET**
  - **PostgreSQL**
  - **Entity Framework Core**

## Deployment

  https://cg-webshop.onrender.com

  On this link you can check out the current version of the site.
  
  Maybe it will take a few minutes to load everything, because it is a free plan that I have on Render for this project.

  ### Manual

 If you want to start the app on you local computer, you will need to have a **Docker Desktop** installed and you will need to clone this repository. If you have a **Docker Desktop** installed follow these steps:

  - **Step 1**: Open up a console on your computer.
  - **Step 2**: Direct to the directory where you want the repository to be cloned with `cd .\path\` command.
  - **Step 3**: Clone the repository with `git clone https://github.com/csabagy00/cg-webshop.git`
  - **Step 4**: Once it is cloned, head to the cgWebShop directory with this command: `cd .\cg-webshop\cgWebShop\`
  - **Step 5**: Now you will need to use the `docker compose up` command to build the images.
  - **Step 6**: After it is done, you can visit the `localhost:5173` on your browser to checkout the app.

To shutdown the app, you will need to go to the Docker Desktop application and stop the container of the app.