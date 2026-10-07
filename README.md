# aianalytics.fi

Suomenkielinen tietosivusto AI-analytiikasta suomalaisille yrityspäättäjille.
Tekniikka: React 19, TypeScript, Vite, Tailwind CSS 4. Ei muita ajonaikaisia kirjastoja (ikonit ja kaaviot ovat omia SVG-komponentteja).

Projekti on tarkoituksella litteä: kaikki tiedostot ovat juuressa, ei alikansioita.

## Käyttö

```bash
npm install
npm run dev        # kehityspalvelin
npm run build      # tuotantoversio kansioon dist/ (esirenderöity HTML)
npm run preview    # tuotantoversion esikatselu
npm run typecheck  # TypeScript-tarkistus
```

`npm run build` tekee kolme asiaa: selainbuildin, palvelinpuolen renderöinnin ja `prerender.mjs`-ajon, joka kirjoittaa valmiin HTML:n ja JSON-LD-rakenteet `dist/index.html`-tiedostoon. Sivu toimii ja on luettavissa myös ilman JavaScriptiä.

Julkaisu: kopioi `dist/`-kansion sisältö mille tahansa staattiselle palvelimelle (Netlify, Vercel, Cloudflare Pages, oma palvelin).

## Ennen julkaisua

- **Yhteystiedot:** `config.ts` → `contactEmail` (oletus `yhteys@aianalytics.fi`). Osoite näkyy lomakkeessa, footerissa ja JSON-LD:ssä.
- **Tietosuoja ja evästeet:** footerin tekstit pitävät paikkansa niin kauan kuin sivustolle ei lisätä analytiikkaa tai kolmannen osapuolen palveluita. Päivitä ne, jos lisäät.
- **sitemap.xml:** päivitä `lastmod`, kun sisältö muuttuu.

## Tiedostot

| Tiedosto | Sisältö |
| --- | --- |
| `App.tsx` | Osioiden järjestys |
| `Header.tsx`, `Footer.tsx` | Ylä- ja alatunniste |
| `Hero.tsx` | Hero ja animoitu esimerkkidashboard |
| `SectionsIntro.tsx` | Tilastot, määritelmä, miten se toimii |
| `SectionsUse.tsx` | Käyttökohteet, teknologiat, Suomi-osio |
| `Demo.tsx` | Interaktiivinen demo (Myynti / Asiakkaat / Varasto / Tuotanto) |
| `Cases.tsx` | Esimerkit: valmistava yritys ja kysynnän ennustaminen |
| `SectionsValue.tsx` | Hyödyt, vertailu, kypsyyspolku, datan tarve |
| `SectionsTrust.tsx` | Tietoturva, realismi, FAQ (FAQ-data käytetään myös JSON-LD:ssä) |
| `Contact.tsx` | CTA ja kartoituslomake (avaa sähköpostiviestin, ei tallenna mitään) |
| `ui.tsx`, `charts.tsx`, `icons.tsx` | Yhteiset komponentit, SVG-kaaviot ja ikonit |
| `config.ts` | Sivuston asetukset, navigaatio ja lähdelinkit |
| `index.css` | Tailwind-teema, fontit ja animaatiot |
| `inter-*.woff` | Inter-fontti itse isännöitynä (Latin-osajoukko, ei Google Fonts -kutsuja) |

## Tilastot ja lähteet

Kaikki sivuston tilastot ovat Tilastokeskuksen julkaisusta *Tietotekniikan käyttö yrityksissä 2025* (julkaistu 27.11.2025, https://stat.fi/julkaisu/cm1hnps701dbm07w59uo0jw6u). Tilasto koskee vähintään 10 henkilöä työllistäviä yrityksiä.

| Luku | Sisältö |
| --- | --- |
| 38 % | yrityksistä käytti tekoälyteknologioita 2025 (2024: 24 %) |
| 45 % | yrityksistä teki data-analytiikkaa |
| 68 % | vähintään 100 henkilön yrityksistä käytti tekoälyteknologioita |
| 29 % | käytti kirjoitettua tekstiä analysoivaa tekoälyä (yleisin) |
| 79 / 58 / 56 / 43 % | pilvipalvelut / ERP / CRM / BI |
| 15 % ja 51 % | oli dokumentoinut tekoälyn käytön ohjeita (kaikki / vähintään 100 hlö) |

Kaikki muut luvut (dashboardit, demo, esimerkkiyritykset) ovat kuvitteellisia ja merkitty sivulla sellaisiksi. Tilastot kannattaa päivittää, kun Tilastokeskus julkaisee vuoden 2026 luvut.

## Saavutettavuus ja suorituskyky

- Semanttinen HTML, yksi H1, osiot `aria-labelledby`-otsikoilla, ohituslinkki sisältöön.
- Demo käyttää ARIA-välilehtiä (nuolinäppäimet toimivat), FAQ toimii `<details>`-elementeillä.
- Animaatiot kunnioittavat `prefers-reduced-motion`-asetusta, ja sisältö näkyy myös ilman JavaScriptiä.
- Ei kuvia sisällössä (vain SVG), fontit esiladataan, esirenderöity HTML nopeuttaa LCP:tä.
