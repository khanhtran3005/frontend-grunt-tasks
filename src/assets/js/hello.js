var a = 'Hello ',
    b = 'World!';

function hello(a, b) {

    return this.a + this.b;

}

alert(hello(a, b));
