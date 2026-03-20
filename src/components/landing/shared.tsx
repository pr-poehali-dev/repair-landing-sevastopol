import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

export const HERO_IMG =
  "https://cdn.poehali.dev/projects/5e07da6b-4213-47f1-baf0-922f8167f042/files/270aa61f-2a5b-464d-91c7-ca07135596b8.jpg";

export const PHONE = "+7 978 820-53-72";
export const PHONE_LINK = "tel:+79788205372";

export const plans = [
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

export const priceCategories = [
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

export const advantages = [
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

export const PORTFOLIO_CATEGORIES = ["Все", "Квартиры", "Ванные комнаты", "Кухни", "Офисы", "Балконы"] as const;

export const portfolio = [
  { title: "Квартира 70 м²", desc: "Косметический ремонт", img: HERO_IMG, category: "Квартиры" },
  { title: "Двухкомнатная квартира", desc: "Капитальный ремонт", img: HERO_IMG, category: "Квартиры" },
  { title: "Дизайнерский ремонт", desc: "Элит-класс", img: HERO_IMG, category: "Квартиры" },
  { title: "Офисное помещение", desc: "Отделка под ключ", img: HERO_IMG, category: "Офисы" },
  { title: "Ванная комната", desc: "Плитка и сантехника", img: HERO_IMG, category: "Ванные комнаты" },
  { title: "Ванная под ключ", desc: "Капитальный ремонт", img: HERO_IMG, category: "Ванные комнаты" },
  { title: "Кухня-гостиная", desc: "Дизайнерский ремонт", img: HERO_IMG, category: "Кухни" },
  { title: "Кухня 12 м²", desc: "Косметический ремонт", img: HERO_IMG, category: "Кухни" },
  { title: "Балкон с остеклением", desc: "Остекление и отделка", img: HERO_IMG, category: "Балконы" },
  { title: "Лоджия под ключ", desc: "Утепление и отделка", img: HERO_IMG, category: "Балконы" },
  { title: "Студия 35 м²", desc: "Капитальный ремонт", img: HERO_IMG, category: "Квартиры" },
  { title: "Офис 80 м²", desc: "Отделка под ключ", img: HERO_IMG, category: "Офисы" },
];

export function useFadeIn() {
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

export function FadeSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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

export function ContactForm({ initialType = "", onClose }: { initialType?: string; onClose?: () => void }) {
  const [form, setForm] = useState<FormData>({ name: "", phone: "", repairType: initialType });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Заявка отправлена:", form);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="text-center py-8">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: "#90c046" }}
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
            style={{ background: "#90c046" }}
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
          onFocus={(e) => (e.target.style.borderColor = "#90c046")}
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
          onFocus={(e) => (e.target.style.borderColor = "#90c046")}
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
          onFocus={(e) => (e.target.style.borderColor = "#90c046")}
          onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
        >
          <option value="">Выберите тип ремонта</option>
          <option value="Косметический">Косметический</option>
          <option value="Капитальный">Капитальный</option>
          <option value="Элитный">Элитный</option>
          <option value="Консультация">Консультация</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-4 rounded-xl text-white font-bold text-lg transition-all hover:opacity-90 active:scale-95"
        style={{ background: "linear-gradient(135deg, #90c046, #7aaa35)" }}
      >
        Отправить заявку
      </button>
      <p className="text-xs text-center text-gray-400">
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных
      </p>
    </form>
  );
}

export function Modal({
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

export function LightboxModal({
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
