// ./pact/jest-wrapper.js
// This has to be included in the jest config.
// Refer to the test:pact command in package.json.

beforeAll(async() => {
  // start server running on localhost:8080
  await global.provider.setup();
});

afterAll(async() => {
  // trigger the mock provider to create contract files
  // for all interactions it has received during the test run
  // in the pacts folder where configured in setup.js
  await global.provider.finalize();
});