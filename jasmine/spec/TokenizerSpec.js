describe("Tokenizer",function(){
  var tokenizer;

  beforeEach(function() {
    tokenizer = new Tokenizer();
  });

  it('can tokenize empty code', () => {
    tokenizer.load("");
    let token = tokenizer.next();
    expect(token.type).toEqual('eof');
  });

  it('can tokenize with next', () => {
    tokenizer.load("right 10");
    let token;
    token = tokenizer.next();
    console.log(token instanceof Token);
    expect(token instanceof Token).toBeTruthy();
    expect(token.type).toEqual('wrd');
    expect(token.data).toEqual('right');
    token = tokenizer.next();
    expect(token.type).toEqual('num');
    expect(token.data).toEqual(10);
    token = tokenizer.next();
    expect(token.type).toEqual('eof');
  });

  it('can peek ahead with peek', () => {
    tokenizer.load("right 10");
    let token;
    token = tokenizer.peek();
    expect(token instanceof Token).toBeTruthy();
    expect(token.type).toEqual('wrd');
    expect(token.data).toEqual('right');
  });

  it('can peek ahead with peek, without disturbing next', () => {
    tokenizer.load("right 10");
    let token;
    token = tokenizer.peek();
    expect(token instanceof Token).toBeTruthy();
    expect(token.type).toEqual('wrd');
    expect(token.data).toEqual('right');
    token = tokenizer.next();
    expect(token.type).toEqual('wrd');
    expect(token.data).toEqual('right');
    token = tokenizer.peek();
    expect(token.type).toEqual('num');
    expect(token.data).toEqual(10);
    token = tokenizer.next();
    expect(token.type).toEqual('num');
    expect(token.data).toEqual(10);
    token = tokenizer.next();
    expect(token.type).toEqual('eof');
  });

  it('will ignore comments', () => {
    tokenizer.load(`; one line comment`);
    let token = tokenizer.next();
    expect(token.type).toEqual('eof');
  });

  it('can tokenize a word', () => {
    tokenizer.load("aword");
    let token = tokenizer.next();
    expect(token.type).toEqual('wrd');
    expect(token.data).toEqual('aword');
  });

});

