export default function AdminAdsPage() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Upload Advertisement</h1>

      <form
        action="/api/admin/ads"
        method="POST"
        encType="multipart/form-data"
      >

        <input
          type="text"
          name="title"
          placeholder="Ad Title"
          required
        />

        <br /><br />

        <input
          type="text"
          name="redirectUrl"
          placeholder="Redirect URL"
          required
        />

        <br /><br />

       <select name="placement" required>
          <option value="header_banner">
            Header Banner (970x90)
          </option>

          <option value="match_inline">
            Match Inline (728x90)
          </option>

          <option value="sidebar_top">
            Sidebar Top (300x250)
          </option>

          <option value="sidebar_middle">
            Sidebar Middle (300x250)
          </option>

          <option value="footer_banner">
            Footer Banner (970x90)
          </option>

        </select>

        <br /><br />

        <input type="file" name="file" required />

        <br /><br />

        <button type="submit">Upload Ad</button>

      </form>
    </div>
  )
}