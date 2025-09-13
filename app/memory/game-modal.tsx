"use client";

interface GameModalProps {
  type: 'won' | 'lost';
  moves: number;
  timeLeft: number;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export function GameModal({ type, moves, timeLeft, onPlayAgain, onGoHome }: GameModalProps) {
  const isWon = type === 'won';
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          {isWon ? (
            <div className="text-6xl mb-4">🎉</div>
          ) : (
            <div className="text-6xl mb-4">��</div>
          )}
          
          <h2 className="text-3xl font-bold text-purple-900 mb-2">
            {isWon ? 'Parabéns!' : 'Tempo Esgotado!'}
          </h2>
          
          <p className="text-lg text-purple-700 mb-4">
            {isWon 
              ? `Você encontrou todos os pares em ${moves} tentativas!`
              : 'Você não conseguiu encontrar todos os pares a tempo.'
            }
          </p>
          
          {isWon && (
            <p className="text-sm text-purple-600 mb-4">
              Tempo restante: {timeLeft} segundos
            </p>
          )}
        </div>

        <div className="space-y-3">
          <button
            onClick={onPlayAgain}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200"
          >
            🔄 Jogar Novamente
          </button>
          
          <button
            onClick={onGoHome}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200"
          >
            🏠 Tela Inicial
          </button>
        </div>
      </div>
    </div>
  );
}