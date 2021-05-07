// import {KafkaStartup} from "./kafka/startup";

import {IBoot} from 'midway';
import {FreelogApplication} from 'egg-freelog-base';
import mongoose from 'egg-freelog-base/database/mongoose';

/**
 * https://eggjs.org/zh-cn/basics/app-start.html
 */
export default class AppBootHook implements IBoot {

    app;

    constructor(app: FreelogApplication) {
        this.app = app;
    }

    async willReady() {
        await mongoose(this.app);
    }
}
