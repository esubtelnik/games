import AuthPage from "@/pages/AuthPage";

export default function Auth() {
   return <AuthPage />;
}

// import AuthPage from "@/components/AuthPage"; // путь до твоего клиентского файла
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// export default async function Auth() {
//   // Проверяем куки прямо на сервере
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;

//   // Если токен есть, не даем смотреть страницу логина — редирект!
//   if (token) {
//     redirect("/dashboard");
//   }

//   return <AuthPage />;
// }