"use client";
import { useEffect, useState } from "react";
import { Brain, Lock, User } from "lucide-react";
import { AuthRequest, AuthResponse } from "@/types/user";
import { api } from "@/lib/api-client";
import { useRouter } from "next/navigation";

const PageMode = {
   LOGIN: "login",
   REGISTER: "register",
};

export default function AuthPage() {
   const [name, setName] = useState("");
   const [password, setPassword] = useState("");

   const [errorMessage, setErrorMessage] = useState("");

   const [pageMode, setPageMode] = useState(PageMode.LOGIN);

   const router = useRouter();

   const handleLogin = async () => {
      const result = await api.post<AuthResponse, AuthRequest>(
         "/api/auth/login",
         {
            name,
            password,
         }
      );

      if (result.successful) {
         router.push("/");
         router.refresh();
      } else {
         setErrorMessage(result.error?.message || "");
      }
   };

   const handleRegister = async () => {
      const result = await api.post<AuthResponse, AuthRequest>(
         "/api/auth/register",
         {
            name,
            password,
         }
      );

      if (result.successful) {
         router.push("/");
         router.refresh();
      } else {
         setErrorMessage(result.error?.message || "");
      }
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (pageMode === PageMode.LOGIN) {
         handleLogin();
      } else {
         handleRegister();
      }
   };

   useEffect(() => {
      setErrorMessage("");
   }, [pageMode]);

   return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-8">
         <div className="w-full max-w-md">
            <div className="text-center mb-4">
               <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-2 border-4 border-orange-200">
                  <Brain
                     className="w-10 h-10 text-orange-500"
                     strokeWidth={2}
                  />
               </div>
               <h1 className="text-5xl font-extrabold text-gray-800">
                  Brain<span className="text-orange-500">Games</span>
               </h1>
               <p className="text-lg text-gray-600">
                  {pageMode === PageMode.LOGIN
                     ? "Welcome back!"
                     : "Join us today"}
               </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border-2 border-orange-200 shadow-lg">
               <div className="flex gap-2 mb-6">
                  <button
                     onClick={() => setPageMode(PageMode.LOGIN)}
                     className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all ${
                        pageMode === PageMode.LOGIN
                           ? "bg-orange-500 text-white shadow-md"
                           : "bg-transparent text-gray-600 hover:bg-orange-200"
                     }`}
                  >
                     Login
                  </button>
                  <button
                     onClick={() => setPageMode(PageMode.REGISTER)}
                     className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all ${
                        pageMode === PageMode.REGISTER
                           ? "bg-orange-500 text-white shadow-md"
                           : "bg-transparent text-gray-600 hover:bg-orange-200"
                     }`}
                  >
                     Register
                  </button>
               </div>

               <div className="space-y-4">
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                        Username
                     </label>
                     <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                           type="text"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           placeholder="Enter username"
                           className="w-full pl-12 pr-4 py-3 bg-white border-2 border-orange-100 rounded-xl focus:outline-none focus:border-orange-400 transition-colors"
                        />
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                     </label>
                     <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                           type="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           placeholder="Enter password"
                           className="w-full pl-12 pr-4 py-3 bg-white border-2 border-orange-100 rounded-xl focus:outline-none focus:border-orange-400 transition-colors"
                        />
                     </div>
                  </div>

                  <div className="text-red-500 w-full min-h-6 text-center text-sm mb-2">
                     {errorMessage}
                  </div>

                  <button
                     onClick={handleSubmit}
                     className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                     {pageMode === PageMode.LOGIN ? "Login" : "Register"}
                  </button>
               </div>

               <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                     {pageMode === PageMode.LOGIN ? (
                        <>
                           No account?{" "}
                           <button
                              onClick={() => setPageMode(PageMode.REGISTER)}
                              className="text-orange-500 hover:text-orange-600 font-semibold"
                           >
                              Register
                           </button>
                        </>
                     ) : (
                        <>
                           Already have an account?{" "}
                           <button
                              onClick={() => setPageMode(PageMode.LOGIN)}
                              className="text-orange-500 hover:text-orange-600 font-semibold"
                           >
                              Login
                           </button>
                        </>
                     )}
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
