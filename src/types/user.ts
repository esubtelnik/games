export interface IUser {
   _id: string;   
   name: string;
   password: string;
   createdAt: Date;
}

export interface RegisterResponse {
   token: string;
   user: {
     id: string;
     name: string;
   };
 }
