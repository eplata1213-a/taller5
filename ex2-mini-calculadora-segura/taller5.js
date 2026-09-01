let historial = [];

$("#accion").click(() => {

    const n1 = $("#n1").val();
    const n2 = $("#n2").val();
    const operacion = $("#operacion").val();

    console.log("Numero 1:", n1);
    console.log("Numero 2:", n2);
    console.log("Operacion:", operacion);

    if (n1 == "" || n2 == "") {

        $("#RESULTADO").text("Faltan numeros");

        return;
    }

    const numero1 = Number(n1);
    const numero2 = Number(n2);

    let resultado;


    if (operacion == "+") {

        resultado = numero1 + numero2;

    } else if (operacion == "-") {

        resultado = numero1 - numero2;

    } else if (operacion == "*") {

        resultado = numero1 * numero2;

    } else if (operacion == "/") {

        if (numero2 == 0) {

            $("#RESULTADO").text("No se puede dividir entre cero");

            return;
        }

        resultado = numero1 / numero2;
    }


    $("#RESULTADO").text(
        numero1 + " " + operacion + " " + numero2 + " = " + resultado
    );


    let operacionRealizada =
        numero1 + " " + operacion + " " + numero2 + " = " + resultado;

    historial.unshift(operacionRealizada);


    $("#historial").empty();

    historial.forEach((dato) => {

        $("#historial").append(
            "<li>" + dato + "</li>"
        );

    });


    console.log("Resultado:", resultado);
    console.log("Historial:", historial);

});
