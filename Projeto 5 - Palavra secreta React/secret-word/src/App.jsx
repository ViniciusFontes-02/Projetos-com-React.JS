import "./App.css";

// hooks react
import { useCallback, useEffect, useState } from "react";

// dados
import { wordsList } from "./data/words";

// components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

// o jogo terá 3 estagios
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  // palavra a ser escolhida
  const [pickedWord, setPickedWord] = useState("");
  // categoria a ser escolhida
  const [pickedCategory, setPickedCategory] = useState("");
  // lista de letras a ser escolhida
  const [letters, setLetters] = useState([]);

  // letras advinhadas
  const [guessedLetters, setGuessedLetters] = useState([]);
  // letras erradas
  const [wrongLetters, setWrongLetters] = useState([]);
  // tentativas
  const [guesses, setGuesses] = useState(guessesQty);
  // pontuação
  const [score, setScore] = useState(0);

  // função para pegar categoria e palavras
  const pickWordAndCategory = useCallback(() => {
    // as categorias sao as chaves do objeto words
    // PEGANDO A CATEGORIA ALEATORIA
    const categories = Object.keys(words);

    // pega um numero aleatorio de acordo com o tamanho da lista de categorias => floor arrendonda o numero para baixo
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // PEGANDO A PALAVRA ALEATORIA
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }, [words]);

  // mudar o estagio do jogo para o INICIO
  const startGame = useCallback(() => {
    // limpar letras
    clearLetterStates();

    // função para pegar categoria e palavras, vai desestruturar os valores que chegam
    const { word, category } = pickWordAndCategory();

    // pegar a palavra e separar por letras
    let wordLetters = word.split("");

    // deixando as letras em minusculas
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  //finalizar jogo
  const verifyLetter = (letter) => {
    // deixando minuscula
    const normalizedLetter = letter.toLowerCase();

    // verificando se a letra ja foi usada
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // incluir as letras para as certas ou erradas
    if (letters.includes(normalizedLetter)) {
      // se estiver certa, alterar as letras advinhadas
      setGuessedLetters((actualGuessedLetters) => [
        // esta pegando todas as letras e adiciona a nova letra
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        // esta pegando todas as letras e adiciona a nova letra
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      // diminuir as tentativas
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  // função de resetar letras, para iniciar o jogo zerado
  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // useEffect-> monitora o dado e a função executa toda vez que o dado é alterado
  // quando o numero de tentativas for zero, vai mudar a pagina para o game Over
  useEffect(() => {
    if (guesses <= 0) {
      // função de resetar letras, para iniciar o jogo zerado
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // verificar se acertou
  useEffect(() => {
    // array de letras unicas
    const uniqueLetters = [...new Set(letters)];

    // seo tamanho dos acertos for igual o tamanho da lista de array, entou venceu o jogo
    if (guessedLetters.length === uniqueLetters.length) {
      // adicionar pontos
      setScore((actualScore) => (actualScore += 100));

      // criar novo jogo
      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  // reiniciar o jogo
  const retry = () => {
    // resetando valores jogo
    setScore(0);
    setGuesses(guessesQty);

    setGameStage(stages[0].name);
  };

  return (
    <div className="app">
      {/* se o nome do estagio for x, vai aparecer a pagina de acordo com x */}
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
