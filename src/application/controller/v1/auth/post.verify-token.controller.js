const Controller = require('../../controller');

class PostVerifyTokenController extends Controller {

  constructor({ 
    configuration, 
    logger, 
    router, 
    joi, 
    xApiKeyMiddleware,
    jwtMiddleware
  }) { 
    super({ configuration, logger, router, joi });
    this.xApiKeyMiddleware = xApiKeyMiddleware;
    this.jwtMiddleware = jwtMiddleware;
  }

  proxy() {
    return {
      httpVerb: 'POST',
      uri: '/verify-token',
      middlewares: [ 
        this.xApiKeyMiddleware,
        this.jwtMiddleware
      ],
      doc: `
      /**
       * @swagger
       * /v1/auth/verify-token:
       *    post:
       *      description: Verify is a token is valid and return his payload.
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
    return res.status(200).json({ token: req.jwt });
  }

}

module.exports = PostVerifyTokenController;
