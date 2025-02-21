import { useState } from 'react';
import './faq.scss';

const faqData = [
  {
    question: 'What is this?',
    answer:
      'Tip people who say awesome things. Get tips for your tweets directly into your wallet.',
  },
  {
    question: 'Why did you do this?',
    answer:
      'We want to encourage bolt12 use. And tipping is a fantastic way to demo it.',
  },
  {
    question: 'Which wallets does it work with?',
    answer:
      'Any wallet that supports Bolt12 (Phoenix, Strike, Wallet of Satoshi).',
  },
  {
    question: 'Have I received any tips?',
    answer:
      'You can check by going to zap-zap.me/your-twitter-username and checking.',
  },
  {
    question: 'How do I send a tip?',
    answer:
      "Paste a worthy tweet (are they still called that?) into the form. Scan the QR code with your lightning wallet. We will post a reply under the tweet that it's been tipped with a link to it.",
  },
  {
    question: 'Can I tip a no-coiner?',
    answer: (
      <>
        <a href="https://x.com/PeterSchiff" target="_blank" rel="noreferrer">
          https://x.com/PeterSchiff
        </a>{' '}
        has entered the room.
      </>
    ),
  },
  {
    question: 'Can I tip…',
    answer:
      'You can tip anyone and we will forward them their tip the moment they add a bolt12 address.',
  },
  {
    question: 'Is Craig Wright Satoshi?',
    answer: 'We are all satoshi except Craig Wright.',
  },
  {
    question: 'I heard there is a new coin…',
    answer: 'there is no second best',
  },
  {
    question: 'Wen ecash?',
    answer: 'Soon.',
  },
  {
    question: 'Will you steal my data?',
    answer:
      "We can't: all we know is your X username and your bolt12 address. But we could send you sweet sats.",
  },
  {
    question: "My tip didn't arrive…",
    answer:
      "We have a minimum payout of 1000 sats (roughly $1) (we'd like to do less but the payment provider doesn't support this yet). So we hold your tip until it's greater than 1000 sats and then trigger a payout.",
  },
  {
    question: 'How much do you charge?',
    answer:
      'We charge nothing. Our SDK provider does charge some minimal lightning routing fees though.',
  },
];

function FAQ() {
  const [openIndices, setOpenIndices] = useState([]);

  const toggleAccordion = (index) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const onQuestionClickHandler = (index) => {
    toggleAccordion(index);
    document
      .getElementById(`faq-${index}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="faq_container">
      <header>
        <h1>Frequently Asked Questions</h1>
      </header>
      <main>
        <dl className="faq-container space-y-4">
          {faqData.map((item, index) => (
            <div
              id={`faq-${index}`}
              key={index}
              className={`faq-item ${openIndices.includes(index) ? 'active' : ''}`}
            >
              {/* ======== question ======= */}
              <dt
                className="faq-question"
                onClick={() => onQuestionClickHandler(index)}
              >
                +&nbsp;&nbsp;{item.question}
              </dt>

              {/* ======== answer ========= */}
              <dd
                className={`faq-answer ${openIndices.includes(index) ? 'expanded' : ''}`}
              >
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </main>
    </div>
  );
}

export default FAQ;
