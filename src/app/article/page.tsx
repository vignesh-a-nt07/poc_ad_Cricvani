import AdSlot from "../../components/AdSlot"

export default function ArticlePage() {
  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>

      <h1>Cricket Article</h1>

      <p>Article content here...</p>

      {/* ARTICLE INLINE AD */}
      <AdSlot
        placement="match_inline"
        width={728}
        height={90}
      />
      <p>More article content...</p>

    </div>

    
  )
}