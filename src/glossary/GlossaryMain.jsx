import PageHeader from "../components/ui/PageHeader.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import { getNavItem } from "../config/navigation.js";

const NAV = getNavItem("/glossary");

function GlossaryMain() {
  return (
    <>
      <PageHeader title={NAV.label} subtitle={NAV.description} />

      <section className="section">
        <div className="container">
          <p className="prose">
            Entries pair each term with the situation it is used in — who says
            it, when, and what it tells you about the work being done. Where a
            term has more than one form along the coast, the variants are listed
            together rather than reduced to a single spelling.
          </p>
          <EmptyState message="Glossary entries are being compiled." />
        </div>
      </section>
    </>
  );
}

export default GlossaryMain;
