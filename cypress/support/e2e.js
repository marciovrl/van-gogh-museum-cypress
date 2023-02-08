// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

//Preventing cookie banner 
const COOKIE_NAME = ".GdprCookie.V1";
const COOKIE_VALUE = "1";

Cypress.on("window:before:load", window => {
  window.document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE}`;
});

// Alternatively you can use CommonJS syntax:
// require('./commands')