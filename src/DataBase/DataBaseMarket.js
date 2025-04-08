
const { createPool } = require('mysql2/promise');
module.exports = connect = async () => {

    const connection = await createPool({
        host: 'localhost',
        user: 'root',
        password: 'e7m6m5a4l3l2s1ykaram',
               database: 'market',
        charset: 'utf8mb4', // Set the charset to utf8mb4

        connectionLimit: 1000
    });

    return connection;

}
