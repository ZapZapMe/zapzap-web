import {formatDateDifference} from '../../lib/utils/helperFunctions';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const FeedItem = (props) => {
  const {
    tip_sender = "anonymous",
    created_at,
    tweet_id,
    recipient,
    amount_sats,
    avatar_url,
    comment,
    mode
  } = props;
  const navigate = useNavigate()
  const navigateToProfile = () =>{
    if (tip_sender) window.open(`https://x.com/${tip_sender}`, "_blank")
  }

  if (mode==="sent"){
    return (
      <div className="feedItem">
        <img className="feedItemProfilePic" src={avatar_url} alt={tip_sender} />
        <div className="feedItemDetails">
          <div className="feedItemReceivedFromUser">
              <span onClick={navigateToProfile} className='cursor-pointer text-blue-700 font-bold'>@{tip_sender}</span>{' '}sent a tip    
          </div>
          <div className="feedItemSatTime">
            <b>{amount_sats} sat</b> - {formatDateDifference(created_at)}
          </div>
          {comment && <div className="feedItemComment">{comment}</div>}
        </div>
      </div>
    );
  }

  return <>received</>

  
};

export default FeedItem;
