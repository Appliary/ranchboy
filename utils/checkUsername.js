module.exports = async function CheckUsername(value){
  if (!value) return 'This field is mandatory.';
  return true;
}
