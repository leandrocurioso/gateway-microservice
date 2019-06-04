const Controller = require('../../controller');

class PostRefreshTokenController extends Controller {

  constructor({ 
    configuration, 
    logger, 
    router, 
    joi, 
    xApiKeyMiddleware,
    jwtMiddleware,
    jwtService
  }) { 
    super({ configuration, logger, router, joi });
    this.xApiKeyMiddleware = xApiKeyMiddleware;
    this.jwtMiddleware = jwtMiddleware;
    this.jwtService = jwtService;
  }

  proxy() {
    return {
      httpVerb: 'POST',
      uri: '/refresh-token',
      middlewares: [ 
        this.xApiKeyMiddleware,
        this.jwtMiddleware
      ],
      doc: `
      /**
       * @swagger
       * /v1/auth/refresh-token:
       *    post:
       *      description: Refreshes a token.
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
       *        - in: header
       *          name: Authorization
       *          type: string
       *          required: true
       *          description: Json web token
       *          example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
       */`
    };
  }

  async route(req, res, next) {
    return res.status(200).json({ 
      token: await this.jwtService.sign(
        {
          iss: req.jwt.iss,
          role: req.jwt.role,
          email: req.jwt.email
        },
        this.configuration.jwt.secretKey, 
        this.configuration.jwt.hoursToExpire
      )
    });
  }

}

module.exports = PostRefreshTokenController;
