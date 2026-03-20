import { useState } from "react";
import Icon from "@/components/ui/icon";
import { PHONE_LINK, Modal, ContactForm, LightboxModal } from "@/components/landing/shared";
import HeroHeader from "@/components/landing/HeroHeader";
import ServicesSection from "@/components/landing/ServicesSection";
import ContactsSection from "@/components/landing/ContactsSection";

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [lightbox, setLightbox] = useState<{ img: string; title: string } | null>(null);

  function openForm(type = "") {
    setModalType(type);
    setModalOpen(true);
  }

  return (
    <div style={{ fontFamily: "Montserrat, sans-serif", color: "#333" }}>

      <HeroHeader onOpenForm={openForm} />

      <ServicesSection onOpenForm={openForm} />

      <ContactsSection onLightbox={(img, title) => setLightbox({ img, title })} />

      {/* ── FLOATING CALL (mobile) ── */}
      <a
        href={PHONE_LINK}
        className="fixed bottom-6 right-6 z-40 md:hidden flex items-center gap-2 px-5 py-3.5 rounded-2xl text-white font-bold"
        style={{
          background: "linear-gradient(135deg, #90c046, #7aaa35)",
          boxShadow: "0 8px 24px rgba(144,192,70,0.5)",
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
