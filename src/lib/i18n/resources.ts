import { fallback } from "@tanstack/zod-adapter";
import * as z from "zod";

export const LANGUAGES_CODE = [
  "en",
  "fr",
  "id",
  "es",
  "ja",
  "de",
  "ru",
  "zh",
] as const;

export const LANGUAGES: Record<(typeof LANGUAGES_CODE)[number], string> = {
  en: "English",
  fr: "French",
  id: "Indonesian",
  es: "Spanish",
  ja: "Japanese",
  de: "German",
  ru: "Russian",
  zh: "Chinese",
} as const;

export const i18nSearchSchema = z.object({
  lang: fallback(z.enum(LANGUAGES_CODE), "en").default("en"),
});

type Resources = {
  [key in (typeof LANGUAGES_CODE)[number]]: {
    translation: Record<string, string>;
  };
};

export default {
  en: {
    translation: {
      "Welcome Text":
        "Welcome to Bali, a beautiful island with a rich culture.",
      "Notification Label": "Notifications🚀",
      "Select Language Value": "Change Language",
      "Select Language Label": "Choose Language",
      "Dummy Language":
        "In a world brimming with possibilities, every word holds a unique power. From the simple elegance of a well-placed comma to the profound impact of a meticulously crafted sentence, language shapes our understanding and colors our perceptions. We embark on a journey, exploring the vast landscapes of meaning, one phrase at a time. The echoes of stories past blend seamlessly with the whispers of future narratives, creating a tapestry woven with threads of thought and emotion.",
    },
  },
  fr: {
    translation: {
      "Welcome Text": "Bienvenue à Bali, une belle île à la culture riche.",
      "Notification Label": "Notifications🚀",
      "Select Language Value": "Changer de langue",
      "Select Language Label": "Choisir la langue",
      "Dummy Language":
        "Dans un monde débordant de possibilités, chaque mot détient un pouvoir unique. De la simple élégance d'une virgule bien placée à l'impact profond d'une phrase méticuleusement conçue, le langage façonne notre compréhension et colore nos perceptions. Nous nous embarquons dans un voyage, explorant les vastes paysages de la signification, une phrase à la fois. Les échos des histoires passées se mêlent harmonieusement aux murmures des récits futurs, créant une tapisserie tissée de fils de pensée et d'émotion.",
    },
  },
  id: {
    translation: {
      "Welcome Text":
        "Selamat datang di Bali, pulau yang indah dengan budaya yang kaya.",
      "Notification Label": "Notifikasi🚀",
      "Select Language Value": "Ganti Bahasa",
      "Select Language Label": "Pilih Bahasa",
      "Dummy Language":
        "Di dunia yang penuh dengan kemungkinan, setiap kata memiliki kekuatan unik. Dari keanggunan sederhana koma yang ditempatkan dengan baik hingga dampak mendalam dari kalimat yang dibuat dengan cermat, bahasa membentuk pemahaman kita dan mewarnai persepsi kita. Kita memulai perjalanan, menjelajahi lanskap makna yang luas, satu frasa pada satu waktu. Gema cerita masa lalu berpadu mulus dengan bisikan narasi masa depan, menciptakan permadani yang ditenun dengan benang-benang pemikiran dan emosi.",
    },
  },
  es: {
    translation: {
      "Welcome Text":
        "Bienvenidos a Bali, una hermosa isla con una rica cultura.",
      "Notification Label": "Notificaciones🚀",
      "Select Language Value": "Cambiar idioma",
      "Select Language Label": "Elegir idioma",
      "Dummy Language":
        "En un mundo rebosante de posibilidades, cada palabra encierra un poder único. Desde la sencilla elegancia de una coma bien situada hasta el profundo impacto de una frase meticulosamente elaborada, el lenguaje moldea nuestra comprensión y colorea nuestras percepciones. Nos embarcamos en un viaje, explorando los vastos paisajes del significado, una frase a la vez. Los ecos de historias pasadas se mezclan a la perfección con los susurros de narrativas futuras, creando un tapiz tejido con hilos de pensamiento y emoción.",
    },
  },
  ja: {
    translation: {
      "Welcome Text": "バリへようこそ。豊かな文化を持つ美しい島です。",
      "Notification Label": "通知🚀",
      "Select Language Value": "言語を変更",
      "Select Language Label": "言語を選択",
      "Dummy Language":
        "可能性に満ちた世界では、すべての言葉が独自の力を持っています。適切に配置されたコンマの単純な優雅さから、綿密に作成された文章の深遠な影響まで、言語は私たちの理解を形作り、認識に色を付けます。私たちは旅に乗り出し、意味の広大な風景を一度に1つのフレーズで探索します。過去の物語の残響は未来の物語のささやきとシームレスに混ざり合い、思考と感情の糸で織りなされたタペストリーを作り出します。",
    },
  },
  de: {
    translation: {
      "Welcome Text":
        "Willkommen auf Bali, einer wunderschönen Insel mit einer reichen Kultur.",
      "Notification Label": "Benachrichtigungen🚀",
      "Select Language Value": "Sprache ändern",
      "Select Language Label": "Sprache wählen",
      "Dummy Language":
        "In einer Welt voller Möglichkeiten birgt jedes Wort eine einzigartige Kraft. Von der schlichten Eleganz eines gut platzierten Kommas bis zum tiefgreifenden Einfluss eines sorgfältig ausgearbeiteten Satzes prägt Sprache unser Verständnis und färbt unsere Wahrnehmungen. Wir begeben uns auf eine Reise und erkunden die weiten Landschaften der Bedeutung, Satz für Satz. Die Echos vergangener Geschichten verschmelzen nahtlos mit den Flüstern zukünftiger Erzählungen und schaffen einen Teppich, der mit Fäden aus Gedanken und Emotionen gewebt ist.",
    },
  },
  ru: {
    translation: {
      "Welcome Text":
        "Добро пожаловать на Бали, прекрасный остров с богатой культурой.",
      "Notification Label": "Уведомления🚀",
      "Select Language Value": "Изменить язык",
      "Select Language Label": "Выбрать язык",
      "Dummy Language":
        "В мире, изобилующем возможностями, каждое слово обладает уникальной силой. От простой элегантности правильно расставленной запятой до глубокого воздействия тщательно составленного предложения, язык формирует наше понимание и окрашивает наши восприятия. Мы отправляемся в путешествие, исследуя обширные просторы значений, по одной фразе за раз. Эхо прошлых историй плавно сливается с шепотом будущих повествований, создавая гобелен, сотканный из нитей мысли и эмоций.",
    },
  },
  zh: {
    translation: {
      "Welcome Text": "欢迎来到巴厘岛，一个拥有丰富文化的 खूबसूरत 的岛屿。",
      "Notification Label": "通知🚀",
      "Select Language Value": "更改语言",
      "Select Language Label": "选择语言",
      "Dummy Language":
        "在一个充满可能性的世界里，每一个词都蕴含着独特的力量。从恰当标点符号的简洁优雅，到精心构造句子的深远影响，语言塑造了我们的理解，并为我们的感知着色。我们踏上旅程，一次一句地探索意义的广阔天地。过去故事的回声与未来叙事的低语无缝融合，编织出一幅由思想和情感丝线构成的挂毯。",
    },
  },
} satisfies Resources;
