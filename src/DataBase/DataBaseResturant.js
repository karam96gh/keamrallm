
const { createPool } = require('mysql2/promise');


module.exports = connect = async () => {

    const connection = await createPool({
        host: 'localhost',
        user: 'root',
        password: 'e7m6m5a4l3l2s1ykaram',
               database: 'resturants',
        charset: 'utf8mb4', // Set the charset to utf8mb4

        connectionLimit: 1000
    });

    return connection;

}
 
// user: 'krkr6krkr',
//         password: 'k@j#h^g&f!5460197fdgtejapfhdoncvyr%#@76(k)j%%dfg^&#sdf',