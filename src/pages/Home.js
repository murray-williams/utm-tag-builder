// styles
import { useState } from 'react'
import './Home.css'

export default function Home() {
  const [address, setAddress] = useState('')
  const [source, setSource] = useState('')
  const [medium, setMedium] = useState('')
  const [campaign, setCampaign] = useState('')
  const [keyword, setKeyword] = useState('')
  const [generatedUrl, setGeneratedUrl] = useState('')
  const [clipboardStatus, setClipboardStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const url = `https://${address
      .trim()
      .toLowerCase()}?utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}&utm_term=${keyword
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
          <span className="sub-label-text">
            https://<em>www.google.com</em>
          </span>
        </label>
        <label>
          <span>UTM Source</span>
          <select onChange={(e) => setSource(e.target.value)}>
            <option value="google">Google</option>
            <option value="activecampaign">Active Campaign</option>
            <option value="facebook">Facebook</option>
          </select>
          <span className="sub-label-text">
            The referrer: (e.g. <em>google</em>, <em>active-campaign</em>).
          </span>
        </label>
        <label>
          <span>UTM Medium</span>
          <select onChange={(e) => setMedium(e.target.value)}>
            <option value="social">Social</option>
            <option value="organic">Organic</option>
            <option value="email">Email</option>
            <option value="siteminder">Siteminder</option>
          </select>
          <span className="sub-label-text">
            Marketing medium: (e.g. <em>banner</em>, <em>email</em>).
          </span>
        </label>
        <label>
          <span>URL Campaign</span>
          <input
            type="text"
            onChange={(e) => setCampaign(e.target.value)}
            value={campaign}
            required
          />
          <span className="sub-label-text">
            Product, promo code, or slogan: (e.g. <em>summer_sale</em>,{' '}
            <em>gift_voucher</em>)).
          </span>
        </label>
        <label>
          <span>UTM Keyword</span>
          <input
            type="text"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            required
          />
          <span className="sub-label-text">
            Keyword to identify the campaign: (e.g. <em>partner_banner</em>,{' '}
            <em>start_date</em>)).
          </span>
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
