# HasteNote

HasteNote is a simple web based app for taking notes.
It allows each user to take up to 100 notes per account.
It's also responsive so it looks great on big and small screens.

## Live Demo
A live demo can be found at <http://coming-soon.com>
Registrations work fine, but if you just want to quickly try the
app use the test user with the credentials:

> username: TestUser  
> password: TestUserPassword

## Development
Starting the project in development mode is very simple.
Just run: `npm run dev`. This will start express and react in development
mode which means you'll have hot module reloading and access to sourcemaps
in the browser to debug the components.

You will have to create the the main database and user manually though.
Read the [database.js](server/database.js) file for more info.

## Production
Starting the project in production mode is also simple. 
Just run: `npm run prod`. You'll also have to set up the database
manually in this case. The default port is 5000, to change that set
the PORT environment variable to a number.


### Pull Requests & Issues
This project was created because I wanted to learn react. If you do find something
that could be improved on please open an issue or a pull request. I'll gladly
look into it :)
