import Icon from "@/components/ui/icon";
import { PHONE, PHONE_LINK, HERO_IMG } from "./shared";

interface HeroHeaderProps {
  onOpenForm: (type?: string) => void;
}

export default function HeroHeader({ onOpenForm }: HeroHeaderProps) {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#90c046" }}>
              <Icon name="Hammer" size={18} className="text-white" />
            </div>
            <span className="font-black text-xl tracking-tight" style={{ color: "#2C3E66" }}>
              РемСтрой
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold" style={{ color: "#2C3E66" }}>
            {[
              ["Услуги", "services"],
              ["Цены", "pricelist"],
              ["Преимущества", "advantages"],
              ["Портфолио", "portfolio"],
              ["Контакты", "contacts"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="hover:opacity-60 transition-opacity"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={PHONE_LINK}
              className="hidden sm:flex items-center gap-1.5 font-bold text-sm"
              style={{ color: "#2C3E66" }}
            >
              <Icon name="Phone" size={14} />
              {PHONE}
            </a>
            <button
              onClick={() => onOpenForm()}
              className="px-4 py-2 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity"
              style={{ background: "#90c046" }}
            >
              Заказать звонок
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "92vh", background: "#2C3E66" }}
      >
        <img
          src={HERO_IMG}
          alt="Ремонт квартиры в Севастополе"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.2 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(44,62,102,0.75) 0%, rgba(44,62,102,0.50) 55%, rgba(44,62,102,0.20) 100%)",
          }}
        />
        <div
          className="absolute top-20 right-10 w-80 h-80 rounded-full opacity-10"
          style={{ background: "#90c046", filter: "blur(70px)" }}
        />
        <div
          className="absolute bottom-20 left-10 w-52 h-52 rounded-full opacity-10"
          style={{ background: "#90c046", filter: "blur(50px)" }}
        />

        <div
          className="relative max-w-6xl mx-auto px-4 flex flex-col justify-center"
          style={{ minHeight: "92vh", paddingTop: "5rem", paddingBottom: "8rem" }}
        >
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
              style={{
                background: "rgba(144,192,70,0.18)",
                color: "#90c046",
                border: "1px solid rgba(144,192,70,0.4)",
              }}
            >
              <Icon name="MapPin" size={14} />
              Севастополь — любой район
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-5">
              Ремонт и отделка{" "}
              <span style={{ color: "#90c046" }}>квартир</span>
              <br />в Севастополе
            </h1>

            <p className="text-lg sm:text-xl mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
              Ремонтно-строительная бригада — ваш надёжный проводник
              <br className="hidden sm:block" /> в ремонте и строительстве
            </p>

            <a
              href={PHONE_LINK}
              className="block text-3xl sm:text-4xl font-black mb-8 hover:opacity-80 transition-opacity"
              style={{ color: "#90c046" }}
            >
              {PHONE}
            </a>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("form")}
                className="px-8 py-4 rounded-2xl text-white font-bold text-lg hover:opacity-90 active:scale-95 transition-all"
                style={{
                  background: "linear-gradient(135deg, #90c046, #7aaa35)",
                  boxShadow: "0 8px 28px rgba(144,192,70,0.4)",
                }}
              >
                Рассчитать стоимость
              </button>
              <a
                href={PHONE_LINK}
                className="px-8 py-4 rounded-2xl font-bold text-lg text-center hover:opacity-80 transition-opacity flex items-center justify-center gap-2"
                style={{
                  color: "#fff",
                  border: "2px solid rgba(255,255,255,0.3)",
                  background: "rgba(255,255,255,0.08)",
                }}
              >
                <Icon name="Phone" size={18} />
                Позвонить
              </a>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div
          className="absolute bottom-0 left-0 right-0 py-5"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              ["8+", "лет опыта"],
              ["500+", "объектов сдано"],
              ["100%", "по договору"],
              ["0 ₽", "выезд на замер"],
            ].map(([val, label]) => (
              <div key={label}>
                <div className="text-2xl font-black" style={{ color: "#90c046" }}>
                  {val}
                </div>
                <div className="text-xs font-medium mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
