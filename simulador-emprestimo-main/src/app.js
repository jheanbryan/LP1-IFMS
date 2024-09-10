const search = window.location.search;
const params = new URLSearchParams(search);

const money = params.get('value-money');
const interestRate = params.get('interest-rate');
const installmentsNumber = params.get('installments-number');

const realValue = money * (1 + (interestRate/100) * installmentsNumber);
const installmentsValue = realValue / installmentsNumber;


const results = `
        <div class="result">
            <h1>Resultados</h1>
            <div>
                <span>Valor de cada parcela:</span>
                <span>R$ ${installmentsValue.toFixed(2)}</span>
            </div>

            <div>
                <span>Total de parcelas:</span>
                <span>${installmentsNumber}</span>
            </div>

            <div>
                <span>Valor real do empréstimo:</span>
                <span>R$ ${realValue.toFixed(2)}</span>
            </div>
        </div>
`;

const main = document.querySelector('main');
main.innerHTML+= results;
