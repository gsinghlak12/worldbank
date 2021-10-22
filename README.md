# μ's World Bank Data

This is Group μ's Week 10 project, creating a website that allows users to navigate the website and look up interesting correlations in the data. 
The goal of this project is to create a prototype website application for the World Bank and build it to the best level possible within a week. 


## Contents

 - [Objective](#Objective)
 - [Our Team](#Our-Team)
 - [Database](#Database)
 - [User Manual](#User-Manual)
 - [Technical Manual](#Technical-Manual)


## Objective

Our focus of this project is to show what life is like for women across the world by visualising data from The World Bank. Where we have had data for both men and women for certain indicators, we have chosen to display both as a point of reference. 

Being able to select different countries to see what the regional differences are as well as using graphs to graphically show these. 
We want to at least include 3 core features:
 - Log In Feature
 - Search Functionality
 - History Functionality

## Our Team

**Kasia - Project Manager**<br />
<br />
**Adnan - Architect & Dev Ops**<br />
<br />
**Gurpartap - Architect & Dev Ops**<br />
<br />
**Sang - QA Tester**<br />

## Database

Our Database is based on the World Bank Data from the World Development Indicators which contain over a thousand annual indicators of
economic development from hundreds of countries around the world, we will be using a subset of these for the purpose of this website.
The database source can be found [here!](https://www.kaggle.com/kaggle/world-development-indicators)

## User Manual

<br />
Welcome to "The world for women", the website that allows you to compare many different indicators across many different countries for your inquisitive needs!
<br />
This user manual is here to help you navigate around the website letting you make the most of our website, enjoy your stay! 
<br /><br />

![Log in page](https://github.com/gsinghlak12/worldbank/blob/main/User_Manual_images/01-HomePage.png)

The Home page contains the general information about the website, each page has a navigation bar at the top of the website containing 4 buttons allowing you to navigate across our website, the left 2 buttons are the Home and Search button, while the right 2 buttons are currently Log In and Register. You are also able to naviagte to our Search page through the explore data button in the middle of the screen.<br /><br />
First we will register a new account so that we can make the most of the website, by clicking on the register button shown, you can navigate to the Register page. <br /><br />

![Register page](https://github.com/gsinghlak12/worldbank/blob/main/User_Manual_images/02-RegisterPage.png)

The Register page lets you register a new account with us!<br />
The Register form requires 3 fields:

- Username
- Password
- Comfirm you Password

These 3 fields each have validation to make sure your username is more unique and you password is a strong and safe password <br/>
Your Username must be at least 6 characters long and must contain at least 1 number, if you don't follow these rules when creating an account, you will be met with an error like so...

![Bad Registering Username](https://github.com/gsinghlak12/worldbank/blob/main/User_Manual_images/03-BadUsername.jpeg)

Your Password should match the confirmation password, if they do not match then you will get an error stating so...

![Bad registering confirmation](https://github.com/gsinghlak12/worldbank/blob/main/User_Manual_images/04-BadConformation.jpeg)

Your Password must be at least 8 characters and must at least contain 1 special character (e.g. !@£$%^&* etc.), failing to do so will show this message...

![Bad registering password](https://github.com/gsinghlak12/worldbank/blob/main/User_Manual_images/05-BadPassword.jpeg)

When you successfully fill out the registration form you will be greeted with a brief alert that the account was created, and then you will quickly be redirected to our log in page to get signed in.

![Good registration form](https://github.com/gsinghlak12/worldbank/blob/main/User_Manual_images/06-SuccessRegister.jpeg)

This is the Log In page, you would be redirected to this after registering or you can access this from the navigation bar by clicking on the Log In button

![Log in page](https://github.com/gsinghlak12/worldbank/blob/main/User_Manual_images/07-LoginPage.png)

The Log in page lets you log in to an account <br />
The Log in page requires 2 fields:

- Username
- Password

The username needs to match a username in the database, an error will appear if the username doesn't exist

![Bad login username](https://github.com/gsinghlak12/worldbank/blob/main/User_Manual_images/08-BadLogUser.jpeg)

If the password isn't correct for that user, this error will appear

![Bad login password](https://github.com/gsinghlak12/worldbank/blob/main/User_Manual_images/09-BadLogPass.jpeg)

When you successfully log in, you will briefly get a success message and then you will be redirected to the search page

![Good login form](https://github.com/gsinghlak12/worldbank/blob/main/User_Manual_images/10-SuccessLog.jpeg)





## Technical Manual


need to: <br />
node schema.js <br />
npm install: <br />
"     " <br />
react-chartjs-2 <br />
chart.js <br />
bcrypt <br />




