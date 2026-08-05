const WHATSAPP_NUMBER = "77023193219";

export interface WhatsAppMessageData {
  productName?: string;
  productSize?: string;
  customMessage?: string;
}

export function createWhatsAppUrl(data: WhatsAppMessageData = {}): string {
  let message = "";

  if (data.productName) {
    message = `Здравствуйте! Хочу заказать букет "${data.productName}"`;
    if (data.productSize) {
      message += `, размер: ${data.productSize}`;
    }
    message += ". Подскажите, пожалуйста, подробности.";
  } else if (data.customMessage) {
    message = data.customMessage;
  } else {
    message = "Здравствуйте! Хочу заказать зефирный букет. Подскажите, пожалуйста, подробности.";
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

export function createWhatsAppUrlForReview(): string {
  const message = "Здравствуйте! Хочу оставить отзыв о вашем букете.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
