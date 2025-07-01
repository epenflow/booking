import type { Namespace } from "../helpers";

export default {
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
} as const satisfies Namespace;
