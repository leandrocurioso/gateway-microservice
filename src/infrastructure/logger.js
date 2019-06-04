class Logger {

  constructor({ configuration, path, winston, rootDir, timber, timberTransport }) {
    this.configuration = configuration;
    this.path = path;
    this.winston = winston;
    this.rootDir = rootDir;
    this.timber = timber;
    this.timberTransport = timberTransport;
  }

  getInstance() {
    return this.winston.createLogger({
      level: this.configuration.logger.level,
      format: this.winston.format.combine(
        this.winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        this.winston.format.json()
      ),
      transports: this.configuration.logger.transports.map(transport => {
        switch(transport) {
          case 'timber':
            const timber = new this.timber(
              this.configuration.logger.timberOrganizationKey, 
              this.configuration.logger.timberSourceId
            );
            return new this.timberTransport(timber);
          case 'console':
            return new this.winston.transports.Console();
          case 'file':
            return new this.winston.transports.File({ filename: this.path.join(this.rootDir, this.configuration.logger.logFilename) })
        }
      })
    });
  }

}

module.exports = Logger;
