# Daily article backlog

A scheduled task writes one article a day from this list. Each run takes the
**first unchecked topic**, writes and verifies it, ticks it here (`[x]` + slug
+ date) in the same commit, and opens a PR. **Nothing is merged or published
until the site owner approves it.**

## Rules every article must pass (from docs/BLUEPRINT.md §1)

- **Voice:** "The Unbiased Canine Nutrition Analyst" - analytical, transparent,
  decisive, warm. "We" for the team, "you"/"your dog" for the reader.
- **Every H2 is a question people actually search**, answered in its first
  sentence (<= 30 words).
- **Numbers over adjectives:** >= 1 hard data point per 150 words, always with
  its basis (% DM, % as-fed, g/1,000 kcal, kcal/kg, lb with kg on first use).
- **Never invent data.** Use src/lib/nutrition.ts (RER/MER, dry matter,
  g/1,000 kcal, AAFCO constants) and well-established public rules (AAFCO, FDA,
  WSAVA, NRC). No brand prices or nutrient values unless verified in
  src/lib/dogfood/brands.ts. Illustrative examples must be labelled as such.
- **Real statistics only.** Every statistic (survey %, study result,
  prevalence, recall count) must name its source, year and URL in the
  article's Sources section, and must have been read from that source during
  the run. If the source can't be opened, leave the statistic out - never
  quote a number from memory. Formula results (RER/MER, dry matter) and
  AAFCO/FDA thresholds count as verified.
- **Quality bar:** if the article isn't clearly better than the top Google
  results for its topic, don't open the PR - report why instead.
- **Health language:** "supports", "is formulated for". Never "treats",
  "cures", "prevents". Conditions needing prescription diets must say so.
- **Banned filler:** "in today's world", "when it comes to", "look no further",
  "game-changer", "it's important to note", "at the end of the day",
  "furry friend", "fur baby", "pupper", "doggo".
- **Sentences:** median <= 20 words; paragraphs <= 4 sentences.
- **Length:** 1,300-2,200 words. Stop when the data runs out; never pad.
- **Structure:** `meta` (seoTitle <= 60 chars, description 140-160 chars,
  direct answer, 3-4 key takeaways, 3-5 FAQs, relatedPaths) + `Body` with
  >= 2 tables and >= 10 internal links to existing routes (reviews, brands,
  compare, best-for, diets, ingredients, other articles).
- **Cross-link:** add one contextual link to the new article from at least one
  existing article.

## Topics (in order)

- [x] How much fresh food should I feed my dog? - `how-much-fresh-food-to-feed-a-dog` (2026-11-02)
- [x] How to read a dog food label - `how-to-read-a-dog-food-label` (2026-11-03)
- [x] Is fresh dog food worth it? - `is-fresh-dog-food-worth-it` (2026-11-04)
- [x] Fresh vs kibble: what actually changes for your dog - `fresh-vs-kibble` (2026-11-05)
- [x] Is raw dog food safe? Pathogens, handling and who should avoid it - `is-raw-dog-food-safe` (2026-11-05)
- [x] How to switch your dog to fresh food (10-day plan) - `how-to-switch-dog-to-fresh-food` (2026-11-07)
- [x] Grain-free dog food and DCM: what the FDA investigation found - `grain-free-dog-food-and-dcm` (2026-11-08)
- [ ] Fresh food for puppies: AAFCO growth rules and calorie needs
- [ ] Fresh food toppers vs full fresh meals: how to split calories
- [ ] Freeze-dried vs air-dried vs fresh-frozen dog food
- [ ] How much protein does a dog need? (per 1,000 kcal explained)
- [ ] Fat in dog food: how much is too much?
- [ ] Senior dog nutrition: calories, protein and joints
- [ ] Body condition score: how to tell if your dog is overweight
- [ ] Dog food for weight loss: the calorie math that works
- [ ] Food allergies in dogs: how an elimination diet works
- [ ] Novel proteins: duck, venison, rabbit and kangaroo compared
- [ ] Omega-3 for dogs: EPA, DHA and fish oil explained
- [ ] Calcium and phosphorus: why the ratio matters for puppies
- [ ] What "human-grade" dog food really means
- [ ] Feeding trials vs "formulated to meet": AAFCO statements decoded
- [ ] Large-breed puppy feeding: growth, calcium and bone health
- [ ] Small-breed dog nutrition: calorie density and hypoglycemia
- [ ] Homemade dog food vs fresh delivery: completeness risks
- [ ] Mixing kibble and fresh food without overfeeding
- [ ] Dog treats and the 10% rule
- [ ] Storing and thawing fresh dog food safely
- [ ] Taurine and heart health in dogs
- [ ] Fiber for dogs: stool quality, satiety and anal glands
- [ ] Probiotics and prebiotics in dog food: what the evidence says
- [ ] Hydration: how fresh food's moisture changes water intake
