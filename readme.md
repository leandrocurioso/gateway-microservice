# Gateway Microservice

A simple and powerful gateway microservice.

### Setting up the project
Follow this steps but first! For each parameter go to **Environment Configuration** to read the documentation.

1- Open the .env file located in the project root folder and change the configuration as desired. For each parameter go to **Environment Configuration** documentation.
2- High recommended to change the swaggeer username and password to read the documentation for security reasons.

### Instructions to run the project

In the temrinal browse to the project folder and type:

1 - To install the dependencies
`````
npm install
`````

2a - To run the application in development mode

`````
npm watch
`````

2b - To run the application in production mode

`````
npm start
`````

### Swagger Documentation

After you run the project you can go to the URL: **/swagger/api-docs** to read the api docs. THe username and password can be found in the Swagger environment configuration.

### Environment Configuration

The configuration is in the **.env** file located in the root folder.

### System

**SYSTEM_CONTROLLER_PATH**<br/>
**Type:** string<br/>
**Default:** ./src/application/controller<br/>
The controller folder path. Basically you should not change this value unless you know what you are doing.

### Server

**NODE_ENV**<br/>
**Type:** string<br/>
**Default:** development<br/>
**Possible values:** development | production<br/>
The environment execution mode.<br/>

**SERVER_PORT**<br/>
**Type:** integer<br/>
**Default:** 3001<br/>
A port number to run the microservice.<br/>

**SERVER_X_API_KEY**<br/>
**Type:** string<br/>
**Default:** 8551ded4-83c0-44d2-8fb5-6b3687282e8a<br/>
A static api key string that must be passed in the HTTP header when calling the API.<br/>
**Header key:** X-Api-Key<br/>

**SERVER_TIMEZONE**<br/>
**Type:** string<br/>
**Default:** UTC<br/>
The application timezone, this is a specific environment variable for process.env.TZ.<br/>

### Logger<br/>

**LOGGER_TRANSPORTS**<br/>
**Type:** array<string><br/>
**Default:** file<br/>
**Possible values:** console | file | timber<br/>
The transport layers for [Winston](https://github.com/winstonjs/winston) logger module, basically where the logs will be dispached, it is an array of strings so if you want to log it in console and file together use it with comma separation. [Timber](https://app.timber.io) is a cloud log provider, you need to create an account to use it and configure the parameters. [ORGANIZATION_KEY, SOURCE_ID] <br/>

**LOGGER_LOG_FILENAME**<br/>
**Type:** string<br/>
**Default:** /log/application.log<br/>
The filepath location for LOGGER_TRANSPORTS when file transport is active.<br/>

**LOGGER_LOG_LEVEL**<br/>
**Type:** string<br/>
**Default:** info<br/>
**Possible values:** debug | file | silly | info | warn | error<br/>
The log level.<br/>

**LOGGER_TIMBER_ORGANIZATION_KEY**<br/>
**Type:** string<br/>
Api key of you Timber account<br/>

**LOGGER_TIMBER_SOURCE_ID**<br/>
**Type:** integer<br/>
Source id of you Timber account<br/>

### Swagger<br/>

**SWAGGER_USERNAME**<br/>
**Type:** string<br/>
**Default:** admin<br/>
The username to read the aoi docs.<br/>

**SWAGGER_PASSWORD**<br/>
**Type:** string<br/>
**Default:** 123456<br/>
The user password to read the aoi docs.<br/>

### Jwt<br/>

**JWT_SECRET_KEY**<br/>
**Type:** string<br/>
Secret jet to encode and decode jwt.<br/>

**JWT_HOURS_TO_EXPIRE**<br/>
**Type:** integer<br/>
**Default:** 24<br/>
Amount of hours the token will be valid.<br/>

### Database Web Client<br/>

**WEB_CLIENT_DATABASE_URL**<br/>
**Type:** string<br/>
Full url of database service [MariaSQL Microservice](https://github.com/leandrocurioso/mariasql-microservice)<br/>
**WEB_CLIENT_DATABASE_X_API_KEY**<br/>
**Type:** string<br/>
X-Api-Key header to access the database service resources.<br/>

# Feedbacks / Contributions
If you want to give feedback or contribute to this project please contact me: [leandro.curioso@gmail.com](mailto:leandro.curioso@gmail.com)

