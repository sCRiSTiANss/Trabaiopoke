
document.addEventListener('keydown', () => {
    // debugging
});

document.addEventListener('click', (event) => {
    if (flagMenu === false && event.target.classList.value === 'iconPlay') {
        lives = 3;
        menu.style.display = 'none';
        score.style.display = 'block';
        gameBoard.classList.remove('gameLowBrightness');
        bird.style.bottom = 50 + '%';
        pipeNormal.removeAttribute("style");
        pipeInvert.removeAttribute("style");
        points = 0;
        score.textContent = points + '';
        flagMenu = true;
    } else if (flagMenu === true) {
        // impede de contar os pontos antes da hora certa
        if (points === 0) {
            setTimeout(() => {
                flagPoints = true;
            }, 500)
        }
        jump();
    }
});



const jump = () => {
    updateValue();
    if (flagJump === true) {
        varCSS.style.setProperty('--positionMoment', parseInt(valueBottom) + 'px');
        varCSS.style.setProperty('--positionJumpFinal', parseInt(valueBottom) + 100 + 'px');
        bird.classList.add('jumpBird');
        bird.classList.remove('fallBird');
        flagJump = false;
    }
    // espera a animacao de subida para depois ativar a animacao de descida
    if (flagJump === false && flagFall === true) {
        flagFall = false;
            setTimeout(() => {
                updateValue();
                bird.classList.remove('jumpBird');
                bird.classList.add('fallBird');
                flagJump = true;
                flagFall = true;
            }, 500);
    }
} 

const checkCrash = setInterval(() => {
    const pipesPosition = parseInt(pipeNormal.offsetLeft);
    const birdPosition = parseInt(window.getComputedStyle(bird).bottom);

    if (!invincible && ((birdPosition <= 225 || birdPosition >= 385) && (pipesPosition <= 190 && pipesPosition >= 70)) || birdPosition <= 97 && flagMenu === true) {
        lives--;
        if (lives > 0) {
            invincible = true;
            bird.classList.add('invincible');
            setTimeout(() => {
                invincible = false;
                bird.classList.remove('invincible');
            }, 2000);  // 2 segundos de invencibilidade
        } else {
            pipeNormal.style.left = pipesPosition + 'px';
            pipeInvert.style.left = pipesPosition + 'px';
            bird.classList.remove('fallBird');
            bird.style.bottom = birdPosition + 'px';
            menu.style.display = 'flex';
            gameBoard.classList.add('gameLowBrightness');

            if (points > highScore) {
                highScore = points;
                scoreMenu.textContent = highScore + '';
            }

            flagMenu = false;
            flagPoints = false;
        }
    }

    if (pipesPosition <= 135 && pipesPosition >= 0 && flagPoints === true) {
        points++;
        score.textContent = points + '';
        flagPoints = false;
    
        //proximo cano altura e largura muda
        setTimeout(() => {
            flagPoints = true;
    
            // configura a altura e largura
            const newHeight = Math.random() * (300 - 150) + 150;
            const pipeWidth = 80; 
    
            // largura dos proximos canos
            pipeNormal.style.width = `${pipeWidth}px`;
            pipeInvert.style.width = `${pipeWidth}px`;
    
            //altura e o espaço entre os proximos canos
            pipeNormal.style.height = `${newHeight}px`;
    
            const pipeGap = 140;
            const pipeInvertHeight = window.innerHeight - newHeight - pipeGap;
            pipeInvert.style.height = `${pipeInvertHeight}px`;
            pipeInvert.style.bottom = `${newHeight + pipeGap}px`;
    
        }, 1000); 
    }
    

const coinPosition = parseInt(coin.offsetLeft);
    const coinWidth = coin.offsetWidth;
    const birdWidth = bird.offsetWidth;

    //  verificar se a moeda está na área de coleta e se o passaro ta sem cima da moeda
    if (coinPosition <= birdWidth && coinPosition >= (birdWidth - coinWidth) && birdPosition >= 100 && birdPosition <= 300) {
        points++; // adiciona 1 ponto ao pegar a moeda
        score.textContent = points + '';
        coin.style.display = 'none'; // esconde a moeda ao ser coletada

        // reaparece a moeda após um tempo
        setTimeout(() => {
            coin.style.display = 'block'; 
            coin.style.right = '100%'; // reinicia a posição da moeda
        }, 5000); // a moeda reaparece após 5 segundos
    } 
}, 10);


function updateValue() {
    valueBottom = getComputedStyle(bird).getPropertyValue('bottom');    //pega valor atual de bottom do bird
    valuePositionMoment = getComputedStyle(varCSS).getPropertyValue('--positionMoment');
    valuePositionJumpFinal = getComputedStyle(varCSS).getPropertyValue('--positionJumpFinal');
}
