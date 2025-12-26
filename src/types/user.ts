export interface IUser {
   _id: string;
   name: string;
   password: string;
   createdAt: Date;
   activeSaves: {
      twentyFortyEight: boolean;
      sudoku: boolean;
      fifteenPuzzle: boolean;
   };
}

export interface AuthResponse {
   //  token: string;
   user: {
      id: string;
      name: string;
   };
}

export interface AuthRequest {
   name: string;
   password: string;
}
