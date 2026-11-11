import { Vazirmatn } from "next/font/google";
import "./globals.css";
const vazir = Vazirmatn({ subsets: ["arabic", "latin"], display: "swap" });
export const metadata = {
  title: "زهرا یعقوبی منش | مهندس طراحی مکانیک و محصول",
  description: "وب‌سایت شخصی زهرا یعقوبی منش؛ طراحی مکانیک، توسعه محصول و مهندسی ایجنت",
};
export default function RootLayout({ children }) {
  return (<html lang="fa" dir="rtl"><body className={vazir.className}>{children}</body></html>);
}
