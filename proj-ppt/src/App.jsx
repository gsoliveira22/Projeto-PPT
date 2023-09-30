import { useState } from 'react';
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
  const [gameOver, setGameOver] = useState(false);

  const possibleMoves = [
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
  ];

  const makeMove = (playerMove) => {
    if (gameOver) return;

    const minimumMachineMoveNumber = 0;
    const maximumMachineMoveNumber = 2;

    const randomMachineMove = Math.floor(
      Math.random() * (maximumMachineMoveNumber - minimumMachineMoveNumber + 1)
    );

    const machineMove = possibleMoves[randomMachineMove];

    setCurrentPlay({
      player: playerMove,
      computer: machineMove.label
    });

    if (machineMove.type === playerMove) {
      setWinnersCounter((currentCounter) => ({
        ...currentCounter,
        ties: currentCounter.ties + 1,
      }));
    } else if (machineMove.wins === playerMove) {
      setWinnersCounter((currentCounter) => ({
        ...currentCounter,
        player: currentCounter.player + 1,
      }));
    } else {
      setWinnersCounter((currentCounter) => ({
        ...currentCounter,
        computer: currentCounter.computer + 1,
      }));
    }

    checkGameOver();
  };

  const checkGameOver = () => {
    if (winnersCounter.player === 3 || winnersCounter.computer === 3) {
      setGameOver(true);
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
