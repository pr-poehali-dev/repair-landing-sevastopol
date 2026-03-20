import { useState } from "react";
import Icon from "@/components/ui/icon";
import { plans, priceCategories, advantages, FadeSection } from "./shared";

interface ServicesSectionProps {
  onOpenForm: (type?: string) => void;
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
              style={{ background: "rgba(144,192,70,0.25)" }}
            >
              <Icon name={cat.icon} size={18} style={{ color: "#90c046" }} />
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
                style={{ color: "#90c046" }}
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
              style={{ background: "linear-gradient(135deg, #90c046, #7aaa35)" }}
            >
              Вызвать замерщика
            </button>
          </div>
        </div>
      </FadeSection>
    </div>
  );
}

export default function ServicesSection({ onOpenForm }: ServicesSectionProps) {
  return (
    <>
      {/* ── SERVICES ── */}
      <section id="services" className="py-20" style={{ background: "#F8F9FA" }}>
        <div className="max-w-6xl mx-auto px-4">
          <FadeSection className="text-center mb-14">
            <span
              className="inline-block text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: "#90c046" }}
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
                          outline: "2px solid #90c046",
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
                      style={{ background: "#90c046" }}
                    >
                      {plan.badge}
                    </div>
                  )}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="w-10 h-1 rounded mb-4" style={{ background: "#90c046" }} />
                    <h3
                      className="text-xl font-black mb-1"
                      style={{ color: plan.featured ? "#fff" : "#2C3E66" }}
                    >
                      {plan.name} ремонт
                    </h3>
                    <div className="mb-6 mt-2">
                      <span className="text-3xl font-black" style={{ color: "#90c046" }}>
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
                                ? "rgba(144,192,70,0.25)"
                                : "rgba(144,192,70,0.12)",
                            }}
                          >
                            <Icon name="Check" size={10} style={{ color: "#90c046" }} />
                          </div>
                          {w}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => onOpenForm(plan.name)}
                      className="w-full py-3.5 rounded-xl font-bold text-sm hover:opacity-90 active:scale-95 transition-all"
                      style={
                        plan.featured
                          ? { background: "#90c046", color: "#fff" }
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
              style={{ color: "#90c046" }}
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
          <PriceTabs />
        </div>
      </section>

      {/* ── EXTRA SERVICES ── */}
      <section className="py-20" style={{ background: "#F8F9FA" }}>
        <div className="max-w-6xl mx-auto px-4">
          <FadeSection className="text-center mb-14">
            <span
              className="inline-block text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: "#90c046" }}
            >
              Дополнительно
            </span>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "#2C3E66" }}>
              Дополнительные услуги
            </h2>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                img: "https://cdn.poehali.dev/projects/5e07da6b-4213-47f1-baf0-922f8167f042/files/ea3d1811-b29a-4829-bc37-01f5b6b8d169.jpg",
                title: "Балконы и окна",
                icon: "AppWindow",
                desc: "Остекление балконов и лоджий, установка ПВХ и деревянных окон, утепление и отделка балконного пространства под ключ. Монтаж подоконников, откосов и отливов.",
              },
              {
                img: "https://cdn.poehali.dev/projects/5e07da6b-4213-47f1-baf0-922f8167f042/files/34520a0a-0dba-4f35-8765-72ec70061320.jpg",
                title: "Кованые изделия",
                icon: "Wrench",
                desc: "Изготовление и монтаж кованых заборов, ворот, перил и лестничных ограждений. Декоративные элементы, мебель и предметы интерьера из кованого металла на заказ.",
              },
            ].map(({ img, title, icon, desc }) => (
              <FadeSection key={title}>
                <div
                  className="relative rounded-2xl overflow-hidden group cursor-pointer"
                  style={{ height: 320, boxShadow: "0 8px 32px rgba(44,62,102,0.13)" }}
                >
                  <img
                    src={img}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(20,30,60,0.85) 0%, rgba(20,30,60,0.25) 55%, transparent 100%)",
                    }}
                  />
                  <div
                    className="absolute left-6 right-6 flex items-center gap-3 transition-all duration-500"
                    style={{ bottom: 20 }}
                    ref={(el) => {
                      if (!el) return;
                      const card = el.closest(".group") as HTMLElement;
                      if (!card) return;
                      const move = () => { el.style.bottom = ""; el.style.top = "20px"; };
                      const reset = () => { el.style.top = ""; el.style.bottom = "20px"; };
                      card.addEventListener("mouseenter", move);
                      card.addEventListener("mouseleave", reset);
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(144,192,70,0.85)" }}
                    >
                      <Icon name={icon} size={18} className="text-white" />
                    </div>
                    <h3 className="text-xl font-black text-white">{title}</h3>
                  </div>
                  <div className="absolute bottom-5 left-6 right-6 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                    <p className="text-sm text-white leading-relaxed" style={{ opacity: 0.9 }}>
                      {desc}
                    </p>
                    <button
                      onClick={() =>
                        document.getElementById("form")?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold transition-opacity hover:opacity-80"
                      style={{ color: "#90c046" }}
                    >
                      Узнать стоимость
                      <Icon name="ArrowRight" size={14} />
                    </button>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADVANTAGES ── */}
      <section id="advantages" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <FadeSection className="text-center mb-14">
            <span
              className="inline-block text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: "#90c046" }}
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
                    style={{ background: "linear-gradient(135deg, #90c046, #7aaa35)" }}
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
    </>
  );
}
