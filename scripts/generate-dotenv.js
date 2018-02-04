const { writeFileSync } = require("fs");
const dotenv = require("dotenv");

const requiredVars = dotenv.config({ path: "./.env.example" }).parsed;

const varText = Object.keys(requiredVars)
  .map(key => `${key}=${process.env[key]}`)
  .join("\n");

writeFileSync(".env", varText, err => {
  if (err) throw err;
});
