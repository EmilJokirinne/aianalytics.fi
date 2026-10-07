import { CaseDemand, CaseManufacturing } from './Cases'
import Contact from './Contact'
import Demo from './Demo'
import Footer from './Footer'
import Header from './Header'
import Hero from './Hero'
import { HowItWorks, Stats, WhatIs } from './SectionsIntro'
import { Faq, NotMagic, Trust } from './SectionsTrust'
import { Finland, Technologies, UseCases } from './SectionsUse'
import { Benefits, Comparison, DataNeeds, Maturity } from './SectionsValue'

// Osioiden järjestys seuraa lukijan polkua:
// mitä se on → miten se toimii → mihin sitä käytetään → käytetäänkö Suomessa →
// voisiko se auttaa minua → mitä dataa tarvitaan → onko se turvallista → mistä aloitan
export default function App() {
  return (
    <>
      <Header />
      <main id="sisalto">
        <Hero />
        <Stats />
        <WhatIs />
        <HowItWorks />
        <UseCases />
        <Technologies />
        <Finland />
        <Demo />
        <CaseManufacturing />
        <CaseDemand />
        <Benefits />
        <Comparison />
        <Maturity />
        <DataNeeds />
        <Trust />
        <NotMagic />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
