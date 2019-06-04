module.exports.SwaggerController = { 
  baseUri: '/swagger', 
  controllers: [
    require('./swagger/get-api-docs.swagger.controller') 
  ]
};

module.exports.HealthController = { 
  baseUri: '/health', 
  controllers: [
    require('./health/get.health.controller') 
  ]
};

module.exports.AuthV1Controller = { 
  baseUri: '/auth', 
  version: 'v1',
  controllers: [
    require('./v1/auth/post.authenticate.controller'),
    require('./v1/auth/post.verify-token.controller'),
    require('./v1/auth/post.refresh-token.controller')
  ]
};
