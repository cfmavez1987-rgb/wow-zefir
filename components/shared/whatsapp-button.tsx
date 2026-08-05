"use client";

import { useState, useEffect } from "react";
import { Icon } from "@/components/ui/icon";
import { createWhatsAppUrl } from "@/lib/whatsapp";

interface WhatsAppButtonProps {
  translations: {
    common: {
      orderViaWhatsApp: string;
    };
  };
}

export function WhatsAppButton({ translations }: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  const whatsappUrl = createWhatsAppUrl();

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 flex items-center justify-center bg-[#25D366] text-white rounded-full shadow-large hover:bg-[#128C7E] hover:shadow-glow transition-all duration-300 ease-out animate-scale-in"
      aria-label={translations.common.orderViaWhatsApp}
    >
      <Icon name="whatsapp" size={28} />
    </a>
  );
}
