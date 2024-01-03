class Token {
  constructor(type, data) {
    this.type = type;
    this.data = data;
  }

  toString() {
    return `(${this.type})${this.data}`;
  }
}

class Tokenizer {
  constructor() {
    this.tokens = [];
    this.index = 0;
  }

  load(text) {
    this.tokens = [];
    this.index = 0;
    const operators = [
      "to",
      "end",
      "!=",
      "<>",
      "<=",
      ">=",
      "<",
      ">",
      "+",
      "-",
      "*",
      "/",
      "%",
      "=",
      "[",
      "]",
      "(",
      ")",
    ];

    let lines = text.split("\n");
    for (let line of lines) {
      // Ignore comments
      if (line.trim().startsWith(";")) continue;
      // Ignore empty lines
      if (line.trim().length == 0) continue;
      // Split the line into words
      let words = line.trim().toLowerCase().split(/\s+/);
      for (let word of words) {
        if (!isNaN(word)) {
          this.tokens.push(new Token("num", parseFloat(word)));
        } else if (operators.includes(word)) {
          this.tokens.push(new Token("ops", word));
        } else if (word.startsWith(":")) {
          this.tokens.push(new Token("var", word.substring(1)));
        } 
        else if (word.startsWith('"')) {
          this.tokens.push(new Token("sym", word.substring(1)));
        }
        else {
          this.tokens.push(new Token("wrd", word));
        }
      }
    }
    // Add the end of file token
    this.tokens.push(new Token("eof", ""));
  }

  peek() {
    return this.tokens[this.index];
  }

  next() {
    return this.tokens[this.index++];
  }
}
