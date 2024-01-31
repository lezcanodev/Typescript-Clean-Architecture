
import { migrationsDir } from "..";
import {exec} from 'child_process';
import path from "path";

const migrationName = process.argv[2];

if(!migrationName){
    console.error('You must provide a migration name');
}

const commandCreateMigration = `typeorm migration:create "${path.join(migrationsDir, migrationName)}"`;

exec(commandCreateMigration, (error, stdout, stderr) => {
    if(error){
      console.log(error);
      return;  
    }

    if(stderr){
        console.log(stderr);
        return;
    }

    console.log('\n\n')
    process.stdout.write(stdout);
})