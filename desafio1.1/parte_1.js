class Vertice {
    #x;
    #y;

    constructor(x ,y) {
        this.#x = x;
        this.#y = y;
    }

    setX(x) {
        this.#x = x;
    }

    setY(y) {
        this.#y = y;
    }

    getX(){
        return this.#x;
    }

    
    getY(){
        return this.#y;
    }

    static getDistancia(vertice1, vertice2){
        return Math.sqrt((vertice2.getX() - vertice1.getX())**2 + (vertice2.getY() - vertice1.getY())**2)
    }

    move(x, y) {
        this.setX(x);
        this.setY(y);
    }

    static equals(vertice1, vertice2){
        return vertice1.getX() === vertice2.getX() && vertice1.getY() === vertice2.getY();
    }

    toString(){
        console.log(`x: ${this.getX()}, y: ${this.getY()}`);
    }

}

class Triangulo {
    #vertice1;
    #vertice2;
    #vertice3;

    constructor(vertice1, vertice2, vertice3) {
        this.#vertice1 = vertice1;
        this.#vertice2 = vertice2;
        this.#vertice3 = vertice3;
    
        if (this.getArea() === 0) {
            throw new Error("Os vértices informados não formam um triângulo.");
        }
    }
    

    getArea(){
        const a = Vertice.getDistancia(this.#vertice1, this.#vertice2);
        const b = Vertice.getDistancia(this.#vertice2, this.#vertice3);
        const c = Vertice.getDistancia(this.#vertice3, this.#vertice1);
        const p = (a + b + c) / 2;
        return Math.sqrt(p * (p - a) * (p - b) * (p - c));
    }
    

    equals(triangulo2){
        return  Vertice.equals(this.getVertice1(), triangulo2.getVertice1()) &&
                Vertice.equals(this.getVertice2(), triangulo2.getVertice2()) &&
                Vertice.equals(this.getVertice3(), triangulo2.getVertice3());
    }

    getVertice1(){
        return this.#vertice1;
    }

    getVertice2(){
        return this.#vertice2;
    }

    getVertice3(){
        return this.#vertice3;
    }

    getPerimetro(){
        const a = Vertice.getDistancia(this.#vertice1, this.#vertice2);
        const b = Vertice.getDistancia(this.#vertice2, this.#vertice3);
        const c = Vertice.getDistancia(this.#vertice3, this.#vertice1);
        return a + b + c;
    }

    getTipo() {
        const a = Vertice.getDistancia(this.#vertice1, this.#vertice2);
        const b = Vertice.getDistancia(this.#vertice2, this.#vertice3);
        const c = Vertice.getDistancia(this.#vertice3, this.#vertice1);
    
        // Classificação pelos lados
        if (a === b && b === c) {
            return "Equilátero";
        } else if (a === b || a === c || b === c) {
            return "Isósceles";
        } else {
            return "Escaleno";
        }
    }

    clone(){
        return new Triangulo(this.#vertice1, this.#vertice2, this.#vertice3);
    }
}

class Poligono {

    #vertices = [];

    constructor(vertices) {
        if (vertices.length < 3) {
            throw new Error("O número de vertices tem que ser maior ou igual a 3.");
        }

        vertices.forEach((vertice) => {
            this.#vertices.push(vertice);
        });

    }

    addVertice(v)  {

        if (this.#vertices.some(vertice => Vertice.equals(vertice, v))) {
            return false;
        }

        this.#vertices.push(v);

        return true;

    }
    
    getPerimetro() {
        let perimetro = 0;
    
        for (let i = 0; i < this.#vertices.length; i++) {
            
            const verticeAtual = this.#vertices[i];
            const proximoVertice = this.#vertices[(i + 1) % this.#vertices.length];
    
            
            const distancia = Vertice.getDistancia(verticeAtual, proximoVertice);
    
            
            perimetro += distancia;
        }
    
        return perimetro;
    }

    getQtdVertices() {
        return this.#vertices.length;
    }
    

}




var prompt = require('prompt-sync')();
//
// get input from the user.
//

// -------------------------------------------------------------------------

// Testes com a classe Poligono

// const vertices = [];
// const numVertices = parseInt(prompt("Digite o número de vértices do polígono (>= 3): "));

// for (let i = 1; i <= numVertices; i++) {
//     const x = parseFloat(prompt(`Digite o valor de x para o vértice ${i}: `));
//     const y = parseFloat(prompt(`Digite o valor de y para o vértice ${i}: `));
//     vertices.push(new Vertice(x, y));
// }

// try {
//     const poligono = new Poligono(vertices);

//     console.log("\n--- Testando métodos da classe Poligono ---\n");

//     // Testando getPerimetro()
//     console.log("Perímetro:");
//     console.log(poligono.getPerimetro());

//     // Testando getQtdVertices()
//     console.log("Quantidade de Vértices:");
//     console.log(poligono.getQtdVertices());

//     // Testando addVertice()
//     const x = parseFloat(prompt("Digite o valor de x para um novo vértice: "));
//     const y = parseFloat(prompt("Digite o valor de y para um novo vértice: "));
//     const novoVertice = new Vertice(x, y);
//     const adicionado = poligono.addVertice(novoVertice);
//     console.log(`Novo vértice adicionado? ${adicionado}`);
//     console.log("Nova quantidade de Vértices:");
//     console.log(poligono.getQtdVertices());

// } catch (error) {
//     console.log(error.message);
// }


// -------------------------------------------------------------------------

// testes com a classe Triangulo

// const triangulos = [];

// for (let i = 1; i <= 3; i++) {
//     const vertices = [];
//     for (let j = 1; j <= 3; j++) {
//         const x = parseFloat(prompt(`Digite o valor de x para o vértice ${j} do triângulo ${i}: `));
//         const y = parseFloat(prompt(`Digite o valor de y para o vértice ${j} do triângulo ${i}: `));
//         vertices.push(new Vertice(x, y));
//     }
//     try {
//         triangulos.push(new Triangulo(vertices[0], vertices[1], vertices[2]));
//     } catch (error) {
//         console.log(error.message);
//         i--;
//     }
// }

// console.log("\n--- Testando métodos da classe Triangulo ---\n");

// triangulos.forEach((triangulo, index) => {
//     console.log(`\nTriângulo ${index + 1}:`);

//     // Testando getArea()
//     console.log("Área:");
//     console.log(triangulo.getArea());

//     // Testando getPerimetro()
//     console.log("Perímetro:");
//     console.log(triangulo.getPerimetro());

//     // Testando getTipo()
//     console.log("Tipo:");
//     console.log(triangulo.getTipo());

//     // Testando clone()
//     const clone = triangulo.clone();
//     console.log("Clone é igual ao original?");
//     console.log(triangulo.equals(clone));
// });

// -------------------------------------------------------------------------

// // testes com a classe Vertice

// const vertices = [];

// for (let i = 1; i <= 3; i++) {
//     const x = parseFloat(prompt(`Digite o valor de x para o vértice ${i}: `));
//     const y = parseFloat(prompt(`Digite o valor de y para o vértice ${i}: `));
//     vertices.push(new Vertice(x, y));
// }
// console.log("\n--- Testando métodos da classe Vertice ---\n");

// // Exibindo os vértices com toString()
// console.log("Teste toString() para cada vértice:");
// vertices.forEach((vertice, index) => {
//     console.log(`Vértice ${index + 1}:`);
//     vertice.toString();
// });

// // Testando move() no vértice 2
// console.log("Movendo o vértice 2 para (15, 25):");
// vertices[1].move(15, 25);
// vertices[1].toString(); // Deve exibir (15, 25)

// console.log("\n--- Testando método equals ---\n");

// // Comparando vértice 1 e vértice 2
// console.log("Comparando vértice 1 e vértice 2 com equals():");
// console.log(Vertice.equals(vertices[0], vertices[1])); // Deve exibir false

// // Comparando vértice 1 consigo mesmo
// console.log("Comparando vértice 1 consigo mesmo com equals():");
// console.log(Vertice.equals(vertices[0], vertices[0])); // Deve exibir true

// console.log("\n--- Testando método getDistancia ---\n");

// // Calculando a distância entre vértice 1 e vértice 2
// console.log("Distância entre vértice 1 e vértice 2:");
// console.log(Vertice.getDistancia(vertices[0], vertices[1])); // Exibe a distância entre os dois vértices

// // Calculando a distância entre vértice 1 e vértice 3
// console.log("Distância entre vértice 1 e vértice 3:");
// console.log(Vertice.getDistancia(vertices[0], vertices[2])); // Exibe a distância entre os dois vértices





