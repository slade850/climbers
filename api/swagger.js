const swaggerAutogen = require('swagger-autogen')()
require('./src/server')
const outputFile = './swagger_output.json'
const endpointsFiles = [
'./src/server',    
'./src/modules/user/routes', 
'./src/modules/post/routes', 
'./src/modules/theme/routes',
'./src/modules/strongPoint/routes',
'./src/modules/private_message/routes',
'./src/modules/media/routes',
'./src/modules/like/routes',
'./src/modules/groupMessage/routes',
'./src/modules/group/routes',
'./src/modules/event/routes',
'./src/modules/comment/routes',
'./src/modules/climberProfile/routes',
'./src/modules/climberPracticeType/routes'
]

swaggerAutogen(outputFile, endpointsFiles)