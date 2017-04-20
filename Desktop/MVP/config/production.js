'use strict';

// Production environment settings
var config = {};

// Pull in production RDS connection string
config.databaseUrl = process.env.RDS_CONNECTION_URL;

module.exports = config;