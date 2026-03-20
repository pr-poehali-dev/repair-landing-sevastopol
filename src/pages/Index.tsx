import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/5e07da6b-4213-47f1-baf0-922f8167f042/files/270aa61f-2a5b-464d-91c7-ca07135596b8.jpg";

const PHONE = "+7 978 820-53-72";
const PHONE_LINK = "tel:+79788205372";

const plans = [
  {
    name: "Косметический",
    price: "от 4 500",
    unit: "руб./м²",
    featured: false,
    works: [
      "Шпаклевка, грунтовка",
      "Покрасочные работы",
      "Поклейка обоев",
      "Установка потолочных систем",
      "Замена сантехники",
      "Замена люстр, розеток, выключателей",
    ],
  },
  {
    name: "Капитальный",
    price: "от 6 500",
    unit: "руб./м²",
    featured: true,
    badge: "Популярный",
    works: [
      "Демонтаж старой отделки",
      "Подготовка помещений",
      "Электромонтажные работы",
      "Сантехнические работы",
      "Отделка помещений",
    ],
  },
  {
    name: "Элитный",
    price: "от 8 500",
    unit: "руб./м²",
    featured: false,
    works: [
      "Демонтаж старой отделки",
      "Подготовка помещений",
      "Дизайн и перепланировка",
      "Электромонтажные работы",
      "Сантехнические работы",
      "Премиальная отделка",
    ],
  },
];

const priceCategories = [
  {
    icon: "Wallpaper",
    title: "Стены",
    items: [
      { name: "Выравнивание стен штукатуркой", price: "от 450 руб./м²" },
      { name: "Шпаклевка стен под покраску", price: "от 280 руб./м²" },
      { name: "Поклейка обоев", price: "от 250 руб./м²" },
      { name: "Покраска стен", price: "от 180 руб./м²" },
      { name: "Монтаж гипсокартона", price: "от 650 руб./м²" },
    ],
  },
  {
    icon: "Layers",
    title: "Полы",
    items: [
      { name: "Стяжка пола (мокрая)", price: "от 350 руб./м²" },
      { name: "Укладка ламината / паркетной доски", price: "от 400 руб./м²" },
      { name: "Укладка линолеума", price: "от 180 руб./м²" },
      { name: "Шлифовка и покраска деревянного пола", price: "от 500 руб./м²" },
      { name: "Наливной пол", price: "от 700 руб./м²" },
    ],
  },
  {
    icon: "ArrowUp",
    title: "Потолок",
    items: [
      { name: "Натяжной потолок (одноуровневый)", price: "от 550 руб./м²" },
      { name: "Двухуровневый натяжной потолок", price: "от 900 руб./м²" },
      { name: "Штукатурка потолка", price: "от 380 руб./м²" },
      { name: "Шпаклевка потолка под покраску", price: "от 300 руб./м²" },
      { name: "Монтаж подвесного потолка ГКЛ", price: "от 750 руб./м²" },
    ],
  },
  {
    icon: "Droplets",
    title: "Сантехника",
    items: [
      { name: "Замена смесителя", price: "от 1 500 руб." },
      { name: "Установка унитаза", price: "от 2 500 руб." },
      { name: "Установка ванны / душевой кабины", price: "от 4 500 руб." },
      { name: "Разводка труб водоснабжения", price: "от 1 200 руб./точка" },
      { name: "Замена радиатора отопления", price: "от 3 500 руб." },
    ],
  },
  {
    icon: "Grid3x3",
    title: "Керамическая плитка",
    items: [
      { name: "Укладка плитки на пол", price: "от 800 руб./м²" },
      { name: "Укладка плитки на стены", price: "от 900 руб./м²" },
      { name: "Укладка мозаики", price: "от 1 500 руб./м²" },
      { name: "Затирка швов", price: "от 150 руб./м²" },
      { name: "Укладка крупноформатного керамогранита", price: "от 1 200 руб./м²" },
    ],
  },
  {
    icon: "Zap",
    title: "Электрика",
    items: [
      { name: "Установка розетки / выключателя", price: "от 500 руб." },
      { name: "Монтаж электропроводки (под ключ)", price: "от 800 руб./точка" },
      { name: "Установка люстры / светильника", price: "от 700 руб." },
      { name: "Монтаж щитка", price: "от 6 000 руб." },
      { name: "Прокладка кабеля в штробе", price: "от 200 руб./м.п." },
    ],
  },
  {
    icon: "Brush",
    title: "Декоративные покрытия",
    items: [
      { name: "Венецианская штукатурка", price: "от 1 800 руб./м²" },
      { name: "Декоративная штукатурка (короед, барашек)", price: "от 600 руб./м²" },
      { name: "Фактурная покраска", price: "от 900 руб./м²" },
      { name: "Микроцемент", price: "от 2 500 руб./м²" },
      { name: "Роспись стен", price: "от 3 500 руб./м²" },
    ],
  },
];

const advantages = [
  {
    icon: "UserCheck",
    title: "Опытные мастера",
    text: "Работаем без посредников, сами контролируем качество на каждом этапе",
  },
  {
    icon: "BadgeCheck",
    title: "Фиксированные цены",
    text: "Смета не меняется после подписания договора — никаких сюрпризов",
  },
  {
    icon: "FileText",
    title: "Работа по договору",
    text: "Официальный договор и гарантия на все виды выполненных работ",
  },
  {
    icon: "Clock",
    title: "Соблюдаем сроки",
    text: "Сдаём объект вовремя или выплачиваем бонус за каждый день задержки",
  },
];

const portfolio = [
  { title: "Квартира 70 м²", desc: "Косметический ремонт", img: HERO_IMG },
  { title: "Двухкомнатная квартира", desc: "Капитальный ремонт", img: HERO_IMG },
  { title: "Дизайнерский ремонт", desc: "Элит-класс", img: HERO_IMG },
  { title: "Офисное помещение", desc: "Отделка под ключ", img: HERO_IMG },
];

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className={`section-fade ${className}`}>
      {children}
    </div>
  );
}

interface FormData {
  name: string;
  phone: string;
  repairType: string;
}

function ContactForm({ initialType = "", onClose }: { initialType?: string; onClose?: () => void }) {
  const [form, setForm] = useState<FormData>({ name: "", phone: "", repairType: initialType });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // для отправки в Telegram заменить на API-запрос к боту
    console.log("Заявка отправлена:", form);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="text-center py-8">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: "#FF6B35" }}
        >
          <Icon name="Check" size={32} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2" style={{ color: "#2C3E66" }}>
          Заявка принята!
        </h3>
        <p className="text-gray-500">
          Мы свяжемся с вами в ближайшее время для согласования замера.
        </p>
        {onClose && (
          <button
            onClick={onClose}
            className="mt-6 px-6 py-2 rounded-xl text-white font-semibold"
            style={{ background: "#FF6B35" }}
          >
            Закрыть
          </button>
        )}
      </div>
    );
  }

  const inputStyle = {
    borderColor: "#e2e8f0",
    fontFamily: "Montserrat, sans-serif",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-1.5" style={{ color: "#2C3E66" }}>
          Ваше имя
        </label>
        <input
          type="text"
          required
          placeholder="Иван Иванов"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl border-2 outline-none font-medium transition-all"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#FF6B35")}
          onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1.5" style={{ color: "#2C3E66" }}>
          Телефон
        </label>
        <input
          type="tel"
          required
          placeholder="+7 978 000-00-00"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl border-2 outline-none font-medium transition-all"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#FF6B35")}
          onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1.5" style={{ color: "#2C3E66" }}>
          Тип ремонта
        </label>
        <select
          value={form.repairType}
          onChange={(e) => setForm((f) => ({ ...f, repairType: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl border-2 outline-none font-medium bg-white transition-all"
          style={{ ...inputStyle, color: form.repairType ? "#333" : "#9ca3af" }}
          onFocus={(e) => (e.target.style.borderColor = "#FF6B35")}
          onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
        >
          <option value="">Выберите тип ремонта</option>
          <option value="Косметический">Косметический</option>
          <option value="Капитальный">Капитальный</option>
          <option value="Элитный">Элитный</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-4 rounded-xl text-white font-bold text-lg transition-all hover:opacity-90 active:scale-95"
        style={{ background: "linear-gradient(135deg, #FF6B35, #e85d2a)" }}
      >
        Отправить заявку
      </button>
      <p className="text-xs text-center text-gray-400">
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных
      </p>
    </form>
  );
}

function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600"
          style={{ background: "#f1f5f9" }}
        >
          <Icon name="X" size={16} />
        </button>
        <h2 className="text-2xl font-bold mb-6" style={{ color: "#2C3E66" }}>
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

function LightboxModal({
  img,
  title,
  onClose,
}: {
  img: string;
  title: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.88)" }}
      onClick={onClose}
    >
      <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white opacity-70 hover:opacity-100 transition-opacity"
        >
          <Icon name="X" size={28} />
        </button>
        <img src={img} alt={title} className="w-full rounded-2xl shadow-2xl" />
        <p className="text-white text-center mt-3 font-semibold opacity-60 text-sm">{title}</p>
      </div>
    </div>
  );
}

function PriceTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const cat = priceCategories[activeTab];

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {priceCategories.map((c, i) => (
          <button
            key={c.title}
            onClick={() => setActiveTab(i)}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={
              activeTab === i
                ? { background: "#2C3E66", color: "#fff" }
                : { background: "#F8F9FA", color: "#2C3E66" }
            }
          >
            {c.title}
          </button>
        ))}
      </div>

      {/* Price table */}
      <FadeSection key={activeTab}>
        <div
          className="rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 4px 24px rgba(44,62,102,0.10)" }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-6 py-4"
            style={{ background: "#2C3E66" }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(255,107,53,0.25)" }}
            >
              <Icon name={cat.icon} size={18} style={{ color: "#FF6B35" }} />
            </div>
            <h3 className="text-lg font-black text-white">{cat.title}</h3>
          </div>

          {/* Rows */}
          {cat.items.map((item, idx) => (
            <div
              key={item.name}
              className="flex items-center justify-between px-6 py-4 gap-4"
              style={{
                background: idx % 2 === 0 ? "#fff" : "#F8F9FA",
                borderBottom: "1px solid #EEF0F4",
              }}
            >
              <span className="text-sm font-medium" style={{ color: "#333" }}>
                {item.name}
              </span>
              <span
                className="text-sm font-bold whitespace-nowrap"
                style={{ color: "#FF6B35" }}
              >
                {item.price}
              </span>
            </div>
          ))}

          {/* Footer CTA */}
          <div
            className="px-6 py-4 flex items-center justify-between gap-4 flex-wrap"
            style={{ background: "#F8F9FA", borderTop: "2px solid #EEF0F4" }}
          >
            <p className="text-sm text-gray-500">
              Точная стоимость рассчитывается после бесплатного замера
            </p>
            <button
              onClick={() =>
                document.getElementById("form")?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #FF6B35, #e85d2a)" }}
            >
              Вызвать замерщика
            </button>
          </div>
        </div>
      </FadeSection>
    </div>
  );
}

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [lightbox, setLightbox] = useState<{ img: string; title: string } | null>(null);

  function openForm(type = "") {
    setModalType(type);
    setModalOpen(true);
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#FF6B35" }}>
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
              onClick={() => openForm()}
              className="px-4 py-2 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity"
              style={{ background: "#FF6B35" }}
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
              "linear-gradient(135deg, rgba(44,62,102,0.97) 0%, rgba(44,62,102,0.78) 55%, rgba(255,107,53,0.12) 100%)",
          }}
        />
        <div
          className="absolute top-20 right-10 w-80 h-80 rounded-full opacity-10"
          style={{ background: "#FF6B35", filter: "blur(70px)" }}
        />
        <div
          className="absolute bottom-20 left-10 w-52 h-52 rounded-full opacity-10"
          style={{ background: "#FF6B35", filter: "blur(50px)" }}
        />

        <div
          className="relative max-w-6xl mx-auto px-4 flex flex-col justify-center"
          style={{ minHeight: "92vh", paddingTop: "5rem", paddingBottom: "8rem" }}
        >
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
              style={{
                background: "rgba(255,107,53,0.18)",
                color: "#FF6B35",
                border: "1px solid rgba(255,107,53,0.4)",
              }}
            >
              <Icon name="MapPin" size={14} />
              Севастополь — любой район
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-5">
              Ремонт и отделка{" "}
              <span style={{ color: "#FF6B35" }}>квартир</span>
              <br />в Севастополе
            </h1>

            <p className="text-lg sm:text-xl mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
              Ремонтно-строительная бригада — ваш надёжный проводник
              <br className="hidden sm:block" /> в ремонте и строительстве
            </p>

            <a
              href={PHONE_LINK}
              className="block text-3xl sm:text-4xl font-black mb-8 hover:opacity-80 transition-opacity"
              style={{ color: "#FF6B35" }}
            >
              {PHONE}
            </a>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("form")}
                className="px-8 py-4 rounded-2xl text-white font-bold text-lg hover:opacity-90 active:scale-95 transition-all"
                style={{
                  background: "linear-gradient(135deg, #FF6B35, #e85d2a)",
                  boxShadow: "0 8px 28px rgba(255,107,53,0.4)",
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
                <div className="text-2xl font-black" style={{ color: "#FF6B35" }}>
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

      {/* ── SERVICES ── */}
      <section id="services" className="py-20" style={{ background: "#F8F9FA" }}>
        <div className="max-w-6xl mx-auto px-4">
          <FadeSection className="text-center mb-14">
            <span
              className="inline-block text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: "#FF6B35" }}
            >
              Услуги и цены
            </span>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "#2C3E66" }}>
              Выберите подходящий тариф
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Прозрачные цены без скрытых платежей. Окончательная стоимость фиксируется в договоре.
            </p>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <FadeSection key={plan.name}>
                <div
                  className="card-hover relative rounded-2xl overflow-hidden h-full flex flex-col"
                  style={
                    plan.featured
                      ? {
                          background: "#2C3E66",
                          outline: "2px solid #FF6B35",
                          boxShadow: "0 20px 60px rgba(44,62,102,0.25)",
                        }
                      : {
                          background: "#fff",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                        }
                  }
                >
                  {"badge" in plan && plan.badge && (
                    <div
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ background: "#FF6B35" }}
                    >
                      {plan.badge}
                    </div>
                  )}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="w-10 h-1 rounded mb-4" style={{ background: "#FF6B35" }} />
                    <h3
                      className="text-xl font-black mb-1"
                      style={{ color: plan.featured ? "#fff" : "#2C3E66" }}
                    >
                      {plan.name} ремонт
                    </h3>
                    <div className="mb-6 mt-2">
                      <span className="text-3xl font-black" style={{ color: "#FF6B35" }}>
                        {plan.price}
                      </span>
                      <span
                        className="text-sm font-semibold ml-1"
                        style={{ color: plan.featured ? "rgba(255,255,255,0.5)" : "#9ca3af" }}
                      >
                        {plan.unit}
                      </span>
                    </div>
                    <ul className="space-y-2.5 flex-1 mb-8">
                      {plan.works.map((w) => (
                        <li
                          key={w}
                          className="flex items-start gap-2.5 text-sm font-medium"
                          style={{ color: plan.featured ? "rgba(255,255,255,0.8)" : "#555" }}
                        >
                          <div
                            className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                            style={{
                              background: plan.featured
                                ? "rgba(255,107,53,0.25)"
                                : "rgba(255,107,53,0.12)",
                            }}
                          >
                            <Icon name="Check" size={10} style={{ color: "#FF6B35" }} />
                          </div>
                          {w}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => openForm(plan.name)}
                      className="w-full py-3.5 rounded-xl font-bold text-sm hover:opacity-90 active:scale-95 transition-all"
                      style={
                        plan.featured
                          ? { background: "#FF6B35", color: "#fff" }
                          : { background: "transparent", color: "#2C3E66", border: "2px solid #2C3E66" }
                      }
                    >
                      Выбрать тариф
                    </button>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICE LIST ── */}
      <section id="pricelist" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <FadeSection className="text-center mb-14">
            <span
              className="inline-block text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: "#FF6B35" }}
            >
              Прозрачные расценки
            </span>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "#2C3E66" }}>
              Цены на услуги
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              Итоговая стоимость зависит от объёма и сложности работ. Точный расчёт — на бесплатном выезде.
            </p>
          </FadeSection>

          {/* Tabs */}
          <PriceTabs />
        </div>
      </section>

      {/* ── ADVANTAGES ── */}
      <section id="advantages" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <FadeSection className="text-center mb-14">
            <span
              className="inline-block text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: "#FF6B35" }}
            >
              Почему выбирают нас
            </span>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "#2C3E66" }}>
              Наши преимущества
            </h2>
          </FadeSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((adv) => (
              <FadeSection key={adv.title}>
                <div className="card-hover p-7 rounded-2xl h-full" style={{ background: "#F8F9FA" }}>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: "linear-gradient(135deg, #FF6B35, #e85d2a)" }}
                  >
                    <Icon name={adv.icon} size={26} className="text-white" />
                  </div>
                  <h3 className="font-black text-lg mb-2" style={{ color: "#2C3E66" }}>
                    {adv.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500">{adv.text}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" className="py-20" style={{ background: "#F8F9FA" }}>
        <div className="max-w-6xl mx-auto px-4">
          <FadeSection className="text-center mb-14">
            <span
              className="inline-block text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: "#FF6B35" }}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {portfolio.map((item) => (
              <FadeSection key={item.title}>
                <div
                  className="card-hover rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() =>
                    setLightbox({ img: item.img, title: `${item.title} — ${item.desc}` })
                  }
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
                >
                  <div className="relative overflow-hidden" style={{ paddingBottom: "72%" }}>
                    <img
                      src={item.img}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                      style={{ transition: "transform 0.5s ease" }}
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "rgba(44,62,102,0.6)" }}
                    >
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        <Icon name="ZoomIn" size={22} className="text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <div className="font-bold text-sm" style={{ color: "#2C3E66" }}>
                      {item.title}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            * Замените фото на реальные снимки ваших объектов
          </p>
        </div>
      </section>

      {/* ── FORM SECTION ── */}
      <section id="form" className="py-20" style={{ background: "#2C3E66" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeSection>
              <span
                className="inline-block text-sm font-bold uppercase tracking-widest mb-3"
                style={{ color: "#FF6B35" }}
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
                      style={{ background: "rgba(255,107,53,0.2)" }}
                    >
                      <Icon name={icon} size={16} style={{ color: "#FF6B35" }} />
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
              style={{ color: "#FF6B35" }}
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
                    style={{ color: "#FF6B35" }}
                  >
                    {PHONE}
                  </a>
                  <a
                    href={PHONE_LINK}
                    className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-xl text-white font-bold hover:opacity-90 transition-opacity"
                    style={{ background: "#FF6B35" }}
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
                style={{ background: "#FF6B35" }}
              >
                <Icon name="Hammer" size={16} className="text-white" />
              </div>
              <span className="font-black text-lg text-white">РемСтрой</span>
            </div>
            <div className="text-center">
              <a href={PHONE_LINK} className="font-bold text-lg" style={{ color: "#FF6B35" }}>
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

      {/* ── FLOATING CALL (mobile) ── */}
      <a
        href={PHONE_LINK}
        className="fixed bottom-6 right-6 z-40 md:hidden flex items-center gap-2 px-5 py-3.5 rounded-2xl text-white font-bold"
        style={{
          background: "linear-gradient(135deg, #FF6B35, #e85d2a)",
          boxShadow: "0 8px 24px rgba(255,107,53,0.5)",
        }}
      >
        <Icon name="Phone" size={18} />
        Позвонить
      </a>

      {/* ── MODAL ── */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Записаться на замер">
        <ContactForm initialType={modalType} onClose={() => setModalOpen(false)} />
      </Modal>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <LightboxModal
          img={lightbox.img}
          title={lightbox.title}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}