// prettier-ignore
export const LANGUAGES_CODE = ["en","fr","id","es","ja","de","ru","zh"] as const;
export const NAMESPACES = ["ns1", "speech"] as const;
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

type DeepStringRecord<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? DeepStringRecord<T[K]>
    : string;
};

type Resources<T> = {
  [Lang in (typeof LANGUAGES_CODE)[number]]: Required<{
    [Ns in keyof T]: DeepStringRecord<T[Ns]>;
  }>;
};
type Namespaces = Partial<Record<(typeof NAMESPACES)[number], unknown>>;

const EN_LANGUAGES = {
  ns1: {
    welcome_text: "Welcome to Bali, a beautiful island with a rich culture.",
    notification_label: "Notifications🚀",
    select_lng_value: "Change Language",
    select_lng_label: "Choose Language",
    dummy_text:
      "In a world brimming with possibilities, every word holds a unique power. From the simple elegance of a well-placed comma to the profound impact of a meticulously crafted sentence, language shapes our understanding and colors our perceptions. We embark on a journey, exploring the vast landscapes of meaning, one phrase at a time. The echoes of stories past blend seamlessly with the whispers of future narratives, creating a tapestry woven with threads of thought and emotion.",
  },
  speech: {
    title: "Unleash Your Potential: A Motivational Speech",
    description: {
      part1:
        "Good morning, everyone. Look around you. Each face in this room holds a unique story, a collection of dreams, challenges, and boundless potential. Sometimes, in the rush of life, we forget the incredible power residing within us, waiting to be unleashed.",
      part2:
        "Today, I want to remind you of that power. I want you to remember that every single one of you possesses an inner fire, a unique set of talents, and the capacity to achieve truly extraordinary things.",
      part3:
        "Life is not always easy. We will encounter obstacles, face setbacks, and experience moments of doubt. There will be times when the path ahead seems unclear, when the weight of expectations feels crushing, or when the voice of fear whispers in your ear, telling you to give up.",
      part4:
        "But it is precisely in those moments that your true strength is forged. It is in pushing past the discomfort, in learning from your failures, and in choosing resilience over resignation that you discover what you are truly capable of.",
      part5:
        "Think about the goals you've set, the aspirations that ignite your spirit. Are they big? Are they daring? Good. Because it's in pursuing those ambitious dreams that we grow, adapt, and evolve into the best versions of ourselves. Don't let anyone, especially not that voice of doubt within you, tell you that your dreams are too big, too unrealistic, or too far-fetched.",
      part6:
        "Every single step forward, no matter how small, is progress. Every lesson learned, even from mistakes, builds your wisdom. Every act of courage, however minor, strengthens your resolve.",
    },
  },
} as const satisfies Namespaces;

export default {
  en: EN_LANGUAGES,
  fr: {
    ns1: {
      welcome_text: "Bienvenue à Bali, une belle île à la culture riche.",
      notification_label: "Notifications🚀",
      select_lng_value: "Changer de langue",
      select_lng_label: "Choisir la langue",
      dummy_text:
        "Dans un monde débordant de possibilités, chaque mot détient un pouvoir unique. De la simple élégance d'une virgule bien placée à l'impact profond d'une phrase méticuleusement conçue, le langage façonne notre compréhension et colore nos perceptions. Nous nous embarquons dans un voyage, explorant les vastes paysages de la signification, une phrase à la fois. Les échos des histoires passées se mêlent harmonieusement aux murmures des récits futurs, créant une tapisserie tissée de fils de pensée et d'émotion.",
    },
    speech: {
      title: "Libérez votre potentiel : un discours de motivation",
      description: {
        part1:
          "Bonjour à tous. Regardez autour de vous. Chaque visage dans cette pièce contient une histoire unique, une collection de rêves, de défis et un potentiel illimité. Parfois, dans le tourbillon de la vie, nous oublions le pouvoir incroyable qui réside en nous, attendant d'être libéré.",
        part2:
          "Aujourd'hui, je veux vous rappeler ce pouvoir. Je veux que vous vous souveniez que chacun d'entre vous possède un feu intérieur, un ensemble unique de talents et la capacité d'accomplir des choses vraiment extraordinaires.",
        part3:
          "La vie n'est pas toujours facile. Nous rencontrerons des obstacles, ferons face à des revers et connaîtrons des moments de doute. Il y aura des moments où le chemin à parcourir semblera incertain, où le poids des attentes sera écrasant, ou lorsque la voix de la peur vous chuchotera à l'oreille, vous disant d'abandonner.",
        part4:
          "Mais c'est précisément dans ces moments que votre véritable force est forgée. C'est en dépassant l'inconfort, en apprenant de vos échecs et en choisissant la résilience plutôt que la résignation que vous découvrez ce dont vous êtes vraiment capable.",
        part5:
          "Pensez aux objectifs que vous vous êtes fixés, aux aspirations qui allument votre esprit. Sont-ils grands ? Sont-ils audacieux ? Bien. Parce que c'est en poursuivant ces rêves ambitieux que nous grandissons, nous adaptons et évoluons pour devenir les meilleures versions de nous-mêmes. Ne laissez personne, surtout pas cette voix du doute en vous, vous dire que vos rêves sont trop grands, trop irréalistes ou trop farfelus.",
        part6:
          "Chaque pas en avant, aussi petit soit-il, est un progrès. Chaque leçon apprise, même de vos erreurs, renforce votre sagesse. Chaque acte de courage, aussi mineur soit-il, renforce votre détermination.",
      },
    },
  },
  id: {
    ns1: {
      welcome_text:
        "Selamat datang di Bali, pulau yang indah dengan budaya yang kaya.",
      notification_label: "Notifikasi🚀",
      select_lng_value: "Ganti Bahasa",
      select_lng_label: "Pilih Bahasa",
      dummy_text:
        "Di dunia yang penuh dengan kemungkinan, setiap kata memiliki kekuatan unik. Dari keanggunan sederhana koma yang ditempatkan dengan baik hingga dampak mendalam dari kalimat yang dibuat dengan cermat, bahasa membentuk pemahaman kita dan mewarnai persepsi kita. Kita memulai perjalanan, menjelajahi lanskap makna yang luas, satu frasa pada satu waktu. Gema cerita masa lalu berpadu mulus dengan bisikan narasi masa depan, menciptakan permadani yang ditenun dengan benang-benang pemikiran dan emosi.",
    },
    speech: {
      title: "Lepaskan Potensimu: Sebuah Pidato Motivasi",
      description: {
        part1:
          "Selamat pagi semuanya. Lihatlah sekeliling Anda. Setiap wajah di ruangan ini memiliki cerita yang unik, kumpulan impian, tantangan, dan potensi tak terbatas. Terkadang, dalam kesibukan hidup, kita melupakan kekuatan luar biasa yang ada dalam diri kita, yang menunggu untuk dilepaskan.",
        part2:
          "Hari ini, saya ingin mengingatkan Anda akan kekuatan itu. Saya ingin Anda mengingat bahwa setiap dari Anda memiliki api batin, seperangkat bakat yang unik, dan kapasitas untuk mencapai hal-hal yang benar-benar luar biasa.",
        part3:
          "Hidup tidak selalu mudah. Kita akan menghadapi rintangan, mengalami kemunduran, dan merasakan keraguan. Akan ada saat-saat ketika jalan di depan tampak tidak jelas, ketika beban harapan terasa menghimpit, atau ketika suara ketakutan membisikkan di telinga Anda, menyuruh Anda menyerah.",
        part4:
          "Namun justru di saat-saat itulah kekuatan sejati Anda ditempa. Dengan mendorong melewati ketidaknyamanan, belajar dari kegagalan Anda, dan memilih ketahanan daripada pengunduran diri, Anda menemukan apa yang benar-benar mampu Anda lakukan.",
        part5:
          "Pikirkan tentang tujuan yang telah Anda tetapkan, aspirasi yang membakar semangat Anda. Apakah itu besar? Apakah itu berani? Bagus. Karena dengan mengejar impian-impian ambisius itulah kita tumbuh, beradaptasi, dan berkembang menjadi versi terbaik dari diri kita sendiri. Jangan biarkan siapa pun, terutama suara keraguan dalam diri Anda, mengatakan bahwa impian Anda terlalu besar, terlalu tidak realistis, atau terlalu muluk-muluk.",
        part6:
          "Setiap langkah maju, tidak peduli seberapa kecil, adalah kemajuan. Setiap pelajaran yang dipetik, bahkan dari kesalahan, membangun kebijaksanaan Anda. Setiap tindakan keberanian, sekecil apa pun, memperkuat tekad Anda.",
      },
    },
  },
  es: {
    ns1: {
      welcome_text:
        "Bienvenidos a Bali, una hermosa isla con una rica cultura.",
      notification_label: "Notificaciones🚀",
      select_lng_value: "Cambiar idioma",
      select_lng_label: "Elegir idioma",
      dummy_text:
        "En un mundo rebosante de posibilidades, cada palabra encierra un poder único. Desde la sencilla elegancia de una coma bien situada hasta el profundo impacto de una frase meticulosamente elaborada, el lenguaje moldea nuestra comprensión y colorea nuestras percepciones. Nos embarcamos en un viaje, explorando los vastos paisajes del significado, una frase a la vez. Los ecos de historias pasadas se mezclan a la perfección con los susurros de narrativas futuras, creando un tapiz tejido con hilos de pensamiento y emoción.",
    },
    speech: {
      title: "Libera tu potencial: un discurso motivacional",
      description: {
        part1:
          "Buenos días a todos. Miren a su alrededor. Cada rostro en esta sala encierra una historia única, una colección de sueños, desafíos y un potencial ilimitado. A veces, en el ajetreo de la vida, olvidamos el increíble poder que reside dentro de nosotros, esperando ser liberado.",
        part2:
          "Hoy, quiero recordarles ese poder. Quiero que recuerden que cada uno de ustedes posee un fuego interior, un conjunto único de talentos y la capacidad de lograr cosas verdaderamente extraordinarias.",
        part3:
          "La vida no siempre es fácil. Encontraremos obstáculos, enfrentaremos contratiempos y experimentaremos momentos de duda. Habrá momentos en que el camino por delante parezca incierto, cuando el peso de las expectativas sea aplastante, o cuando la voz del miedo les susurre al oído, diciéndoles que se rindan.",
        part4:
          "Pero es precisamente en esos momentos cuando se forja su verdadera fuerza. Es al superar la incomodidad, al aprender de sus fracasos y al elegir la resiliencia sobre la resignación que descubren de lo que son verdaderamente capaces.",
        part5:
          "Piensen en los objetivos que se han fijado, en las aspiraciones que encienden su espíritu. ¿Son grandes? ¿Son audaces? Bien. Porque es al perseguir esos sueños ambiciosos que crecemos, nos adaptamos y evolucionamos hacia las mejores versiones de nosotros mismos. No dejen que nadie, especialmente no esa voz de duda dentro de ustedes, les diga que sus sueños son demasiado grandes, demasiado poco realistas o demasiado descabellados.",
        part6:
          "Cada pequeño paso hacia adelante, por insignificante que sea, es progreso. Cada lección aprendida, incluso de los errores, construye su sabiduría. Cada acto de valentía, por menor que sea, fortalece su determinación.",
      },
    },
  },
  ja: {
    ns1: {
      welcome_text: "バリへようこそ。豊かな文化を持つ美しい島です。",
      notification_label: "通知🚀",
      select_lng_value: "言語を変更",
      select_lng_label: "言語を選択",
      dummy_text:
        "可能性に満ちた世界では、すべての言葉が独自の力を持っています。適切に配置されたコンマの単純な優雅さから、綿密に作成された文章の深遠な影響まで、言語は私たちの理解を形作り、認識に色を付けます。私たちは旅に乗り出し、意味の広大な風景を一度に1つのフレーズで探索します。過去の物語の残響は未来の物語のささやきとシームレスに混ざり合い、思考と感情の糸で織りなされたタペストリーを作り出します。",
    },
    speech: {
      title: "潜在能力を解き放つ：モチベーションスピーチ",
      description: {
        part1:
          "皆さん、おはようございます。周りを見渡してください。この部屋のそれぞれの顔には、ユニークな物語、夢、課題、そして無限の可能性が宿っています。時々、慌ただしい生活の中で、私たちは自分の中に宿る、解き放たれるのを待っている信じられないほどの力を忘れてしまいます。",
        part2:
          "今日、私は皆さんにその力を思い出してもらいたいのです。皆さん一人ひとりが、内なる炎、独自の才能、そして本当に並外れたことを成し遂げる能力を持っていることを覚えていてほしいのです。",
        part3:
          "人生は常に楽なわけではありません。私たちは障害に遭遇し、挫折に直面し、疑いの瞬間を経験するでしょう。先行きが不透明に見えたり、期待の重圧がのしかかったり、あるいは恐怖の声が耳元でささやき、諦めるように言ったりする時があるでしょう。",
        part4:
          "しかし、まさにそのような瞬間にこそ、あなたの本当の強さが鍛えられます。不快感を乗り越え、失敗から学び、諦めではなく回復力 を選択することによって、あなたは自分が本当に何ができるのかを発見するのです。",
        part5:
          "あなたが設定した目標、あなたの精神に火をつける願望について考えてみてください。それらは大きいですか？大胆ですか？良いことです。なぜなら、そのような野心的な夢を追求することによって、私たちは成長し、適応し、自分たちの最高のバージョンへと進化するからです。誰にも、特にあなたの中の疑いの声にも、あなたの夢が大きすぎる、非現実的すぎる、あるいは途方もないものだと言わせないでください。",
        part6:
          "どんなに小さくても、一歩一歩前進することは進歩です。間違いから学んだことでさえ、あなたの知恵を築きます。どんなに些細なことでも、勇気ある行動はあなたの決意を強めます。",
      },
    },
  },
  de: {
    ns1: {
      welcome_text:
        "Willkommen auf Bali, einer wunderschönen Insel mit einer reichen Kultur.",
      notification_label: "Benachrichtigungen🚀",
      select_lng_value: "Sprache ändern",
      select_lng_label: "Sprache wählen",
      dummy_text:
        "In einer Welt voller Möglichkeiten birgt jedes Wort eine einzigartige Kraft. Von der schlichten Eleganz eines gut platzierten Kommas bis zum tiefgreifenden Einfluss eines sorgfältig ausgearbeiteten Satzes prägt Sprache unser Verständnis und färbt unsere Wahrnehmungen. Wir begeben uns auf eine Reise und erkunden die weiten Landschaften der Bedeutung, Satz für Satz. Die Echos vergangener Geschichten verschmelzen nahtlos mit den Flüstern zukünftiger Erzählungen und schaffen einen Teppich, der mit Fäden aus Gedanken und Emotionen gewebt ist.",
    },
    speech: {
      title: "Entfesseln Sie Ihr Potenzial: Eine Motivationsrede",
      description: {
        part1:
          "Guten Morgen, alle zusammen. Schauen Sie sich um. Jedes Gesicht in diesem Raum birgt eine einzigartige Geschichte, eine Sammlung von Träumen, Herausforderungen und grenzenlosem Potenzial. Manchmal vergessen wir im Trubel des Lebens die unglaubliche Kraft, die in uns wohnt und darauf wartet, entfesselt zu werden.",
        part2:
          "Heute möchte ich Sie an diese Kraft erinnern. Ich möchte, dass Sie sich daran erinnern, dass jeder einzelne von Ihnen ein inneres Feuer, eine einzigartige Reihe von Talenten und die Fähigkeit besitzt, wirklich außergewöhnliche Dinge zu erreichen.",
        part3:
          "Das Leben ist nicht immer einfach. Wir werden auf Hindernisse stoßen, Rückschläge erleben und Momente des Zweifels haben. Es wird Zeiten geben, in denen der Weg unklar erscheint, in denen die Last der Erwartungen erdrückend wirkt oder in denen die Stimme der Angst Ihnen ins Ohr flüstert und Sie zum Aufgeben auffordert.",
        part4:
          "Doch gerade in diesen Momenten wird Ihre wahre Stärke geschmiedet. Indem Sie das Unbehagen überwinden, aus Ihren Fehlern lernen und Widerstandsfähigkeit statt Resignation wählen, entdecken Sie, wozu Sie wirklich fähig sind.",
        part5:
          "Denken Sie über die Ziele nach, die Sie sich gesetzt haben, die Bestrebungen, die Ihren Geist entzünden. Sind sie groß? Sind sie kühn? Gut. Denn es ist die Verfolgung dieser ehrgeizigen Träume, die uns wachsen, uns anpassen und uns zu den besten Versionen unserer selbst entwickeln lässt. Lassen Sie sich von niemandem, besonders nicht von der Stimme des Zweifels in Ihnen, sagen, dass Ihre Träume zu groß, zu unrealistisch oder zu weit hergeholt sind.",
        part6:
          "Jeder einzelne Schritt vorwärts, egal wie klein, ist ein Fortschritt. Jede Lektion, auch aus Fehlern, stärkt Ihre Weisheit. Jeder Akt des Mutes, wie geringfügig er auch sein mag, stärkt Ihre Entschlossenheit.",
      },
    },
  },
  ru: {
    ns1: {
      welcome_text:
        "Добро пожаловать на Бали, прекрасный остров с богатой культурой.",
      notification_label: "Уведомления🚀",
      select_lng_value: "Изменить язык",
      select_lng_label: "Выбрать язык",
      dummy_text:
        "В мире, изобилующем возможностями, каждое слово обладает уникальной силой. От простой элегантности правильно расставленной запятой до глубокого воздействия тщательно составленного предложения, язык формирует наше понимание и окрашивает наши восприятия. Мы отправляемся в путешествие, исследуя обширные просторы значений, по одной фразе за раз. Эхо прошлых историй плавно сливается с шепотом будущих повествований, создавая гобелен, сотканный из нитей мысли и эмоций.",
    },
    speech: {
      title: "Раскройте свой потенциал: Мотивационная речь",
      description: {
        part1:
          "Доброе утро, всем. Оглянитесь вокруг. Каждое лицо в этой комнате хранит уникальную историю, набор мечтаний, проблем и безграничного потенциала. Иногда, в суете жизни, мы забываем о невероятной силе, находящейся внутри нас, ожидающей своего высвобождения.",
        part2:
          "Сегодня я хочу напомнить вам об этой силе. Я хочу, чтобы вы помнили, что каждый из вас обладает внутренним огнем, уникальным набором талантов и способностью достигать поистине выдающихся вещей.",
        part3:
          "Жизнь не всегда легка. Мы столкнемся с препятствиями, переживем неудачи и испытаем моменты сомнения. Будут времена, когда путь впереди покажется неясным, когда груз ожиданий будет давить, или когда голос страха будет шептать вам на ухо, призывая сдаться.",
        part4:
          "Но именно в эти моменты закаляется ваша истинная сила. Преодолевая дискомфорт, учась на своих ошибках и выбирая стойкость вместо отступления, вы открываете, на что вы действительно способны.",
        part5:
          "Подумайте о целях, которые вы поставили, об устремлениях, которые зажигают ваш дух. Они большие? Они смелые? Отлично. Потому что именно в преследовании этих амбициозных мечтаний мы растем, адаптируемся и развиваемся в лучшие версии себя. Не позволяйте никому, особенно голосу сомнения внутри вас, говорить вам, что ваши мечты слишком велики, слишком нереалистичны или слишком надуманны.",
        part6:
          "Каждый шаг вперед, каким бы маленьким он ни был, — это прогресс. Каждый урок, извлеченный даже из ошибок, прибавляет вам мудрости. Каждый акт мужества, каким бы незначительным он ни был, укрепляет вашу решимость.",
      },
    },
  },
  zh: {
    ns1: {
      welcome_text: "欢迎来到巴厘岛，一个拥有丰富文化的 खूबसूरत 的岛屿。",
      notification_label: "通知🚀",
      select_lng_value: "更改语言",
      select_lng_label: "选择语言",
      dummy_text:
        "在一个充满可能性的世界里，每一个词都蕴含着独特的力量。从恰当标点符号的简洁优雅，到精心构造句子的深远影响，语言塑造了我们的理解，并为我们的感知着色。我们踏上旅程，一次一句地探索意义的广阔天地。过去故事的回声与未来叙事的低语无缝融合，编织出一幅由思想和情感丝线构成的挂毯。",
    },
    speech: {
      title: "释放你的潜力：一篇励志演讲",
      description: {
        part1:
          "大家早上好。环顾四周，这个房间里的每一张脸都承载着一个独特的故事，一个关于梦想、挑战和无限潜力的集合。有时，在生活的匆忙中，我们忘记了我们内心蕴藏的、等待被释放的不可思议的力量。",
        part2:
          "今天，我想提醒你们这种力量。我想让你们记住，你们每个人都拥有一团内在的火焰，一套独特的才能，以及实现真正非凡事物的能力。",
        part3:
          "生活并非总是一帆风顺。我们会遇到障碍，面对挫折，经历怀疑的时刻。有时前方的道路会变得模糊不清，期望的重压会让人喘不过气，或者恐惧的声音会在耳边低语，让你放弃。",
        part4:
          "但正是在那些时刻，你真正的力量才得以锻造。正是通过克服不适，从失败中学习，选择韧性而不是屈服，你才能发现自己真正的能力。",
        part5:
          "想想你设定的目标，那些点燃你精神的抱负。它们宏大吗？它们大胆吗？很好。因为正是通过追求这些雄心勃勃的梦想，我们才能成长、适应并进化成最好的自己。不要让任何人，尤其是你内心的怀疑之声，告诉你你的梦想太大、太不切实际或太遥远。",
        part6:
          "每向前迈出一步，无论多么微小，都是进步。每一次学习，即使是来自错误，都能增长你的智慧。每一次勇敢的行动，无论多么微不足道，都能增强你的决心。",
      },
    },
  },
} satisfies Resources<typeof EN_LANGUAGES>;
