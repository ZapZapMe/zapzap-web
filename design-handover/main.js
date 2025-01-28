console.log(`main.js`);

const tipTweetURLInput = document.querySelector(
  `.tipCard input.tipTweetURLInput`
);
const tipTweetURLErrorMsg = document.querySelector(`.tipTweetURLErrorMsg`);
const tipTweetURLButton = document.querySelector(`button.tipTweetURLButton`);

tipTweetURLInput.addEventListener('blur', () => {
  const regex = /^(https?:\/\/)?(www\.)?x\.com\/user\/status\/\d+$/;

  if (tipTweetURLInput.value) {
    if (!regex.test(tipTweetURLInput.value)) {
      tipTweetURLInput.setCustomValidity('');
      tipTweetURLInput.classList.add('invalid');
      tipTweetURLErrorMsg.classList.remove('hide');
      tipTweetURLButton.disabled = true;
    } else {
      tipTweetURLInput.classList.remove('invalid');
      tipTweetURLErrorMsg.classList.add('hide');
      tipTweetURLButton.disabled = false;
    }
  } else {
    tipTweetURLInput.classList.remove('invalid');
    tipTweetURLErrorMsg.classList.add('hide');
    tipTweetURLButton.disabled = true;
  }
});
