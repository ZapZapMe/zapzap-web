import { ChevronLeft } from 'lucide-react'
import React, { useState } from 'react'
import "../../styles/faq.scss";
import { useAuth } from '../../lib/contexts/AuthContext';


interface ITipCommentForm {
    onSubmit: (p:{text:string, postOnX:boolean}, shouldSkip?: boolean) => void;
    onBack: () => void;
    twitterHandle: string;
    initialComment:string
}
const TipCommentForm: React.FC<ITipCommentForm> = ({ onSubmit, twitterHandle, onBack,initialComment="" }) => {
    const { token } = useAuth()

    const [comment, setComment] = useState(initialComment);
    const [isNextDisabled, setIsNextDisabled] = useState(initialComment?false:true)
    const [isChecked, setIsChecked] = useState(!!initialComment);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = e.target.value
        setComment(inputVal)
        setIsNextDisabled(inputVal.length === 0 ? true : false)
    }

    const handleToggle = () => {
        setIsChecked(prev => !prev);
    };

    const handleSubmit = (shouldSkip=false)=>{
        onSubmit({text:comment, postOnX:isChecked},shouldSkip)
    }

    return (
        <div className="tip-comment-form">
            <span className="tip-comment-form__header">
                Send a tip message to <span className="twitter-handle">{twitterHandle}</span>
            </span>


            {/* --------- input --------- */}
            <div className='input_container'>
                <input
                    // disabled={!token} // if no user, dont allow them to input 
                    onChange={handleChange}
                    value={comment}
                    placeholder={!token ? "Log in with X to send a custom message" : "Write your tip message here"}
                    className="tip-comment-form__input"
                />
                {
                    !isNextDisabled &&
                    <div className="flex items-center self-start gap-2">
                        <button
                            onClick={handleToggle}
                            aria-checked={isChecked}
                            role="checkbox"
                        >
                            {isChecked && (
                                <svg
                                    className="absolute inset-0 w-7 h-7 m-auto text-yellow-400"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>
                        <span className="text-sm text-gray-700">Post tip on X</span>
                    </div>


                }
            </div>
            <div className="tip-comment-form__footer">
                <button onClick={onBack} className="back-button">
                    <ChevronLeft />
                </button>
                <button onClick={()=>handleSubmit()} disabled={isNextDisabled} className="next-button">
                    Next
                </button>
                <button onClick={() => handleSubmit(true)} className="skip-button">
                    Skip
                </button>
            </div>
        </div>
    )
}

export default TipCommentForm