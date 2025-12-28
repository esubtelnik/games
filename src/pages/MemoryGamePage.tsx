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
import { useAutoSave } from "@/hooks/useAutoSave";
import { IMemoryGameProgress } from "@/types/progress";
import { GameType } from "@/types/entities";
import { useGameTimer } from "@/hooks/useGameTimer";
import { useBestScore } from "@/hooks/useBestScoreuseBestScore";
import { formatTime } from "@/utils/utils";
import GameDashboard from "@/components/GameDashboard";

interface Props {
   initialData: IMemoryGameProgress | null;
}

const MemoryGamePage: FC<Props> = ({ initialData }) => {
   const [gameMode, setGameMode] = useState<GameMode>(
      initialData?.gameMode || GameMode.SINGLE
   );
   const [difficulty, setDifficulty] = useState<Difficulty>(
      initialData?.difficulty || Difficulty.EASY
   );
   const [grid, setGrid] = useState<MemoryGridType>(initialData?.grid || []);
   const [gameStatus, setGameStatus] = useState<GameStatus>(
      initialData?.gameStatus || GameStatus.IDLE
   );
   const [moves, setMoves] = useState(initialData?.moves || 0);
   const [matches, setMatches] = useState(initialData?.matches || 0);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isProcessing, setIsProcessing] = useState(false);
   // Multiplayer state
   const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
   const [player1Score, setPlayer1Score] = useState(0);
   const [player2Score, setPlayer2Score] = useState(0);

   const config = DIFFICULTY_CONFIGS[difficulty];

   const { seconds, resetTimer, startTimer, formattedTime, togglePause } =
      useGameTimer({
         initialSeconds: initialData?.gameTimer?.seconds || 0,
         initialIsPaused: initialData?.gameTimer?.isPaused ?? true,
      });

   const autoSave = useAutoSave<IMemoryGameProgress>({
      gameType: GameType.MEMORY_GAME,
      delay: 0,
   });

   const {
      bestScore,
      bestTime,
      isLoading: isBestScoreLoading,
      updateBestScore,
   } = useBestScore({
      gameType: GameType.MEMORY_GAME,
      gameConfig: `${config.pairs}`,
   });

   const initializeGame = () => {
      const newGrid = createGameGrid(config.pairs);
      setGrid(newGrid);
      setGameStatus(GameStatus.IDLE);
      resetTimer();
      setMoves(0);
      setMatches(0);
      setIsModalOpen(false);
      setIsProcessing(false);
      setCurrentPlayer(1);
      setPlayer1Score(0);
      setPlayer2Score(0);
   };

   useEffect(() => {
      if (grid.length === 0) {
         initializeGame();
      }
   }, [difficulty, gameMode]);

   useEffect(() => {
      if (gameStatus === GameStatus.PLAYING) {
         startTimer();
      }
   }, [gameStatus]);

   const handleCardClick = (cardId: number) => {
      if (isProcessing || gameStatus === GameStatus.WON) return;

      const clickedCard = grid.find((card) => card.id === cardId);
      if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched)
         return;

      if (gameStatus === GameStatus.IDLE) {
         setGameStatus(GameStatus.PLAYING);
         startTimer();
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
               }
            } else {
               finalGrid = unflipCards(finalGrid, [card1.id, card2.id]);

               if (gameMode === GameMode.MULTIPLAYER) {
                  setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
               }
            }

            setGrid(finalGrid);
            autoSave({
               grid: finalGrid,
               gameMode: gameMode,
               difficulty: difficulty,
               gameStatus: gameStatus,
               moves: moves,
               matches: matches,
               currentPlayer: currentPlayer,
               player1Score: player1Score,
               player2Score: player2Score,
               gameTimer: {
                  seconds: seconds,
                  isPaused: true,
               },
            });
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

   const getWinner = () => {
      if (gameMode === GameMode.SINGLE) return null;
      if (player1Score > player2Score) return 1;
      if (player2Score > player1Score) return 2;
      return 0;
   };

   useEffect(() => {
      const handler = () => {
         if (grid.length > 0) {
            const payload = {
               grid: grid,
               gameMode: gameMode,
               difficulty: difficulty,
               gameStatus: checkWin(grid) ? GameStatus.WON : gameStatus,
               moves: moves,
               matches: matches,
               currentPlayer: currentPlayer,
               player1Score: player1Score,
               player2Score: player2Score,
               gameTimer: {
                  seconds: seconds,
                  isPaused: true,
               },
            };

            navigator.sendBeacon(
               "/api/user/progress",
               JSON.stringify({
                  gameData: payload,
                  gameType: GameType.MEMORY_GAME,
               })
            );
         }
      };

      window.addEventListener("beforeunload", handler);
      return () => window.removeEventListener("beforeunload", handler);
   }, [
      grid,
      difficulty,
      gameStatus,
      moves,
      matches,
      currentPlayer,
      player1Score,
      player2Score,
   ]);

   useEffect(() => {
      if (gameStatus === GameStatus.WON) {
         handleGameEnd();
      }
   }, [gameStatus]);

   const handleGameEnd = async () => {
      togglePause();
      setIsModalOpen(true);

      if (gameMode === GameMode.SINGLE) {
         const isNewRecord = await updateBestScore(undefined, seconds);

         if (isNewRecord) {
            alert("🎉 New record!");
         }
      }

      resetTimer();
   };

   return (
      <div
         className={`
      min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 gap-8
      transition-colors relative duration-700 ease-in-out
      ${
         currentPlayer === 1
            ? "bg-gradient-to-tr from-indigo-900/60 via-slate-900 to-slate-950"
            : "bg-gradient-to-tl from-rose-900/60 via-slate-900 to-slate-950"
      }
   `}
      >
         {gameMode === GameMode.SINGLE && (
            <GameDashboard
               showBestScore={false}
               bestScore={bestScore ?? 0}
               bestTime={bestTime ?? 0}
               className="bg-indigo-600 border-b-4 border-indigo-400 text-white"
               textClassName="text-white"
               valueClassName="text-white"
            />
         )}
         <div className="text-center z-50 space-y-2">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic">
               Memory <span className="text-indigo-500 ">Pro</span>
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
            elapsedTime={formattedTime}
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
               time={formatTime(seconds)}
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
