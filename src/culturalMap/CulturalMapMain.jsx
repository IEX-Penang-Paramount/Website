import React from 'react'
import { TopBar } from '../Reusables/TopComponents/TopBar'
import PageHeader from "../components/ui/PageHeader.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import { getNavItem } from "../config/navigation.js";

const NAV = getNavItem("/cultural-map");

function CulturalMapMain() {
  return (

    <div>
      <TopBar/>
      CulturalMapMain
      </div>
  )
    <>
      <PageHeader title={NAV.label} subtitle={NAV.description} />

      <section className="section">
        <div className="container">
          <p className="prose">
            Each location carries a short account of what happens there and how
            its use has shifted over time. Sites are grouped by the stretch of
            coast they sit on, so a walk along the shore reads as a sequence
            rather than a scatter of points.
          </p>
          <EmptyState message="The interactive map is in preparation." />
        </div>
      </section>
    </>
  );
}

export default CulturalMapMain;
