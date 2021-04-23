module.exports = function AuthError(){
  console.error('[31mAuthentication failed.[0m\nPlease update your credentials by running `ranchboy --config`.');
  process.exit(1);
}
