Package.describe({
  summary: "Log client-side Meteor events",
  version: "0.0.2",
  git: "https://github.com/alanning/meteor-trace.git",
  name: "alanning:trace"
});

Package.on_use(function (api) {
  api.versionsFrom && api.versionsFrom("METEOR@1");

  api.use(['underscore'], 'client');

  api.export && api.export('Trace');

  api.add_files([
    'trace.js',
    'collections.js',
    'templates.js'
  ], 'client');
});
