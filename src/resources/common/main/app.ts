import PostgressDataSource from '@common/infrastructure/datasource/postgres';
import { serverExpress } from './factory/express.factory';


export default async function initApp(){
    try{

        await PostgressDataSource.initialize();

        if(PostgressDataSource.isInitialized){
            console.log('Postgress connection established')
        }
        
        serverExpress({
            port: Number(process.env.PORT) || 3000
        });

    }catch(error){
        console.log("Server error: ", error);
    }
}

