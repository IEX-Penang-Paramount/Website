export default function A3() {
  return (
    <>
      <p>
        This is a documentary film about the effects of a land reclamation
        project on a fishing community in Sungai Batu, Penang, from the
        perspective of two fishermen - Shahril and Faiz.
      </p>

      <p>
        The 15-minute film contains interviews with the fishermen, some
        background information about the reclamation project, as well as
        footage of the fishermen going out to sea. It was filmed in August
        2024, following the start of the Penang South Island (PSI)
        reclamation project.
      </p>

      <div style={{ position: "relative", paddingTop: "56.25%", margin: "1.5rem 0" }}>
        <iframe
          src="https://www.youtube.com/embed/mcAyfMf61oA"
          title="Walaupun Laut Nampak Luas | Even Though the Sea Is Vast"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </>
  );
}
