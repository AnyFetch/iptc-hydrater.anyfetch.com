/**
 * @file Defines the hydrater settings.
 */

// nodeEnv can either be "development" or "production"
var nodeEnv = process.env.nodeEnv || "development";
var defaultPort = 8000;


// Number of instance to run simultaneously per cluster
var defaultConcurrency = 1;

if(nodeEnv === "production") {
  defaultPort = 80;
}

// Exports configuration
module.exports = {
  env: nodeEnv,
  port: process.env.PORT || defaultPort,

  thumb_size: "350x250",
  display_size: "750x750",
  concurrency: process.env.IMAGE_CONCURRENCY || defaultConcurrency,
  appName: process.env.APP_NAME || "iptc-hydrater",
  redisUrl: process.env.REDIS_URL
};
