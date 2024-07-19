var pre = 0;
var valor = 0;
var cantidad = document.getElementById("cantidad");
var lista = document.getElementById("lista");
var cantidades =JSON.parse(localStorage.getItem("cantidades")) || [];

document.getElementById("valor").oninput = () => {
    valor = parseInt(document.getElementById("valor").value);
    document.getElementById("vvalor").innerHTML = `$${valor}.00 MXN`;
}
const preguntar = async () =>{ //aqui mandamos a llmar a preguntar que lo pusimos en el body del html
    const { value: presupuesto } = await Swal.fire({
        title: "Presupuesto inicial",
        input: "number",
        inputLabel: "cantidad",
        inputValue: "0",
        showCancelButton:true,
        inputValidator: (value) => {
            if(!value){
                return "se requiere un valor";//mensaje de validacion+

            }
        }
      });
      if (presupuesto) {
      pre = parseInt(presupuesto);//actualiza la variable global `pre`
      cantidad.innerHTML = `$${pre}.00 MXN`;//actualiza la vizualizacion del presupuesto
      }
}
const verCantidades = () =>{
    cantidades = JSON.parse(localStorage.getItem("cantidades"))|| [];//aqui aegfura que cantidades sea un arreglo
    let total= 0;//inicia el contador para la sumna total
let cantHTML ="";
cantidades.forEach(cant =>{
    if (cant > 0){
        total += parseInt(cant);//aqui suma los valores al presupuesto
        cantHTML += `<li class="list-group-item list-group-item-danger">${cant}</li>`//aqui formatea valores negatrivos
    }else{
        total += parseInt(cant);//aqui suma los valores al presupuesto pero ahora los negativos
        cantHTML += `<li class="list-group-item list-group-item-primary">${cant}</li>`//aqui formatea valores positivos
    }
})
cantidad.innerHTML = `$${pre + total}.00 MXN`;
lista.innerHTML = cantHTML;
};
const añadir = () => {
    valor = parseInt(document.getElementById("valor").value);
    if (valor == 0){
        Swal.fire({title : "ERROR", text: "Ingrese un valor que no sea 0", icon: "question"});
        return;
    }
    cantidades = JSON.parse(localStorage.getItem("cantidades"))|| [];
    cantidades.push(valor);
    localStorage.setItem("cantidades", JSON.stringify(cantidades));//aqui guarda el arreglo actualizado en local 
    verCantidades();//aqui actualiza la vizualizacion
}
const eliminar = () => {
    valor = parseInt(document.getElementById("valor").value);//lee el valor del campo
    if (valor == 0){
        Swal.fire({title : "ERROR", text: "Ingrese un valor que no sea 0", icon: "question"});
        return;

    }
    cantidades = JSON.parse(localStorage.getItem("cantidades"))|| [];
    var x = (valor > 0) ? (valor * -1): valor;//convierte el valor a su signo opuesto
    cantidades.push(x);//añade el valor convertido al arreglo
    localStorage.setItem("cantidades", JSON.stringify(cantidades));//aqui guarda el arreglo actualizado en local 
    verCantidades();//aqui actualiza la vizualizacion
}
const reset = () =>{
    localStorage.clear();//limpia los datos de local
    valor = 0;//restablece el valor
    pre = 0;//restablece el presupuesto a 0
    document.getElementById("valor").value = valor;
    document.getElementById("vvalor").innerHTML= `$${valor}.00 MXN`;
    cantidad.innerHTML = `$${pre}.00 MXN`;//restablece el presupuesto 
    preguntar();//AQUI MUESTRA DE NUEVO LA ALERTA PREGUNTAR
    verCantidades();
}
