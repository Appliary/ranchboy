module.exports = function AuthError(element, name){
  console.error(`[31m${element} "${name}" not found.[0m`);
  process.exit(1);
}
