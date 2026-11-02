import Link from "next/link";
import { comparePath } from "@/lib/dogfood/pairs";
import { bestForPath, dietPath } from "@/lib/dogfood/taxonomy";
import { AAFCO, dryMatter } from "@/lib/nutrition";

// Homepage editorial block (below the comparison matrix). Targets the
// "best fresh dog food / why fresh / benefits / diet / nutrition" cluster.
// House rule: no invented statistics - every number here is either a formula
// result (dry matter), an AAFCO threshold, or a widely published typical range.

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="font-semibold text-[#A16207] underline decoration-[#FDE68A] underline-offset-2 hover:decoration-[#A16207]">
    {children}
  </Link>
);

const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="mb-3 mt-10 scroll-mt-6 text-[22px] font-bold leading-tight text-[#191919] sm:text-[24px]">{children}</h2>
);

const P = ({ children }: { children: React.ReactNode }) => <p className="mb-4 text-[16px] leading-[1.75] text-gray-700">{children}</p>;

function SmallTable({ caption, head, rows }: { caption: string; head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="my-5 overflow-x-auto rounded-xl border border-[#F3E3A3] bg-white">
      <table className="w-full min-w-[480px] border-collapse text-left text-[14px]">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-[#FEF3C7] text-[12px] uppercase tracking-wide text-[#713F12]">
          <tr>{head.map((h) => <th key={h} scope="col" className="px-3 py-2.5 font-bold">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-[#FEF3C7]">
              {r.map((c, j) =>
                j === 0 ? <th key={j} scope="row" className="px-3 py-2.5 font-semibold text-[#191919]">{c}</th> : <td key={j} className="px-3 py-2.5 text-gray-700">{c}</td>,
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function HomeEditorial() {
  const freshDM = dryMatter(11, 70);
  const kibbleDM = dryMatter(26, 10);

  return (
    <article className="-mt-4" aria-labelledby="best-fresh-dog-food">
      <H2 id="best-fresh-dog-food">What is the best fresh dog food?</H2>
      <P>
        For most dogs, the best fresh dog food is a complete-and-balanced, gently cooked diet portioned to your dog&apos;s daily calorie needs.
        That&apos;s why <A href="/reviews/the-farmers-dog">The Farmer&apos;s Dog</A> tops our ranking. <A href="/reviews/ollie">Ollie</A> is the closest
        alternative and adds a baked option; see <A href={comparePath("the-farmers-dog-vs-ollie")}>The Farmer&apos;s Dog vs Ollie</A>{" "}
        for the full head-to-head.
        If you don&apos;t have freezer space, <A href="/reviews/spot-and-tango">Spot &amp; Tango</A>&apos;s UnKibble stores in the pantry
        (<A href={comparePath("ollie-vs-spot-and-tango")}>Ollie vs Spot &amp; Tango</A>). If you&apos;ve already decided on raw,
        <A href="/reviews/we-feed-raw"> We Feed Raw</A> is the subscription to beat (<A href={comparePath("the-farmers-dog-vs-we-feed-raw")}>The Farmer&apos;s Dog vs We Feed Raw</A>).
      </P>

      <H2 id="why-fresh">Why fresh dog food? The real benefits</H2>
      <P>
        Fresh dog food is made from whole meats and vegetables, cooked at lower temperatures than extruded kibble (or not cooked at all, for raw), then frozen or refrigerated.
        The benefits that hold up best:
      </P>
      <ul className="mb-4 list-disc space-y-2 pl-5 text-[16px] leading-[1.7] text-gray-700">
        <li><strong className="text-[#191919]">Digestibility.</strong> Controlled feeding studies, including University of Illinois research published in the <em>Journal of Animal Science</em>, have found lightly processed human-grade diets highly digestible, with smaller stool output than an extruded kibble.</li>
        <li><strong className="text-[#191919]">Moisture.</strong> Fresh food is roughly 70% water, against about 10% for kibble, so it adds to your dog&apos;s daily water intake.</li>
        <li><strong className="text-[#191919]">Portion control.</strong> Pre-portioned packs make it easy to feed a set number of calories, the single biggest lever for <A href={dietPath("weight-management")}>healthy weight</A>. Not sure how much? See <A href={"/articles/how-much-fresh-food-to-feed-a-dog"}>how much fresh food to feed your dog</A>.</li>
        <li><strong className="text-[#191919]">Palatability.</strong> Picky eaters usually take to fresh food fast. See our guide for <A href={bestForPath("picky-eater")}>picky eaters</A>.</li>
      </ul>
      <P>
        What fresh food doesn&apos;t do: it isn&apos;t automatically healthier than a well-formulated kibble, and it costs more per day. The deciding questions are whether it&apos;s complete and balanced, and whether the price works at your dog&apos;s weight.
      </P>

      <SmallTable
        caption="Fresh, raw, freeze-dried and kibble compared"
        head={["Format", "Typical moisture", "Processing", "Storage"]}
        rows={[
          [<A key="f" href={dietPath("gently-cooked")}>Fresh (gently cooked)</A>, "~65-75%", "Cooked at low temperature", "Freezer + fridge"],
          [<A key="r" href={dietPath("raw")}>Raw (frozen)</A>, "~60-70%", "Uncooked", "Freezer + fridge"],
          [<A key="d" href={dietPath("freeze-dried")}>Freeze-dried</A>, "under 10%", "Water removed, uncooked", "Pantry"],
          ["Kibble", "~10%", "High-heat extrusion", "Pantry"],
        ]}
      />

      <H2 id="nutrition">Fresh dog food nutrition: how to compare labels</H2>
      <P>
        Because fresh food is mostly water, its label percentages look low next to kibble. To compare fairly, convert to a <strong className="text-[#191919]">dry-matter basis</strong>:
        divide the nutrient by the share of the food that isn&apos;t water. A worked example:
      </P>
      <SmallTable
        caption="Dry-matter conversion example"
        head={["Label says", "Protein (as fed)", "Moisture", "Protein (dry matter)"]}
        rows={[
          ["Fresh food", "11%", "70%", `${freshDM.toFixed(1)}%`],
          ["Kibble", "26%", "10%", `${kibbleDM.toFixed(1)}%`],
        ]}
      />
      <P>
        In this example the fresh food actually has more protein once the water is removed. Next, check the AAFCO statement. An adult recipe should provide at least {AAFCO.adult.proteinPer1000} g of protein per 1,000 kcal;
        puppies need a growth or all-life-stages recipe with at least {AAFCO.growth.proteinPer1000} g. Our <A href="/how-we-rank">methodology</A> shows every formula we use.
      </P>

      <H2 id="right-diet">Which fresh diet fits your dog?</H2>
      <SmallTable
        caption="Fresh dog food picks by need"
        head={["If your dog…", "Look for", "Our pick"]}
        rows={[
          [<A key="s" href={dietPath("sensitive-stomach")}>Has a sensitive stomach</A>, "Single protein, moderate fat", <A key="1" href="/reviews/the-farmers-dog">The Farmer&apos;s Dog</A>],
          [<A key="w" href={dietPath("weight-loss")}>Needs to lose weight</A>, "Calorie-targeted portions", <A key="2" href="/reviews/the-farmers-dog">The Farmer&apos;s Dog</A>],
          [<A key="p" href={bestForPath("puppy")}>Is a puppy</A>, "AAFCO growth / all life stages", <A key="3" href={bestForPath("puppy")}>Puppy picks</A>],
          [<A key="r" href={dietPath("raw")}>Eats raw</A>, "Complete raw, safe handling", <A key="4" href="/reviews/we-feed-raw">We Feed Raw</A>],
          [<A key="b" href={dietPath("fresh-topper")}>Is on a budget</A>, "Topper or mixed plan", <A key="5" href="/reviews/the-pets-table">The Pets Table</A>],
        ]}
      />
      <P>
        Comparing two shortlisted brands? Read <A href={comparePath("the-farmers-dog-vs-spot-and-tango")}>The Farmer&apos;s Dog vs Spot &amp; Tango</A>,{" "}
        <A href={comparePath("ollie-vs-the-pets-table")}>Ollie vs The Pets Table</A>, <A href={comparePath("we-feed-raw-vs-maxbone")}>We Feed Raw vs Maxbone</A> or{" "}
        <A href={comparePath("maxbone-vs-redbarn")}>Maxbone vs Redbarn</A>, or browse <A href="/compare">all 21 comparisons</A>.
        For breed-specific feeding amounts, start with <A href={bestForPath("golden-retriever")}>Golden Retrievers</A>, <A href={bestForPath("french-bulldog")}>French Bulldogs</A>{" "}
        or <A href="/best-for">every breed</A>.
      </P>

      <H2 id="switching">How to switch to fresh food</H2>
      <P>
        Switch over about 10 days. Feed 25% new food for days 1-3, 50% for days 4-6, 75% for days 7-9, then 100%. If you&apos;re mixing fresh with kibble long term, cut the kibble by the calories the fresh food adds,
        otherwise your dog will gain weight. Dogs with a medical condition should switch only with their vet&apos;s agreement. See <A href={dietPath("transitioning-to-fresh")}>our transition guide</A>.
      </P>
    </article>
  );
}
