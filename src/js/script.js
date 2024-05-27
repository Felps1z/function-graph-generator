const ctx = document.getElementById('graphic');

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    const funcao = document.querySelector('input').value;
    const [a, b, c] = funcao.split(',').map(Number);

    const discriminant = (b * b) - 4 * a * c;

    if (discriminant < 0) {
        console.log('Para Delta negativo, não existem raízes reais.');
        return;
    }

    const coeficiente1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const coeficiente2 = (-b - Math.sqrt(discriminant)) / (2 * a);

    const tempo = -b / (2 * a);
    const xftempo = a * (tempo * tempo) + b * tempo + c;

    // Gera pontos da função quadrática
    function gerarPontos(a, b, c, xMin, xMax, passo) {
        let pontos = [];
        for (let x = xMin; x <= xMax; x += passo) {
            let y = a * x * x + b * x + c; //equação quadrática p/ descobrir o valor de y
            pontos.push({ x: x, y: y });
        }
        return pontos;
    }

    const pontos = gerarPontos(a, b, c, -10, 10, 1);

    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: `y = ${a}x² + ${b}x + ${c}`,
                data: pontos,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                showLine: true,
                tension: 0.4
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                },
                y: {
                    beginAtZero: false,
                    suggestedMin: Math.min(...pontos.map(p => p.y)) - 5,
                    suggestedMax: Math.max(...pontos.map(p => p.y)) + 5
                }
            }
        }
    });

    const dados = document.querySelector('#dados');
    dados.innerHTML = ''; // Limpa dados antigos

    function createElementP(msg) {
        const p = document.createElement('p');
        p.innerHTML = msg;
        return p;
    }

    dados.appendChild(createElementP(`Coeficiente 1: ${coeficiente1.toFixed(2)}`));
    dados.appendChild(createElementP(`Coeficiente 2: ${coeficiente2.toFixed(2)}`));
    dados.appendChild(createElementP(`Tempo do ponto mínimo: ${tempo.toFixed(2)}`));
    dados.appendChild(createElementP(`X em relação ao tempo do ponto mínimo: ${xftempo.toFixed(2)}`));
});