Project test for a local web development company [Race Roster](https://raceroster.com/) 

I have used gulp to transpile the ES5 code I write in the `src/js` folder and send to the `public/assests` folder; also this is where the production CSS resides. Gulp will use gulp-compass to create the CSS file from the `src/scss` folder.

The html pages itself is broken up into `.ejs` files which are in the views directory. The express `app.js` file is loading the `index.ejs` file when '/' is the URL path. This file then 'includes' all the other template files to build the complete html page.

This project is a Heroku app live at this [URL](https://still-citadel-6064.herokuapp.com/)