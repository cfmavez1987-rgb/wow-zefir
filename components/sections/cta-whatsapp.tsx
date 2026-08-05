import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import type { Locale } from "@/lib/i18n";

interface CTWhatsAppProps {
  locale: Locale;
  translations: {
    hero: {
      title: string;
      cta: string;
    };
    common: {
      orderViaWhatsApp: string;
    };
  };
}

export function CTWhatsApp({ locale, translations }: CTWhatsAppProps) {
  const whatsappUrl = createWhatsAppUrl();

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-r from-primary to-accent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="whatsapp" size={32} className="text-white" />
        </div>

        <h2 className="font-display text-display sm:text-display-lg font-bold text-white mb-4">
          {translations.hero.title}
        </h2>

        <p className="text-body-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Закажите зефирный букет прямо сейчас через WhatsApp. Мы ответим в течение нескольких минут и поможем выбрать идеальный подарок.
        </p>

        <Button
          variant="whatsapp"
          size="lg"
          href={whatsappUrl}
          icon={<Icon name="whatsapp" size={24} />}
          className="bg-white text-[#25D366] hover:bg-white/90"
        >
          {translations.common.orderViaWhatsApp}
        </Button>
      </div>
    </section>
  );
}
