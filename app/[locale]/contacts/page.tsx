import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/shared/section-title";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import ruTranslations from "@/data/translations/ru.json";
import kkTranslations from "@/data/translations/kk.json";

function getTranslations(locale: Locale) {
  return locale === "kk" ? kkTranslations : ruTranslations;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = getTranslations(locale as Locale);

  return generateSEOMetadata({
    title: translations.seo.contacts.title,
    description: translations.seo.contacts.description,
    path: "/contacts",
    locale: locale as Locale,
  });
}

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = getTranslations(locale as Locale);
  const whatsappUrl = createWhatsAppUrl();

  const contactMethods = [
    {
      icon: "whatsapp",
      title: translations.contacts.whatsapp,
      description: translations.contacts.whatsappDescription,
      link: whatsappUrl,
      linkText: translations.common.orderViaWhatsApp,
      color: "bg-[#25D366] text-white",
      hoverColor: "hover:bg-[#128C7E]",
    },
    {
      icon: "instagram",
      title: translations.contacts.instagram,
      description: translations.contacts.instagramDescription,
      link: "https://www.instagram.com/wow_zefir_aktau",
      linkText: "@wow_zefir_aktau",
      color: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white",
      hoverColor: "hover:opacity-90",
    },
    {
      icon: "phone",
      title: translations.contacts.phone,
      description: translations.contacts.phoneDescription,
      link: "tel:+77023193219",
      linkText: translations.common.phone,
      color: "bg-primary text-white",
      hoverColor: "hover:bg-primary-dark",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary-light via-cream to-accent-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-display-lg sm:text-[4.5rem] font-bold text-neutral-900 mb-4">
              {translations.contacts.title}
            </h1>
            <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
              {translations.contacts.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-primary-light to-accent-light rounded-xl p-6 sm:p-8 text-center"
              >
                <div
                  className={`w-14 h-14 ${method.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                >
                  <Icon name={method.icon} size={28} />
                </div>
                <h3 className="font-display text-subheading font-semibold text-neutral-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-body-sm text-neutral-600 mb-4">
                  {method.description}
                </p>
                <a
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 ${method.color} ${method.hoverColor} rounded-lg text-body-sm font-medium transition-all duration-200`}
                >
                  {method.linkText}
                </a>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-cream rounded-xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center shrink-0">
                  <Icon name="mapPin" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-subheading font-semibold text-neutral-900 mb-2">
                    {translations.contacts.address}
                  </h3>
                  <p className="text-body text-neutral-600">
                    {translations.contacts.addressValue}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-cream rounded-xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center shrink-0">
                  <Icon name="clock" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-subheading font-semibold text-neutral-900 mb-2">
                    {translations.contacts.workHours}
                  </h3>
                  <p className="text-body text-neutral-600">
                    {translations.contacts.workHoursValue}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
