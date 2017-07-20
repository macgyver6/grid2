class Cat { 
  constructor(name) {
    this._name = name;
  }
  
  speak() {
    console.log(this._name + ' makes a noise.');
  }
}

class Lion extends Cat {
  speak() {
    super.speak();
    // console.log(this._name + ' roars.');
  }
}

var l = new Lion('Fuzzy');
l.speak(); 
// Fuzzy makes a noise.
// Fuzzy roars.