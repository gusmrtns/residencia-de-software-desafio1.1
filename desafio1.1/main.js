// Programa questao1.js: crie a classe Vertice e implemente nessa classe:
// ● Atributos numéricos x e y privados com leitura pública.
// ● Construtor para inicializar os valores de x e y.
// ● Método getter distancia para calcular a distância euclidiana de um vértice a outro.
// ● Método move para mover o vértice para outra posição (x, y).
// ● Método equals para verificar se dois vértices são iguais.
// (sqrt { (x_2 – x_1)^2 + (y_2 – y_1)^2}).

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

var prompt = require('prompt-sync')();
//
// get input from the user.
//

const vertices = [];

for (let i = 1; i <= 3; i++) {
    const x = parseFloat(prompt(`Digite o valor de x para o vértice ${i}: `));
    const y = parseFloat(prompt(`Digite o valor de y para o vértice ${i}: `));
    vertices.push(new Vertice(x, y));
}
console.log("\n--- Testando métodos da classe Vertice ---\n");

// Exibindo os vértices com toString()
console.log("Teste toString() para cada vértice:");
vertices.forEach((vertice, index) => {
    console.log(`Vértice ${index + 1}:`);
    vertice.toString();
});

// Testando move() no vértice 2
console.log("Movendo o vértice 2 para (15, 25):");
vertices[1].move(15, 25);
vertices[1].toString(); // Deve exibir (15, 25)

console.log("\n--- Testando método equals ---\n");

// Comparando vértice 1 e vértice 2
console.log("Comparando vértice 1 e vértice 2 com equals():");
console.log(Vertice.equals(vertices[0], vertices[1])); // Deve exibir false

// Comparando vértice 1 consigo mesmo
console.log("Comparando vértice 1 consigo mesmo com equals():");
console.log(Vertice.equals(vertices[0], vertices[0])); // Deve exibir true

console.log("\n--- Testando método getDistancia ---\n");

// Calculando a distância entre vértice 1 e vértice 2
console.log("Distância entre vértice 1 e vértice 2:");
console.log(Vertice.getDistancia(vertices[0], vertices[1])); // Exibe a distância entre os dois vértices

// Calculando a distância entre vértice 1 e vértice 3
console.log("Distância entre vértice 1 e vértice 3:");
console.log(Vertice.getDistancia(vertices[0], vertices[2])); // Exibe a distância entre os dois vértices





