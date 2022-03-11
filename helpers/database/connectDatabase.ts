import { connect } from 'mongoose';

export async function connectDatabase()
{
    // @ts-ignore
   await connect(process.env.MONGO_URI, {
       useNewUrlParser: true
   })
    .then(() => {
        console.log('Connection Success');
    })
    .catch((err)=>console.log(err));
}
