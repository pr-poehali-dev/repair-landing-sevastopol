import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import {
  PHONE,
  PHONE_LINK,
  PORTFOLIO_CATEGORIES,
  portfolio,
  FadeSection,
  ContactForm,
} from "./shared";

const PORTFOLIO_PAGE_SIZE = 8;

function PortfolioSection({ onLightbox }: { onLightbox: (img: string, title: string) => void }) {
  const [activeCategory, setActiveCategory] = useState<string>("Все");
  const [visibleCount, setVisibleCount] = useState(PORTFOLIO_PAGE_SIZE);
  const loaderRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === "Все"
      ? portfolio
      : portfolio.filter((item) => item.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  useEffect(() => {
    setVisibleCount(PORTFOLIO_PAGE_SIZE);
  }, [activeCategory]);

  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setVisibleCount((n) => n + PORTFOLIO_PAGE_SIZE);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <section id="portfolio" className="py-20" style={{ background: "#F8F9FA" }}>
      <div className="max-w-6xl mx-auto px-4">
        <FadeSection className="text-center mb-10">
          <span
            className="inline-block text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: "#90c046" }}
          >
            Наши работы
          </span>
          <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "#2C3E66" }}>
            Портфолио
          </h2>
          <p className="mt-3 text-gray-500">
            Реальные объекты, сданные нашей бригадой в Севастополе
          </p>
        </FadeSection>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {PORTFOLIO_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={
                activeCategory === cat
                  ? { background: "#2C3E66", color: "#fff" }
                  : { background: "#fff", color: "#2C3E66", boxShadow: "0 2px 8px rgba(44,62,102,0.08)" }
              }
            >
              {cat}
              {cat !== "Все" && (
                <span className="ml-1.5 text-xs opacity-60">
                  ({portfolio.filter((p) => p.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visible.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              className="card-hover rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => onLightbox(item.img, `${item.title} — ${item.desc}`)}
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)", background: "#fff" }}
            >
              <div className="relative overflow-hidden" style={{ paddingBottom: "72%" }}>
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ transition: "transform 0.5s ease" }}
                  onMouseEnter={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1.08)")}
                  onMouseLeave={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1)")}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(44,62,102,0.6)" }}
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Icon name="ZoomIn" size={22} className="text-white" />
                  </div>
                </div>
                <span
                  className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-lg"
                  style={{ background: "rgba(44,62,102,0.75)", color: "#fff" }}
                >
                  {item.category}
                </span>
              </div>
              <div className="p-4">
                <div className="font-bold text-sm" style={{ color: "#2C3E66" }}>{item.title}</div>
                <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Infinite scroll trigger */}
        <div ref={loaderRef} className="mt-8 flex justify-center">
          {hasMore && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
              Загружаем ещё...
            </div>
          )}
          {!hasMore && filtered.length > PORTFOLIO_PAGE_SIZE && (
            <p className="text-sm text-gray-400">Все работы загружены</p>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          * Замените фото на реальные снимки ваших объектов
        </p>
      </div>
    </section>
  );
}

interface ContactsSectionProps {
  onLightbox: (img: string, title: string) => void;
}

export default function ContactsSection({ onLightbox }: ContactsSectionProps) {
  return (
    <>
      {/* ── PORTFOLIO ── */}
      <PortfolioSection onLightbox={onLightbox} />

      {/* ── FORM SECTION ── */}
      <section id="form" className="py-20" style={{ background: "#2C3E66" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeSection>
              <span
                className="inline-block text-sm font-bold uppercase tracking-widest mb-3"
                style={{ color: "#90c046" }}
              >
                Бесплатный замер
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Оставьте заявку на бесплатный замер
              </h2>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                Выезжаем в любой район Севастополя. Приедем, оценим объём работ и составим точную смету — бесплатно.
              </p>
              <div className="space-y-4">
                {[
                  ["Clock", "Выезд в удобное для вас время"],
                  ["MapPin", "Любой район Севастополя"],
                  ["FileText", "Подробная смета в день замера"],
                ].map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(144,192,70,0.2)" }}
                    >
                      <Icon name={icon} size={16} style={{ color: "#90c046" }} />
                    </div>
                    <span className="font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </FadeSection>
            <FadeSection>
              <div
                className="bg-white rounded-2xl p-8"
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}
              >
                <ContactForm />
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <FadeSection className="text-center mb-14">
            <span
              className="inline-block text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: "#90c046" }}
            >
              Связаться с нами
            </span>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "#2C3E66" }}>
              Контакты
            </h2>
          </FadeSection>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <FadeSection>
              <div className="space-y-5">
                <div className="p-6 rounded-2xl" style={{ background: "#F8F9FA" }}>
                  <div className="text-xs font-bold uppercase tracking-widest mb-2 text-gray-400">
                    Телефон
                  </div>
                  <a
                    href={PHONE_LINK}
                    className="text-3xl sm:text-4xl font-black block hover:opacity-80 transition-opacity"
                    style={{ color: "#90c046" }}
                  >
                    {PHONE}
                  </a>
                  <a
                    href={PHONE_LINK}
                    className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-xl text-white font-bold hover:opacity-90 transition-opacity"
                    style={{ background: "#90c046" }}
                  >
                    <Icon name="Phone" size={18} />
                    Позвонить сейчас
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl" style={{ background: "#F8F9FA" }}>
                    <div className="text-xs font-bold uppercase tracking-widest mb-1.5 text-gray-400">
                      Город
                    </div>
                    <div className="font-bold" style={{ color: "#2C3E66" }}>
                      Севастополь
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl" style={{ background: "#F8F9FA" }}>
                    <div className="text-xs font-bold uppercase tracking-widest mb-1.5 text-gray-400">
                      Режим работы
                    </div>
                    <div className="font-bold" style={{ color: "#2C3E66" }}>
                      Ежедневно
                      <br />
                      9:00 — 20:00
                    </div>
                  </div>
                </div>
              </div>
            </FadeSection>
            <FadeSection>
              <div className="rounded-2xl overflow-hidden" style={{ height: 320 }}>
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=33.5254%2C44.6054&z=13&l=map&pt=33.5254,44.6054,pm2rdm"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Карта Севастополь"
                  style={{ border: 0 }}
                  allowFullScreen
                />
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-10"
        style={{ background: "#2C3E66", borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "#90c046" }}
              >
                <Icon name="Hammer" size={16} className="text-white" />
              </div>
              <span className="font-black text-lg text-white">РемСтрой</span>
            </div>
            <div className="text-center">
              <a href={PHONE_LINK} className="font-bold text-lg" style={{ color: "#90c046" }}>
                {PHONE}
              </a>
              <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                © 2025 Ремстрой. Севастополь
              </div>
            </div>
            <div className="flex items-center gap-3">
              {[
                { icon: "Users", label: "VK", href: "#" },
                { icon: "MessageSquare", label: "WhatsApp", href: "#" },
                { icon: "Send", label: "Telegram", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  title={s.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center hover:opacity-70 transition-opacity"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <Icon name={s.icon} size={18} className="text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
