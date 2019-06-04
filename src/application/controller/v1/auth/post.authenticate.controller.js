const Controller = require('../../controller');

class PostAuthenticateController extends Controller {

  constructor({ 
    configuration, 
    logger, 
    router, 
    joi, 
    xApiKeyMiddleware, 
    databaseService,
    jwtService
  }) { 
    super({ configuration, logger, router, joi });
    this.xApiKeyMiddleware = xApiKeyMiddleware;
    this.databaseService = databaseService;
    this.jwtService = jwtService;
  }

  proxy() {
    return {
      httpVerb: 'POST',
      uri: '/',
      middlewares: [ 
        this.xApiKeyMiddleware,
        this.validateRequest({
          body: this.joi.object().keys({
            email: this.joi.string().email().min(5).max(200).required(),
            password: this.joi.string().min(8).max(100).required()
          }).required()
        })
      ],
      doc: `
      /**
       * @swagger
       * /v1/auth:
       *    post:
       *      description: Authenticates an user and return a jwt.
       *      produces:
       *        - application/json
       *      responses:
       *        200:
       *          description: Ok
       *        400:
       *          description: Bad Request
       *        403:
       *          description: Forbidden
       *        500:
       *          description: Internal Server Error
       *      parameters:
       *        - in: header
       *          name: X-Api-Key
       *          type: string
       *          required: true
       *          description: Api key to access server resources.
       *          example: c17d4c2c-6c5c-4267-9968-6b8b42d1d56f
       *        - in: header
       *          name: Content-Type
       *          default: application/json
       *          type: string
       *          required: true
       *          description: Request content type
       *          example: application/json
       *        - in: body
       *          name: email
       *          type: string
       *          required: true
       *          description: The user e-mail
       *          example: mail@provider.com
       *        - in: body
       *          name: password
       *          type: string
       *          required: true
       *          description: The user password
       *          example: 12345678
       */`
    };
  }

  async route(req, res, next) {
    const token = await this.jwtService.sign(
      await this.databaseService.authenticate(
        req.body.email, 
        req.body.password,
        req["X-Request-Id"]
      ), 
      this.configuration.jwt.secretKey, 
      this.configuration.jwt.hoursToExpire
    );
    return res.status(200).json({ token });
  }

}

module.exports = PostAuthenticateController;
