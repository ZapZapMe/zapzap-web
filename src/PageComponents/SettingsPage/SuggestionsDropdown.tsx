import useClickOutside from '../../lib/hooks/useClickOutside';
import { updateWalletAddress } from '../../lib/utils/apiHandlers';
import { domains } from '../../lib/utils/constants/settings.constants';
import React, { ReactNode, useEffect, useRef, useState } from 'react'

// interface ISuggestionsDropdown {
//     children?: ReactNode;
// }

const Suggestions = () => {
    const inputRef = useRef<any>(null)
    const [walletAddress, setWalletAddress] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showError, setShowError] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(false)

    const handleChange = (input: string) => {

        setWalletAddress(input);
        const shouldShowSuggestions = input.includes("@")
        const atIndex = input.lastIndexOf('@');
        if (shouldShowSuggestions) {
            const query = input.slice(atIndex + 1).toLowerCase();
            const filtered = domains.filter((domain) => domain.startsWith(query));
            setSuggestions(filtered);
            setShowSuggestions(true)
        } else {
            setSuggestions([]);
            setShowSuggestions(false)
        }
        // const atIndex = input.lastIndexOf('@');
        // if (atIndex !== -1) {
        //   const query = input.slice(atIndex + 1).toLowerCase();
        //   const filtered = domains.filter((domain) => domain.startsWith(query));
        //   setSuggestions(filtered);
        // } else {
        //   setSuggestions([]);
        // }
    };

    const handleSuggestionClick = async (domain: string) => {
        const baseAddress = walletAddress.split("@")[0]
        inputRef.current?.focus()
        const atIndex = walletAddress.lastIndexOf('@');
        const newAddress = walletAddress.slice(0, atIndex + 1) + domain;
        setWalletAddress(newAddress);
        setSuggestions([]);
        setShowSuggestions(false)
    };

    const toggleShowSuggestions = () => setShowSuggestions((prev) => !prev)
    useClickOutside(null, toggleShowSuggestions, 'suggestions-container')


    return (
        <div className={'inputWrapper'} ref={inputRef}>

            {/* -------- input for wallet address -------------- */}
            <input
                id="wallet_address"
                autoComplete="off"
                type="text"
                name="wallet_address"  
                value={walletAddress}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="satoshi@example.org"
                className={'walletInput w-full'}
            />
            {showError && <ErrorMessage />}

            {/* ========= CLOSE BUTTON ========= */}
            {walletAddress && (<button type="button" className={'clearButton'} onClick={() => setWalletAddress("")}>×</button>)}

            {/* ========= Suggestions Dropdown ========= */}
            <SuggestionsDropdown
                shouldShow={showSuggestions}
                filteredElements={suggestions}
                onClick={handleSuggestionClick}
                prefIx={walletAddress.slice(0, walletAddress.lastIndexOf('@') + 1)}
            />
        </div>
    )
}

const ErrorMessage = () => {
    return (
        <div className={'warningMessage'}>
            <span className={'warningIcon'}>⚠</span>
            Please add a wallet address
        </div>
    )
}


interface ISuggestionsDropdown {
    shouldShow: boolean;
    filteredElements: any[];
    onClick: (param: string) => void;
    prefIx:string;

}
const SuggestionsDropdown: React.FC<ISuggestionsDropdown> = ({ shouldShow, filteredElements, onClick, prefIx }) => {

    const [currIdx, setCurrIdx] = useState(0);


    const handleKeydown = (event: any) => {
        if (event.key === "ArrowUp") {
            return upHandler();

        }

        if (event.key === "ArrowDown") {
            return downHandler();

        }

        if (event.key === "Enter") {
            event.preventDefault()
            enterHandler();
            return;
        }

    }

    const upHandler = () => {
        if (currIdx === 0) return
        const selectedIdx = (currIdx + filteredElements.length - 1) % filteredElements.length
        setCurrIdx(selectedIdx);
        document.getElementById(`command-${selectedIdx}`)?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
    
      };
    
      const downHandler = () => {
        if (currIdx === filteredElements.length - 1) return
        const selectedIdx = (currIdx + 1) % filteredElements.length
        setCurrIdx(selectedIdx);
        document.getElementById(`command-${selectedIdx}`)?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
    
      };
    
      const enterHandler = () => {
        console.log("🚀 ~ enterHandler ~ filteredElements.length:", filteredElements.length)
        if (filteredElements.length===0) return;
        onClick(filteredElements[currIdx]);
       
      };

    useEffect(()=>{
        setCurrIdx(0)
    },[filteredElements])
    
    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        return () => document.removeEventListener('keydown', handleKeydown);

    }, [handleKeydown]);
    return (
        shouldShow && (
            <div id='suggestions-container' className={'suggestions'}>
                <div className={'suggestionsHeader'}>Suggestions</div>
                    {filteredElements.map((suggestion, index) => (
                        <button
                            onMouseEnter={()=>setCurrIdx(index)}
                            key={suggestion}
                            className={`suggestionItem ${index===currIdx ?"bg-yellow-300":""}`}
                            onClick={() => onClick(suggestion)}
                            type="button"
                        >
                            {prefIx+suggestion}
                        </button>
                    ))}
                    {
                        filteredElements.length===0 && <span className='text-xs text-gray-400 p-2'>No data to show.</span>
                    }
            </div>
        )

    )
}


export default Suggestions