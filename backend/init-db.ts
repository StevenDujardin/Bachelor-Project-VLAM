// Execute: npx ts-node init-db.ts

import { PrismaClient } from '@prisma/client';
export * from '.prisma/client';

const prisma = new PrismaClient();

const main = async () => {

    //Create some recipes
    const aardbeienTaart = await prisma.recipe.create({
      data: {
          title: "AardbeienTaart",
          description: "Gooi aardbeien op een taart",
          duration: 10,
          steps: ["Neem taart", "Gooi er aardbeien op"],
          difficulty: "Gemakkelijk",
          type: "dessert",
          ingredients: ["Aardbeien", "Taart"],
          image: "", 

      }
  });

  const CaesarsaladeKip = await prisma.recipe.create({
    data: {
        title: "CaesarsaladeKip",
        description: "Slaatje met Kip",
        duration: 15,
        steps: ["Neem taart", "Gooi er aardbeien op"],
        difficulty: "Gemakkelijk",
        type: "Hoofdgerecht",
        ingredients: ["4 kippenbillen", "2 eierdooiers","2 teentjes look","½ limoen of citroen",
        "1 eetlepel mosterd","15 cl arachideolie","1 dl natuuryoghurt","cayennepeper",
        "Engelse saus (Worchestershiresaus)","3 zoute ansjovisfilets","1 krop Romeinse sla","1 ongesneden toastbrood"
      ,"klontjes boter","olijfolie","100 g Parmezaanse kaas in blok"],
      image: "", 

    }
});
  const PastaCarbonara = await prisma.recipe.create({
    data: {
        title: "Pasta Carbonara",
        type: "Hoofdgerecht",
        duration: 25,
        difficulty: "Gemiddeld",
        description: "Een heerlijke salade met kazen van bij ons? Dat kan! Probeer deze heerlijke maaltijdsalade met Flandrien kaas die de show steelt. Gecombineerd met het fruit en de karnemelkdressing krijg je een frisse toets bij het gerecht. Puur genieten!",
        ingredients: ["500g pasta", "4 eggs", "200 g bacon", "150 g cheese", "salt"],
        steps: [
          "Doe alle ingrediënten voor de dressing in een afsluitbaar potje of bokaal, kruid met peper en zout en schud tot een romige dressing. Zet koel weg.",
          "Snijd het brood in blokjes.Pers de look en roerbak 30 seconden in olijfolie. Voeg de broodblokjes en het takje rozemarijn toe en bak het brood goudbruin en knapperig. Kruid met peper en zout.",
          "Hussel de rucola onder de groene sla en schik op een mooie schaal. Verdeel er de bramen en de in plakjes gesneden rode bietjes over. Verbrokkel er de kaas over en bestrooi met de croutons.Druppel er de dressing over en serveer.",
        ],
        image: "",
    }
  });

  const kip = await prisma.recipe.create({
    data: {
        title: "kip",
        description: "kip",
        duration: 10,
        steps: ["Neem Kip", "Eet Kip"],
        difficulty: "Gemakkelijk",
        type: "dessert",
        ingredients: ["Kip", "Mond"],
        image: "", 
    }
});

const testEdit = await prisma.recipe.create({
  data: {
      title: "testEdit",
      description: "testEdit",
      duration: 10,
      steps: ["testEdit", "testEdit"],
      difficulty: "Gemakkelijk",
      type: "Dessert",
      ingredients: ["testEdit", "testEdit"],
      image: "", 
  }
});



  //Ingredients

  const aardappelen = await prisma.ingredient.create({
    data:{
      name: "aardappelen"
    }
  });



const aardbeien = await prisma.ingredient.create({
    data:{
      name: "aardbeien"
    }
  });



const aardperen = await prisma.ingredient.create({
    data:{
      name: "aardperen"
    }
  });



const Affligem_Abdijkaas = await prisma.ingredient.create({
    data:{
      name: "Affligem_Abdijkaas"
    }
  });



const ajuinen = await prisma.ingredient.create({
    data:{
      name: "ajuinen"
    }
  });



const amandelen = await prisma.ingredient.create({
    data:{
      name: "amandelen"
    }
  });



const amandelpoeder = await prisma.ingredient.create({
    data:{
      name: "amandelpoeder"
    }
  });



const amandelschilfers = await prisma.ingredient.create({
    data:{
      name: "amandelschilfers"
    }
  });



const andijvie = await prisma.ingredient.create({
    data:{
      name: "andijvie"
    }
  });



const ansjovisfilets = await prisma.ingredient.create({
    data:{
      name: "ansjovisfilets"
    }
  });



const appelazijn = await prisma.ingredient.create({
    data:{
      name: "appelazijn"
    }
  });



const appelen = await prisma.ingredient.create({
    data:{
      name: "appelen"
    }
  });



const appels = await prisma.ingredient.create({
    data:{
      name: "appels"
    }
  });



const arachideolie = await prisma.ingredient.create({
    data:{
      name: "arachideolie"
    }
  });



const asperges = await prisma.ingredient.create({
    data:{
      name: "asperges"
    }
  });



const aubergines = await prisma.ingredient.create({
    data:{
      name: "aubergines"
    }
  });



const augurken = await prisma.ingredient.create({
    data:{
      name: "augurken"
    }
  });



const azijn = await prisma.ingredient.create({
    data:{
      name: "azijn"
    }
  });



const bakboter = await prisma.ingredient.create({
    data:{
      name: "bakboter"
    }
  });



const bakpoeder = await prisma.ingredient.create({
    data:{
      name: "bakpoeder"
    }
  });



const balsamico = await prisma.ingredient.create({
    data:{
      name: "balsamico"
    }
  });



const balsamicoazijn = await prisma.ingredient.create({
    data:{
      name: "balsamicoazijn"
    }
  });



const barbecuesaus = await prisma.ingredient.create({
    data:{
      name: "barbecuesaus"
    }
  });



const basilicum = await prisma.ingredient.create({
    data:{
      name: "basilicum"
    }
  });



const Beauvoordse_boerenkaas = await prisma.ingredient.create({
    data:{
      name: "Beauvoordse_boerenkaas"
    }
  });



const Belgische_Brie_lexquis = await prisma.ingredient.create({
    data:{
      name: "Belgische_Brie_l'Exquis"
    }
  });



const Belgische_cheddarkaas = await prisma.ingredient.create({
    data:{
      name: "Belgische_cheddarkaas"
    }
  });



const Belgische_peperkoek = await prisma.ingredient.create({
    data:{
      name: "Belgische_peperkoek"
    }
  });



const Belgische_saffraan = await prisma.ingredient.create({
    data:{
      name: "Belgische_saffraan"
    }
  });



const Belgische_schuimwijn = await prisma.ingredient.create({
    data:{
      name: "Belgische_schuimwijn"
    }
  });



const Berloumi = await prisma.ingredient.create({
    data:{
      name: "Berloumi"
    }
  });



const bessen = await prisma.ingredient.create({
    data:{
      name: "bessen"
    }
  });



const bieslook = await prisma.ingredient.create({
    data:{
      name: "bieslook"
    }
  });



const bieslook_of_dragon_naar_smaak = await prisma.ingredient.create({
    data:{
      name: "bieslook_of_dragon,_naar_smaak"
    }
  });



const bieten = await prisma.ingredient.create({
    data:{
      name: "bieten"
    }
  });



const biscuits_Antwerpse_handjes = await prisma.ingredient.create({
    data:{
      name: "biscuits_Antwerpse_handjes"
    }
  });



const bladerdeeg = await prisma.ingredient.create({
    data:{
      name: "bladerdeeg"
    }
  });



const bladpeterselie = await prisma.ingredient.create({
    data:{
      name: "bladpeterselie"
    }
  });



const blauwe_bessen = await prisma.ingredient.create({
    data:{
      name: "blauwe_bessen"
    }
  });



const blauwe_kaas = await prisma.ingredient.create({
    data:{
      name: "blauwe_kaas"
    }
  });



const blauwe_schimmelkaas_Pas_de_Bleu_of_Bleu_Gourmet = await prisma.ingredient.create({
    data:{
      name: "blauwe_schimmelkaas,_Pas_de_Bleu_of_Bleu_Gourmet"
    }
  });



const bloedworsten = await prisma.ingredient.create({
    data:{
      name: "bloedworsten"
    }
  });



const bloem = await prisma.ingredient.create({
    data:{
      name: "bloem"
    }
  });



const bloemige_aardappelen = await prisma.ingredient.create({
    data:{
      name: "bloemige_aardappelen"
    }
  });



const bloemkolen = await prisma.ingredient.create({
    data:{
      name: "bloemkolen"
    }
  });



const bloemsuiker = await prisma.ingredient.create({
    data:{
      name: "bloemsuiker"
    }
  });



const boerenbroden = await prisma.ingredient.create({
    data:{
      name: "boerenbroden"
    }
  });



const boerenkolen = await prisma.ingredient.create({
    data:{
      name: "boerenkolen"
    }
  });



const bonenkruid = await prisma.ingredient.create({
    data:{
      name: "bonenkruid"
    }
  });



const boontjes = await prisma.ingredient.create({
    data:{
      name: "boontjes"
    }
  });



const boter = await prisma.ingredient.create({
    data:{
      name: "boter"
    }
  });



const bouillonblokje = await prisma.ingredient.create({
    data:{
      name: "bouillonblokje"
    }
  });



const braambessen = await prisma.ingredient.create({
    data:{
      name: "braambessen"
    }
  });



const Brie_de_la_frontière = await prisma.ingredient.create({
    data:{
      name: "Brie_de_la_frontière"
    }
  });



const broccoli = await prisma.ingredient.create({
    data:{
      name: "broccoli"
    }
  });



const broden = await prisma.ingredient.create({
    data:{
      name: "broden"
    }
  });



const Brugge_Blomme = await prisma.ingredient.create({
    data:{
      name: "Brugge_Blomme"
    }
  });



const Brugge_Broodje = await prisma.ingredient.create({
    data:{
      name: "Brugge_Broodje"
    }
  });



const Brugge_Dentelle = await prisma.ingredient.create({
    data:{
      name: "Brugge_Dentelle"
    }
  });



const Brugge_Oud = await prisma.ingredient.create({
    data:{
      name: "Brugge_Oud"
    }
  });



const bruine_suiker = await prisma.ingredient.create({
    data:{
      name: "bruine_suiker"
    }
  });



const bruiswater = await prisma.ingredient.create({
    data:{
      name: "bruiswater"
    }
  });



const buikspek_met_vel = await prisma.ingredient.create({
    data:{
      name: "buikspek_met_vel"
    }
  });



const butternut = await prisma.ingredient.create({
    data:{
      name: "butternut"
    }
  });



const butternut_pompoenen = await prisma.ingredient.create({
    data:{
      name: "butternut_pompoenen"
    }
  });



const Calvados = await prisma.ingredient.create({
    data:{
      name: "Calvados"
    }
  });



const cashewnoten = await prisma.ingredient.create({
    data:{
      name: "cashewnoten"
    }
  });



const cayennepeper = await prisma.ingredient.create({
    data:{
      name: "cayennepeper"
    }
  });



const champignons = await prisma.ingredient.create({
    data:{
      name: "champignons"
    }
  });



const chilipepers = await prisma.ingredient.create({
    data:{
      name: "chilipepers"
    }
  });



const chilipoeder = await prisma.ingredient.create({
    data:{
      name: "chilipoeder"
    }
  });



const chilivlokken = await prisma.ingredient.create({
    data:{
      name: "chilivlokken"
    }
  });



const chocoladeballetjes_met_granen = await prisma.ingredient.create({
    data:{
      name: "chocoladeballetjes_met_granen"
    }
  });



const ciabatta = await prisma.ingredient.create({
    data:{
      name: "ciabatta"
    }
  });



const citroenen = await prisma.ingredient.create({
    data:{
      name: "citroenen"
    }
  });



const citroensap = await prisma.ingredient.create({
    data:{
      name: "citroensap"
    }
  });



const citroentijm = await prisma.ingredient.create({
    data:{
      name: "citroentijm"
    }
  });



const citroenverbena = await prisma.ingredient.create({
    data:{
      name: "citroenverbena"
    }
  });



const citroenzeste = await prisma.ingredient.create({
    data:{
      name: "citroenzeste"
    }
  });



const cognac = await prisma.ingredient.create({
    data:{
      name: "cognac"
    }
  });



const confituursuiker = await prisma.ingredient.create({
    data:{
      name: "confituursuiker"
    }
  });



const courgettes = await prisma.ingredient.create({
    data:{
      name: "courgettes"
    }
  });



const crackers = await prisma.ingredient.create({
    data:{
      name: "crackers"
    }
  });



const crème_fraîche = await prisma.ingredient.create({
    data:{
      name: "crème_fraîche"
    }
  });



const currypoeder = await prisma.ingredient.create({
    data:{
      name: "currypoeder"
    }
  });



const dadels = await prisma.ingredient.create({
    data:{
      name: "dadels"
    }
  });



const Damse_Brie = await prisma.ingredient.create({
    data:{
      name: "Damse_Brie"
    }
  });



const Damse_Mokkes = await prisma.ingredient.create({
    data:{
      name: "Damse_Mokkes"
    }
  });



const de_ricotta_de_Berloumi = await prisma.ingredient.create({
    data:{
      name: "de_ricotta_de_Berloumi"
    }
  });



const diepvrieserwten = await prisma.ingredient.create({
    data:{
      name: "diepvrieserwten"
    }
  });



const dille = await prisma.ingredient.create({
    data:{
      name: "dille"
    }
  });



const donker_bier = await prisma.ingredient.create({
    data:{
      name: "donker_bier"
    }
  });



const dragon = await prisma.ingredient.create({
    data:{
      name: "dragon"
    }
  });



const droge_gist = await prisma.ingredient.create({
    data:{
      name: "droge_gist"
    }
  });



const droge_witte_wijn = await prisma.ingredient.create({
    data:{
      name: "droge_witte_wijn"
    }
  });



const tarwebier = await prisma.ingredient.create({
    data:{
      name: "tarwebier"
    }
  });



const druivenpitolie = await prisma.ingredient.create({
    data:{
      name: "druivenpitolie"
    }
  });



const eidooiers = await prisma.ingredient.create({
    data:{
      name: "eidooiers"
    }
  });



const eieren = await prisma.ingredient.create({
    data:{
      name: "eieren"
    }
  });



const eikenbladsla = await prisma.ingredient.create({
    data:{
      name: "eikenbladsla"
    }
  });



const eiwitten = await prisma.ingredient.create({
    data:{
      name: "eiwitten"
    }
  });



const erwten = await prisma.ingredient.create({
    data:{
      name: "erwten"
    }
  });



const fijne_suiker = await prisma.ingredient.create({
    data:{
      name: "fijne_suiker"
    }
  });



const fijngehakte_basilicum = await prisma.ingredient.create({
    data:{
      name: "fijngehakte_basilicum"
    }
  });



const fijngehakte_bieslook = await prisma.ingredient.create({
    data:{
      name: "fijngehakte_bieslook"
    }
  });



const fijngehakte_munt = await prisma.ingredient.create({
    data:{
      name: "fijngehakte_munt"
    }
  });



const fijngehakte_peterselie = await prisma.ingredient.create({
    data:{
      name: "fijngehakte_peterselie"
    }
  });



const fijngesneden_bieslook = await prisma.ingredient.create({
    data:{
      name: "fijngesneden_bieslook"
    }
  });



const filodeeg = await prisma.ingredient.create({
    data:{
      name: "filodeeg"
    }
  });



const Flandrien_gerijpt = await prisma.ingredient.create({
    data:{
      name: "Flandrien_gerijpt"
    }
  });



const Flandrien_Grand_Cru = await prisma.ingredient.create({
    data:{
      name: "Flandrien_Grand_Cru"
    }
  });



const Flandrien_Jong = await prisma.ingredient.create({
    data:{
      name: "Flandrien_Jong"
    }
  });



const Flandrien_Oud = await prisma.ingredient.create({
    data:{
      name: "Flandrien_Oud"
    }
  });



const frambozen = await prisma.ingredient.create({
    data:{
      name: "frambozen"
    }
  });



const frambozenconfituur = await prisma.ingredient.create({
    data:{
      name: "frambozenconfituur"
    }
  });



const frietaardappelen = await prisma.ingredient.create({
    data:{
      name: "frietaardappelen"
    }
  });



const frieten = await prisma.ingredient.create({
    data:{
      name: "frieten"
    }
  });



const frisée_sla = await prisma.ingredient.create({
    data:{
      name: "frisée-sla"
    }
  });



const frituurolie = await prisma.ingredient.create({
    data:{
      name: "frituurolie"
    }
  });



const Gandaham = await prisma.ingredient.create({
    data:{
      name: "Gandaham"
    }
  });



const garam_masala = await prisma.ingredient.create({
    data:{
      name: "garam_masala"
    }
  });



const garnaalfumet = await prisma.ingredient.create({
    data:{
      name: "garnaalfumet"
    }
  });



const garnaalschalen = await prisma.ingredient.create({
    data:{
      name: "garnaalschalen"
    }
  });



const garnalen = await prisma.ingredient.create({
    data:{
      name: "garnalen"
    }
  });



const gecondenseerde_melk = await prisma.ingredient.create({
    data:{
      name: "gecondenseerde_melk"
    }
  });



const gedroogde_ham = await prisma.ingredient.create({
    data:{
      name: "gedroogde_ham"
    }
  });



const gedroogde_Meesterlyck_ham = await prisma.ingredient.create({
    data:{
      name: "gedroogde_Meesterlyck-ham"
    }
  });



const gedroogde_munt = await prisma.ingredient.create({
    data:{
      name: "gedroogde_munt"
    }
  });



const gedroogde_oregano = await prisma.ingredient.create({
    data:{
      name: "gedroogde_oregano"
    }
  });



const gedroogde_veenbessen = await prisma.ingredient.create({
    data:{
      name: "gedroogde_veenbessen"
    }
  });



const gefrituurde_uitjes = await prisma.ingredient.create({
    data:{
      name: "gefrituurde_uitjes"
    }
  });



const gehakt = await prisma.ingredient.create({
    data:{
      name: "gehakt"
    }
  });



const gehakte_dille = await prisma.ingredient.create({
    data:{
      name: "gehakte_dille"
    }
  });



const gehakte_walnoten = await prisma.ingredient.create({
    data:{
      name: "gehakte_walnoten"
    }
  });



const geitenkaas = await prisma.ingredient.create({
    data:{
      name: "geitenkaas"
    }
  });



const geitenkaas_met_korst = await prisma.ingredient.create({
    data:{
      name: "geitenkaas_met_korst"
    }
  });



const geklaarde_boter = await prisma.ingredient.create({
    data:{
      name: "geklaarde_boter"
    }
  });



const gekookte_aardappelen = await prisma.ingredient.create({
    data:{
      name: "gekookte_aardappelen"
    }
  });



const gekookte_ham = await prisma.ingredient.create({
    data:{
      name: "gekookte_ham"
    }
  });



const gekookte_Meesterlyck_ham = await prisma.ingredient.create({
    data:{
      name: "gekookte_Meesterlyck-ham"
    }
  });



const gelatine = await prisma.ingredient.create({
    data:{
      name: "gelatine"
    }
  });



const gelatineblaadjes = await prisma.ingredient.create({
    data:{
      name: "gelatineblaadjes"
    }
  });



const gele_rapen = await prisma.ingredient.create({
    data:{
      name: "gele_rapen"
    }
  });



const geleisuiker = await prisma.ingredient.create({
    data:{
      name: "geleisuiker"
    }
  });



const gember = await prisma.ingredient.create({
    data:{
      name: "gember"
    }
  });



const gemengd_gehakt = await prisma.ingredient.create({
    data:{
      name: "gemengd_gehakt"
    }
  });



const gemengde_noten = await prisma.ingredient.create({
    data:{
      name: "gemengde_noten"
    }
  });



const gemengde_sla = await prisma.ingredient.create({
    data:{
      name: "gemengde_sla"
    }
  });



const gems = await prisma.ingredient.create({
    data:{
      name: "gems"
    }
  });



const Gentse_graanmosterd = await prisma.ingredient.create({
    data:{
      name: "Gentse_graanmosterd"
    }
  });



const geraspte_gember = await prisma.ingredient.create({
    data:{
      name: "geraspte_gember"
    }
  });



const geraspte_jonge_kaas = await prisma.ingredient.create({
    data:{
      name: "geraspte_jonge_kaas"
    }
  });



const geraspte_kaas = await prisma.ingredient.create({
    data:{
      name: "geraspte_kaas"
    }
  });



const geraspte_oude_kaas = await prisma.ingredient.create({
    data:{
      name: "geraspte_oude_kaas"
    }
  });



const geraspte_wortelen = await prisma.ingredient.create({
    data:{
      name: "geraspte_wortelen"
    }
  });



const gerookt_paprikapoeder = await prisma.ingredient.create({
    data:{
      name: "gerookt_paprikapoeder"
    }
  });



const gerookt_spek = await prisma.ingredient.create({
    data:{
      name: "gerookt_spek"
    }
  });



const gerookte_forel = await prisma.ingredient.create({
    data:{
      name: "gerookte_forel"
    }
  });



const gerookte_makreelfilet = await prisma.ingredient.create({
    data:{
      name: "gerookte_makreelfilet"
    }
  });



const gerookte_Meesterlyck_ham = await prisma.ingredient.create({
    data:{
      name: "gerookte_Meesterlyck-ham"
    }
  });



const gerookte_spekblokjes = await prisma.ingredient.create({
    data:{
      name: "gerookte_spekblokjes"
    }
  });



const geroosterde_amandelschilfers = await prisma.ingredient.create({
    data:{
      name: "geroosterde_amandelschilfers"
    }
  });



const geroosterde_hazelnoten = await prisma.ingredient.create({
    data:{
      name: "geroosterde_hazelnoten"
    }
  });



const geroosterde_paprika = await prisma.ingredient.create({
    data:{
      name: "geroosterde_paprika"
    }
  });



const gerst = await prisma.ingredient.create({
    data:{
      name: "gerst"
    }
  });



const gesmolten_boter = await prisma.ingredient.create({
    data:{
      name: "gesmolten_boter"
    }
  });



const gesmolten_kruidenboter = await prisma.ingredient.create({
    data:{
      name: "gesmolten_kruidenboter"
    }
  });



const Geuze = await prisma.ingredient.create({
    data:{
      name: "Geuze"
    }
  });



const gevogeltebouillon = await prisma.ingredient.create({
    data:{
      name: "gevogeltebouillon"
    }
  });



const gezouten_spek = await prisma.ingredient.create({
    data:{
      name: "gezouten_spek"
    }
  });



const graanmosterd = await prisma.ingredient.create({
    data:{
      name: "graanmosterd"
    }
  });



const Griekse_yoghurt = await prisma.ingredient.create({
    data:{
      name: "Griekse_yoghurt"
    }
  });



const griessuiker = await prisma.ingredient.create({
    data:{
      name: "griessuiker"
    }
  });



const grijs_brood = await prisma.ingredient.create({
    data:{
      name: "grijs_brood"
    }
  });



const grijze_garnalen = await prisma.ingredient.create({
    data:{
      name: "grijze_garnalen"
    }
  });



const groene_asperges = await prisma.ingredient.create({
    data:{
      name: "groene_asperges"
    }
  });



const groene_boontjes = await prisma.ingredient.create({
    data:{
      name: "groene_boontjes"
    }
  });



const groene_groenten = await prisma.ingredient.create({
    data:{
      name: "groene_groenten"
    }
  });



const groene_pesto = await prisma.ingredient.create({
    data:{
      name: "groene_pesto"
    }
  });



const groene_selder = await prisma.ingredient.create({
    data:{
      name: "groene_selder"
    }
  });



const groentebouillon = await prisma.ingredient.create({
    data:{
      name: "groentebouillon"
    }
  });



const grof_zeezout = await prisma.ingredient.create({
    data:{
      name: "grof_zeezout"
    }
  });



const grof_zout = await prisma.ingredient.create({
    data:{
      name: "grof_zout"
    }
  });



const hamblokjes = await prisma.ingredient.create({
    data:{
      name: "hamblokjes"
    }
  });



const harde_geitenkaas = await prisma.ingredient.create({
    data:{
      name: "harde_geitenkaas"
    }
  });



const harde_Postelkaas = await prisma.ingredient.create({
    data:{
      name: "harde_Postelkaas"
    }
  });



const Hasseltse_graanjenever = await prisma.ingredient.create({
    data:{
      name: "Hasseltse_graanjenever"
    }
  });



const havermout = await prisma.ingredient.create({
    data:{
      name: "havermout"
    }
  });



const hazelnootolie = await prisma.ingredient.create({
    data:{
      name: "hazelnootolie"
    }
  });



const hazelnoten = await prisma.ingredient.create({
    data:{
      name: "hazelnoten"
    }
  });



const heekfilets = await prisma.ingredient.create({
    data:{
      name: "heekfilets"
    }
  });



const Hervekaas = await prisma.ingredient.create({
    data:{
      name: "Hervekaas"
    }
  });



const hoeveboter = await prisma.ingredient.create({
    data:{
      name: "hoeveboter"
    }
  });



const hoeveschapenkaas_uit_de_Vlaamse_Ardennen = await prisma.ingredient.create({
    data:{
      name: "hoeveschapenkaas_uit_de_Vlaamse_Ardennen"
    }
  });



const hondshaai = await prisma.ingredient.create({
    data:{
      name: "hondshaai"
    }
  });



const honing = await prisma.ingredient.create({
    data:{
      name: "honing"
    }
  });



const honing_of_tijmhoning = await prisma.ingredient.create({
    data:{
      name: "honing_of_tijmhoning"
    }
  });



const ijsbergsla = await prisma.ingredient.create({
    data:{
      name: "ijsbergsla"
    }
  });



const ijsblokjes = await prisma.ingredient.create({
    data:{
      name: "ijsblokjes"
    }
  });



const jonge_wortelen = await prisma.ingredient.create({
    data:{
      name: "jonge_wortelen"
    }
  });



const kaas = await prisma.ingredient.create({
    data:{
      name: "kaas"
    }
  });



const kalfsbouillon = await prisma.ingredient.create({
    data:{
      name: "kalfsbouillon"
    }
  });



const kalfsgebraden = await prisma.ingredient.create({
    data:{
      name: "kalfsgebraden"
    }
  });



const kalfsgehakt = await prisma.ingredient.create({
    data:{
      name: "kalfsgehakt"
    }
  });



const kalfskoteletten = await prisma.ingredient.create({
    data:{
      name: "kalfskoteletten"
    }
  });



const kalfslapjes = await prisma.ingredient.create({
    data:{
      name: "kalfslapjes"
    }
  });



const kalfsoesters = await prisma.ingredient.create({
    data:{
      name: "kalfsoesters"
    }
  });



const kalkoen = await prisma.ingredient.create({
    data:{
      name: "kalkoen"
    }
  });



const kalkoenlapjes = await prisma.ingredient.create({
    data:{
      name: "kalkoenlapjes"
    }
  });



const kandijsuiker = await prisma.ingredient.create({
    data:{
      name: "kandijsuiker"
    }
  });



const kaneelpoeder = await prisma.ingredient.create({
    data:{
      name: "kaneelpoeder"
    }
  });



const kaneelstokje = await prisma.ingredient.create({
    data:{
      name: "kaneelstokje"
    }
  });



const kappertjes = await prisma.ingredient.create({
    data:{
      name: "kappertjes"
    }
  });



const kardemompeultjes = await prisma.ingredient.create({
    data:{
      name: "kardemompeultjes"
    }
  });



const karnemelk = await prisma.ingredient.create({
    data:{
      name: "karnemelk"
    }
  });



const kastanjechampignons = await prisma.ingredient.create({
    data:{
      name: "kastanjechampignons"
    }
  });



const kempisch_spek = await prisma.ingredient.create({
    data:{
      name: "kempisch_spek"
    }
  });



const kerriepoeder = await prisma.ingredient.create({
    data:{
      name: "kerriepoeder"
    }
  });



const kersen = await prisma.ingredient.create({
    data:{
      name: "kersen"
    }
  });



const kerstomaten = await prisma.ingredient.create({
    data:{
      name: "kerstomaten"
    }
  });



const kerstomatenmengeling = await prisma.ingredient.create({
    data:{
      name: "kerstomatenmengeling"
    }
  });



const kervel = await prisma.ingredient.create({
    data:{
      name: "kervel"
    }
  });



const ketchup = await prisma.ingredient.create({
    data:{
      name: "ketchup"
    }
  });



const kikkererwten_uit_blik = await prisma.ingredient.create({
    data:{
      name: "kikkererwten_uit_blik"
    }
  });



const kipfilets = await prisma.ingredient.create({
    data:{
      name: "kipfilets"
    }
  });



const kippenbouillon = await prisma.ingredient.create({
    data:{
      name: "kippenbouillon"
    }
  });



const kippenbouilonblokje = await prisma.ingredient.create({
    data:{
      name: "kippenbouilonblokje"
    }
  });



const kippenfond = await prisma.ingredient.create({
    data:{
      name: "kippenfond"
    }
  });



const kippengehakt = await prisma.ingredient.create({
    data:{
      name: "kippengehakt"
    }
  });



const kippenkruiden = await prisma.ingredient.create({
    data:{
      name: "kippenkruiden"
    }
  });



const kippenreepjes = await prisma.ingredient.create({
    data:{
      name: "kippenreepjes"
    }
  });



const kippenvleugels = await prisma.ingredient.create({
    data:{
      name: "kippenvleugels"
    }
  });



const knoflook = await prisma.ingredient.create({
    data:{
      name: "knoflook"
    }
  });



const knoflookpoeder = await prisma.ingredient.create({
    data:{
      name: "knoflookpoeder"
    }
  });



const knolselders = await prisma.ingredient.create({
    data:{
      name: "knolselders"
    }
  });



const komijnpoeder = await prisma.ingredient.create({
    data:{
      name: "komijnpoeder"
    }
  });



const komkommer = await prisma.ingredient.create({
    data:{
      name: "komkommer"
    }
  });



const konijnfilets = await prisma.ingredient.create({
    data:{
      name: "konijnfilets"
    }
  });



const koolrabi = await prisma.ingredient.create({
    data:{
      name: "koolrabi"
    }
  });



const koriander = await prisma.ingredient.create({
    data:{
      name: "koriander"
    }
  });



const krielaardappelen = await prisma.ingredient.create({
    data:{
      name: "krielaardappelen"
    }
  });



const kristalsuiker = await prisma.ingredient.create({
    data:{
      name: "kristalsuiker"
    }
  });



const kruidentuiltje = await prisma.ingredient.create({
    data:{
      name: "kruidentuiltje"
    }
  });



const kruidnagel = await prisma.ingredient.create({
    data:{
      name: "kruidnagel"
    }
  });



const kruimeldeeg = await prisma.ingredient.create({
    data:{
      name: "kruimeldeeg"
    }
  });



const kruisbessen = await prisma.ingredient.create({
    data:{
      name: "kruisbessen"
    }
  });



const kurkuma = await prisma.ingredient.create({
    data:{
      name: "kurkuma"
    }
  });



const kweeperen = await prisma.ingredient.create({
    data:{
      name: "kweeperen"
    }
  });



const lamsfilets = await prisma.ingredient.create({
    data:{
      name: "lamsfilets"
    }
  });



const lamsgehakt = await prisma.ingredient.create({
    data:{
      name: "lamsgehakt"
    }
  });



const lamskoteletten = await prisma.ingredient.create({
    data:{
      name: "lamskoteletten"
    }
  });



const lamsschouder = await prisma.ingredient.create({
    data:{
      name: "lamsschouder"
    }
  });



const laurier = await prisma.ingredient.create({
    data:{
      name: "laurier"
    }
  });



const laurierblaadje = await prisma.ingredient.create({
    data:{
      name: "laurierblaadje"
    }
  });



const lauw_water = await prisma.ingredient.create({
    data:{
      name: "lauw_water"
    }
  });



const Le_Petit_Lathuy = await prisma.ingredient.create({
    data:{
      name: "Le_Petit_Lathuy"
    }
  });



const Leffe_Blond = await prisma.ingredient.create({
    data:{
      name: "Leffe_Blond"
    }
  });



const lente_ui = await prisma.ingredient.create({
    data:{
      name: "lente-ui"
    }
  });



const Limburgse_stroop = await prisma.ingredient.create({
    data:{
      name: "Limburgse_stroop"
    }
  });



const limoenen = await prisma.ingredient.create({
    data:{
      name: "limoenen"
    }
  });



const limoensap = await prisma.ingredient.create({
    data:{
      name: "limoensap"
    }
  });



const little_gems = await prisma.ingredient.create({
    data:{
      name: "little_gems"
    }
  });



const Luikse_stroop = await prisma.ingredient.create({
    data:{
      name: "Luikse_stroop"
    }
  });



const maan_of_sesamzaad = await prisma.ingredient.create({
    data:{
      name: "maan-_of_sesamzaad"
    }
  });



const maïs = await prisma.ingredient.create({
    data:{
      name: "maïs"
    }
  });



const maïs_uit_blik = await prisma.ingredient.create({
    data:{
      name: "maïs_uit_blik"
    }
  });



const maïsolie = await prisma.ingredient.create({
    data:{
      name: "maïsolie"
    }
  });



const maïszetmeel = await prisma.ingredient.create({
    data:{
      name: "maïszetmeel"
    }
  });



const maizena = await prisma.ingredient.create({
    data:{
      name: "maizena"
    }
  });



const makrelen = await prisma.ingredient.create({
    data:{
      name: "makrelen"
    }
  });



const marjolein = await prisma.ingredient.create({
    data:{
      name: "marjolein"
    }
  });



const mascarpone = await prisma.ingredient.create({
    data:{
      name: "mascarpone"
    }
  });



const mayonaise = await prisma.ingredient.create({
    data:{
      name: "mayonaise"
    }
  });



const Mechelse_koekoek = await prisma.ingredient.create({
    data:{
      name: "Mechelse_koekoek"
    }
  });



const Meesterlyck_ham = await prisma.ingredient.create({
    data:{
      name: "Meesterlyck-ham"
    }
  });



const melk = await prisma.ingredient.create({
    data:{
      name: "melk"
    }
  });



const melkchocolade = await prisma.ingredient.create({
    data:{
      name: "melkchocolade"
    }
  });



const mierikswortel = await prisma.ingredient.create({
    data:{
      name: "mierikswortel"
    }
  });



const mierikswortelcrème = await prisma.ingredient.create({
    data:{
      name: "mierikswortelcrème"
    }
  });



const Moese_aardappel = await prisma.ingredient.create({
    data:{
      name: "Moese_aardappel"
    }
  });



const mosselen = await prisma.ingredient.create({
    data:{
      name: "mosselen"
    }
  });



const mosterd = await prisma.ingredient.create({
    data:{
      name: "mosterd"
    }
  });



const mozzarella = await prisma.ingredient.create({
    data:{
      name: "mozzarella"
    }
  });



const munt = await prisma.ingredient.create({
    data:{
      name: "munt"
    }
  });



const Nazareth = await prisma.ingredient.create({
    data:{
      name: "Nazareth"
    }
  });



const Nazareth_Classic = await prisma.ingredient.create({
    data:{
      name: "Nazareth_Classic"
    }
  });



const Noordzeegarnalen = await prisma.ingredient.create({
    data:{
      name: "Noordzeegarnalen"
    }
  });



const nootmuskaat = await prisma.ingredient.create({
    data:{
      name: "nootmuskaat"
    }
  });




const oesterzwammen = await prisma.ingredient.create({
    data:{
      name: "oesterzwammen"
    }
  });



const olie = await prisma.ingredient.create({
    data:{
      name: "olie"
    }
  });



const olijf_of_sesamolie = await prisma.ingredient.create({
    data:{
      name: "olijf-_of_sesamolie"
    }
  });



const olijfolie = await prisma.ingredient.create({
    data:{
      name: "olijfolie"
    }
  });



const ontbijtspek = await prisma.ingredient.create({
    data:{
      name: "ontbijtspek"
    }
  });



const oregano = await prisma.ingredient.create({
    data:{
      name: "oregano"
    }
  });



const oud_brood = await prisma.ingredient.create({
    data:{
      name: "oud_brood"
    }
  });



const Oud_Brugge = await prisma.ingredient.create({
    data:{
      name: "Oud_Brugge"
    }
  });



const oude_abdijkaas = await prisma.ingredient.create({
    data:{
      name: "oude_abdijkaas"
    }
  });



const Oude_Chimay_kaas = await prisma.ingredient.create({
    data:{
      name: "Oude_Chimay_kaas"
    }
  });



const oude_geraspte_kaas = await prisma.ingredient.create({
    data:{
      name: "oude_geraspte_kaas"
    }
  });



const Oude_Geuze = await prisma.ingredient.create({
    data:{
      name: "Oude_Geuze"
    }
  });



const oude_kaas = await prisma.ingredient.create({
    data:{
      name: "oude_kaas"
    }
  });



const paardenlookworst = await prisma.ingredient.create({
    data:{
      name: "paardenlookworst"
    }
  });



const paddenstoelen = await prisma.ingredient.create({
    data:{
      name: "paddenstoelen"
    }
  });



const paneermeel = await prisma.ingredient.create({
    data:{
      name: "paneermeel"
    }
  });



const panko = await prisma.ingredient.create({
    data:{
      name: "panko"
    }
  });



const paprika = await prisma.ingredient.create({
    data:{
      name: "paprika"
    }
  });



const paprikapoeder = await prisma.ingredient.create({
    data:{
      name: "paprikapoeder"
    }
  });



const Parmezaanse_kaas = await prisma.ingredient.create({
    data:{
      name: "Parmezaanse_kaas"
    }
  });



const Pas_de_Bleu = await prisma.ingredient.create({
    data:{
      name: "Pas_de_Bleu"
    }
  });



const Pas_de_Rouge = await prisma.ingredient.create({
    data:{
      name: "Pas_de_Rouge"
    }
  });



const passata = await prisma.ingredient.create({
    data:{
      name: "passata"
    }
  });



const Passendale = await prisma.ingredient.create({
    data:{
      name: "Passendale"
    }
  });



const Passendale_Bio = await prisma.ingredient.create({
    data:{
      name: "Passendale_Bio"
    }
  });



const pastinaken = await prisma.ingredient.create({
    data:{
      name: "pastinaken"
    }
  });



const patisseriebloem = await prisma.ingredient.create({
    data:{
      name: "patisseriebloem"
    }
  });



const Pavé_à_la_Leffe = await prisma.ingredient.create({
    data:{
      name: "Pavé_à_la_Leffe"
    }
  });



const peper = await prisma.ingredient.create({
    data:{
      name: "peper"
    }
  });



const peperbollen = await prisma.ingredient.create({
    data:{
      name: "peperbollen"
    }
  });



const Père_Joseph = await prisma.ingredient.create({
    data:{
      name: "Père_Joseph"
    }
  });



const peren = await prisma.ingredient.create({
    data:{
      name: "peren"
    }
  });



const perssinaasappelen = await prisma.ingredient.create({
    data:{
      name: "perssinaasappelen"
    }
  });



const peterselie = await prisma.ingredient.create({
    data:{
      name: "peterselie"
    }
  });



const peultjes = await prisma.ingredient.create({
    data:{
      name: "peultjes"
    }
  });



const pickles = await prisma.ingredient.create({
    data:{
      name: "pickles"
    }
  });



const pijnboompitten = await prisma.ingredient.create({
    data:{
      name: "pijnboompitten"
    }
  });



const pilsen = await prisma.ingredient.create({
    data:{
      name: "pilsen"
    }
  });



const pistachenoten = await prisma.ingredient.create({
    data:{
      name: "pistachenoten"
    }
  });



const pistolets = await prisma.ingredient.create({
    data:{
      name: "pistolets"
    }
  });



const pitten_en_zaden = await prisma.ingredient.create({
    data:{
      name: "pitten_en_zaden"
    }
  });



const pizzadeeg = await prisma.ingredient.create({
    data:{
      name: "pizzadeeg"
    }
  });



const plantaardige_olie = await prisma.ingredient.create({
    data:{
      name: "plantaardige_olie"
    }
  });



const platte_peterselie = await prisma.ingredient.create({
    data:{
      name: "platte_peterselie"
    }
  });



const plattekaas = await prisma.ingredient.create({
    data:{
      name: "plattekaas"
    }
  });



const poedersuiker = await prisma.ingredient.create({
    data:{
      name: "poedersuiker"
    }
  });



const pommes_duchesse = await prisma.ingredient.create({
    data:{
      name: "pommes_duchesse"
    }
  });



const pompoenen = await prisma.ingredient.create({
    data:{
      name: "pompoenen"
    }
  });



const ponen = await prisma.ingredient.create({
    data:{
      name: "ponen"
    }
  });



const Postel_komijn = await prisma.ingredient.create({
    data:{
      name: "Postel_komijn"
    }
  });



const prei = await prisma.ingredient.create({
    data:{
      name: "prei"
    }
  });



const preiwitten = await prisma.ingredient.create({
    data:{
      name: "preiwitten"
    }
  });



const Provençaalse_kruiden = await prisma.ingredient.create({
    data:{
      name: "Provençaalse_kruiden"
    }
  });



const pruimen = await prisma.ingredient.create({
    data:{
      name: "pruimen"
    }
  });



const pruimenconfituur = await prisma.ingredient.create({
    data:{
      name: "pruimenconfituur"
    }
  });



const puddingpoeder = await prisma.ingredient.create({
    data:{
      name: "puddingpoeder"
    }
  });



const puntpaprika = await prisma.ingredient.create({
    data:{
      name: "puntpaprika"
    }
  });



const purs = await prisma.ingredient.create({
    data:{
      name: "purs"
    }
  });



const quinoa = await prisma.ingredient.create({
    data:{
      name: "quinoa"
    }
  });



const rabarber = await prisma.ingredient.create({
    data:{
      name: "rabarber"
    }
  });



const radijzen = await prisma.ingredient.create({
    data:{
      name: "radijzen"
    }
  });



const rapen = await prisma.ingredient.create({
    data:{
      name: "rapen"
    }
  });



const ras_el_hanout = await prisma.ingredient.create({
    data:{
      name: "ras_el_hanout"
    }
  });



const regenboogwortelen = await prisma.ingredient.create({
    data:{
      name: "regenboogwortelen"
    }
  });



const ricotta = await prisma.ingredient.create({
    data:{
      name: "ricotta"
    }
  });



const ricotta_van_Berloumi = await prisma.ingredient.create({
    data:{
      name: "ricotta_van_Berloumi"
    }
  });



const rietsuiker = await prisma.ingredient.create({
    data:{
      name: "rietsuiker"
    }
  });



const rijstazijn = await prisma.ingredient.create({
    data:{
      name: "rijstazijn"
    }
  });



const rode_wijnazijn = await prisma.ingredient.create({
    data:{
      name: "rode-wijnazijn"
    }
  });



const rode_bessen = await prisma.ingredient.create({
    data:{
      name: "rode_bessen"
    }
  });



const rode_biet = await prisma.ingredient.create({
    data:{
      name: "rode_biet"
    }
  });



const rode_kolen = await prisma.ingredient.create({
    data:{
      name: "rode_kolen"
    }
  });



const rode_ponen = await prisma.ingredient.create({
    data:{
      name: "rode_ponen"
    }
  });



const rode_poon = await prisma.ingredient.create({
    data:{
      name: "rode_poon"
    }
  });



const rode_pruimen = await prisma.ingredient.create({
    data:{
      name: "rode_pruimen"
    }
  });



const rode_wijn = await prisma.ingredient.create({
    data:{
      name: "rode_wijn"
    }
  });



const rode_zuring = await prisma.ingredient.create({
    data:{
      name: "rode_zuring"
    }
  });



const rodepoonfilets = await prisma.ingredient.create({
    data:{
      name: "rodepoonfilets"
    }
  });



const rogfilets = await prisma.ingredient.create({
    data:{
      name: "rogfilets"
    }
  });



const roggevleugels = await prisma.ingredient.create({
    data:{
      name: "roggevleugels"
    }
  });



const Romeinse_sla = await prisma.ingredient.create({
    data:{
      name: "Romeinse_sla"
    }
  });



const room = await prisma.ingredient.create({
    data:{
      name: "room"
    }
  });



const room_minstens_30_vetgehalte = await prisma.ingredient.create({
    data:{
      name: "room,_minstens_30%_vetgehalte"
    }
  });



const roomboter = await prisma.ingredient.create({
    data:{
      name: "roomboter"
    }
  });



const roomkaas = await prisma.ingredient.create({
    data:{
      name: "roomkaas"
    }
  });



const rosbief = await prisma.ingredient.create({
    data:{
      name: "rosbief"
    }
  });



const roze_peper = await prisma.ingredient.create({
    data:{
      name: "roze_peper"
    }
  });



const roze_peperbollen = await prisma.ingredient.create({
    data:{
      name: "roze_peperbollen"
    }
  });



const rozemarijn = await prisma.ingredient.create({
    data:{
      name: "rozemarijn"
    }
  });



const rozijn = await prisma.ingredient.create({
    data:{
      name: "rozijn"
    }
  });



const rozijnen = await prisma.ingredient.create({
    data:{
      name: "rozijnen"
    }
  });



const rucola = await prisma.ingredient.create({
    data:{
      name: "rucola"
    }
  });



const runderbouillon = await prisma.ingredient.create({
    data:{
      name: "runderbouillon"
    }
  });



const salie = await prisma.ingredient.create({
    data:{
      name: "salie"
    }
  });



const sambal = await prisma.ingredient.create({
    data:{
      name: "sambal"
    }
  });



const sausbinder = await prisma.ingredient.create({
    data:{
      name: "sausbinder"
    }
  });



const savooikool = await prisma.ingredient.create({
    data:{
      name: "savooikool"
    }
  });



const schartongen = await prisma.ingredient.create({
    data:{
      name: "schartongen"
    }
  });



const schelpjes = await prisma.ingredient.create({
    data:{
      name: "schelpjes"
    }
  });



const schelvisfilets = await prisma.ingredient.create({
    data:{
      name: "schelvisfilets"
    }
  });



const schelvishaasjes = await prisma.ingredient.create({
    data:{
      name: "schelvishaasjes"
    }
  });



const schelvismoten = await prisma.ingredient.create({
    data:{
      name: "schelvismoten"
    }
  });



const seizoensfruit = await prisma.ingredient.create({
    data:{
      name: "seizoensfruit"
    }
  });



const selder = await prisma.ingredient.create({
    data:{
      name: "selder"
    }
  });



const selderijzout = await prisma.ingredient.create({
    data:{
      name: "selderijzout"
    }
  });



const seldertakje = await prisma.ingredient.create({
    data:{
      name: "seldertakje"
    }
  });



const sesamzaad = await prisma.ingredient.create({
    data:{
      name: "sesamzaad"
    }
  });



const sinaasappelen = await prisma.ingredient.create({
    data:{
      name: "sinaasappelen"
    }
  });



const sinaasappelzeste = await prisma.ingredient.create({
    data:{
      name: "sinaasappelzeste"
    }
  });



const sint_jakobsnoten = await prisma.ingredient.create({
    data:{
      name: "sint-jakobsnoten"
    }
  });



const sjalotten = await prisma.ingredient.create({
    data:{
      name: "sjalotten"
    }
  });



const sla = await prisma.ingredient.create({
    data:{
      name: "sla"
    }
  });



const slagroom = await prisma.ingredient.create({
    data:{
      name: "slagroom"
    }
  });



const slamix = await prisma.ingredient.create({
    data:{
      name: "slamix"
    }
  });



const slaolie = await prisma.ingredient.create({
    data:{
      name: "slaolie"
    }
  });



const sluimererwten = await prisma.ingredient.create({
    data:{
      name: "sluimererwten"
    }
  });



const snackkomkommers = await prisma.ingredient.create({
    data:{
      name: "snackkomkommers"
    }
  });



const snijbiet = await prisma.ingredient.create({
    data:{
      name: "snijbiet"
    }
  });



const soepvlees = await prisma.ingredient.create({
    data:{
      name: "soepvlees"
    }
  });



const sojasaus = await prisma.ingredient.create({
    data:{
      name: "sojasaus"
    }
  });



const spaghettipompoenen = await prisma.ingredient.create({
    data:{
      name: "spaghettipompoenen"
    }
  });



const speculaas = await prisma.ingredient.create({
    data:{
      name: "speculaas"
    }
  });



const speculaaskoekjes = await prisma.ingredient.create({
    data:{
      name: "speculaaskoekjes"
    }
  });



const speculaaskruiden = await prisma.ingredient.create({
    data:{
      name: "speculaaskruiden"
    }
  });



const spinazie = await prisma.ingredient.create({
    data:{
      name: "spinazie"
    }
  });



const spruitjes = await prisma.ingredient.create({
    data:{
      name: "spruitjes"
    }
  });



const steaks = await prisma.ingredient.create({
    data:{
      name: "steaks"
    }
  });



const steenbolkfilets = await prisma.ingredient.create({
    data:{
      name: "steenbolkfilets"
    }
  });



const steranijs = await prisma.ingredient.create({
    data:{
      name: "steranijs"
    }
  });



const stokbrood = await prisma.ingredient.create({
    data:{
      name: "stokbrood"
    }
  });



const strokbroden = await prisma.ingredient.create({
    data:{
      name: "strokbroden"
    }
  });



const suiker = await prisma.ingredient.create({
    data:{
      name: "suiker"
    }
  });



const tarbot = await prisma.ingredient.create({
    data:{
      name: "tarbot"
    }
  });



const tarwebloem = await prisma.ingredient.create({
    data:{
      name: "tarwebloem"
    }
  });



const Tierenteyn_mosterd = await prisma.ingredient.create({
    data:{
      name: "Tierenteyn-mosterd"
    }
  });



const tijm = await prisma.ingredient.create({
    data:{
      name: "tijm"
    }
  });



const tomaten = await prisma.ingredient.create({
    data:{
      name: "tomaten"
    }
  });



const tomatenblokjes = await prisma.ingredient.create({
    data:{
      name: "tomatenblokjes"
    }
  });



const tomatenblokjes_uit_blik = await prisma.ingredient.create({
    data:{
      name: "tomatenblokjes_uit_blik"
    }
  });



const tomatenmengeling = await prisma.ingredient.create({
    data:{
      name: "tomatenmengeling"
    }
  });



const tomatenpuree = await prisma.ingredient.create({
    data:{
      name: "tomatenpuree"
    }
  });



const tomatensap = await prisma.ingredient.create({
    data:{
      name: "tomatensap"
    }
  });



const tomatensaus = await prisma.ingredient.create({
    data:{
      name: "tomatensaus"
    }
  });



const tongscharren = await prisma.ingredient.create({
    data:{
      name: "tongscharren"
    }
  });



const trostomaatjes = await prisma.ingredient.create({
    data:{
      name: "trostomaatjes"
    }
  });



const truffelpasta = await prisma.ingredient.create({
    data:{
      name: "truffelpasta"
    }
  });



const tuinkers = await prisma.ingredient.create({
    data:{
      name: "tuinkers"
    }
  });



const uien = await prisma.ingredient.create({
    data:{
      name: "uien"
    }
  });



const vanille_extract = await prisma.ingredient.create({
    data:{
      name: "vanille-extract"
    }
  });



const vanille_ijs = await prisma.ingredient.create({
    data:{
      name: "vanille-ijs"
    }
  });



const vanillepuddingpoeder = await prisma.ingredient.create({
    data:{
      name: "vanillepuddingpoeder"
    }
  });



const vanillestokje = await prisma.ingredient.create({
    data:{
      name: "vanillestokje"
    }
  });



const vanillesuiker = await prisma.ingredient.create({
    data:{
      name: "vanillesuiker"
    }
  });



const varkensgehakt = await prisma.ingredient.create({
    data:{
      name: "varkensgehakt"
    }
  });



const varkenskoteletten = await prisma.ingredient.create({
    data:{
      name: "varkenskoteletten"
    }
  });



const varkenswangen = await prisma.ingredient.create({
    data:{
      name: "varkenswangen"
    }
  });



const vastkokende_aardappelen = await prisma.ingredient.create({
    data:{
      name: "vastkokende_aardappelen"
    }
  });



const veenbessen = await prisma.ingredient.create({
    data:{
      name: "veenbessen"
    }
  });



const vegetarisch_gehakt = await prisma.ingredient.create({
    data:{
      name: "vegetarisch_gehakt"
    }
  });



const veldsla = await prisma.ingredient.create({
    data:{
      name: "veldsla"
    }
  });



const venkels = await prisma.ingredient.create({
    data:{
      name: "venkels"
    }
  });



const Vermouth = await prisma.ingredient.create({
    data:{
      name: "Vermouth"
    }
  });



const verse_bieslook = await prisma.ingredient.create({
    data:{
      name: "verse_bieslook"
    }
  });



const verse_gist = await prisma.ingredient.create({
    data:{
      name: "verse_gist"
    }
  });



const verse_kaas = await prisma.ingredient.create({
    data:{
      name: "verse_kaas"
    }
  });



const verse_oregano = await prisma.ingredient.create({
    data:{
      name: "verse_oregano"
    }
  });



const verse_slagroom = await prisma.ingredient.create({
    data:{
      name: "verse_slagroom"
    }
  });



const verse_tijm = await prisma.ingredient.create({
    data:{
      name: "verse_tijm"
    }
  });



const verse_tijmblaadjes = await prisma.ingredient.create({
    data:{
      name: "verse_tijmblaadjes"
    }
  });



const verse_tuinkruiden = await prisma.ingredient.create({
    data:{
      name: "verse_tuinkruiden"
    }
  });



const vetstof = await prisma.ingredient.create({
    data:{
      name: "vetstof"
    }
  });



const vijfkruidenpoeder = await prisma.ingredient.create({
    data:{
      name: "vijfkruidenpoeder"
    }
  });



const vingers = await prisma.ingredient.create({
    data:{
      name: "vingers"
    }
  });



const visbouillon = await prisma.ingredient.create({
    data:{
      name: "visbouillon"
    }
  });



const visfumet = await prisma.ingredient.create({
    data:{
      name: "visfumet"
    }
  });



const viskruiden = await prisma.ingredient.create({
    data:{
      name: "viskruiden"
    }
  });



const Vlaamse_rauwmelkse_geitenkaas = await prisma.ingredient.create({
    data:{
      name: "Vlaamse_rauwmelkse_geitenkaas"
    }
  });



const vlierbloesemsiroop_of_gembersiroop = await prisma.ingredient.create({
    data:{
      name: "vlierbloesemsiroop_of_gembersiroop"
    }
  });



const vloeibare_honing = await prisma.ingredient.create({
    data:{
      name: "vloeibare_honing"
    }
  });



const volkoren_rijst = await prisma.ingredient.create({
    data:{
      name: "volkoren_rijst"
    }
  });



const volkorenbloem = await prisma.ingredient.create({
    data:{
      name: "volkorenbloem"
    }
  });



const volle_melk = await prisma.ingredient.create({
    data:{
      name: "volle_melk"
    }
  });



const volle_yoghurt = await prisma.ingredient.create({
    data:{
      name: "volle_yoghurt"
    }
  });



const walnoten = await prisma.ingredient.create({
    data:{
      name: "walnoten"
    }
  });



const water = await prisma.ingredient.create({
    data:{
      name: "water"
    }
  });



const waterkers = await prisma.ingredient.create({
    data:{
      name: "waterkers"
    }
  });



const waterkers_uit_Haspengouw = await prisma.ingredient.create({
    data:{
      name: "waterkers_uit_Haspengouw"
    }
  });



const Watou_kaas = await prisma.ingredient.create({
    data:{
      name: "Watou_kaas"
    }
  });



const West_Vlaamse_gerookte_sprot = await prisma.ingredient.create({
    data:{
      name: "West-Vlaamse_gerookte_sprot"
    }
  });



const wijtingen = await prisma.ingredient.create({
    data:{
      name: "wijtingen"
    }
  });



const witbier = await prisma.ingredient.create({
    data:{
      name: "witbier"
    }
  });



const witloof = await prisma.ingredient.create({
    data:{
      name: "witloof"
    }
  });



const witte_wijnazijn = await prisma.ingredient.create({
    data:{
      name: "witte-wijnazijn"
    }
  });



const witte_balsamicoazijn = await prisma.ingredient.create({
    data:{
      name: "witte_balsamicoazijn"
    }
  });



const witte_bonen = await prisma.ingredient.create({
    data:{
      name: "witte_bonen"
    }
  });



const witte_broden = await prisma.ingredient.create({
    data:{
      name: "witte_broden"
    }
  });



const witte_kolen = await prisma.ingredient.create({
    data:{
      name: "witte_kolen"
    }
  });



const witte_rammenas = await prisma.ingredient.create({
    data:{
      name: "witte_rammenas"
    }
  });



const witte_rapen = await prisma.ingredient.create({
    data:{
      name: "witte_rapen"
    }
  });



const witte_selder = await prisma.ingredient.create({
    data:{
      name: "witte_selder"
    }
  });



const witte_wijn = await prisma.ingredient.create({
    data:{
      name: "witte_wijn"
    }
  });



const worcestersaus = await prisma.ingredient.create({
    data:{
      name: "worcestersaus"
    }
  });



const worsten = await prisma.ingredient.create({
    data:{
      name: "worsten"
    }
  });



const wortel = await prisma.ingredient.create({
    data:{
      name: "wortel"
    }
  });



const wortelen = await prisma.ingredient.create({
    data:{
      name: "wortelen"
    }
  });



const Wynendale = await prisma.ingredient.create({
    data:{
      name: "Wynendale"
    }
  });



const yoghurt = await prisma.ingredient.create({
    data:{
      name: "yoghurt"
    }
  });



const zachte_geitenkaas = await prisma.ingredient.create({
    data:{
      name: "zachte_geitenkaas"
    }
  });



const zeebarbelen = await prisma.ingredient.create({
    data:{
      name: "zeebarbelen"
    }
  });



const zeeduivelfilets = await prisma.ingredient.create({
    data:{
      name: "zeeduivelfilets"
    }
  });



const zeeduivels = await prisma.ingredient.create({
    data:{
      name: "zeeduivels"
    }
  });



const zeekraal = await prisma.ingredient.create({
    data:{
      name: "zeekraal"
    }
  });



const zeekraal_of_peterselie = await prisma.ingredient.create({
    data:{
      name: "zeekraal_of_peterselie"
    }
  });



const zeetongen = await prisma.ingredient.create({
    data:{
      name: "zeetongen"
    }
  });



const zeetongfilets = await prisma.ingredient.create({
    data:{
      name: "zeetongfilets"
    }
  });



const zeezout = await prisma.ingredient.create({
    data:{
      name: "zeezout"
    }
  });



const zelfgemaakte_kruisbessengelei = await prisma.ingredient.create({
    data:{
      name: "zelfgemaakte_kruisbessengelei"
    }
  });



const zelfrijzende_bloem = await prisma.ingredient.create({
    data:{
      name: "zelfrijzende_bloem"
    }
  });



const zetmeel = await prisma.ingredient.create({
    data:{
      name: "zetmeel"
    }
  });



const zilveruitjes = await prisma.ingredient.create({
    data:{
      name: "zilveruitjes"
    }
  });



const zoete_aardappelen = await prisma.ingredient.create({
    data:{
      name: "zoete_aardappelen"
    }
  });



const zoete_witte_wijn = await prisma.ingredient.create({
    data:{
      name: "zoete_witte_wijn"
    }
  });



const zonnebloemolie = await prisma.ingredient.create({
    data:{
      name: "zonnebloemolie"
    }
  });



const zonnebloempitten = await prisma.ingredient.create({
    data:{
      name: "zonnebloempitten"
    }
  });



const zout = await prisma.ingredient.create({
    data:{
      name: "zout"
    }
  });



const zure_room = await prisma.ingredient.create({
    data:{
      name: "zure_room"
    }
  });



const zuurdesembrood = await prisma.ingredient.create({
    data:{
      name: "zuurdesembrood"
    }
  });



const zwarte_peperbollen = await prisma.ingredient.create({
    data:{
      name: "zwarte_peperbollen"
    }
  });



const nori = await prisma.ingredient.create({
    data:{
      name: "nori"
    }
  });


  
  //Users
  const user =  await prisma.user.create({
    data: {
      username: "user",
      password: "$2b$10$WPjlJWr4FT5xl5XF1tTrtuqP7rzX0xayKtV4RisfXS4sOXhJ0PwlS"
      
      //admin123

    }
  });

  const loginuser = await prisma.user.create({
    data:{
      username: "admin",
      password: "$2b$10$rjuNHPfIBYO7hXem9BXdwOfna7jD0/f3HNdlRy4jL/1UXnRASABPi"
      //admin
    }
  });

};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });


export default prisma;

