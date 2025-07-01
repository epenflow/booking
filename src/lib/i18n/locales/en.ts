import type { Namespace } from "../helpers";

export default {
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
} as const satisfies Namespace;
