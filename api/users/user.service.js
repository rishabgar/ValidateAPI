const pool = require("../../config/database");

module.exports = {
    create: (data, callback) => {
        pool.query(
            `insert into registration values(?,?,?,?,?,?,?)`,
            [
                data.id,
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results)
            }
        )
    },
    getUser: callback => {
        pool.query(
            `select * from registration`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results)
            }
        )
    },

    getUserById: (data, callback) => {
        pool.query(
            `select * from registration where id = ?`,
            [data],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results)
            }
        )
    },

    updateUser:(data,callback) =>{
    	pool.query(
    		`update registration set firstName=?,lastName=?,gender=?,email=?,password=?,number=? where id=?`,
    		[
    			data.first_name,
    			data.last_name,
    			data.gender,
    			data.email,
    			data.password,
    			data.number,
    			data.id
    			],
    		(error,results,fields) => {
    			if(error){
    				return callback(error);
    			}
    			return callback(null,results);
    		}
    	)
    },
    deleteUser:(data,callback) => {
    	pool.query(
    		`delete from registration where id = ?`,
    		[data],
    		(error,results,fields) => {
    			if(error){
    				return callback(error);
    			}
    			return callback(null,results);
    		}
    	)
    },
    getUserByEmail:(email,callback) => {
    	pool.query(
    		`select * from registration where email = ?`,
    		[email],
    		(error,results,fields) => {
    			if(error){
    				return callback(error);
    			}
    			return callback(null,results);
    		}
    	);
    }
}


















































