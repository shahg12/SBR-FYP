var mongoose = require('mongoose');

  let url='mongodb://127.0.0.1:27017/abc';  
let connectDB=async()=>
{
   try {
       const conn=await mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true},
        {useCreateIndex:true});
       console.log(`Mongoose Connected ${conn.connection.host}` )
    } catch (error) {
        console.error(`Error:${error.message}` );
        process.exit(1);
   }
}
module.exports=connectDB;
 