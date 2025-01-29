import React from 'react';

function ProfileTop() {
  const username = 'imaginator';
  const walletAddress = 'imaginator@strike.me';

  return (
    <div className="profileTop">
      <div className="profilePicRow">
        <img className="profilePicImg" src="img/dp.png" alt="Profile" />
        <a
          href={`http://x.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            width="18"
            height="16"
            viewBox="0 0 18 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.9405 0H16.6548L10.7249 6.77744L17.7009 16H12.2388L7.96062 10.4066L3.06544 16H0.349538L6.6921 8.75077L0 0H5.60082L9.4679 5.11262L13.9405 0ZM12.9879 14.3754H14.4919L4.78359 1.53928H3.16964L12.9879 14.3754Z" />
          </svg>
        </a>
      </div>
      <div className="profileUsername">@{username}</div>
      <div className="profileWalletRow">
        <div className="profileWalletIcon">
          <svg
            width="15"
            height="12"
            viewBox="0 0 15 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 1.5C0 0.675 0.675 0 1.5 0H12.75C12.9489 0 13.1397 0.0790176 13.2803 0.21967C13.421 0.360322 13.5 0.551088 13.5 0.75V1.5H1.5V2.25H14.25C14.4489 2.25 14.6397 2.32902 14.7803 2.46967C14.921 2.61032 15 2.80109 15 3V10.5C15 10.8978 14.842 11.2794 14.5607 11.5607C14.2794 11.842 13.8978 12 13.5 12H1.5C1.10218 12 0.720644 11.842 0.43934 11.5607C0.158035 11.2794 0 10.8978 0 10.5V1.5ZM12.375 8.25C12.6734 8.25 12.9595 8.13147 13.1705 7.9205C13.3815 7.70952 13.5 7.42337 13.5 7.125C13.5 6.82663 13.3815 6.54048 13.1705 6.3295C12.9595 6.11853 12.6734 6 12.375 6C12.0766 6 11.7905 6.11853 11.5795 6.3295C11.3685 6.54048 11.25 6.82663 11.25 7.125C11.25 7.42337 11.3685 7.70952 11.5795 7.9205C11.7905 8.13147 12.0766 8.25 12.375 8.25Z" />
          </svg>
        </div>
        <div className="profileWalletAddress">{walletAddress}</div>
        <a href="settings.html" className="profileEditWalletIcon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 12.6222V16H3.37778L12.6667 6.66667L9.33333 3.33333L0 12.6222ZM15.7333 3.55556C16.0889 3.2 16.0889 2.66667 15.7333 2.31111L13.6889 0.266667C13.3333 -0.0888889 12.8 -0.0888889 12.4444 0.266667L10.8444 1.86667L14.2222 5.24444L15.7333 3.55556Z"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default ProfileTop;
