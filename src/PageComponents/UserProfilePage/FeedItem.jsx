import { useAuth } from '../../lib/contexts/AuthContext';
import {formatDateDifference} from '../../lib/utils/helperFunctions';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FeedItem = (props) => {
  const {
    tip_sender = "anonymous",
    created_at,
    tweet_id,
    recipient,
    amount_sats,
    avatar_url,
    comment,
    tip_type,
    mode
  } = props;
  console.log("🚀 ~ FeedItem ~ props:", props)
  const navigate = useNavigate()


    return (
      <div className="feedItem">
        <img className="feedItemProfilePic" src={avatar_url} alt={tip_sender} />
        <div className="feedItemDetails">
          <div className="feedItemReceivedFromUser">
              <TipTitle recipient={recipient} tip_sender={tip_sender} type={tip_type}/>
          </div>
          <div className="feedItemSatTime">
            <b>{amount_sats} sat</b> - {formatDateDifference(created_at)}
          </div>
          {comment && <div className="feedItemComment">{comment}</div>}
        </div>
      </div>
    );
  }

  


export default FeedItem;


const TipTitle = ({tip_sender, recipient, type})=>{
  const {username} = useParams()
  const {user} = useAuth()
  
  // =========== SENT
  if (type==="sent"){
    // ---------- logged in user sent a tip 
    if (user?.twitter_username===tip_sender) {
      return (
        <>You tipped <TwitterHandle tip_sender={tip_sender}/> </>
      )
    }
    // ----------- Others page
    if (tip_sender) {
      return (
        <><TwitterHandle tip_sender={tip_sender}/> sent a tip to <TwitterHandle tip_sender={recipient}/> </>
      )
    }

  }

  // ======== RECEIVED => @someone sent a tip 
  if (!tip_sender){
    return (
      <>
        <TwitterHandle tip_sender={tip_sender}/> {' '} sent a tip    
      </>
    )
  }
}


const TwitterHandle = ({tip_sender})=>{
  
  const navigateToProfile = () =>{
    if (tip_sender) window.open(`https://x.com/${tip_sender}`, "_blank")
  }

  return (
    <span onClick={navigateToProfile} className='cursor-pointer text-blue-700 font-bold'>@{tip_sender??"anonymous"}</span> 
  )
}


