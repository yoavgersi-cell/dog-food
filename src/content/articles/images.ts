// Hero images for articles (generated illustrations, not product photos).
// Files: public/articles/<slug>.webp (1536x1024) and public/articles/og/<slug>.jpg (1200x630).
// Add one line per new article; articles without an entry fall back to the default OG image.

const ALT: Record<string, string> = {
  "fresh-dog-food-guide": "A golden retriever sniffing a bowl of gently cooked fresh dog food with turkey, peas, carrots and rice on a wooden counter",
  "fresh-food-for-puppies": "A golden retriever puppy sitting on a kitchen floor beside a small bowl of fresh dog food and a chew toy",
  "grain-free-dog-food-and-dcm": "A veterinarian listening to a calm beagle's heart with a stethoscope, with bowls of peas, lentils and rice in the background",
  "how-to-switch-dog-to-fresh-food": "Two dog bowls side by side, kibble and fresh food, with a spoon mixing fresh food into the kibble",
  "is-raw-dog-food-safe": "A clean kitchen counter with frozen raw dog food patties in a glass container, a steel dog bowl, hand soap and a towel by the sink, a border collie watching",
  "fresh-vs-kibble": "Top-down view of a bowl of dry kibble next to a bowl of colourful gently cooked fresh dog food",
  "is-fresh-dog-food-worth-it": "A smiling owner setting down a bowl of fresh dog food for an excited mixed-breed dog in a sunny kitchen",
  "how-to-read-a-dog-food-label": "Hands holding a plain dog food pouch to read the back label while a labrador rests its chin on the table",
  "how-much-fresh-food-to-feed-a-dog": "A bowl of fresh dog food on a kitchen scale with a measuring scoop, a spaniel watching in the background",
  "fresh-dog-food-topper-vs-full-meal": "A hand spooning fresh dog food with turkey, carrots and peas onto a bowl of kibble beside a bowl of fresh food, a corgi watching",
  "unkibble-fresh-dry-dog-food": "A shiba inu peeking over a light wooden pantry shelf at a bowl of small dry dog food nuggets with carrot, green bean and cranberry pieces, beside glass storage jars",
};

export interface ArticleImage {
  src: string; // hero, 1536x1024 WebP
  og: string; // social card, 1200x630 JPG
  alt: string;
  width: number;
  height: number;
}

export function articleImage(slug: string): ArticleImage | null {
  const alt = ALT[slug];
  if (!alt) return null;
  return { src: `/articles/${slug}.webp`, og: `/articles/og/${slug}.jpg`, alt, width: 1536, height: 1024 };
}
