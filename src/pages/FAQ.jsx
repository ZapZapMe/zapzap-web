// filepath: /src/pages/SettingsPage.jsx
import React from 'react';
function FAQPage() {
  return (
    <div className="FAQWrapper gap">
      <header>
        <h1>FAQ</h1>
      </header>
      <main>
        <section>
          <h2>What is this?</h2>
          <p>
            Tip people who say awesome things. Get tips for your tweets directly
            into your wallet.
          </p>
        </section>
        <section>
          <h2>Why did you do this?</h2>
          <p>
            We want to encourage bolt12 use. And tipping is a fantastic way to
            demo it.
          </p>
        </section>
        <section>
          <h2>Which wallets does it work with?</h2>
          <p>
            Any wallet that supports Bolt12 (Phoenix, Strike, Wallet of
            Satoshi).
          </p>
        </section>
        <section>
          <h2>Have I received any tips?</h2>
          <p>
            You can check by going to zap-zap.me/your-twitter-username and
            checking.
          </p>
        </section>
        <section>
          <h2>How do I send a tip?</h2>
          <p>
            Paste a worthy tweet (are they still called that?) into the form.
            Scan the QR code with your lightning wallet. We will post a reply
            under the tweet that it&apos;s been tipped with a link to it.
          </p>
        </section>
        <section>
          <h2>Can I tip a no-coiner?</h2>
          <p>
            <a
              href="https://x.com/PeterSchiff"
              target="_blank"
              rel="noreferrer"
            >
              https://x.com/PeterSchiff
            </a>{' '}
            has entered the room.
          </p>
        </section>
        <section>
          <h2>Can I tip…</h2>
          <p>
            You can tip anyone and we will forward them their tip the moment
            they add a bolt12 address.
          </p>
        </section>
        <section>
          <h2>Is Craig Wright Satoshi?</h2>
          <p>We are all satoshi except Craig Wright.</p>
        </section>
        <section>
          <h2>I heard there is a new coin…</h2>
          <p>…“there is no second best”.</p>
        </section>
        <section>
          <h2>Wen ecash?</h2>
          <p>Soon.</p>
        </section>
        <section>
          <h2>Will you steal my data?</h2>
          <p>
            We can&apos;t: all we know is your X username and your bolt12
            address. But we could send you sweet sats.
          </p>
        </section>
        <section>
          <h2>My tip didn&apos;t arrive…</h2>
          <p>
            We have a minimum payout of 1000 sats (roughly $1) (we&apos;d like
            to do less but the payment provider doesn&apos;t support this yet).
            So we hold your tip until it&apos;s greater than 1000 sats and then
            trigger a payout.
          </p>
        </section>
        <section>
          <h2>How much do you charge?</h2>
          <p>
            How much do you charge? We charge nothing. Our SDK provider does
            charge some minimal lightning routing fees though.
          </p>
        </section>
      </main>
    </div>
  );
}

export default FAQPage;
