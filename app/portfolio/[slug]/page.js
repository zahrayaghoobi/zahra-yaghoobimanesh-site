import Link from "next/link";
import { projects } from "@/data/content";
export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }
export default async function Project({ params }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return null;
  return (
    <main className="soon-page blueprint">
      <small>{p.year}</small><h1>{p.title}</h1><p>{p.desc}</p>
      <p className="muted">جزئیات و تصاویر این پروژه به‌زودی اضافه می‌شود.</p>
      <Link className="btn primary" href="/#portfolio">بازگشت به نمونه‌کارها</Link>
    </main>
  );
}
