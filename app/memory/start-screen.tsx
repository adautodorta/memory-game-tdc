"use client";

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-purple-900 mb-4">
            Jogo da Memória 🧠
        </h1>
        
        <div className="space-y-4 mb-8">
          <p className="text-lg text-purple-700">
            Encontre todos os pares de cartas em <strong>60 segundos</strong>!
          </p>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="font-semibold text-purple-800 mb-2">Como jogar:</h3>
            <ul className="text-sm text-purple-700 space-y-1 text-left">
              <li>• Clique em duas cartas para revelá-las</li>
              <li>• Se forem iguais, elas ficam viradas</li>
              <li>• Se forem diferentes, elas se viram novamente</li>
              <li>• Encontre todos os pares antes do tempo acabar!</li>
            </ul>
          </div>
        </div>

        <button
          onClick={onStart}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl text-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Começar Jogo
        </button>
      </div>
    </div>
  );
}