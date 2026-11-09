import { H2, P, Callout } from "@/components/page-shell";
import { ComparisonCard } from "@/components/comparison-card";
import { FORMAT_LABEL, RANKED_BRANDS, type Brand } from "@/lib/dogfood/brands";
import { comparePath } from "@/lib/dogfood/pairs";
import { PRODUCTS, fmtPrice } from "@/lib/dogfood/products";
import { bestForPath, dietPath } from "@/lib/dogfood/taxonomy";
import { kcalPerDayForLb } from "@/lib/nutrition";
import { A, Ext, List, Part, SRC, Table, fmt, usd } from "./ui";

// Petful survey testing of The Farmer's Dog, Feb 2026: cost per day from small to giant dogs.
const PETFUL_LOW = 2.31;
const PETFUL_HIGH = 26.77;

const k25 = kcalPerDayForLb(25);
const sub = (b: Brand) => (b.toVerify.includes("subscriptionRequired") || b.subscriptionRequired === null ? "Verifying" : b.subscriptionRequired ? "Yes" : "No");
const productById = (id: string) => PRODUCTS.find((p) => p.id === id)!;
const brandName = (slug: string) => RANKED_BRANDS.find((b) => b.slug === slug)?.name ?? slug;

const TRY_IDS = ["tfd-small-dog-trial-box", "tfd-fresh-food-trial-box", "ollie-fresh-chicken-dish", "st-unkibble-beef-barley", "tpt-air-dried-lamb-beef", "ollie-baked-chicken-2lb"];

export function Part2() {
  const top3 = RANKED_BRANDS.slice(0, 3);
  const withTp = RANKED_BRANDS.filter((b) => b.trustpilot);
  const retail = PRODUCTS.filter((p) => p.sellerKind !== "brand");
  const sellers = [...new Set(retail.map((p) => p.seller.replace(/ and other retailers$/, "").replace(/ seller$/, " (marketplace seller)")))];
  return (
    <>
      <Part id="cost" n={2} title="Cost and buying" />
      <H2 id="cost-overview">How much does fresh dog food cost?</H2>
      <P>
        It depends almost entirely on how many calories your dog needs. For The Farmer&apos;s Dog, Petful&apos;s February 2026 survey testing found prices from about <strong>{usd(PETFUL_LOW)} to {usd(PETFUL_HIGH)} a day</strong>, from small dogs to giant breeds (<Ext href={SRC.petfulCost}>Petful, 2026</Ext>).
        That is roughly {usd(PETFUL_LOW * 30)} to {usd(PETFUL_HIGH * 30)} for a 30-day month.
      </P>
      <P>
        The spread looks extreme, but it follows a simple rule: you pay per calorie, and calories rise more slowly than body weight. Energy needs scale with weight to the power of 0.75, so a dog four times heavier needs only about 2.8 times the food.
      </P>
      <Table
        caption="Daily and monthly calorie needs by body weight, neutered adult dogs"
        head={["Dog's weight", "Calories per day", "Calories per month", "vs a 25 lb dog"]}
        rows={[10, 25, 50, 75, 100].map((lb) => {
          const k = kcalPerDayForLb(lb);
          return [`${lb} lb (${(lb / 2.20462).toFixed(1)} kg)`, `${fmt(k)} kcal`, `${fmt(k * 30)} kcal`, `${(k / k25).toFixed(2)}x`];
        })}
        note="Calories from 70 x kg^0.75 x 1.6 (neutered adult). Active dogs need more; seniors and less active dogs usually less."
      />
      <P>
        To estimate your own cost, take the price of a plan or pack, divide by the calories it contains to get a price per 1,000 kcal, then multiply by your dog&apos;s daily calories. That single number lets you compare a fresh plan, a bag of kibble and a topper on equal terms.
        Box prices hide it, because fresh food is mostly water.
      </P>

      <H2 id="why-expensive">Why is fresh dog food so expensive?</H2>
      <P>Four costs stack up that kibble doesn&apos;t carry, or carries far less of:</P>
      <List
        items={[
          <><strong>You&apos;re buying water.</strong> At around 70% moisture, fresh food weighs two to three times as much as kibble for the same calories, and every pound has to be made, packed, frozen and shipped.</>,
          <><strong>Cold shipping.</strong> Frozen food travels in insulated boxes with coolant, direct to your door, usually in smaller and more frequent orders than a sack of kibble.</>,
          <><strong>Ingredients and handling.</strong> Whole meats and vegetables, often under human-food handling rules for human-grade claims, cost more than rendered meals and dry starches.</>,
          <><strong>Per-dog portioning.</strong> Each pack is sized to one dog&apos;s calorie target, which is labour a bag of kibble doesn&apos;t need.</>,
        ]}
      />
      <P>
        Price is also the most common complaint about fresh food. Of the 282 Trustpilot reviews on our brand review pages, 33 mention price or cost, and several of the most critical ones are about an expensive second box after a cheaper trial. We come back to that in the customer reviews section below.
      </P>

      <H2 id="cost-per-month">How much does fresh dog food cost per month?</H2>
      <P>
        Multiply your dog&apos;s daily calories by 30, then by the price per 1,000 kcal of the food you&apos;re quoted. Using Petful&apos;s Farmer&apos;s Dog range, the monthly bill runs from about {usd(PETFUL_LOW * 30)} for a small dog to about {usd(PETFUL_HIGH * 30)} for a giant breed.
      </P>
      <P>
        Two things move the number more than the brand does. The first is whether you feed fresh as the whole diet or as part of it. The second is your dog&apos;s real calorie need, which can sit well above or below the formula depending on activity and metabolism.
        Weigh your dog every few weeks after you start and let the plan adjust.
      </P>
      <Table
        caption="How plan type changes the share of the bill"
        head={["Plan type", "Fresh share of calories", "Cost vs full fresh"]}
        rows={[
          ["Full fresh", "100%", "Full price"],
          ["Half and half (mixed)", "50%", "About half, plus the kibble"],
          ["Topper", "About 25%", "About a quarter, plus the kibble"],
          ["Occasional topper or treat", "10% or less", "Small; counts toward the treat allowance"],
        ]}
        note="Cost scales with the share of calories, so a 25% topper costs about a quarter of a full fresh plan for the same dog, plus the kibble that makes up the rest."
      />

      <H2 id="cheapest">What&apos;s the cheapest way to try fresh dog food?</H2>
      <P>
        Start with a trial box or a small bag. These are the lowest-priced ways in that we found in our product listings, captured from Google Shopping on November 5, 2026:
      </P>
      <Table
        caption="Low-cost ways to try fresh and shelf-stable fresh-style food (prices as listed Nov 5, 2026)"
        head={["Product", "Brand", "Listed price", "Sold by"]}
        rows={TRY_IDS.map((id) => {
          const p = productById(id);
          return [p.name + (p.size ? ` (${p.size})` : ""), brandName(p.brand), fmtPrice(p.price) + (p.listPrice ? ` (was ${fmtPrice(p.listPrice)})` : ""), p.seller];
        })}
        note="Trial and starter prices usually apply to the first order only; subscription plans are then priced to your dog. Prices change often."
      />
      <Callout>
        <strong>Read the renewal terms.</strong> Several of the harshest reviews we read were from owners surprised by a full-price second box after a cheap trial, because the trial rolled into a subscription. Set a reminder for the renewal date, or pause the plan, before the first box arrives.
      </Callout>

      <H2 id="cheaper">How can you make fresh dog food cheaper?</H2>
      <P>Feeding fresh doesn&apos;t have to mean feeding only fresh. These are the levers that actually change the bill:</P>
      <List
        ordered
        items={[
          <><strong>Feed it as a topper.</strong> Replace about 25% of your dog&apos;s calories with fresh food and cut the kibble by the same number of calories. You keep most of the taste for about a quarter of the cost. See <A href={dietPath("fresh-topper")}>fresh toppers</A>.</>,
          <><strong>Go half and half.</strong> A 50/50 mix halves the fresh bill; our <A href={dietPath("mixed-feeding")}>mixed feeding guide</A> covers the calorie split.</>,
          <><strong>Use the shelf-stable lines.</strong> Baked, air-dried and fresh-dry formats from the same brands often cost less per calorie than frozen fresh and save freezer space.</>,
          <><strong>Compare per 1,000 kcal, not per box.</strong> It&apos;s the only fair comparison across formats and pack sizes.</>,
          <><strong>Keep your dog lean.</strong> An overweight dog eats more calories than it needs; bringing it to a healthy weight cuts the bill and helps the dog.</>,
          <><strong>Watch intro pricing.</strong> Judge a plan on its ongoing price, not the first box.</>,
        ]}
      />
      <P>
        If you&apos;re still deciding whether fresh is worth paying for at all, our <A href="/articles/is-fresh-dog-food-worth-it">is fresh dog food worth it?</A> guide works through it by dog size and situation.
      </P>

      <H2 id="best">What is the best fresh dog food in 2026?</H2>
      <P>
        Our top three, scored with the same published rubric as every brand we cover, are below. The ranking weighs nutrition and formulation (30%), value per 1,000 kcal (20%), safety and transparency, ingredient quality, and plan flexibility (15% each), and convenience (5%), and a lower score is never placed above a higher one (<A href="/how-we-rank">how we rank</A>).
      </P>
      <div className="my-5 space-y-4">
        {top3.map((b, i) => (
          <ComparisonCard key={b.slug} brand={b} rank={i + 1} />
        ))}
      </div>
      <P>
        Torn between the top two? <A href={comparePath("the-farmers-dog-vs-ollie")}>The Farmer&apos;s Dog vs Ollie</A> breaks it down. No freezer space? <A href={comparePath("ollie-vs-spot-and-tango")}>Ollie vs Spot &amp; Tango</A> covers the fridge-free option. All seven brands are in our <A href="/">full 2026 ranking</A>.
      </P>

      <H2 id="brands-compared">How do the main fresh dog food brands compare?</H2>
      <P>Here are the seven brands we cover, side by side on the things that differ most between them:</P>
      <Table
        caption="Fresh and premium dog food brands compared"
        head={["Brand", "Formats", "Subscription required", "Storage", "Our score"]}
        rows={RANKED_BRANDS.map((b) => [
          <A key={b.slug} href={`/reviews/${b.slug}`}>{b.name}</A>,
          b.formats.map((f) => FORMAT_LABEL[f]).join(", "),
          sub(b),
          b.storage,
          `${b.score.toFixed(1)}/10`,
        ])}
        note="Scores from our published rubric. 'Verifying' means we haven't yet confirmed the detail against the brand's own information."
      />
      <P>
        The biggest practical split is storage. Frozen fresh needs freezer space; the pantry formats don&apos;t. The second is commitment: most fresh plans are subscriptions, while some brands sell through retailers. Prices and calorie data are being verified brand by brand, and every review page shows them as soon as they&apos;re confirmed.
      </P>

      <H2 id="reviews">What do customers say about fresh dog food?</H2>
      <P>
        Mostly good things about taste and service, and mostly complaints about price and subscriptions. We read every review on the first pages of four brands&apos; Trustpilot profiles, {fmt(withTp.reduce((s, b) => s + (b.trustpilot?.reviews.length ?? 0), 0))} reviews in all, and show them on each brand&apos;s review page.
      </P>
      <Table
        caption="Trustpilot ratings for fresh dog food brands (checked Nov 4, 2026)"
        head={["Brand", "TrustScore", "Reviews on Trustpilot", "Reviews we read"]}
        rows={withTp.map((b) => [
          <A key={b.slug} href={`/reviews/${b.slug}#trustpilot`}>{b.name}</A>,
          `${b.trustpilot!.rating.toFixed(1)} / 5`,
          b.trustpilot!.reviewCount ? fmt(b.trustpilot!.reviewCount) : b.trustpilot!.reviewCountLabel ?? "-",
          fmt(b.trustpilot!.reviews.length),
        ])}
        note="TrustScores and review counts as shown on each brand's Trustpilot profile. Review sites are self-selected, and some reviews are invited by the company."
      />
      <P>
        Three themes repeat across brands. Picky and older dogs eating eagerly again is the most common praise. Customer service is praised far more often than criticised, especially around delivery problems.
        The sharpest complaints are about cost, portion sizes, thawed deliveries, and trial boxes that renewed into full-price subscriptions.
      </P>
      <P>
        You can read all of them, including every 1- and 2-star review, on our pages for <A href="/reviews/the-farmers-dog">The Farmer&apos;s Dog</A>, <A href="/reviews/ollie">Ollie</A>, <A href="/reviews/spot-and-tango">Spot &amp; Tango</A> and <A href="/reviews/the-pets-table">The Pets Table</A>.
      </P>

      <H2 id="stores">Can you buy fresh dog food in stores?</H2>
      <P>
        Some of it. Most frozen fresh plans are delivery-only, but several brands sell shelf-stable lines, and occasionally frozen packs, through retailers.
        In our November 5, 2026 product capture, {retail.length} of {PRODUCTS.length} listings were sold by retailers or marketplace sellers rather than by the brand.
      </P>
      <Table
        caption="Where fresh-style dog food from our seven brands was sold (listings captured Nov 5, 2026)"
        head={["Seller", "What was listed"]}
        rows={sellers.slice(0, 10).map((s) => {
          const items = retail.filter((p) => p.seller.replace(/ and other retailers$/, "").replace(/ seller$/, " (marketplace seller)") === s);
          return [s, items.map((p) => `${brandName(p.brand)} ${p.name}`).join("; ")];
        })}
        note="Online listings, not a store-stock check. Marketplace sellers are third parties reselling the product; check the brand's own price first."
      />
      <P>
        The listings we captured didn&apos;t include Costco or Target, so check those stores directly. If buying in person matters, the retail-first brand in our list is <A href="/reviews/redbarn">Redbarn</A>, and Ollie&apos;s baked food and jerky are sold at Petco.com.
        Our <A href="/#products">product carousels</A> list every product we track with its price and seller.
      </P>

      <H2 id="no-subscription">Can you get fresh dog food without a subscription?</H2>
      <P>
        Yes, but mostly in shelf-stable formats. Frozen fresh plans are mostly subscriptions; you can usually pause, skip or cancel online, but the default is a recurring delivery.
      </P>
      <List
        items={[
          <>Ollie&apos;s baked food and jerky treats at Petco.com, no subscription needed.</>,
          <>The Pets Table&apos;s air-dried and frozen recipes through Chewy and other retailers.</>,
          <>Redbarn&apos;s air-dried, kibble and rolled foods through pet retailers.</>,
          <>Maxbone&apos;s freeze-dried recipes through Chewy, and its kibble direct.</>,
          <>The Farmer&apos;s Dog Instant Fresh through Walmart, including third-party sellers.</>,
        ]}
      />
      <P>
        If you do subscribe, set the delivery interval to match how fast your dog eats and how much freezer you have, and note the cut-off before each charge. Several brands say they email a reminder before each charge, but reviews show it&apos;s easy to miss.
        Our <A href={bestForPath("first-time-owner")}>first-time owner guide</A> covers which plans are easiest to manage.
      </P>
    </>
  );
}
