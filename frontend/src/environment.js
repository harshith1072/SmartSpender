// ./environment.js
let IS_PROD = true; // Switch this for prod vs dev
const server = IS_PROD ?
    "https://smartspender-4900.onrender.com" :
    "http://localhost:8000";

module.exports = { server };  
