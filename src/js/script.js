const ctx = document.getElementById('graph');

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    const funcao = document.querySelector('input').value;
    const funcaoWithSplit = funcao.split(',').map(Number);

    if (funcaoWithSplit.length == '2') firstDegreeFunction(funcaoWithSplit);
    if (funcaoWithSplit.length == '3') secondDegreeFunction(funcaoWithSplit);

    function firstDegreeFunction(funcao) {
        [a, b] = funcao;

        firstValue = b + a * 0;
        secondValue = b + a * 1;

        const pontosEspecificos = [
            { x: 0, y: firstValue },
            { x: 1, y: secondValue }
        ];

        new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'Specific Points',
                        data: pontosEspecificos,
                        borderColor: 'rgba(255, 255, 255, 0.85)',
                        pointRadius: 6,
                        pointBackgroundColor: '#4361EE',
                        showLine: true
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        grid: {
                            zeroLineColor: 'rgba(0,0,0,1)',
                            zeroLineWidth: 2,
                            color: function (context) {
                                return context.tick.value === 0 ? '#fff' : '#404040';
                            }
                        },
                        beginAtZero: true
                    },
                    y: {
                        grid: {
                            zeroLineColor: 'rgba(0,0,0,1)',
                            zeroLineWidth: 2,
                            color: function (context) {
                                return context.tick.value === 0 ? '#fff' : '#404040';
                            }
                        },
                        beginAtZero: false,
                        suggestedMin: Math.min(...pontosEspecificos.map(p => p.y)) - 5,
                        suggestedMax: Math.max(...pontosEspecificos.map(p => p.y)) + 5
                    }
                }
            }
        });

        const dados = document.querySelector('#dados');
        dados.innerHTML = ''; // Limpa dados antigos

        function createElement(el, msg) {
            const element = document.createElement(el);
            element.innerHTML = msg;
            return element;
        }

        dados.appendChild(createElement('p', `x(o): <span>${firstValue.toFixed(2)}</span>`));
        dados.appendChild(createElement('p', `x(1): <span>${secondValue.toFixed(2)}</span>`));
    }

    function secondDegreeFunction(funcao) {
        [a, b, c] = funcao;

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
                let y = a * x * x + b * x + c; //equacao quadratica
                pontos.push({ x: x, y: y });
            }
            return pontos;
        }

        const pontos = gerarPontos(a, b, c, -10, 10, 2);

        // Pontos específicos: raízes e vértice
        const pontosEspecificos = [
            { x: coeficiente1, y: 0 },
            { x: coeficiente2, y: 0 },
            { x: tempo, y: xftempo }
        ];

        new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: `f(x) = ${a}x² + ${b}x + ${c}`,
                        data: pontos,
                        borderColor: 'rgba(255, 255, 255, 0.85)',
                        showLine: true,
                        tension: 0.4
                    },
                    {
                        label: 'Specific Points',
                        data: pontosEspecificos,
                        pointRadius: 6,
                        pointBackgroundColor: '#4361EE',
                        showLine: false
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        grid: {
                            zeroLineColor: 'rgba(0,0,0,1)',
                            zeroLineWidth: 2,
                            color: function (context) {
                                return context.tick.value === 0 ? '#fff' : '#404040';
                            }
                        },
                        beginAtZero: true
                    },
                    y: {
                        grid: {
                            zeroLineColor: 'rgba(0,0,0,1)',
                            zeroLineWidth: 2,
                            color: function (context) {
                                return context.tick.value === 0 ? '#fff' : '#404040';
                            }
                        },
                        beginAtZero: false,
                        suggestedMin: Math.min(...pontos.map(p => p.y)) - 5,
                        suggestedMax: Math.max(...pontos.map(p => p.y)) + 5
                    }
                }
            }
        });

        const dados = document.querySelector('#dados');
        dados.innerHTML = ''; // Limpa dados antigos

        function createElement(el, msg) {
            const element = document.createElement(el);
            element.innerHTML = msg;
            return element;
        }

        dados.appendChild(createElement('p', `x': <span>${coeficiente1.toFixed(2)}</span>`));
        dados.appendChild(createElement('p', `x'': <span>${coeficiente2.toFixed(2)}</span>`));
        dados.appendChild(createElement('p', `Time: <span>${tempo.toFixed(2)}</span>`));
        dados.appendChild(createElement('p', `Minimum point: <span>${xftempo.toFixed(2)}</span>`));
    }
});