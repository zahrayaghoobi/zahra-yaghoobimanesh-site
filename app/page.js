import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CareerChat from "@/components/CareerChat";
import ContactActions from "@/components/ContactActions";
import { profile, jobs, skills, education, projects } from "@/data/content";

const nav = [["about", "درباره من"], ["career", "مسیر شغلی"], ["skills", "مهارت‌ها"], ["portfolio", "نمونه‌کارها"], ["contact", "تماس"]];

export default function Home() {
  return (
    <>
      <header className="nav">
        <a href="#top" className="logo"><span>ZY</span>{profile.name}</a>
        <nav>{nav.map(([id, t]) => <a key={id} href={`#${id}`}>{t}</a>)}</nav>
      </header>

      <section id="top" className="hero blueprint">
        <div className="wrap hero-grid">
          <div>
            <span className="chip">● آماده همکاری پروژه‌ای و دورکاری</span>
            <h1>از <em>ایده</em> تا <span style={{whiteSpace:"nowrap"}}>نقشه‌ی <em>ساخت</em>،</span><br />با دقت مهندسی.</h1>
            <p className="lead">{profile.name} — {profile.title}. بیش از یک دهه طراحی مکانیزم و نقشه‌کشی صنعتی؛ از توسعه محصول تا مهندسی ایجنت و ساخت ابزارهای هوشمند.</p>
            <div className="cta">
              <a className="btn primary" href="#portfolio">مشاهده نمونه‌کارها</a>
              <a className="btn ghost" href="/resume.pdf" download>دانلود رزومه (PDF)</a>
            </div>
          </div>
          <div className="portrait">
            <div className="frame"><Image src="/portrait.jpg" alt={profile.name} width={640} height={640} priority /></div>
            <div className="tag t1">GD&amp;T</div><div className="tag t2">SolidWorks</div><div className="tag t3">Reverse Engineering</div>
            <div className="tag t4">Agent ENG</div><div className="tag t5">مسیر توسعه هوشمند</div>
          </div>
        </div>
        <div className="wrap stats">
          {profile.stats.map((s) => (<div key={s.l}><b>{s.n}</b><span>{s.l}</span></div>))}
        </div>
      </section>

      <section id="about" className="sec light">
        <div className="wrap two">
          <Reveal><p className="eyebrow">۰۱ / درباره من</p><h2>مهندسی که ایده را به <em>مکانیزم</em> تبدیل می‌کند</h2></Reveal>
          <Reveal delay={120}>{profile.about.map((p, i) => <p key={i} className="body">{p}</p>)}</Reveal>
        </div>
        <div className="wrap award">
          <Reveal className="award-img"><Image src="/award.png" alt="لوح تقدیر گروه مهندسی صادق یکتا" width={1145} height={1374} /></Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">افتخار</p>
            <h3>لوح تقدیر از گروه مهندسی صادق یکتا</h3>
            <p className="body">قدردانی مدیرعامل گروه از تلاش، مسئولیت‌پذیری و همکاری ارزشمند در طول مدت فعالیت و نقش مؤثر در پیشبرد اهداف شرکت.</p>
            <ul className="ticks"><li>گواهی رویداد ملی استارتاپ اسباب‌بازی — ۱۳۹۷</li><li>طراحی تا ساخت محصولات دکوراتیو خلاقانه با رویکرد صنعتی — ۱۴۰۱</li></ul>
          </Reveal>
        </div>
      </section>

      <section id="career" className="sec dark blueprint">
        <div className="wrap">
          <Reveal><p className="eyebrow">۰۲ / مسیر شغلی</p><h2>۹ سال و نیم تجربه <em>صنعتی</em></h2></Reveal>
          <div className="timeline">
            {jobs.map((j, i) => (
              <Reveal key={j.org} delay={i * 60} className="job">
                <span className="dot" />
                <small>{j.period}</small>
                <h3>{j.role}</h3>
                <p className="org">{j.org} · {j.city}</p>
                <ul>{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="sec light">
        <div className="wrap two">
          <Reveal>
            <p className="eyebrow">۰۳ / مهارت‌ها</p><h2>ابزار و <em>تخصص</em></h2>
            <div className="bars">{skills["نرم‌افزارها"].map(([n, v]) => (
              <div key={n} className="bar"><span>{n}</span><i><b style={{ width: v + "%" }} /></i></div>))}</div>
            <div className="pills">{skills["تخصص‌ها"].map((s) => <span key={s}>{s}</span>)}</div>
            <div className="focus-note"><b>تمرکز فعلی من</b><p>{profile.focus}</p></div>
          </Reveal>
          <Reveal delay={120}>
            <h3>تحصیلات و دوره‌ها</h3>
            <div className="edu">{education.map((e) => (<div key={e.t}><small>{e.y}</small><b>{e.t}</b><span>{e.s}</span></div>))}</div>
          </Reveal>
        </div>
      </section>

      <section id="portfolio" className="sec cream">
        <div className="wrap">
          <Reveal><p className="eyebrow">۰۴ / نمونه‌کارها</p><h2>پروژه‌های <em>منتخب</em></h2>
            <p className="body narrow">این بخش در حال تکمیل است؛ هر کارت به صفحه‌ای مجزا برای افزودن تصاویر و توضیحات پروژه می‌رسد.</p></Reveal>
          <div className="grid">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <Link href={`/portfolio/${p.slug}`} className="card">
                  <small>{p.year}</small><h3>{p.title}</h3><p>{p.desc}</p><span className="soon">به‌زودی ←</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="sec dark blueprint center">
        <div className="wrap">
          <Reveal><h2>بیایید پروژه‌ی بعدی را <em>بسازیم</em></h2>
            <ContactActions profile={profile} />
            <p className="muted">{profile.city}</p></Reveal>
        </div>
      </section>
      <footer>© {profile.name}</footer>
      <CareerChat />
    </>
  );
}
