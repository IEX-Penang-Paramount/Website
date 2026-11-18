import PageHeader from "../components/ui/PageHeader.jsx";
import RecordingIndex from "./RecordingIndex.jsx";
import { useSection } from "../projects/ProjectContext.js";

function StoriesMain() {
  const stories = useSection("stories");
  const recorded = stories.getUi("recorded");

  const meta = [{ k: "Recordings", v: String(stories.getItems().length) }];
  if (recorded) meta.push({ k: "Recorded", v: recorded });

  return (
    <>
      <PageHeader
        eyebrow="Oral history · 口述记录"
        title="The Voices"
        mark="声"
        {...stories.getHeader()}
        meta={meta}
      />

      <section className="section">
        <div className="container">
          <RecordingIndex />
        </div>
      </section>
    </>
  );
}

export default StoriesMain;
