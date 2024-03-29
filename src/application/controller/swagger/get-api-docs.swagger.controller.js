const Controller = require('../controller');

class GetApiDocsSwaggerController extends Controller {

  constructor({ 
    configuration, 
    logger, 
    router, 
    joi, 
    swaggerJsDoc, 
    swaggerUiExpress,
    path,
    expressBasicAuth
  }) { 
    super({ configuration, logger, router, joi });
    this.swaggerJsDoc = swaggerJsDoc;
    this.swaggerUiExpress = swaggerUiExpress;
    this.path = path;
    this.expressBasicAuth = expressBasicAuth;
  }

  proxy() {
    const options = {
      swaggerDefinition: {
        info: {
          title: this.configuration.packageJson.name,
          version: this.configuration.packageJson.version,
          description: this.configuration.packageJson.description,
          contact: {
            name: this.configuration.packageJson.author.name,
            email: this.configuration.packageJson.author.email,
            url: this.configuration.packageJson.author.url
          },
          license: {
            name: this.configuration.packageJson.license
          }
        },
        host: `localhost:${this.configuration.server.port}`,
        basePath: '/'
      },
      apis: [this.path.join(
        this.configuration.rootDir,
        'src',
        'application',
        'controller',
        '**',
        '*.js'
        )]
    };
    return {
      httpVerb: 'USE',
      uri: '/api-docs',
      middlewares: [
        this.expressBasicAuth,
        this.swaggerUiExpress.serve, 
        this.swaggerUiExpress.setup(this.swaggerJsDoc(options))
      ],
      doc: `
      /**
       * @swagger
       * /swagger/api-docs:
       *    get:
       *      description: Open the swagger UI documentation
       *      produces:
       *        - text/html
       *      responses:
       *        200:
       *          description: OK
       */`
    };
  }

  async route(req, res, next) {
    return res.status(20).end(String.empty);
  }

}

module.exports = GetApiDocsSwaggerController;
