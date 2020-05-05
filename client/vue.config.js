const path = require('path');

module.exports = {
    outputDir: '../server/public',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000'
            }
        }
    }
}