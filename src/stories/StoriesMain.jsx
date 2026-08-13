import PageHeader from "../components/ui/PageHeader.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import { getNavItem } from "../config/navigation.js";

const NAV = getNavItem("/story");

function StoriesMain() {
  return (
    <>
      <PageHeader title={NAV.label} subtitle={NAV.description} />

      <section className="section">
        <div className="container">
          <p className="prose">
            Accounts are kept close to the way they were told, with editing
            limited to what a reader needs to follow them. Each chapter notes
            who spoke, when the recording was made, and which places and terms
            it touches.
          </p>
          <EmptyState message="Story chapters are being transcribed." />
        </div>
      </section>
    </>
  );
}

export default StoriesMain;
