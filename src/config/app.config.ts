import { join } from "path";
import * as root from 'app-root-dir';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import * as md5 from 'md5';
import * as moment from 'moment';
import { Logger } from "@nestjs/common";


export default class AppConfig {
    private readonly packageJson: { [key: string]: string };

    constructor() {
        this.configure();
        this.packageJson = require(join(root.get(), 'package.json'));
    }

    private configure(): void {
        if(!process.env.HASH_KEY) {
            const { parsed: config, error } = dotenv.config();
            const saltbae: string = bcrypt.genSaltSync(Number(config['HASH_SALTROUNDS']));
            
            if(error) throw new Error(`Unable to load environment variables from root of app directory.`);
            process.env.HAS_SECRET = config['HASH_SECRET'] = bcrypt.hashSync(md5(`${config['HASH_KEY']}x${moment().valueOf()}`), saltbae)
            Logger.log(`${Object.keys(config).length} ${process.env.NODE_ENV} configuration items loaded.`, 'AppConfig@configure', true);
        }
    }

    get(key: string): string {
        return process.env[ key ] || null;
    }

    getPackageInfo(key: string): string {
        return this.packageJson ? this.packageJson[ key ] || null: '';
    }
}