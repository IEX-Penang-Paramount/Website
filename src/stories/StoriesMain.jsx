import PageHeader from "../components/ui/PageHeader.jsx";
import RecordingIndex from "./RecordingIndex.jsx";
import { stories } from "./Assets/StoryData.js";

function StoriesMain() {
  return (
    <>
      <PageHeader
        eyebrow="Oral history · 口述记录"
        title="The Voices"
        mark="声"
        lead="Accounts kept close to the way they were told. Each recording notes who spoke, when it was made, and which places and terms it touches."
        meta={[
          { k: "Recordings", v: String(stories.length) },
          { k: "Recorded", v: "2025" },
        ]}
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
