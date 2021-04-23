module.exports = function CheckRancherUrl(value){
  // Add protocol
  if (!value.startsWith('http://') && !value.startsWith('https://')) {
    value = `https://${value}`;
  }

  // Add version
  if (!value.endsWith('/')) value += '/';
  if (!value.endsWith('/v3/')) value += 'v3/';

  return value;
}
