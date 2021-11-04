// styles
import { useState } from 'react'
import './Home.css'

export default function Home() {
  const [address, setAddress] = useState('')
  const [source, setSource] = useState('')
  const [medium, setMedium] = useState('')
  const [campaign, setCampaign] = useState('')
  const [generatedUrl, setGeneratedUrl] = useState('')
  const [clipboardStatus, setClipboardStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // https://innstyle.co.za/?utm_source=google&utm_medium=email&utm_campaign=free-to-book
    const url = `https://${address
      .trim()
      .toLowerCase()}?utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign
      .replace(/\s+/g, '-')
      .toLowerCase()}`

    setGeneratedUrl(url)
  }

  const handleReset = () => {
    setAddress('')
    setSource('')
    setMedium('')
    setCampaign('')
    setGeneratedUrl('')
    setClipboardStatus('')
  }

  const copyToClipboard = (e) => {
    if (generatedUrl) {
      navigator.clipboard.writeText(generatedUrl)
      setTimeout(setClipboardStatus('Copied to Clipboard!'), 2000)
    }
  }

  return (
    <div className="home">
      <h2 className="page-title">UTM Tag Builder</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>URL Address</span>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            placeholder="https://"
            value={address}
            required
          />
        </label>
        <label>
          <span>UTM Source</span>
          <select onChange={(e) => setSource(e.target.value)}>
            <option value="google">Google</option>
            <option value="activecampaign">Active Campaign</option>
            <option value="facebook">Facebook</option>
          </select>
          {/* <input
            type="text"
            onChange={(e) => setSource(e.target.value)}
            value={source}
            required
          /> */}
        </label>
        <label>
          <span>UTM Medium</span>
          <select onChange={(e) => setMedium(e.target.value)}>
            <option value="social">Social</option>
            <option value="organic">Organic</option>
            <option value="email">Email</option>
            <option value="siteminder">Siteminder</option>
          </select>
          {/* <input
            type="text"
            onChange={(e) => setMedium(e.target.value)}
            value={medium}
            required
          /> */}
        </label>
        <label>
          <span>URL Campaign</span>
          <input
            type="text"
            onChange={(e) => setCampaign(e.target.value)}
            value={campaign}
            required
          />
        </label>
        <button className="button">Generate URL</button>
        <span onClick={handleReset} className="reset">
          Reset Form
        </span>
      </form>

      {generatedUrl && (
        <>
          <h3>Generated URL</h3>
          {clipboardStatus && <span className="status">{clipboardStatus}</span>}
          <p className="generated-url">{generatedUrl}</p>
          <button onClick={copyToClipboard}>Copy</button>
        </>
      )}
    </div>
  )
}
