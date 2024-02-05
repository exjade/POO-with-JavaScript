
/* Oculta las propiedades 

- Clases privadas
    - JS no cuenta con el mecanismo por lo que la comunidad invento una convención 
        para alertar a otros programadores de propiedades privadas teóricamente, 
        con la convención del guion bajo. 
    - En ES9, se implemento una forma explicita con el símbolo de numeral. 
*/
const _private = new WeakMap();


/* 
    GETTER: Un método getter debe obtener el valor de una propiedad
    SETTER: Un método setter debe actualizar el valor de una propiedad 
*/
class Book {
    constructor(title = '1984', author = 'George Orwell', price = 350) {

        const properties = {
            _title: title,
            _author: author,
            _price: price,
        }

        _private.set(this, { properties })
    }

    get title() {
        return _private.get(this).properties['_title'];
    }
    set title(newTitle) {
        return _private.get(this).properties['_title'] = newTitle;
    }

    get author() {
        return _private.get(this).properties['_author'];
    }
    set author(newauthor) {
        return _private.get(this).properties['_author'] = newauthor;
    }

    get price() {
        return _private.get(this).properties['_price'];
    }
    set price(newprice) {
        return _private.get(this).properties['_price'] = newprice;
    }

    getAllData() {
        console.log(`
            Titúlo: ${this.title}, Autor: ${this.author}, Price: ${this.price}
        `)
    }
}


// La clase Comic es una extensión de la clase Book
class Comic extends Book {
    constructor(title, author, price, illustrators) {
        super(title, author, price)

        this.illustrators = illustrators;
    }

    addIllustrator(newIllustrator = []) {
        this.illustrators.push(newIllustrator)
    }
    getAllData() {
        super.getAllData();
        console.log(`
                         Illustradores: ${this.illustrators}
        `)
    }
}

class ShoppingCart {
    constructor() {
        this.products = []
    }

    addProduct(qty, price) {
        this.products.push(...Array(qty).fill(price));
    }
    showProducts() {
        console.log(this.products);
    }
    calcTotal() {
        return this.products
            .map(price => price)
            .reduce((acc, price) => acc + price, 0);
    }
    printTicket() {
        console.log(`Total a pagar: $${this.calcTotal()} MXN`)
    };
}


// Instancia de Book
const book1 = new Book('Rayuela', 'J. Cortazar', 500);
const book2 = new Book('Lean Startup', 'E. Ries', 300);


// Acceder a las propiedades del objeto con la notación de puntos.
// console.log(book1._title) // Undefined

book1.title = 'El alquimista'; // Al reasignar el title, automaticamente se ejecutará el método setter

console.log(book1.title) // Al acceder a la propiedad title, automaticamente se ejecutará el método getter


const comic1 = new Comic('The Killing Joke', 'A.M', 150, ['B.B']);

// Registro en consola de propiedades del comic1
console.log(comic1.title)
console.log(comic1.author)
console.log(comic1.price)
console.log(comic1.illustrators)

// Agregamos un nuevo illustrator
comic1.addIllustrator('J.H')
console.log(comic1.illustrators)

// Instancia de ShoppingCart
const cart1 = new ShoppingCart()

// Añadimos productos a nuestra canasta
cart1.addProduct(2, comic1.price)
cart1.addProduct(1, book1.price)
cart1.showProducts()

// Imprimimos el ticket
cart1.printTicket();


// Podemos ejecutar los métodos de de book1 en comic1 porque hemos heredado las propiedades y métodos
book1.getAllData()
comic1.getAllData()