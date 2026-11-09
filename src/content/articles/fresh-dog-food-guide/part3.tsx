import { H2, P, Callout } from "@/components/page-shell";
import { bestForPath, dietPath } from "@/lib/dogfood/taxonomy";
import { AAFCO, LIFE_STAGE_FACTORS, kcalPerDayForLb, rer, lbToKg } from "@/lib/nutrition";
import { A, Ext, List, Part, SRC, Table, fmt } from "./ui";

// Illustrative calorie densities (not specific brands); check your own labels.
const FRESH_KCAL_PER_KG = 1300;
const KIBBLE_KCAL_PER_KG = 3600;
const grams = (kcal: number, perKg: number) => (kcal / perKg) * 1000;

const STAGES = ["puppy-young", "puppy-older", "intact-adult", "neutered-adult", "active", "senior", "weight-loss"] as const;

export function Part3() {
  const k25 = kcalPerDayForLb(25);
  const k50 = kcalPerDayForLb(50);
  const target40 = Math.round(rer(lbToKg(40)) * LIFE_STAGE_FACTORS["weight-loss"].factor);
  const seniorPct = Math.round((1 - LIFE_STAGE_FACTORS.senior.factor / LIFE_STAGE_FACTORS["neutered-adult"].factor) * 100);
  return (
    <>
      <Part id="feeding" n={3} title="Feeding" />
      <H2 id="how-much">How much fresh dog food should I feed my dog?</H2>
      <P>
        Feed by calories, not by cups. Work out your dog&apos;s daily calorie need, then divide by the food&apos;s calories per gram. Most fresh plans do this for you, but it&apos;s worth checking the math, especially if you mix foods.
      </P>
      <Table
        caption="Daily calories and fresh food portions by weight (neutered adults, illustrative food)"
        head={["Dog's weight", "Calories per day", "Fresh food per day (example)", "Kibble per day (example)"]}
        rows={[10, 25, 50, 75, 100].map((lb) => {
          const k = kcalPerDayForLb(lb);
          return [`${lb} lb (${lbToKg(lb).toFixed(1)} kg)`, `${fmt(k)} kcal`, `${fmt(grams(k, FRESH_KCAL_PER_KG))} g`, `${fmt(grams(k, KIBBLE_KCAL_PER_KG))} g`];
        })}
        note={`Examples use illustrative labels: fresh food at ${fmt(FRESH_KCAL_PER_KG)} kcal/kg and kibble at ${fmt(KIBBLE_KCAL_PER_KG)} kcal/kg. Use the calorie figure on your own food.`}
      />
      <P>
        Treat the result as a starting point. Weigh your dog and check its body condition two to four weeks in, then adjust in small steps. Our <A href="/articles/how-much-fresh-food-to-feed-a-dog">fresh feeding guide</A> covers breeds and special cases in more detail.
      </P>

      <H2 id="calculator">How do you calculate your dog&apos;s calories?</H2>
      <P>Vets use a two-step formula. You can do it on a phone calculator in under a minute:</P>
      <List
        ordered
        items={[
          <>Convert your dog&apos;s weight to kilograms: pounds divided by 2.2.</>,
          <>Work out resting energy (RER): 70 x (weight in kg to the power of 0.75). For a 25 lb (11.3 kg) dog that is {fmt(rer(lbToKg(25)))} kcal.</>,
          <>Multiply by a life-stage factor from the table below. A neutered adult is x{LIFE_STAGE_FACTORS["neutered-adult"].factor}, so the same dog needs about {fmt(k25)} kcal a day.</>,
          <>Divide by the food&apos;s calories per gram to get the portion.</>,
        ]}
      />
      <Table
        caption="Life-stage factors used to estimate daily calories"
        head={["Life stage", "Factor x RER", "25 lb dog (example)"]}
        rows={STAGES.map((s) => [LIFE_STAGE_FACTORS[s].label, `x${LIFE_STAGE_FACTORS[s].factor}`, `${fmt(kcalPerDayForLb(25, s))} kcal/day`])}
        note="Starting estimates only. The weight-loss factor applies to the target weight, not the current one; plan weight loss with your vet."
      />

      <H2 id="switching">How do you switch a dog to fresh food?</H2>
      <P>
        Gradually, over about 10 days. The American Animal Hospital Association advises moving dogs to any new food over seven days, starting by replacing 25% of the old food (<Ext href={SRC.aaha}>AAHA, 2021</Ext>). We add a few days for fresh food because water, fat and texture all change at once.
      </P>
      <P>
        There&apos;s a reason to go slowly. In a 2022 University of Illinois study, 12 adult beagles switched abruptly to a new diet had looser stools almost immediately; their gut metabolites shifted within about 2 days and their gut bacteria took about 6 days to settle (<Ext href={SRC.lin2022}>Lin et al., 2022</Ext>).
      </P>
      <Table
        caption="10-day switch to fresh food, measured in calories"
        head={["Days", "Fresh food", "Old food", "25 lb dog: fresh grams (example)"]}
        rows={[
          ["1-3", "25%", "75%", `${fmt(grams(k25 * 0.25, FRESH_KCAL_PER_KG))} g`],
          ["4-6", "50%", "50%", `${fmt(grams(k25 * 0.5, FRESH_KCAL_PER_KG))} g`],
          ["7-9", "75%", "25%", `${fmt(grams(k25 * 0.75, FRESH_KCAL_PER_KG))} g`],
          ["10 on", "100%", "0%", `${fmt(grams(k25, FRESH_KCAL_PER_KG))} g`],
        ]}
      />
      <P>
        If stools are soft at the end of a step, hold there for two or three days. Diarrhoea that lasts, vomiting, blood or lethargy are reasons to stop and call your vet. The full day-by-day plan is in <A href="/articles/how-to-switch-dog-to-fresh-food">how to switch your dog to fresh food</A>.
      </P>

      <H2 id="mixing">Can you mix fresh dog food with kibble?</H2>
      <P>
        Yes, and it&apos;s the most affordable way to feed fresh. The rule is simple: split the day&apos;s calories, not the cups, and cut the kibble by exactly the calories the fresh food adds.
      </P>
      <P>
        For a 25 lb dog on {fmt(k25)} kcal a day, a 25% topper is about {fmt(k25 * 0.25)} kcal: roughly {fmt(grams(k25 * 0.25, FRESH_KCAL_PER_KG))} g of fresh food (example label), with the kibble reduced by about {fmt(grams(k25 * 0.25, KIBBLE_KCAL_PER_KG))} g.
        If you add fresh food on top without reducing the kibble, you&apos;re adding a quarter more calories every day, which is how dogs gain weight on &ldquo;healthy&rdquo; toppers.
      </P>
      <P>
        Make sure the base food is complete. If the kibble carries the AAFCO statement and the fresh food is a small topper, the diet stays balanced. See <A href={dietPath("mixed-feeding")}>mixed feeding</A> and <A href={dietPath("fresh-topper")}>fresh toppers</A>.
      </P>

      <H2 id="puppies">Is fresh dog food good for puppies?</H2>
      <P>
        Yes, if the recipe is complete for growth. Its AAFCO statement must say &ldquo;growth&rdquo; or &ldquo;all life stages&rdquo;, and include large-size dogs if your puppy will reach 70 lb or more as an adult.
      </P>
      <Table
        caption="AAFCO minimums: growth vs adult maintenance"
        head={["Nutrient", "Growth", "Adult maintenance"]}
        rows={[
          ["Protein (dry matter)", `${AAFCO.growth.proteinDM}%`, `${AAFCO.adult.proteinDM}%`],
          ["Fat (dry matter)", `${AAFCO.growth.fatDM}%`, `${AAFCO.adult.fatDM}%`],
          ["Protein per 1,000 kcal", `${AAFCO.growth.proteinPer1000} g`, `${AAFCO.adult.proteinPer1000} g`],
          ["Fat per 1,000 kcal", `${AAFCO.growth.fatPer1000} g`, `${AAFCO.adult.fatPer1000} g`],
          ["Calcium, large-size growth", `Max ${AAFCO.largeBreedGrowthCaMaxDM}% DM`, "n/a"],
        ]}
      />
      <P>
        Puppies need about {LIFE_STAGE_FACTORS["puppy-young"].factor} times their resting energy under 4 months and {LIFE_STAGE_FACTORS["puppy-older"].factor} times from 4 to 12 months.
        For large breeds, the WSAVA advises portion-controlled feeding for slow weight gain and a body condition score of 4 out of 9, to avoid joint and skeletal problems, and no free feeding (<Ext href={SRC.wsavaFaq}>WSAVA</Ext>).
        Our <A href="/articles/fresh-food-for-puppies">fresh food for puppies</A> guide has the full picture.
      </P>

      <H2 id="seniors">Is fresh dog food good for senior dogs?</H2>
      <P>
        It can be, especially for older dogs that have gone off their food or find kibble hard to chew. Many of the most enthusiastic reviews we read came from owners of dogs aged 10 and older that started eating eagerly again.
      </P>
      <P>
        Calories usually need to come down. Using the standard factors, a less active senior (x{LIFE_STAGE_FACTORS.senior.factor}) needs about {seniorPct}% fewer calories than a neutered adult (x{LIFE_STAGE_FACTORS["neutered-adult"].factor}) of the same weight.
        Fresh plans adjust to updated weight and activity, so tell the brand when your dog slows down. Our <A href={bestForPath("senior-dog")}>senior dog guide</A> covers it.
      </P>
      <P>
        Older dogs are also more likely to have kidney, liver or heart conditions. If your vet has prescribed a therapeutic diet, keep it; none of the fresh brands we cover sells a prescription diet.
      </P>

      <H2 id="weight-loss">Can fresh dog food help a dog lose weight?</H2>
      <P>
        It can, mainly because the portions are measured. Weight is a widespread problem: vets rated 59% of US dogs overweight or obese in the Association for Pet Obesity Prevention&apos;s 2022 survey (<Ext href={SRC.apop2022}>APOP, 2022</Ext>).
      </P>
      <P>
        The usual approach is to feed for the target weight, not the current one. For a dog weighing 50 lb that should weigh 40 lb, the weight-loss estimate is resting energy at 40 lb x{LIFE_STAGE_FACTORS["weight-loss"].factor}, about {fmt(target40)} kcal a day, against {fmt(k50)} kcal to maintain 50 lb.
        Plan weight loss with your vet, weigh every two weeks, and count treats. See <A href={dietPath("weight-management")}>fresh food for weight management</A>.
      </P>

      <H2 id="size">Does fresh dog food work for small and large dogs?</H2>
      <P>
        Yes, but the trade-offs differ. Small dogs eat little in absolute terms, so fresh food costs the least per day and the gap to kibble is smallest. They also burn more energy per pound, so regular meals matter.
      </P>
      <P>
        Large dogs are where cost bites. A 100 lb dog needs about {fmt(kcalPerDayForLb(100))} kcal a day, so a full fresh diet is a serious expense; a topper or mixed plan is often the realistic option. Large-breed puppies also need the calcium cap and measured meals described above.
        See <A href={bestForPath("small-breed")}>small dogs</A> and <A href={bestForPath("large-breed")}>large dogs</A>.
      </P>

      <H2 id="poop">Will fresh dog food change my dog&apos;s poop?</H2>
      <P>
        Usually, yes: expect smaller, firmer stools once your dog adjusts. In the 2021 Illinois trial, dogs on kibble produced 1.5 to 2.9 times as much stool as on fresh diets, because more of the fresh food was absorbed (<Ext href={SRC.illinois2021}>University of Illinois, 2021</Ext>).
      </P>
      <P>
        A few days of softer stool during the switch is common; diarrhoea that lasts is not. Dogs with a history of digestive trouble should switch more slowly; see <A href={dietPath("sensitive-stomach")}>fresh food for sensitive stomachs</A>.
      </P>

      <H2 id="water">Will my dog drink less water on fresh food?</H2>
      <P>
        Probably. At around 70% moisture, fresh food delivers much of the day&apos;s water in the bowl. For a 25 lb dog, about {fmt(grams(k25, FRESH_KCAL_PER_KG))} g of fresh food a day (example label) carries roughly {fmt(grams(k25, FRESH_KCAL_PER_KG) * 0.7)} g of water, against about {fmt(grams(k25, KIBBLE_KCAL_PER_KG) * 0.1)} g in the equivalent kibble.
      </P>
      <P>
        Less drinking is expected, not a warning sign. Keep fresh water out at all times, and call your vet about any sudden, large change in thirst on any diet.
      </P>

      <H2 id="treats">How many treats can a dog on fresh food have?</H2>
      <P>
        Keep treats and toppers to about 10% of daily calories. The WSAVA says foods meant for intermittent or complementary feeding should make up 10% of the diet or less (<Ext href={SRC.wsavaSelect}>WSAVA, 2021</Ext>). For a 25 lb dog that&apos;s about {fmt(k25 * 0.1)} kcal a day.
      </P>
      <Callout>
        <strong>Count the extras.</strong> Training treats, chews and table scraps add up fast, and they come on top of a carefully portioned fresh plan. If your dog is gaining weight, look at the extras before you cut the meals.
      </Callout>
    </>
  );
}
