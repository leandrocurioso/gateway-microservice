class Configuration {

  constructor({ rootDir, environmentFilename, path, getEnv, dotEnv }) {
      this.rootDir = rootDir;
      this.environmentFilename = environmentFilename;
      this.path = path;
      this.getEnv = getEnv;
      this.dotEnv = dotEnv;
  }

  get() {
      this.dotEnv.config({ path: this.path.join(this.rootDir, this.environmentFilename) });
      const config = {
        rootDir: this.rootDir,
        nodeEnv: this.getEnv.string('NODE_ENV', 'development'),
        system: {
          controllerPath: this.getEnv.string('SYSTEM_CONTROLLER_PATH')
        },
        server: {
            port: this.getEnv.int('SERVER_PORT', 3000),
            xApiKey: this.getEnv.string('SERVER_X_API_KEY'),
            timezone:this.getEnv.string('SERVER_TIMEZONE', 'UTC')
        },
        logger: {
          transports: this.getEnv.array('LOGGER_TRANSPORTS', 'string', [ 'file' ]),
          logFilename: this.getEnv.string('LOGGER_LOG_FILENAME', 'application.log'),
          level: this.getEnv.string('LOGGER_LOG_LEVEL', 'info'),
          timberSourceId: this.getEnv.int('LOGGER_TIMBER_SOURCE_ID'),
          timberOrganizationKey: this.getEnv.string('LOGGER_TIMBER_ORGANIZATION_KEY')
        },
        swagger: {
          username: this.getEnv.string("SWAGGER_USERNAME", 'admin'),
          password: this.getEnv.string("SWAGGER_PASSWORD", '123456')
        },
        webClient: {
          database: {
            host: this.getEnv.string("WEB_CLIENT_DATABASE_URL"),
            xApiKey: this.getEnv.string("WEB_CLIENT_DATABASE_X_API_KEY")
          }
        },
        jwt: {
          secretKey: this.getEnv.string("JWT_SECRET_KEY"),
          hoursToExpire: this.getEnv.int("JWT_HOURS_TO_EXPIRE", 24)
        }
      }; 
      process.env.NODE_ENV = config.nodeEnv;
      process.env.TZ = config.server.timezone;
      return config;
  }

}

module.exports = Configuration;
