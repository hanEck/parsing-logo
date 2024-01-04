class Parser {
  constructor() {
    this.tokenizer = null;
    this.commands = {};
    this.queue = [];
    this.infixes = {};
  }

  load(tokenizer) {
    this.tokenizer = tokenizer;
    while (this.tokenizer.peek().type !== 'eof') {
      let token = this.tokenizer.next();
      if (this.commands.hasOwnProperty(token.data)) {
        let args = [];
        for (let i = 0; i < this.commands[token.data]; i++) {
          args.push(this.tokenizer.next());
        }
        token.args = args;
        this.queue.push(token);
      } else if (this.infixes.hasOwnProperty(token.data)) {
        let args = [this.queue.pop(), this.tokenizer.next()];
        token.args = args;
        this.queue.push(token);
      } else {
        this.queue.push(token);
      }
    }
  }

  next() {
    if (this.queue.length === 0) {
      return new Token("eof", "");
    } else {
      return this.queue.shift();
    }
  }

  addCommand(name, arity) {
    this.commands[name] = arity;
  }

  addInfix(name, precedence){
    this.infixes[name] = precedence;
  }
}