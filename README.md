# MyStoreOnLine
Is the migration of Fast And Fresh client user interface from HTML, Javascript and CSS to express-handlebars, so the user interface can be handle in a better modular way, and a from MySQL Db and Sequelize to MongoDb and Mongoose since MongoDb is better to handle bigger amounts of data. Once the app is at the same stage of development as Fast and Fresh, the project will be merge.

## Getting Started
* Before starting with you need to install Nodejs and have basic understanding of it and npm (node package manager) this is the official line for the documentation [Nodejs Docs](https://nodejs.org/en/docs/), also know how to clone repositories from Github to your local machine [Git Reference](https://www.git-scm.com/docs). 
* 

## Installing and Starting the app locally

Clone the app from this repository to you local drive of you PC (previously I recomended to have knowledge of how to clone repositories and where to find the information) and go to the root directory of the project, then run the command

```
npm install
```
This will take only a few minuts, the packages are small, and it should install node modules within the server directory. For the client side since the project express-handlebars, the npm install will install the package necesary for the handlebars views to run in the server and be render in the browser.

Make sure MongoDb is running in the background, if it is not running the Express server still will run, but it will throw an error and the database for the project will not be created.

After both installations complete, run the following command in your terminal:

```
npm start
```

Your app should now be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Deployment (Heroku)

To deploy, simply add and commit your changes, and push to Heroku. As is, the NPM scripts should take care of the rest.

## Built With

### for the back end server and data persistance
* Visual Studio Code
* Nodejs 
* Express 
* MongoDb and Mongoose. 

### client side for the user interface.
* Passport, passport-local, google-passport 
* HTML, Javascript, CSS, espress-handlebars
* JQUERY and Bootstrap4

# Author
* Wilson Linares 
