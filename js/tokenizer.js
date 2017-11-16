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
  }

  load(text) {
  }

  peek() {
  }

  next() {
    return new Token('eof', '');
  }
}

