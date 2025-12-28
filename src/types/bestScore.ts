import { GameType } from "./entities";

export interface IBestScore {
    _id: string;
    userId: string;
    gameType: GameType;
    gameConfig?: string;
    score?: number;
    time: number;
    achievedAt: Date;
 }

 export interface IBestScoreRequest {
    gameType: GameType;
    gameConfig?: string;
    score?: number;
    time: number;
 }
 
 export interface IBestScoreResponse {
    bestScore: {
       _id: string;
       userId: string;
       gameType: GameType;
       gameConfig?: string;
       score?: number;
       time: number;
       achievedAt: Date;
    };
    isNewRecord: boolean;
 }
 