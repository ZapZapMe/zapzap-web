console.log(`main.js`)

const tipTweetURLInput = document.querySelector(`.tipCard input.tipTweetURLInput`)
const tipTweetURLErrorMsg = document.querySelector(`.tipTweetURLErrorMsg`)
const tipTweetURLButton = document.querySelector(`button.tipTweetURLButton`)
const tipSatInput = document.querySelector(`div.tipSatInput`)
const tipSatButton = document.querySelector(`button.tipSatButton`)
const tipQuickSatSpans = document.querySelectorAll(`div.tipQuickSat span`)
const tipQRAddress = document.querySelector(`div.tipQRAddress`)
const tipQRInput = document.querySelector(`input.tipQRInput`)
const tipQRInputCopyButton = document.querySelector(`button.tipQRInputCopyButton`)

tipTweetURLInput.addEventListener('blur', () => {
	const regex = /^(https?:\/\/)?(www\.)?x\.com\/user\/status\/\d+$/

	if (tipTweetURLInput.value) {
		if (!regex.test(tipTweetURLInput.value)) {
			tipTweetURLInput.setCustomValidity('')
			tipTweetURLInput.classList.add('invalid')
			tipTweetURLErrorMsg.classList.remove('hide')
			tipTweetURLButton.disabled = true
		}

		else {
			tipTweetURLInput.classList.remove('invalid')
			tipTweetURLErrorMsg.classList.add('hide')
			tipTweetURLButton.disabled = false
		}
	}

	else {
		tipTweetURLInput.classList.remove('invalid')
		tipTweetURLErrorMsg.classList.add('hide')
		tipTweetURLButton.disabled = true
	}
})

tipSatInput.addEventListener('input', () => {

	tipSatInput.classList.add('edited')

	if(!tipSatInput.innerText.length || tipSatInput.innerText==="\n") {
		tipSatInput.classList.remove('edited')
		tipSatInput.innerText = ""
	}
})

tipSatInput.addEventListener("keypress", (e) => {
	let allowedChars = '0123456789'

	function contains(stringValue, charValue) {
		return stringValue.indexOf(charValue) > -1
	}
    
    let invalidKey = e.key.length === 1 && !contains(allowedChars, e.key) || e.key === '.' && contains(e.target.value, '.')
    
    invalidKey && e.preventDefault()
})

tipSatInput.addEventListener('blur', () => {
	const satValue = parseInt(tipSatInput.innerText)

	if (satValue) {
		tipSatButton.disabled = false
	}

	else {
		tipSatButton.disabled = true
	}
})

tipQuickSatSpans.forEach( x => x.addEventListener('click', () => {
	tipSatInput.innerText = x.getAttribute('value')
	tipSatInput.classList.add('edited')
}) )

tipQRInputCopyButton.addEventListener('click', () => {
	const copyText = tipQRInput.value
	navigator.clipboard.writeText(copyText)
	.then( () => {
		tipQRInputCopyButton.innerText = "Copied"
		tipQRInputCopyButton.style.background = "var(--green)"
		tipQRAddress.style.borderColor = "var(--green)"

		setTimeout( () => {
			tipQRInputCopyButton.innerText = "Copy"
    	    tipQRInputCopyButton.style.background = "var(--black)"
	        tipQRAddress.style.borderColor = "var(--black)"
	    }, 1600 )
	},
	() => {
		tipQRInputCopyButton.innerText = "Error"
		tipQRInputCopyButton.style.background = "var(--red)"
		tipQRAddress.style.borderColor = "var(--red)"

		setTimeout( () => {
			tipQRInputCopyButton.innerText = "Copy"
    	    tipQRInputCopyButton.style.background = "var(--black)"
	        tipQRAddress.style.borderColor = "var(--black)"
	    }, 1600 )
	})
})






