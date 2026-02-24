import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="neo-footer">
      <div className="container-shell">
        <div className="neo-footer-main">
          <div className="neo-footer-logo-side">
            <Link href="/" className="neo-logo-wrap" aria-label="Go to homepage">
              <span className="neo-logo-icon" />
              <span className="neo-logo-text">actorStock.ai</span>
            </Link>
            <p>
              The world&apos;s first decentralized agency for synthetic human assets. Powered by neural networks,
              delivered for the 2026 production era.
            </p>
          </div>

          <div className="neo-footer-col">
            <h4>Marketplace</h4>
            <ul className="neo-footer-links">
              <li>
                <Link href="/actors">Browse Actors</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing Plans</Link>
              </li>
              <li>
                <Link href="/#hiw">How It Works</Link>
              </li>
              <li>
                <Link href="/#faq">FAQ</Link>
              </li>
            </ul>
          </div>

          <div className="neo-footer-col">
            <h4>Legal</h4>
            <ul className="neo-footer-links">
              <li>
                <Link href="/license">Licensing Terms</Link>
              </li>
              <li>
                <Link href="/license">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/license">Creator Agreement</Link>
              </li>
              <li>
                <Link href="/license">Terms of Use</Link>
              </li>
            </ul>
          </div>

          <div className="neo-footer-col neo-newsletter-box">
            <h4>Stay Updated</h4>
            <p>Get new actor drops and platform updates direct to your inbox.</p>
            <div className="neo-newsletter-form">
              <input type="email" placeholder="node@network.ai" aria-label="Email for updates" />
              <button type="button">Join</button>
            </div>
          </div>
        </div>

        <div className="neo-footer-bottom">
          <p>&copy; {year} actorStock.ai. All synthetic rights reserved.</p>
          <div className="neo-footer-status">
            <span>SYSTEM STATUS: STABLE</span>
            <span>LATENCY: 14MS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
