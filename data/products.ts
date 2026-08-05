export interface Product {
  id: string;
  slug: string;
  name: {
    ru: string;
    kk: string;
  };
  description: {
    ru: string;
    kk: string;
  };
  price: number;
  sizes: {
    small?: { price: number };
    medium?: { price: number };
    large?: { price: number };
  };
  colors: string[];
  category: "popular" | "new" | "gifts";
  tags: string[];
  images: string[];
  isHit?: boolean;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "romantic-pink-roses",
    name: {
      ru: "Романтичные розовые розы",
      kk: "Романтикалық қызыл раушандар",
    },
    description: {
      ru: "Нежный букет из зефирных роз в пастельно-розовых тонах. Идеально подходит для романтического подарка или признания в любви.",
      kk: "Пастельді қызыл түстердегі зефир раушандарының нәзік букеті. Романтикалық сыйлық немесе махаббат жариялау үшін тамаша.",
    },
    price: 15000,
    sizes: {
      small: { price: 15000 },
      medium: { price: 25000 },
      large: { price: 35000 },
    },
    colors: ["#F9A8D4", "#FDE68A", "#FFFFFF"],
    category: "popular",
    tags: ["romantic", "roses", "pink"],
    images: ["/images/products/romantic-pink-roses-1.jpg"],
    isHit: true,
  },
  {
    id: "2",
    slug: "lavender-dream",
    name: {
      ru: "Лавандовая мечта",
      kk: "Лаванда арманы",
    },
    description: {
      ru: "Изысканный букет с зефирными цветами в лавандовых и фиолетовых тонах. Создаёт атмосферу уюта и спокойствия.",
      kk: "Лаванда және күлгін түстердегі зефир гүлдерімен безендірілген талғампаз букет. Жайлылық пен тыныштық атмосферасын жасайды.",
    },
    price: 18000,
    sizes: {
      small: { price: 18000 },
      medium: { price: 28000 },
      large: { price: 38000 },
    },
    colors: ["#C4B5FD", "#A78BFA", "#E9D5FF"],
    category: "popular",
    tags: ["lavender", "purple", "elegant"],
    images: ["/images/products/lavender-dream-1.jpg"],
    isHit: true,
  },
  {
    id: "3",
    slug: "spring-meadow",
    name: {
      ru: "Весенний луг",
      kk: "Көктемгі жазық",
    },
    description: {
      ru: "Яркий букет, напоминающий весенний луг. Сочетание зефирных пионов, ранункулюсов и ромашек в свежих зелёных и розовых тонах.",
      kk: "Көктемгі жазықты еске түсіретін жарқын букет. Жаңа жасыл және қызыл түстердегі зефир пиондары, ранункулюстер мен қалақайлардың үйлесімі.",
    },
    price: 20000,
    sizes: {
      small: { price: 20000 },
      medium: { price: 30000 },
      large: { price: 42000 },
    },
    colors: ["#86EFAC", "#F9A8D4", "#FDE68A"],
    category: "new",
    tags: ["spring", "colorful", "peonies"],
    images: ["/images/products/spring-meadow-1.jpg"],
    isNew: true,
  },
  {
    id: "4",
    slug: "white-elegance",
    name: {
      ru: "Белая элегантность",
      kk: "Ақ талғампаздық",
    },
    description: {
      ru: "Элегантный монохромный букет из белых зефирных хризантем и роз. Символ чистоты и утончённости. Идеален для свадеб и торжеств.",
      kk: "Ақ зефир хризантемалары мен раушандарынан жасалған талғампаз монохромды букет. Тазалық және нәзіктік символы. Тойлар мен мерекелер үшін тамаша.",
    },
    price: 22000,
    sizes: {
      small: { price: 22000 },
      medium: { price: 32000 },
      large: { price: 45000 },
    },
    colors: ["#FFFFFF", "#F5F5F4", "#E7E5E4"],
    category: "popular",
    tags: ["white", "elegant", "wedding"],
    images: ["/images/products/white-elegance-1.jpg"],
  },
  {
    id: "5",
    slug: "sunny-day",
    name: {
      ru: "Солнечный день",
      kk: "Күндізгі күн",
    },
    description: {
      ru: "Тёплый и яркий букет в жёлто-белых тонах. Зефирные подсолнухи и ромашки подарят настроение и улыбку.",
      kk: "Сары-ақ түстердегі жылы және жарқын букет. Зефир күнбағыстары мен қалақайлар көңіл-күй мен күлімсіреу сыйлайды.",
    },
    price: 16000,
    sizes: {
      small: { price: 16000 },
      medium: { price: 26000 },
      large: { price: 36000 },
    },
    colors: ["#FDE68A", "#FFFFFF", "#86EFAC"],
    category: "popular",
    tags: ["yellow", "cheerful", "sunflowers"],
    images: ["/images/products/sunny-day-1.jpg"],
  },
  {
    id: "6",
    slug: "tenderness-box",
    name: {
      ru: "Нежность в коробке",
      kk: "Қораптағы нәзіктік",
    },
    description: {
      ru: "Подарочная коробка с ассорти зефира и безе. Нежные пастельные цвета и изысканный вкус. Идеальный подарок для сладкоежек.",
      kk: "Зефир мен безе ассортименті бар сыйлық қорап. Нәзік пастельді түстер мен талғампаз дәм. Тәтті жақсы көретіндер үшін тамаша сыйлық.",
    },
    price: 12000,
    sizes: {
      small: { price: 12000 },
      medium: { price: 18000 },
      large: { price: 25000 },
    },
    colors: ["#F9A8D4", "#C4B5FD", "#FDE68A"],
    category: "gifts",
    tags: ["box", "assorted", "gift"],
    images: ["/images/products/tenderness-box-1.jpg"],
    isHit: true,
  },
  {
    id: "7",
    slug: "bird-milk-deluxe",
    name: {
      ru: "Птичье молоко Делюкс",
      kk: "Құс сүті Делюкс",
    },
    description: {
      ru: "Коробочка с нежнейшим десертом «птичье молоко» в подарочной упаковке. Воздушный суфле с ноткой ванили покрыт шоколадной глазурью.",
      kk: "Сыйлық орамадағы ең нәзік «құс сүті» десертінің қорапшасы. Ваниль нотасы бар ауа суфлесі шоколад глазурімен жабылған.",
    },
    price: 10000,
    sizes: {
      small: { price: 10000 },
      medium: { price: 15000 },
      large: { price: 20000 },
    },
    colors: ["#FFFFFF", "#92400E"],
    category: "gifts",
    tags: ["bird-milk", "chocolate", "dessert"],
    images: ["/images/products/bird-milk-deluxe-1.jpg"],
    isNew: true,
  },
  {
    id: "8",
    slug: "pastel-dreams",
    name: {
      ru: "Пастельные грёзы",
      kk: "Пастельді армандар",
    },
    description: {
      ru: "Мечтательный букет в мягких пастельных тонах. Сочетание розовых, лавандовых и кремовых зефирных цветов создаёт атмосферу нежности.",
      kk: "Жұмсақ пастельді түстердегі арманды букет. Қызыл, лаванда және кремді зефир гүлдерінің үйлесімі нәзіктік атмосферасын жасайды.",
    },
    price: 19000,
    sizes: {
      small: { price: 19000 },
      medium: { price: 29000 },
      large: { price: 40000 },
    },
    colors: ["#F9A8D4", "#C4B5FD", "#FFFBF5"],
    category: "new",
    tags: ["pastel", "dreamy", "soft"],
    images: ["/images/products/pastel-dreams-1.jpg"],
    isNew: true,
  },
  {
    id: "9",
    slug: "royal-peony",
    name: {
      ru: "Королевский пион",
      kk: "Патша пионы",
    },
    description: {
      ru: "Роскошный букет из крупных зефирных пионов. Пышные цветы в розовых и бордовых тонах создают королевский вид.",
      kk: "Үлкен зефир пиондарынан жасалған сәнді букет. Қызыл және қоңыр қызыл түстердегі жұмсақ гүлдер патша көрінісін жасайды.",
    },
    price: 25000,
    sizes: {
      small: { price: 25000 },
      medium: { price: 35000 },
      large: { price: 48000 },
    },
    colors: ["#F9A8D4", "#BE185D", "#FDE68A"],
    category: "popular",
    tags: ["peony", "luxurious", "pink"],
    images: ["/images/products/royal-peony-1.jpg"],
  },
  {
    id: "10",
    slug: "candy-bouquet",
    name: {
      ru: "Конфетный букет",
      kk: "Кәмпит букет",
    },
    description: {
      ru: "Яркий букет из зефирных цветов с добавлением конфет и сладостей. Весёлый и вкусный подарок для любого праздника.",
      kk: "Кәмпиттер мен тәттілер қосылған зефир гүлдерінен жарқын букет. Кез келген мереке үшін көңілді және дәмді сыйлық.",
    },
    price: 17000,
    sizes: {
      small: { price: 17000 },
      medium: { price: 27000 },
      large: { price: 37000 },
    },
    colors: ["#F9A8D4", "#FDE68A", "#86EFAC"],
    category: "gifts",
    tags: ["candy", "colorful", "fun"],
    images: ["/images/products/candy-bouquet-1.jpg"],
  },
  {
    id: "11",
    slug: "gentle-chrysanthemums",
    name: {
      ru: "Нежные хризантемы",
      kk: "Нәзік хризантемалар",
    },
    description: {
      ru: "Изящный букет из зефирных хризантем в нежно-розовых и белых тонах. Классическая элегантность для особых случаев.",
      kk: "Нәзік қызыл және ақ түстердегі зефир хризантемаларынан жасалған әсем букет. Ерекше жағдайлар үшін классикалық талғампаздық.",
    },
    price: 21000,
    sizes: {
      small: { price: 21000 },
      medium: { price: 31000 },
      large: { price: 43000 },
    },
    colors: ["#F9A8D4", "#FFFFFF", "#E7E5E4"],
    category: "popular",
    tags: ["chrysanthemums", "classic", "elegant"],
    images: ["/images/products/gentle-chrysanthemums-1.jpg"],
  },
  {
    id: "12",
    slug: "mini-sweet-box",
    name: {
      ru: "Мини сладкая коробка",
      kk: "Мини тәтті қорап",
    },
    description: {
      ru: "Компактная подарочная коробочка с миниатюрными зефирками и безе. Отличный вариант для небольшого подарка или комплимента.",
      kk: "Миниатюралық зефирлер мен безе бар компактты сыйлық қорапша. Кішкентай сыйлық немесе комплимент үшін тамаша нұсқа.",
    },
    price: 8000,
    sizes: {
      small: { price: 8000 },
      medium: { price: 12000 },
    },
    colors: ["#F9A8D4", "#C4B5FD", "#FDE68A"],
    category: "gifts",
    tags: ["mini", "compact", "sweet"],
    images: ["/images/products/mini-sweet-box-1.jpg"],
    isNew: true,
  },
  {
    id: "13",
    slug: "garden-bouquet",
    name: {
      ru: "Садовый букет",
      kk: "Бақша букет",
    },
    description: {
      ru: "Разнообразный букет, напоминающий цветущий сад. Сочетание разных видов зефирных цветов в гармоничной композиции.",
      kk: "Гүлденген бақшаны еске түсіретін әртүрлі букет. Үйлесімді композициядағы әртүрлі зефир гүлдерінің үйлесімі.",
    },
    price: 23000,
    sizes: {
      small: { price: 23000 },
      medium: { price: 33000 },
      large: { price: 46000 },
    },
    colors: ["#F9A8D4", "#86EFAC", "#FDE68A", "#C4B5FD"],
    category: "new",
    tags: ["garden", "mixed", "colorful"],
    images: ["/images/products/garden-bouquet-1.jpg"],
    isNew: true,
  },
  {
    id: "14",
    slug: "vanilla-cloud",
    name: {
      ru: "Ванильное облако",
      kk: "Ванильді бұлт",
    },
    description: {
      ru: "Воздушный букет в кремовых и белых тонах. Нежные зефирные розы и хризантемы создают ощущение лёгкости и воздушности.",
      kk: "Кремді және ақ түстердегі ауа букет. Нәзік зефир раушандары мен хризантемалар жеңілдік пен ауа сезімін жасайды.",
    },
    price: 24000,
    sizes: {
      small: { price: 24000 },
      medium: { price: 34000 },
      large: { price: 47000 },
    },
    colors: ["#FFFBF5", "#FFFFFF", "#FDE68A"],
    category: "popular",
    tags: ["vanilla", "cream", "air"],
    images: ["/images/products/vanilla-cloud-1.jpg"],
  },
  {
    id: "15",
    slug: "birthday-special",
    name: {
      ru: "Специально на День Рождения",
      kk: "Туған күнге арнайы",
    },
    description: {
      ru: "Праздничный букет, созданный специально для Дня Рождения. Яркие зефирные цветы с декоративными элементами и надписью.",
      kk: "Туған күнге арнайы жасалған мерекелік букет. Жазуы мен декоративті элементтері бар жарқын зефир гүлдері.",
    },
    price: 20000,
    sizes: {
      small: { price: 20000 },
      medium: { price: 30000 },
      large: { price: 42000 },
    },
    colors: ["#F9A8D4", "#FDE68A", "#C4B5FD", "#86EFAC"],
    category: "popular",
    tags: ["birthday", "festive", "celebration"],
    images: ["/images/products/birthday-special-1.jpg"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((p) => p.category === category);
}

export function getHitProducts(): Product[] {
  return products.filter((p) => p.isHit);
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.isNew);
}
