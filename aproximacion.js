document.addEventListener("DOMContentLoaded",start)

function start(){
    const cantValores = prompt("¿Cuántos valores se desea ingresar?");

    graficarTabla(cantValores);
}

function graficarTabla(cantValores){
    const tabla = document.querySelector("#tabla");

    console.log(tabla)
    let header = document.createElement("tr")
    let headerX = document.createElement("td")
    let headerY = document.createElement("td")
    headerX.textContent = "X"
    headerY.textContent = "Y"
    header.appendChild(headerX);
    header.appendChild(headerY);
    tabla.appendChild(header);
    for(let i=0;i<cantValores;i++){
        let fila = document.createElement("tr");
        let x = document.createElement("td")
        let y = document.createElement("td")
        let spaceX = document.createElement("input")
        spaceX.id = "X";
        let spaceY = document.createElement("input")
        spaceY.id = "Y"
        x.appendChild(spaceX)
        y.appendChild(spaceY)
        fila.appendChild(x);
        fila.appendChild(y);
        tabla.appendChild(fila)
    }

    const contenedor = document.querySelector(".container");

    const btnRecta = document.createElement("button");
    btnRecta.id="btnRecta"
    btnRecta.classList.add("btn","btn-primary", "btn-lg")
    btnRecta.addEventListener("click",recta)
    btnRecta.textContent = "Recta de mínimos cuadrados"
    contenedor.appendChild(btnRecta)

    const btnParabola = document.createElement("button")
    btnParabola.id ="btnParabola"
    btnParabola.classList.add("btn","btn-secondary","btn-lg")
    btnParabola.addEventListener("click",parabola)
    btnParabola.textContent = "Parabola de mínimos cuadrados"
    contenedor.appendChild(btnParabola)
}

function enviarDatos(event){
  

}

function recta(event){
    event.preventDefault();
    const nodesX = document.querySelectorAll("#X")
    const nodesY = document.querySelectorAll("#Y")
    let arrayX = []
    let arrayY = []

    for(let i=0;i<nodesX.length;i++){
        arrayX.push(Number(nodesX[i].value))
        arrayY.push(Number(nodesY[i].value))
    }

   const {X2,XY,sumX,sumY,sumX2,sumXY,N} = calcularDatos(arrayX,arrayY)

   console.log(X2)
   console.log(XY)
   console.log(sumX)
   console.log(sumY)
   console.log(sumXY)
   console.log(N)

   const A = math.matrix([[sumX2,sumX],[sumX,N]]);
    const B = math.matrix([sumXY,sumY])

    const AInv = math.inv(A);
    const matrizX = math.multiply(AInv,B);

    const matrizXToArray = matrizX.toArray();

    const a = matrizXToArray[0];
    const b = matrizXToArray[1];

    const resultado = document.querySelector("#resultado")
    const parrafo = document.createElement("p")
    parrafo.textContent = `La ecuación de la recta es: ${a}X + ${b}`

    resultado.appendChild(parrafo)

    //nueva tabla
    ocultarUI();
    const tabla = document.querySelector("#tabla")
    
    tabla.innerHTML = "";

    const header = document.createElement("tr")


}

function parabola(event){
    event.preventDefault();
    const nodesX = document.querySelectorAll("#X")
    const nodesY = document.querySelectorAll("#Y")
    let arrayX = []
    let arrayY = []

    for(let i=0;i<nodesX.length;i++){
        arrayX.push(Number(nodesX[i].value))
        arrayY.push(Number(nodesY[i].value))
    }

   const {X4,X3,X2,XY,sumX,sumY,sumX2,sumXY,sumX4,sumX3,sumX2Y,N} = calcularDatos(arrayX,arrayY)

   const A = math.matrix([[sumX4,sumX3,sumX2],[sumX3,sumX2,sumX],[sumX2,sumX,N]]);
   const B = math.matrix([sumX2Y,sumXY,sumY]);

   const AInv = math.inv(A);
   const matrizX = math.multiply(AInv,B);


   console.log(A)
   console.log(B)
   console.log(AInv)
   const matrizXToArray = matrizX.toArray();

   const a = matrizXToArray[0];
   const b = matrizXToArray[1];
   const c = matrizXToArray[2];

   const resultado = document.querySelector("#resultado");
   const parrafo = document.createElement("p");
   parrafo.textContent = `La ecuacion de la parabola es: ${a}X^2 + ${b}X + ${c}`
   resultado.appendChild(parrafo);

   ocultarUI();
   const tabla = document.querySelector("#tabla")

    tabla.innerHTML = ""
}

function calcularDatos(X,Y){
    const sumX = X.reduce((a,b) => a + b,0)
    const sumY = Y.reduce((a,b) => a + b,0)
    let XY = [];

    for(let i=0;i<X.length;i++){
        XY.push(X[i]*Y[i])
    }
    const sumXY = XY.reduce((a,b)=> a + b,0)

    const X2 = X.map(num => Math.pow(num,2))
    const sumX2 = X2.reduce((a,b) => a + b,0)

    let X2Y = [];
    for(let i=0;i<X2.length;i++){
        X2Y.push(X2[i]*Y[i])
    }

    const sumX2Y = X2Y.reduce((a,b) => a + b,0);

    const X3 = X.map(num => Math.pow(num,3));
    const X4 = X.map(num => Math.pow(num,4));

    const sumX3 = X3.reduce((a,b)=> a + b,0)
    const sumX4 = X4.reduce((a,b)=> a + b,0)
    const N = X.length;

    const datos = {
        X,
        Y,
        X4,
        X3,
        X2,
        XY,
        X2Y,
        sumX,
        sumY,
        sumXY,
        sumX2,
        sumX2Y,
        sumX3,
        sumX4,
        N
    }

    return datos;
}



function ocultarUI(){
    const btnRecta = document.querySelector("#btnRecta")
    btnRecta.classList.add("d-none")
}