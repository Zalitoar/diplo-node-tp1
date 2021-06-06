var config = {
    development: {
        //mysql connection settings
        database: {
            host: '127.0.0.1',
            port: '3306',
            name: 'dev_db',
            user: 'root',
            pwd: '****'
        },
        //server details
        server: {
            host: '127.0.0.1',
            port: '3005'
        }
    },
    production: {
        database: {
            host: '127.0.0.1',
            port: '3306',
            name: 'mydb',
            user: 'root',
            pwd: '***'
        },
        //server details
        server: {
            host: '127.0.0.1',
            port: '3000'
        }
    }
};
module.exports = config;