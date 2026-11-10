import { H2, P, Callout } from "@/components/page-shell";
import { FORMAT_LABEL, RANKED_BRANDS, type Format } from "@/lib/dogfood/brands";
import { dietPath, ingredientPath } from "@/lib/dogfood/taxonomy";
import { A, Ext, List, Part, SRC, Table } from "./ui";

const brandsWith = (f: Format) => RANKED_BRANDS.filter((b) => b.formats.includes(f)).map((b) => b.name).join(", ") || "None of the brands we cover";

export function Part1() {
  return (
    <>
      <Part id="basics" n={1} title="The basics" />
      <H2 id="what-is-fresh-dog-food">What is fresh dog food?</H2>
      <P>
        Fresh dog food is dog food made from whole meat, vegetables and grains or legumes, cooked lightly or not at all, and kept cold rather than dried into kibble.
        Most of it arrives frozen at your door on a subscription, portioned for your dog&apos;s calorie needs.
      </P>
      <P>
        That last part matters as much as the ingredients. A fresh plan usually starts with a questionnaire about your dog&apos;s weight, age, activity and body shape. The brand turns that into a daily calorie target and ships packs sized to it.
        You thaw, open and serve. There is no scoop and no guessing, which is where a lot of overfeeding starts.
      </P>
      <P>
        The term isn&apos;t legally defined, so &ldquo;fresh&rdquo; covers a wide range of products. Some are gently cooked meals that look like a home-cooked stew. Others are raw, freeze-dried, air-dried or baked.
        When people say &ldquo;fresh dog food&rdquo; they usually mean the first group: gently cooked, refrigerated or frozen, and delivered.
      </P>
      <P>
        This guide covers all of it: what fresh food is, what the research shows, what it really costs, where to buy it, how much to feed, and the safety questions worth asking.
        Every number comes from a named source we read, or from the standard calorie formulas vets use. Where the evidence is thin, we say so.
      </P>

      <H2 id="types">What types of fresh dog food are there?</H2>
      <P>
        There are eight common formats, and they differ in processing, storage and safety more than in nutrition. Here is how they compare, and which of the seven brands we cover use each one.
      </P>
      <Table
        caption="Fresh and minimally processed dog food formats compared"
        head={["Format", "How it's made", "Storage", "Brands we cover"]}
        rows={[
          [FORMAT_LABEL["gently-cooked"], "Cooked at lower heat in batches, then frozen or chilled", "Freezer, then fridge for a few days", brandsWith("gently-cooked")],
          [FORMAT_LABEL["raw-frozen"], "Not cooked; ground and frozen", "Freezer; thaw in the fridge", brandsWith("raw-frozen")],
          [FORMAT_LABEL["freeze-dried"], "Frozen, then water removed under vacuum", "Pantry", brandsWith("freeze-dried")],
          [FORMAT_LABEL["air-dried"], "Slowly dried with warm air", "Pantry", brandsWith("air-dried")],
          [FORMAT_LABEL["fresh-dry"], "Cooked, then dried into bite-size pieces", "Pantry", brandsWith("fresh-dry")],
          [FORMAT_LABEL.baked, "Baked into kibble-like pieces", "Pantry", brandsWith("baked")],
          [FORMAT_LABEL.rolled, "Cooked and packed into a sliceable log", "Pantry until opened, then fridge", brandsWith("rolled")],
          [FORMAT_LABEL.topper, "Small portions meant to go on another food", "Depends on format", brandsWith("topper")],
        ]}
        note="Brand formats as listed in our brand data. Freeze-dried and air-dried products can be raw or cooked; check the label."
      />
      <P>
        The format decides two practical things: whether you need freezer space, and whether the food has been through a cooking step. The second matters for safety, which we cover in Part 4.
        If freezer space is the deal-breaker, the pantry formats are the ones to look at; see <A href={dietPath("freeze-dried")}>freeze-dried</A> and <A href={dietPath("air-dried")}>air-dried</A> food.
      </P>

      <H2 id="cooked-or-raw">Is fresh dog food cooked or raw?</H2>
      <P>
        Most fresh dog food sold by delivery is cooked; raw is a separate category. The Farmer&apos;s Dog, Ollie and Spot &amp; Tango&apos;s fresh line are gently cooked. We Feed Raw sells raw, and some freeze-dried products are raw too.
      </P>
      <P>
        The difference is not cosmetic. Cooking kills the bacteria that raw meat can carry, and the FDA&apos;s own testing found raw pet food far more likely to be contaminated (more in Part 4).
        If a product doesn&apos;t say &ldquo;cooked&rdquo; on the pack, assume it may be raw and handle it like raw meat.
      </P>

      <H2 id="vs-kibble">How is fresh dog food different from kibble?</H2>
      <P>
        The real differences are processing and water. Kibble is made by forcing a cooked dough through an extruder, then drying it. Research on canine diets describes extrusion temperatures of 110-150 °C, or 230-300 °F (<Ext href={SRC.tran2008}>Tran, Wageningen University, 2008</Ext>).
        Fresh food is cooked at lower heat and keeps most of its water.
      </P>
      <Table
        caption="Fresh dog food vs kibble"
        head={["", "Kibble", "Gently cooked fresh food"]}
        rows={[
          ["Processing", "Extruded at high heat and pressure, then dried", "Cooked at lower heat, then frozen or chilled"],
          ["Water content", "About 10%", "About 70%"],
          ["Bowl size for the same calories", "Small", "Two to three times bigger by weight"],
          ["Storage", "Pantry for months", "Freezer, then fridge for a few days"],
          ["Portioning", "You scoop and estimate", "Usually pre-portioned to a calorie target"],
          ["Completeness", "Only if the AAFCO statement says so", "Only if the AAFCO statement says so"],
          ["Cost per calorie", "Lower", "Higher"],
        ]}
        note="Moisture figures are typical ranges; check the guaranteed analysis on the food you buy."
      />
      <P>
        The water is why fresh labels can look low in protein. A food that&apos;s 70% water and 11% protein as fed is about 37% protein once you remove the water, well above most kibble.
        Our <A href="/articles/fresh-vs-kibble">fresh vs kibble guide</A> walks through that conversion and everything else that changes for your dog after a switch.
      </P>

      <H2 id="healthier">Is fresh dog food healthier than kibble?</H2>
      <P>
        It&apos;s more digestible in the studies we have, but no study has shown it makes dogs live longer or get sick less often. That&apos;s the honest summary, and it&apos;s worth understanding both halves.
      </P>
      <P>
        The best evidence comes from two University of Illinois trials. Both are small, both were funded by fresh-food companies, and both measured digestion over weeks rather than health over years.
      </P>
      <Table
        caption="What the digestibility studies on fresh dog food found"
        head={["Study", "Dogs and diets", "Main finding", "Limits"]}
        rows={[
          [<Ext key="d" href={SRC.illinois2021}>Do et al., 2021</Ext>, "12 beagles; kibble vs one fresh refrigerated and two fresh human-grade diets, 4 weeks each", "Kibble-fed dogs ate more to hold their weight and produced 1.5-2.9x more stool", "One breed, short; funded by a fresh-food company"],
          [<Ext key="a" href={SRC.algya2018}>Algya et al., 2018</Ext>, "8 adult dogs; kibble vs two mildly cooked diets and a raw diet", "Mildly cooked diets had higher protein and fat digestibility than kibble", "Small; funded by Freshpet, whose diets were tested"],
        ]}
        note={<>Funding of the 2021 trial as reported by <Ext href={SRC.illinois2021Funding}>Veterinary Practice News</Ext>.</>}
      />
      <P>
        More digestible means more of the food is absorbed and less comes out the other end. Owners notice it as smaller, firmer stools. That&apos;s a real benefit, but it isn&apos;t the same thing as better long-term health.
      </P>
      <P>
        Two other effects are better supported in practice than in trials. Fresh food is far more palatable to many dogs; of the 282 Trustpilot reviews we read for our brand reviews, 39 (14%) mention a picky or fussy eater.
        And pre-portioned packs make it much easier to keep a dog lean. In the Association for Pet Obesity Prevention&apos;s 2022 survey, vets rated 59% of US dogs overweight or obese (<Ext href={SRC.apop2022}>APOP, 2022</Ext>).
      </P>
      <Callout>
        <strong>Our read:</strong> &ldquo;more digestible, more palatable and easier to portion&rdquo; is well supported. &ldquo;Healthier&rdquo; is not yet proven. A complete kibble fed at the right calories is still a sound diet, and we say so even though we review fresh brands.
      </Callout>

      <H2 id="vets">Do vets recommend fresh dog food?</H2>
      <P>
        There&apos;s no blanket veterinary position for or against cooked fresh food. The major bodies focus on two things: that the diet is complete and balanced, and that it isn&apos;t raw.
      </P>
      <P>
        The World Small Animal Veterinary Association (WSAVA) says your dog should eat a complete and balanced diet for its life stage &ldquo;from a reputable company,&rdquo; and that &ldquo;your veterinarian is the best person to ask about the best diet for your pet&rdquo; (<Ext href={SRC.wsavaFaq}>WSAVA</Ext>).
        On raw food the positions are firmer: the American Veterinary Medical Association discourages feeding any raw or undercooked animal protein (<Ext href={SRC.avmaRaw}>AVMA</Ext>).
      </P>
      <P>
        So a vet is likely to be comfortable with a cooked fresh diet that carries a complete AAFCO statement for your dog&apos;s life stage, and wary of raw. Bring the label to your next checkup; it&apos;s a five-minute conversation.
      </P>

      <H2 id="human-grade">What does &ldquo;human-grade&rdquo; dog food mean?</H2>
      <P>
        &ldquo;Human-grade&rdquo; means every ingredient and the finished food are edible for people, and were made, stored and transported under human-food rules. A single non-human-grade ingredient, or a pet-food-only facility, rules the claim out.
      </P>
      <P>
        It&apos;s a safety and handling standard, not a nutrition score. A human-grade food can still be unbalanced, and a feed-grade food can be complete. Treat it as one point in a brand&apos;s favour, not the reason to buy.
        See <A href={dietPath("human-grade")}>human-grade dog food</A> and our <A href="/articles/how-to-read-a-dog-food-label">label guide</A> for the full definition.
      </P>

      <H2 id="complete">Is fresh dog food complete and balanced?</H2>
      <P>
        Only if its label says so. Look for the AAFCO nutritional adequacy statement: it should say the food is complete and balanced for your dog&apos;s life stage, either by formulation or by feeding trials.
      </P>
      <P>
        The WSAVA&apos;s checklist for choosing any food starts here. It also notes that diets labelled &ldquo;for all life-stages&rdquo; are formulated for reproduction and growth, and that foods for &ldquo;intermittent&rdquo; or &ldquo;complementary&rdquo; feeding should make up 10% of the diet or less (<Ext href={SRC.wsavaSelect}>WSAVA, 2021</Ext>).
      </P>
      <Table
        caption="What to check on a fresh dog food label"
        head={["Check", "What to look for", "Why"]}
        rows={[
          ["AAFCO statement", "Complete and balanced for your dog's life stage", "Without it, the food isn't a full diet"],
          ["Life stage", "Growth or all life stages for puppies; adult maintenance for adults", "Puppies have higher minimums"],
          ["Large-size growth", "\"Including growth of large size dogs (70 lb or more as an adult)\"", "Calcium is capped for big-breed puppies"],
          ["Calories", "kcal per kg or per pack", "You need it to portion and to compare cost"],
          ["Ingredient list", "Named meats first; where peas, lentils or potatoes appear", "Relevant to the FDA's DCM reports"],
          ["Cooking", "Says cooked, or treat as raw", "Raw needs raw-meat handling"],
        ]}
      />
      <P>
        Calorie information is required on pet food labels in the US, the WSAVA notes, which makes cost and portion comparisons possible here in a way they aren&apos;t everywhere (<Ext href={SRC.wsavaSelect}>WSAVA, 2021</Ext>).
      </P>

      <H2 id="grain-free">Is fresh dog food grain-free?</H2>
      <P>
        Some recipes are, many aren&apos;t, and grain-free isn&apos;t automatically better. Fresh brands use rice, oats and barley in some recipes and sweet potatoes, peas or lentils in others.
      </P>
      <P>
        The question matters because of the FDA&apos;s investigation into diet and canine dilated cardiomyopathy (DCM). In the cases it analysed, more than 90% of foods were labelled grain-free and 93% contained peas and/or lentils (<Ext href={SRC.fdaDcm}>FDA</Ext>).
        The FDA hasn&apos;t found that these diets cause DCM and recalled none, but the pattern points at <A href={ingredientPath("peas")}>peas</A>, <A href={ingredientPath("lentils")}>lentils</A> and other pulses high on the ingredient list, not at the absence of grain.
        We cover it in Part 4 and in depth in <A href="/articles/grain-free-dog-food-and-dcm">grain-free dog food and DCM</A>.
      </P>
      <List
        items={[
          <>No medical reason to avoid grain? A <A key="gi" href={dietPath("grain-inclusive")}>grain-inclusive recipe</A> sidesteps the question.</>,
          "Feeding grain-free already? Check where pulses sit in the ingredient list and mention the diet to your vet.",
          "Suspect a grain allergy? Confirm it with your vet before choosing a food on that basis; an elimination diet is the usual way to test.",
        ]}
      />
    </>
  );
}
