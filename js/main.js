const calculadora = {
    init: () => {
        calculadora.maquetacion();
        calculadora.comportamiento();
    },

    maquetacion: () => {
        const botones = ["CE", "<-", "%", "+", "7", "8", "9", "-", "4", "5", "6", "X", "1", "2", "3", "/", "0", "+-", ",", "="];
        const fragment = document.createDocumentFragment();
        const inputText = document.createElement("input");
        const div = document.createElement("div");
        const br = document.createElement("br");
        inputText.value = 0;
        div.appendChild(inputText);
        div.appendChild(br);
        botones.forEach((boton, index) => {
            const button = document.createElement("button");
            button.textContent = boton;
            button.style = "margin: 2px; width: 50px; height: 25px;";
            div.appendChild(button);
            if (index % 4 == 3) {
                const br = document.createElement("br");
                div.appendChild(br);
            }
            if(button.textContent == ","){
                button.value = "."
            }
        })
        fragment.appendChild(div);
        document.body.appendChild(fragment);
        inputText.disabled = true;
        inputText.style = "margin-bottom: 5px;width: 200px;text-align: end;";
        div.style = "width: 50%; text-align: center; border: 1px solid black; background-color: lightblue; padding-top: 10px; padding-bottom: 10px;";
    },

    comportamiento: () => {

        const comprobarNumeroComas = (input, e) => {
            const arrayValorInput = Array.from(input.value);
            const numeroDeComas = arrayValorInput.filter(valores => valores == ",").length;
            if (numeroDeComas == 1) {
                input.value += "";
            } else {
                input.value += e.target.textContent;
            }

        }
        const input = document.querySelector("input");
        const div = document.querySelector("div");
        div.addEventListener("click", (e) => {
            if (e.target == input || e.target == div) {
                e.preventDefault();
            }
            else if(e.target.textContent=="CE"){
                input.value = "0";
            }
            else if(e.target.textContent=="+-"){
                if(!input.value.includes("-")){
                    input.value = "-"+input.value;
                }
                else{
                    input.value = input.value.substring(1,input.value.length);
                }
            }
            else if(e.target.textContent=="<-"){
                input.value = input.value.substring(0,input.value.length-1);
                if(input.value==""){
                    input.value = "0";
                }
            }
            else {
                if (input.value == "0") {
                    if(e.target.textContent == ","){
                        comprobarNumeroComas(input, e);
                    }
                    else{
                        input.value = e.target.textContent;
                    }
                }
                else {
                    if(e.target.textContent == ","){
                        comprobarNumeroComas(input, e);
                    }
                    else{
                        input.value += e.target.textContent;
                    }
                }
            }
        }, true)
    }

}
document.addEventListener("DOMContentLoaded", () => calculadora.init())