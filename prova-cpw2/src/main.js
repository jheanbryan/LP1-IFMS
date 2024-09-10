const btnCalculate = document.querySelector('.btn-calculate');
const inputsList = document.querySelectorAll('.client-type input[type=radio]');
let clientType = null;
let error = false;

function calculateInterest(clientType) {
     const valueElementInput = document.querySelector('#values').value; //valor
     const portionElementInput = document.querySelector('.portion').value;  //taxa juros
     const result = document.querySelector('.result');
     if (clientType == 'standard') {
          interestRate = 2.5;
     }
     if (clientType == 'platinum') {
          interestRate = 1.99;
     }
     if (clientType == 'gold') {
          interestRate = 1.2;
     }

     const amount = valueElementInput * (1 + ((interestRate/100) * portionElementInput));
     const portion = amount / portionElementInput;

     result.innerText = '';

     if (error == false){
          result.innerText = 
          `Valor total a ser pago: R$${amount.toFixed(2)} \n
          Valor de cada parcela R$${portion.toFixed(2)}`;
     }

}


function getClientType(){
     inputsList.forEach((itemList) => {
          if (itemList.checked) {
               clientType = itemList.id;
          }
     })

}

function verifyError(){
     if (document.querySelector('#values').value < 500) {
          window.alert('O valor de emprestimo deve ser no mínimo R$500!')
          error = true;
     }
     if (document.querySelector('.portion').value < 1 || document.querySelector('.portion').value > 24) {
          window.alert('A quantidade de parcelas deve estar entre 1 e 24!')
          error = true;
     }
}
btnCalculate.addEventListener('click', () => {
     verifyError()
     getClientType()
     calculateInterest(clientType)
     error = false;
})