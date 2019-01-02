'use strict';

const lodash = require('lodash')

require('egg').startCluster({
    baseDir: __dirname,
    port: process.env.PORT || 8895,
    workers: 1
});
