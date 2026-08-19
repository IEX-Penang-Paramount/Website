import PageHeader from "../components/ui/PageHeader.jsx";
import FeatureBoard from "./FeatureBoard.jsx";
import SearchList from "./SearchList.jsx";
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

          <FeatureBoard />
        </div>
      </section>
    </>
  );
}

export default StoriesMain;
