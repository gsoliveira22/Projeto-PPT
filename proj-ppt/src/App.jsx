import React, { useState } from 'react';
import RockHandTransparent from './assets/moves/rock-hand-transparent.png';
import PaperHandTransparent from './assets/moves/paper-hand-transparent.png';
import ScissorHandTransparent from './assets/moves/scissor-hand-transparent.png';
import './App.css';

function App() {
  const [currentPlay, setCurrentPlay] = useState({
    player: '',
    computer: ''
  });
  const [winnersCounter, setWinnersCounter] = useState({
    player: 0,
    computer: 0,
    ties: 0
  });
  const [winner, setWinner] = useState('');
  const [possibleMoves, setPossibleMoves] = useState([
    {
      type: 'paper',
      label: 'Papel',
      wins: 'rock',
      loses: 'scissor'
    },
    {
      type: 'rock',
      label: 'Pedra',
      wins: 'scissor',
      loses: 'paper'
    },
    {
      type: 'scissor',
      label: 'Tesoura',
      wins: 'paper',
      loses: 'rock'
    }
  ]);

  const [gameOver, setGameOver] = useState(false);

  const makeMove = (playerMove) => {
    if (gameOver) return;

    const minimumMachineMoveNumber = 1;
    const maximumMachineMoveNumber = 3;

    const randomMachineMove =
      Math.floor(
        Math.random() *
        (maximumMachineMoveNumber - minimumMachineMoveNumber + 1)
      ) + minimumMachineMoveNumber;

    let machineMoveType = '';

    switch (randomMachineMove) {
      case 1:
        machineMoveType = 'Pedra';
        break;
      case 2:
        machineMoveType = 'Papel';
        break;
      case 3:
        machineMoveType = 'Tesoura';
        break;
      default:
        break;
    }

    switch (playerMove) {
      case 'rock':
        setCurrentPlay((currentValue) => ({ ...currentValue, player: 'Pedra' }));
        break;
      case 'paper':
        setCurrentPlay((currentValue) => ({ ...currentValue, player: 'Papel' }));
        break;
      case 'scissor':
        setCurrentPlay((currentValue) => ({ ...currentValue, player: 'Tesoura' }));
        break;
      default:
        break;
    }

    setCurrentPlay((currentValue) => ({ ...currentValue, computer: machineMoveType }));

    if (machineMoveType === playerMove) {
      setWinner('Empate');
      setWinnersCounter((currentCounter) => ({
        ...currentCounter,
        ties: currentCounter.ties + 1,
      }));
    } else {
      const playerMoveValidation = possibleMoves.find(
        (currentMove) => currentMove.type === playerMove
      );

      const isPlayerTheWinner = playerMoveValidation.wins === machineMoveType.toLowerCase();

      if (isPlayerTheWinner) {
        setWinner('Jogador');
        setWinnersCounter((currentCounter) => ({
          ...currentCounter,
          player: currentCounter.player + 1,
        }));
      } else if (playerMoveValidation.loses === machineMoveType.toLowerCase()) {
        setWinner('Computador');
        setWinnersCounter((currentCounter) => ({
          ...currentCounter,
          computer: currentCounter.computer + 1,
        }));
      }else if (playerMoveValidation.ties === machineMoveType.toLowerCase()) {
        setWinner('Empate');
        setWinnersCounter((currentCounter) => ({
          ...currentCounter,
          ties: currentCounter.ties + 1,
        }));
      }
    }
  };

  const handleEndGameClick = () => {
    setGameOver(true);
  };

  const handleRestartGameClick = () => {
    setGameOver(false);
    setCurrentPlay({
      player: '',
      computer: ''
    });
    setWinner('');
    setWinnersCounter({
      player: 0,
      computer: 0,
      ties: 0
    });
  };

  return (
    <div className="App">
      {gameOver ? (
        <div>
          <h1>Jogo Encerrado</h1>
          <button onClick={handleRestartGameClick}>Jogar Novamente</button>
        </div>
      ) : (
        <div>
          <h1>Jokenpô</h1><br></br>
          <p>Jogador: {currentPlay.player}</p>
          <p>Computador: {currentPlay.computer}</p><br></br>
          <p>Placar</p><br></br>
          <p>Jogador: {winnersCounter.player}</p>
          <p>Computador: {winnersCounter.computer}</p>
          <p>Empates: {winnersCounter.ties}</p>
          <button onClick={() => makeMove('rock')}>
            <img src={RockHandTransparent} alt="Pedra" />
          </button>
          <button onClick={() => makeMove('paper')}>
            <img src={PaperHandTransparent} alt="Papel" />
          </button>
          <button onClick={() => makeMove('scissor')}>
            <img src={ScissorHandTransparent} alt="Tesoura" />
          </button>
          <button onClick={handleEndGameClick}>Encerrar Jogo</button>
        </div>
      )}
    </div>
  );
}

export default App;
