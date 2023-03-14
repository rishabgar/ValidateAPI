const { create, getUser, getUserById,updateUser,deleteUser,getUserByEmail } = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");



module.exports = {
    createUser: (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        create(body, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection eror'
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },

    getUsers: (req, res) => {
        getUser((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Something is Wrong"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },

    getUsersById: (req, res) => {
        const ID = req.params["id"];
        getUserById(ID, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Record not Found"
                });
            }
            else if(!results){
            	return res.json({
            		success:0,
            		message:"Record not Found"
            	});
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    updateUser:(req,res) => {
    	const body = req.body;
    	const salt = genSaltSync(10);
    	body.password = hashSync(body.password,salt);
    	updateUser(body,(err,results) => {
    		if(err){
    			console.log(err);
    			 return res.status(500).json({
                    success: 0,
                    message: "Update Fail"
                });
    		}
    		return res.status(500).json({
                    success: 0,
                    message: "Updated Successfully"
            });
    	})
    },

    deleteUser: (req, res) => {
        const ID = req.params["id"];
        deleteUser(ID, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Something is Wrong"
                });
            }
            else if(!results){
            	return res.json({
            		success:0,
            		message:"Record not Found"
            	});
            }
            return res.status(200).json({
                success: 1,
                message:"User deleted Successfully"
            });
        });
    },

    login:(req,res) => {
    	const body = req.body;
    	getUserByEmail(body.email,(err,results) => {
    		console.log(results);
    		if(err){
    			console.log(err);
    		}
    		else if(!results){
    			return res.json({
    				success:0,
    				data:"Invalid email or password"
    			});
    		}
    		const result = compareSync(body.password,results[0].password);
    		console.log(result);
    		if(result){
    			results.password = undefined;
    			const jsontoken = sign({result:results},"qwe1234",{
    				expiresIn:"1h"
    			});
    			return res.json({
    				success:1,
    				message:"Login Successfully",
    				token:jsontoken
    			});
    		}
    		else{
    			return res.json({
    				success:0,
    				message:"Invalid Email or Password",
    			});
    		}
    	})
    }    
}