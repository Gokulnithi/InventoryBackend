const mongoose = require('mongoose');

const dbconnect = async()=>{
    try{
    const connect = await mongoose.connect(process.env.CONNECTION_STR);
    console.log(`DB connected ${connect.connection.host} and ${connect.connection.name}`);

    }catch(err){
        console.log(`Error - ${err}`);
        process.exit(1);
    }
}

module.exports = dbconnect