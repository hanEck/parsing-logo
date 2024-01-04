class Parser {
  constructor() {
    this.tokenizer = null;
    this.commands = {};
    this.infixes = {};
  }

  load(tokenizer) {
    this.tokenizer = tokenizer;
  }

  next(precedence = 100) {
    let token = this.tokenizer.next();

    if (token.type === "error") {
      throw new Error(token.data);
    }

    if (token.type === "eof") {
      this.tokenizer = null;
      return token;
    }

    if (token.type === "ops") {
      switch (token.data) {
        case "(":
          token = this.handleParenthesis(token);
          break;
        case "[":
          token = this.handleSquareBracket(token);
          break;
        case "to":
          token = this.handleTo(token);
          break;
        default:
          break;
      }
    } else if (token.type === "wrd") {
      const cmd = this.commands[token.data];
      if (cmd !== undefined) {
        const args = Array(cmd).fill().map(() => {
          const nextToken = this.next();
          if (nextToken.type === "eof") {
            throw new Error("Some arguments are missing");
          }
          return nextToken;
        });
        token.args = args;
      }
    }

    if (token.type !== "ops") {
      while (true) {
        const peek = this.tokenizer.peek();
        if (!peek || !this.infixes[peek.data] || this.infixes[peek.data] >= precedence) {
          break;
        }
        const op_token = this.tokenizer.next();
        op_token.args = [token, this.next(this.infixes[peek.data])];
        token = op_token;
      }
    }

    return token;
  }

  handleParenthesis(token) {
    const args = [];
    let name = null;

    const look = this.tokenizer.peek();

    if (look && look.type === "wrd") {
      name = this.tokenizer.next();
    }

    while (true) {
      const i = this.next();

      if (i.type === "eof") {
        throw new Error('Operator missing: ")"');
      }

      if (i.type === "ops" && i.data === ")") {
        break;
      }

      args.push(i);
    }

    if (name) {
      token = name;
      token.args = args;
    } else if (args.length === 1) {
      token = args[0];
    } else {
      token.type = "lst";
      token.args = args;
    }

    return token;
  }

  handleSquareBracket(token) {
    const args = [];

    while (true) {
      const next = this.next();

      if (next.type === "eof") {
        throw new Error('Operator missing: "]"');
      }

      if (next.type === "ops" && next.data === "]") {
        break;
      }

      args.push(next);
    }

    token.type = "lst";
    token.args = args;

    return token;
  }

  handleTo(token) {
    let nameToken = this.tokenizer.next();

    if (nameToken.type === "eof") {
      throw new Error('There is a nam missing for "to"');
    }

    let name = nameToken.type === "wrd" ? nameToken.data : nameToken;

    const args = [];

    let tk = null;
    while (true) {
      tk = this.tokenizer.peek();

      if (tk.type === "eof") {
        throw new Error(`${name} has no end`);
      }

      if (tk.type !== "var") {
        break;
      }

      args.push(this.tokenizer.next());
      this.addCommand(name, args.length);
    }

    const code = [];

    while (true) {
      tk = this.tokenizer.next();

      if (tk.type === "eof") {
        throw new Error(`${name} has no end`);
      }

      if (tk.type === "ops" && tk.data === "end") {
        break;
      }

      code.push(tk);
    }

    token.type = "def";
    token.data = name;
    token.args = {
      args,
      raw: code,
      code: null,
    };

    return token;
  }

  addCommand(name, args) {
    this.commands[name] = args;
  }

  addInfix(name, precedence) {
    this.infixes[name] = precedence;
  }
}