const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app){
//     app.use(
//       createProxyMiddleware('/naver', {
//         target: 'https://m.search.naver.com',
//         pathRewrite: {
//           '^/naver':''
//         },
//         changeOrigin: true
//       })
//     )
// }

module.exports = function(app){
  app.use(
    createProxyMiddleware('/register', {
      target: 'http://localhost:3001',
      changeOrigin: true
    })
  )
}