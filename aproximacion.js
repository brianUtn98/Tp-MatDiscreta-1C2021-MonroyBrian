function redondeoSimetrico(num, decimales = 2) {
    var signo = (num >= 0 ? 1 : -1);
    num = num * signo;
    if (decimales === 0) //con 0 decimales
        return signo * Math.round(num);
    // round(x * 10 ^ decimales)
    num = num.toString().split('e');
    num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
    // x * 10 ^ (-decimales)
    num = num.toString().split('e');
    return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
}

document.addEventListener("DOMContentLoaded", start);
document.querySelector("#limpiar").addEventListener("click",limpiar)


function limpiar(event){
    event.preventDefault();

    location.reload()
}
function start() {
  const cantValores = prompt("¿Cuántos valores se desea ingresar?");

  graficarTabla(cantValores);
}

function graficarTabla(cantValores) {
  const tabla = document.querySelector("#tabla");

  console.log(tabla);
  let header = document.createElement("tr");
  let headerX = document.createElement("td");
  let headerY = document.createElement("td");
  headerX.textContent = "X";
  headerY.textContent = "Y";
  header.appendChild(headerX);
  header.appendChild(headerY);
  tabla.appendChild(header);
  for (let i = 0; i < cantValores; i++) {
    let fila = document.createElement("tr");
    let x = document.createElement("td");
    let y = document.createElement("td");
    let spaceX = document.createElement("input");
    spaceX.id = "X";
    let spaceY = document.createElement("input");
    spaceY.id = "Y";
    x.appendChild(spaceX);
    y.appendChild(spaceY);
    fila.appendChild(x);
    fila.appendChild(y);
    tabla.appendChild(fila);
  }

  const botones = document.querySelector("#botones");
  const card = document.createElement("div");
  card.classList.add("container");

  const btnRecta = document.createElement("button");
  btnRecta.id = "btnRecta";
  btnRecta.classList.add("btn", "btn-primary", "py-2", "mx-2");
  btnRecta.addEventListener("click", recta);
  btnRecta.textContent = "Recta de mínimos cuadrados";
  card.appendChild(btnRecta);

  const btnParabola = document.createElement("button");
  btnParabola.id = "btnParabola";
  btnParabola.classList.add("btn", "btn-secondary", "py-2", "mx-2");
  btnParabola.addEventListener("click", parabola);
  btnParabola.textContent = "Parabola de mínimos cuadrados";
  card.appendChild(btnParabola);

  const btnHomografica = document.createElement("button");
  btnHomografica.id = "btnHomografica";
  btnHomografica.classList.add("btn", "btn-info", "py-2", "mx-2");
  btnHomografica.textContent = "Homográfica (a+bx)/x";
  btnHomografica.addEventListener("click", homografica);
  card.appendChild(btnHomografica);

  const btnExponencial = document.createElement("button");
  btnExponencial.id = "btnParabola";
  btnExponencial.classList.add("btn", "btn-warning", "py-2", "mx-2");
  btnExponencial.addEventListener("click", exponencial);
  btnExponencial.textContent = "Exponencial de mínimos cuadrados";
  card.appendChild(btnExponencial);

  botones.appendChild(card);
}

function enviarDatos(event) {}

function recta(event) {
  event.preventDefault();
  const nodesX = document.querySelectorAll("#X");
  const nodesY = document.querySelectorAll("#Y");
  let arrayX = [];
  let arrayY = [];

  for (let i = 0; i < nodesX.length; i++) {
    arrayX.push(Number(nodesX[i].value));
    arrayY.push(Number(nodesY[i].value));
  }

  const { X2, XY, sumX, sumY, sumX2, sumXY, N } = calcularDatos(arrayX, arrayY);

  console.log(X2);
  console.log(XY);
  console.log(sumX);
  console.log(sumY);
  console.log(sumXY);
  console.log(N);

  const A = math.matrix([
    [sumX2, sumX],
    [sumX, N],
  ]);
  const B = math.matrix([sumXY, sumY]);

  const AInv = math.inv(A);
  const matrizX = math.multiply(AInv, B);

  const matrizXToArray = matrizX.toArray();

  const a = matrizXToArray[0];
  const b = matrizXToArray[1];

  const resultado = document.querySelector("#resultado");

  const cardResultado = document.createElement("div")
  cardResultado.classList.add("card")
  //cardResultado.style = "width: 40rem;"
  const cardBody = document.createElement("div")
  cardBody.classList.add("card-body")
  const cardTitle = document.createElement("h5")
  cardTitle.classList.add("card-title")
  cardTitle.textContent = "Aproximación por recta de mínimos cuadrados"

  const parrafo = document.createElement("p");
  parrafo.classList.add("card-text")
  parrafo.textContent = `La ecuación de la recta es: y = ${a}.x + ${b}`;

  cardBody.appendChild(cardTitle)
  cardBody.appendChild(parrafo)

  let pX =arrayX.map(num => Number(a)*num + Number(b))
  const d2 = calcularErrorCuadratico(arrayY,pX);
  const sumD2 = d2.reduce((a,b) => a + b, 0)
  console.log(sumD2)

  cardError = document.createElement("div")
  cardError.classList.add("card-subtitle")
  cardError.textContent = `El error cuadrático es ${sumD2}`

  cardBody.appendChild(cardError);

  cardResultado.appendChild(cardBody)

  resultado.appendChild(cardResultado)

}

function parabola(event) {
  event.preventDefault();
  const nodesX = document.querySelectorAll("#X");
  const nodesY = document.querySelectorAll("#Y");
  let arrayX = [];
  let arrayY = [];

  for (let i = 0; i < nodesX.length; i++) {
    arrayX.push(Number(nodesX[i].value));
    arrayY.push(Number(nodesY[i].value));
  }

  const { X4, X3, X2, XY, sumX, sumY, sumX2, sumXY, sumX4, sumX3, sumX2Y, N } =
    calcularDatos(arrayX, arrayY);

  const A = math.matrix([
    [sumX4, sumX3, sumX2],
    [sumX3, sumX2, sumX],
    [sumX2, sumX, N],
  ]);
  const B = math.matrix([sumX2Y, sumXY, sumY]);

  const AInv = math.inv(A);
  const matrizX = math.multiply(AInv, B);

  console.log(A);
  console.log(B);
  console.log(AInv);
  const matrizXToArray = matrizX.toArray();

  const a = matrizXToArray[0];
  const b = matrizXToArray[1];
  const c = matrizXToArray[2];

  const resultado = document.querySelector("#resultado");

  const cardResultado = document.createElement("div")
  cardResultado.classList.add("card")
  //cardResultado.style = "width: 40rem;"
  const cardBody = document.createElement("div")
  cardBody.classList.add("card-body")
  const cardTitle = document.createElement("h5")
  cardTitle.classList.add("card-title")
  cardTitle.textContent = "Aproximación por parabola de mínimos cuadrados"

  const parrafo = document.createElement("p");
  parrafo.classList.add("card-text")
  parrafo.textContent = `La ecuación de la parabola es: y = ${a}.x^2 + ${b}.x + ${c}`;

  cardBody.appendChild(cardTitle)
  cardBody.appendChild(parrafo)

  let pX =arrayX.map(num => Number(a)*Math.pow(num,2) + Number(b)*num + Number(c))
  const d2 = calcularErrorCuadratico(arrayY,pX);
  const sumD2 = d2.reduce((a,b) => a + b, 0)
  console.log(sumD2)

  cardError = document.createElement("div")
  cardError.classList.add("card-subtitle")
  cardError.textContent = `El error cuadrático es ${sumD2}`

  cardBody.appendChild(cardError);

  cardResultado.appendChild(cardBody)

  resultado.appendChild(cardResultado)
}

function homografica(event) {
  event.preventDefault();
  const nodesX = document.querySelectorAll("#X");
  const nodesY = document.querySelectorAll("#Y");
  let arrayX = [];
  let arrayY = [];

  for (let i = 0; i < nodesX.length; i++) {
    arrayX.push(Number(nodesX[i].value));
    arrayY.push(Number(nodesY[i].value));
  }

  let arrayXAjustado = arrayX.map((num) => 1 / num);

  const { X2, XY, sumX, sumY, sumX2, sumXY, N } = calcularDatos(
    arrayXAjustado,
    arrayY
  );

  const A = math.matrix([
    [sumX2, sumX],
    [sumX, N],
  ]);
  const B = math.matrix([sumXY, sumY]);

  const AInv = math.inv(A);
  const matrizX = math.multiply(AInv, B);

  const matrizXToArray = matrizX.toArray();

  const a = matrizXToArray[0];
  const b = matrizXToArray[1];

  const resultado = document.querySelector("#resultado");

    const cardResultado = document.createElement("div")
  cardResultado.classList.add("card")
  //cardResultado.style = "width: 40rem;"
  const cardBody = document.createElement("div")
  cardBody.classList.add("card-body")
  const cardTitle = document.createElement("h5")
  cardTitle.classList.add("card-title")
  cardTitle.textContent = "Aproximación por Modelo y = (a+bx)/x"

  const parrafo = document.createElement("p");
  parrafo.classList.add("card-text")
  parrafo.textContent = `La ecuación de la recta es: y = ${a}.x + ${b}`;

  const parrafo2 = document.createElement("p")
  parrafo2.classList.add("card-text")
  parrafo2.textContent = `Con variable original: y = ${a}/x + ${b}`

  cardBody.appendChild(cardTitle)
  cardBody.appendChild(parrafo)
  cardBody.appendChild(parrafo2)

  let pX =arrayX.map(num => a/num + b)
  const d2 = calcularErrorCuadratico(arrayY,pX);
  const sumD2 = d2.reduce((a,b) => a + b, 0)
  console.log(sumD2)

  cardError = document.createElement("div")
  cardError.classList.add("card-subtitle")
  cardError.textContent = `El error cuadrático es ${sumD2}`

  cardBody.appendChild(cardError);

  cardResultado.appendChild(cardBody)

  resultado.appendChild(cardResultado);
}

function exponencial(event) {
  event.preventDefault();
  const nodesX = document.querySelectorAll("#X");
  const nodesY = document.querySelectorAll("#Y");
  let arrayX = [];
  let arrayY = [];

  for (let i = 0; i < nodesX.length; i++) {
    arrayX.push(Number(nodesX[i].value));
    arrayY.push(Number(nodesY[i].value));
  }

  const arrayYAjustado = arrayY.map((num) => Math.log(num));

  const { X2, XY, sumX, sumY, sumX2, sumXY, N } = calcularDatos(
    arrayX,
    arrayYAjustado
  );

  const A = math.matrix([
    [sumX2, sumX],
    [sumX, N],
  ]);
  const B = math.matrix([sumXY, sumY]);

  const AInv = math.inv(A);
  const matrizX = math.multiply(AInv, B);

  const matrizXToArray = matrizX.toArray();

  const a = matrizXToArray[0];
  const b = matrizXToArray[1];

  const resultado = document.querySelector("#resultado");

  const cardResultado = document.createElement("div")
  cardResultado.classList.add("card")
  //cardResultado.style = "width: 40rem;"
  const cardBody = document.createElement("div")
  cardBody.classList.add("card-body")
  const cardTitle = document.createElement("h5")
  cardTitle.classList.add("card-title")
  cardTitle.textContent = "Aproximación por Exponencial"

  const parrafo = document.createElement("p");
  parrafo.classList.add("card-text")
  parrafo.textContent = `La ecuación de la recta es: y = ${a}.x + ${b}`;

  const parrafo2 = document.createElement("p")
  parrafo2.classList.add("card-text")
  const bOriginal = Math.exp(b);
  parrafo2.textContent = `Con variable original: y = ${bOriginal}.e^${a}`

  cardBody.appendChild(cardTitle)
  cardBody.appendChild(parrafo)
  cardBody.appendChild(parrafo2)

  let pX =arrayX.map(num => Number(bOriginal)*Math.exp(Number(a)*num))
  const d2 = calcularErrorCuadratico(arrayY,pX);
  const sumD2 = d2.reduce((a,b) => a + b, 0)

  cardError = document.createElement("div")
  cardError.classList.add("card-subtitle")
  cardError.textContent = `El error cuadrático es ${sumD2}`
  console.log(sumD2)

  cardBody.appendChild(cardError);

  cardResultado.appendChild(cardBody)

  resultado.appendChild(cardResultado);
  




  //tabla.innerHTML = "";
}

function calcularDatos(X, Y) {
  const sumX = X.reduce((a, b) => a + b, 0);
  const sumY = Y.reduce((a, b) => a + b, 0);
  let XY = [];

  for (let i = 0; i < X.length; i++) {
    XY.push(X[i] * Y[i]);
  }
  const sumXY = XY.reduce((a, b) => a + b, 0);

  const X2 = X.map((num) => Math.pow(num, 2));
  const sumX2 = X2.reduce((a, b) => a + b, 0);

  let X2Y = [];
  for (let i = 0; i < X2.length; i++) {
    X2Y.push(X2[i] * Y[i]);
  }

  const sumX2Y = X2Y.reduce((a, b) => a + b, 0);

  const X3 = X.map((num) => Math.pow(num, 3));
  const X4 = X.map((num) => Math.pow(num, 4));

  const sumX3 = X3.reduce((a, b) => a + b, 0);
  const sumX4 = X4.reduce((a, b) => a + b, 0);
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
    N,
  };

  return datos;
}

function ocultarUI() {
//   const botones = document.querySelector("#botones");
//   botones.classList.add("d-none");
//   const containerForm = document.querySelector("#containerForm");
//   containerForm.classList.add("d-none")
}

function calcularErrorCuadratico(fX,pX){
  let d2 = [];

  for(let i = 0;i<fX.length;i++){
    let di = fX[i] - pX[i];
    let d2i = di*di
    d2.push(d2i);
  }

  console.log(d2);
  return d2;
}