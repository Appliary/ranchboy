function Fuzzy(input) {
  return new RegExp(
    input
      .replace(/[-\/]/g, '.*- ?')
  );
}

function FuzzySuggest(input, choices) {
  return choices.filter((choice) => {
    if (choice.value && choice.value.includes(input)) return true;
    if (choice.title && choice.title.match(Fuzzy(input))) return true;
    return false;
  });
}

module.exports = Fuzzy;
module.exports.suggest = FuzzySuggest;
