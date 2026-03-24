/**
 * Função principal que inicia a jornada pelas 12 Casas.
 * É chamada quando o usuário clica no botão "Elevar Cosmo!".
 */
function iniciarJornada() {
    // Referência para o contêiner onde as mensagens vão aparecer
    const log = document.getElementById('game-log');
    
    // Limpa o log para uma nova tentativa, mantendo apenas a mensagem inicial
    log.innerHTML = `<p class="msg-info">A primeira chama se acendeu no Relógio de Fogo. A jornada começa!</p>`;

    // --- 1. ENTRADA DE DADOS ---
    
    // Entrada: prompt para nome
    let nome = prompt("Qual o seu nome, bravo Cavaleiro de Bronze?");
    
    // Entrada: prompt para Cosmo Inicial
    // REGRA DO EXERCÍCIO: converter para número com operador unário +.
    let cosmoInicialPrompt = prompt("Com qual Cosmo Inicial você entra no Santuário? (Ex: 800)");
    let cosmoAtual = +cosmoInicialPrompt; // Aplicação do operador unário +

    // Define o status de vida inicial
    let statusVida = "Vivo";

    // Validação básica: se o usuário cancelou ou não digitou um número válido
    if (!nome || isNaN(cosmoAtual) || cosmoAtual <= 0) {
        log.innerHTML += `<p class="msg-defeat">Dados inválidos. Athena chora por sua ausência, o Santuário permanece sem proteção...</p>`;
        // Rola automaticamente para o final
        log.scrollTop = log.scrollHeight;
        return; // Interrompe a execução aqui
    }

    // Exibe a mensagem de entrada no log
    log.innerHTML += `<p>O Cavaleiro <strong class="msg-victory">${nome}</strong> entra na Casa de Áries com <strong class="msg-cosmo-elevated">${cosmoAtual}</strong> de cosmo.</p>`;


    // --- 2. DECISÃO DE SACRIFÍCIO ---
    
    // REGRA DO EXERCÍCIO: confirm() para sacrificar sentido.
    let sacrificar = confirm("Você chegou ao limite! Deseja sacrificar um de seus 5 sentidos para despertar o 7º sentido e dobrar seu cosmo?");
    
    if (sacrificar) {
        // REGRA DO EXERCÍCIO: Se sim, cosmo *= 2.
        cosmoAtual *= 2; // Operador de atribuição multiplicativa
        log.innerHTML += `<p class="msg-info">💥 Você abdicou de um sentido e despertou o lendário 7º sentido! Cosmo elevado para: <strong class="msg-cosmo-elevated">${cosmoAtual}</strong></p>`;
    } else {
        log.innerHTML += `<p class="msg-info">Você decidiu poupar seus sentidos. O caminho pelas próximas casas será árduo e implacável.</p>`;
    }


    // --- 3. A BATALHA (SIMULAÇÃO) ---
    
    // REGRA DO EXERCÍCIO: Subtrair dano nas casas usando -=.
    // Vamos definir um dano fixo por casa para a simulação
    const danoPorCasa = 80;
    
    // Loop para simular a passagem pelas 12 Casas
    for (let i = 1; i <= 12; i++) {
        // Aplica o dano da casa atual
        cosmoAtual -= danoPorCasa;
        
        // Exibe a mensagem de passagem pela casa
        log.innerHTML += `<p>Atravessando a <span class="msg-house">Casa ${i}</span>... Dano sofrido: <span class="msg-damage">-${danoPorCasa}</span>. Cosmo restante: <strong class="msg-cosmo-elevated">${cosmoAtual}</strong></p>`;

        // Verifica se o Cavaleiro morreu no meio do caminho
        if (cosmoAtual <= 0) {
            statusVida = "Morto";
            log.innerHTML += `<p class="msg-damage">🩸 Você caiu na Casa ${i}. A armadura o abandonou e seu cosmo se apagou para sempre.</p>`;
            break; // Sai do loop (para a batalha) se o cavaleiro morrer
        }
    }


    // --- 4. VALIDAÇÃO E SAÍDA FINAL ---
    
    // REGRA DO EXERCÍCIO: Avaliar se cosmoAtual >= 1000 && statusVida === Vivo.
    if (cosmoAtual >= 1000 && statusVida === "Vivo") {
        // REGRA DO EXERCÍCIO: Exibir relatório de vitória.
        log.innerHTML += `<div class="msg-victory">✨ Parabéns, ${nome}! Você atravessou as 12 Casas, derrotou o Grande Mestre e salvou Athena com ${cosmoAtual} de cosmo restante! ✨</div>`;
    } else if (statusVida === "Vivo") {
        // Caso sobreviveu, mas não com cosmo suficiente (Regra implícita)
        log.innerHTML += `<div class="msg-defeat">💀 Você sobreviveu, ${nome}, mas chegou ao Templo com apenas ${cosmoAtual} de cosmo (precisava de 1000+). Athena sucumbiu à flecha dourada... Tente novamente com um cosmo inicial maior!</div>`;
    } else {
         // Caso morreu
         log.innerHTML += `<div class="msg-defeat">💀 Fim de jogo. O Relógio de Fogo se apagou para você.</div>`;
    }

    // Truque extra: Faz a barra de rolagem descer automaticamente para a última mensagem
    // Isso garante que o usuário sempre veja o final do log.
    log.scrollTop = log.scrollHeight;
}