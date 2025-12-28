"use client";
import { FC, useState, useEffect, useRef } from "react";
import MemoryGrid from "@/components/memoryGameComponents/MemoryGrid";
import MemoryMenu from "@/components/memoryGameComponents/MemoryMenu";
import MemoryModal from "@/components/memoryGameComponents/MemoryModal";
import HomeButton from "@/components/HomeButton";
import {
   createGameGrid,
   flipCard,
   unflipCards,
   markCardsAsMatched,
   getFlippedCards,
   checkWin,
   checkMatch,
} from "@/utils/memoryGameUtils/gameLogic";
import {
   MemoryGridType,
   GameStatus,
   Difficulty,
   DIFFICULTY_CONFIGS,
   GameMode,
} from "@/types/memoryGame";
import cloneDeep from "lodash/cloneDeep";

const MemoryGamePage: FC = () => {
   const [gameMode, setGameMode] = useState<GameMode>(GameMode.SINGLE);
   const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
   const [grid, setGrid] = useState<MemoryGridType>([]);
   const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.IDLE);
   const [elapsedTime, setElapsedTime] = useState(0);
   const [moves, setMoves] = useState(0);
   const [matches, setMatches] = useState(0);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isProcessing, setIsProcessing] = useState(false);
   const intervalRef = useRef<NodeJS.Timeout | null>(null);

   // Multiplayer state
   const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
   const [player1Score, setPlayer1Score] = useState(0);
   const [player2Score, setPlayer2Score] = useState(0);

   const config = DIFFICULTY_CONFIGS[difficulty];

   const initializeGame = () => {
      const newGrid = createGameGrid(config.pairs);
      setGrid(newGrid);
      setGameStatus(GameStatus.IDLE);
      setElapsedTime(0);
      setMoves(0);
      setMatches(0);
      setIsModalOpen(false);
      setIsProcessing(false);
      setCurrentPlayer(1);
      setPlayer1Score(0);
      setPlayer2Score(0);

      if (intervalRef.current) {
         clearInterval(intervalRef.current);
         intervalRef.current = null;
      }
   };

   useEffect(() => {
      initializeGame();
   }, [difficulty, gameMode]);

   useEffect(() => {
      if (gameStatus === GameStatus.PLAYING) {
         intervalRef.current = setInterval(() => {
            setElapsedTime((prev) => prev + 1);
         }, 1000);
      } else if (intervalRef.current) {
         clearInterval(intervalRef.current);
         intervalRef.current = null;
      }

      return () => {
         if (intervalRef.current) {
            clearInterval(intervalRef.current);
         }
      };
   }, [gameStatus]);

   const handleCardClick = (cardId: number) => {
      if (isProcessing || gameStatus === GameStatus.WON) return;

      const clickedCard = grid.find((card) => card.id === cardId);
      if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched)
         return;

      if (gameStatus === GameStatus.IDLE) {
         setGameStatus(GameStatus.PLAYING);
      }

      let newGrid = cloneDeep(grid);
      const flippedCards = getFlippedCards(newGrid);

      if (flippedCards.length >= 2) return;

      newGrid = flipCard(newGrid, cardId);
      setGrid(newGrid);

      const updatedFlippedCards = getFlippedCards(newGrid);

      if (updatedFlippedCards.length === 2) {
         setIsProcessing(true);
         setMoves((prev) => prev + 1);

         const [card1, card2] = updatedFlippedCards;
         const isMatch = checkMatch(card1, card2);

         setTimeout(() => {
            let finalGrid = cloneDeep(newGrid);

            if (isMatch) {
               finalGrid = markCardsAsMatched(finalGrid, [card1.id, card2.id]);
               setMatches((prev) => prev + 1);

               if (gameMode === GameMode.MULTIPLAYER) {
                  if (currentPlayer === 1) {
                     setPlayer1Score((prev) => prev + 1);
                  } else {
                     setPlayer2Score((prev) => prev + 1);
                  }
               } else {
               }

               if (checkWin(finalGrid)) {
                  setGameStatus(GameStatus.WON);
                  setIsModalOpen(true);
               }
            } else {
               finalGrid = unflipCards(finalGrid, [card1.id, card2.id]);

               if (gameMode === GameMode.MULTIPLAYER) {
                  setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
               }
            }

            setGrid(finalGrid);
            setIsProcessing(false);
         }, 1000);
      }
   };

   const handleDifficultyChange = (newDifficulty: Difficulty) => {
      setDifficulty(newDifficulty);
   };

   const handleGameModeChange = (newMode: GameMode) => {
      setGameMode(newMode);
   };

   const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, "0")}:${secs
         .toString()
         .padStart(2, "0")}`;
   };

   const getWinner = () => {
      if (gameMode === GameMode.SINGLE) return null;
      if (player1Score > player2Score) return 1;
      if (player2Score > player1Score) return 2;
      return 0;
   };

   return (
      <div
         className={`
      min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 gap-8
      transition-colors duration-700 ease-in-out
      ${
         currentPlayer === 1
            ? "bg-gradient-to-tr from-indigo-900/60 via-slate-900 to-slate-950"
            : "bg-gradient-to-tl from-rose-900/60 via-slate-900 to-slate-950"
      }
   `}
      >
         <div className="text-center space-y-2">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic">
               Memory <span className="text-indigo-500">Pro</span>
            </h1>
         </div>


         <MemoryMenu
            gameMode={gameMode}
            setGameMode={handleGameModeChange}
            difficulty={difficulty}
            setDifficulty={handleDifficultyChange}
            moves={moves}
            matches={matches}
            totalPairs={config.pairs}
            elapsedTime={elapsedTime}
            onReset={initializeGame}
            currentPlayer={currentPlayer}
            player1Score={player1Score}
            player2Score={player2Score}
         />

         <div className="relative p-4 rounded-3xl bg-white/5 border border-white/5 shadow-2xl">
            <MemoryGrid
               grid={grid}
               onCardClick={handleCardClick}
               disabled={isProcessing}
               gridCols={config.gridCols}
            />
         </div>

         <div className="flex items-center gap-4 transition-all duration-500">
            {gameMode === GameMode.MULTIPLAYER ? (
               <div
                  className={`px-6 py-2 rounded-full border-2 font-black uppercase tracking-widest text-sm transition-all shadow-[0_0_15px_rgba(0,0,0,0.2)]
               ${
                  currentPlayer === 1
                     ? "bg-indigo-600 border-indigo-400 text-white animate-bounce"
                     : "bg-rose-600 border-rose-400 text-white animate-bounce"
               }`}
               >
                  Player {currentPlayer}&apos;s turn
               </div>
            ) : (
               <div className="text-slate-400 text-sm font-medium tracking-wide flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                  Click cards to find matching pairs
               </div>
            )}
         </div>

         <div className="mt-4">
            <HomeButton bg="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white transition-all" />
         </div>

         {isModalOpen && gameStatus === GameStatus.WON && (
            <MemoryModal
               gameMode={gameMode}
               moves={moves}
               time={formatTime(elapsedTime)}
               winner={getWinner()}
               player1Score={player1Score}
               player2Score={player2Score}
               onClose={() => setIsModalOpen(false)}
               onNewGame={initializeGame}
            />
         )}
      </div>
   );
};

export default MemoryGamePage;
