# Spotify OAuth backend application

This is a Node.js Express application that utilizes the Spotify OAuth API, to log users in and redirect to a given URI that would be a frontend application. Thus, allowing you to make the use of the Spotify APIs in your frontend application.



#### Run application locally

Set up your local development environment using the folling commands(this assumes you have npm and node installed on your machine)

```bash
git clone https://github.com/JessicaBarclay/spotify-oauth-backend.git

cd https://github.com/JessicaBarclay/spotify-oauth-backend.git

npm install
```

This application assumes you have a frontend application running on port http://localhost:3000 

After following the coming steps, this application will run on http://localhost:8888 and visiting http://localhost:8888/login will redirect to http://localhost:3000?access_token=12345 with a Spotify access_token in the query string.



#### Register Spotify App to gain credentials, then use them to login via this application

To allow this application to login to Spotify, you must register your application here: https://developer.spotify.com/my-applications

Next, go into your **Dashboad** at https://developer.spotify.com/dashboard/applications click the **application** you registered, and open **edit settings**. 

Then, add http://localhost:8888 as the **Website**, and http://localhost:8888/callback as the **Redirect URI**. 

**IMPORTANT** you must scroll down and click save for these changes to take affect.

Make note of your Client ID and your Client Secret, but do not expose the Client Secret such as commiting it. We will set them up in the next step.



#### Allow application to use Spotify credentials, without exposing them

Run the following commands

```bash
export SPOTIFY_CLIENT_ID=your-client-id

export SPOTIFY_CLIENT_SECRET=your-client-secret

npm start
```

This sets two environment variables for the shell you are running the express server in. They will be used within `server.js` to allow you to use the Spotify API, but you don't need to make any changes to the code.

It is important to remember, that if you close the shell which is running the server - the environment variable will need to be stored again following the above commands.

##### Try it out!

Visit http://localhost:8888/login. This will initiate the Spotify login, and redirect to http://localhost:3000?access_token=XYZ where XYZ is a valid access token which you can use in your frontend to do operations via the Spotify API.

## Deploy to Heroku

To make use of this application in a hosted frontend application, you will also need to host this application. This can be done quite easily using [Heroku](https://www.heroku.com/).

Ensure you have the **Heroku CLI tools** installed on your machine. This stage also assumes you have deployed your frontend application(which you can also do via Heroku!)



Replace `name-of-backend-app` with a name of your choice.

```
heroku create name-of-backend-app

heroku config:set SPOTIFY_CLIENT_ID=your-client-id

heroku config:set SPOTIFY_CLIENT_SECRET=your-client-secret

heroku config:set REDIRECT_URI=https://name-of-backend-app.herokuapp.com/callback

heroku config:set FRONTEND_URI=https://name-of-frontend-app.herokuapp.com

git push heroku master
```



## Important final steps

Remember the application settings we added in the Spotify Dashboard? We need to update them, to **allow your registered Spotify application to be used via your new Heroku application.**

Visit your application **Dashboard** at https://developer.spotify.com/dashboard/applications

Click the application you registered, and click edit settings.

Change the **Website** from http://localhost:8888 to your Heroku URI such as https://name-of-backend-app.herokuapp.com/

Then add https://name-of-backend-app.herokuapp.com/callback as a **Redirect URI**, click **add** and **save**.

### Done!

Now you can to go to your backend Heroku app http://name-of-backend-app.herokuapp.com/login and it will redirect to your frontend Heroku app http://name-of-frontend-app.herokuapp.com?access_token=XYZ 



#### How might you use the access token in your frontend application, to make use of the Spotify APIs?

Within your frontend application, you could have a login button(or similar) with does a `GET` request to http://name-of-backend-app.herokuapp.com/login Then you can go ahead and pull the `access_token` out of the query string from the response and use it to call out to the Spotify API services elsewhere in your app.



##### Credit

https://github.com/mpj/oauth-bridge-template

https://github.com/spotify/web-api-auth-examples