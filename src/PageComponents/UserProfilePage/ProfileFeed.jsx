import React, { useEffect, useState } from 'react';
import FeedItem from './FeedItem';
import DynamicHeightContainer from '../../components/DynamicHeightContainer';
import TipsSent from './TipsSent';
import TipsRecieved from './TipsRecieved';
import { useParams } from 'react-router-dom';
import { getUsersTipReceived, getUsersTipSent } from '../../lib/utils/apiHandlers';



const ProfileFeed = () => {
  // const [activeTab, setActiveTab] = useState("received")
  const {activeTab, setActiveTab, tipsReceived, tipsSent, isLoading } = useProfileFeed()
  return (
    <div className="profileBottom">
      {/* Tabs */}
      <div className="flex mt-2 cursor-pointer text-sm font-bold rounded-full bg-[#333333]">
            <div
              onClick={() => setActiveTab("received")}
              className={`flex-1 py-3  rounded-full text-center  ${
                activeTab === "received" ? "bg-amber-500 text-black" : " text-white " 
              }`}
            >
              Tips Received
            </div>
            <div
              onClick={() => setActiveTab("sent")}
              className={`flex-1 py-3 rounded-full text-center  ${
                activeTab === "sent" ? "bg-amber-500 text-black" : " text-white"
              }`}
            >
              Tips Sent
            </div>
      </div>

      <div className='profileFeed'> 
          { 
            activeTab === "sent" ?  
              <TipsSent isLoading={isLoading} data={tipsSent} /> 
                : 
              <TipsRecieved isLoading={isLoading} data={tipsReceived}/> 
            }      
      </div>
    </div>
  )
}
  


export default ProfileFeed;


const useProfileFeed = ()=>{
  const [activeTab, setActiveTab] = useState("received")
  const [tipsReceived, setTipsReceived] = useState([]);
  const [tipsSent, setTipsSent] = useState([])
  const [isLoading, setLoading] = useState(true)
  const { username } = useParams();



    // useEffect for fetching feed
    const fetchDaFeed = async () => {
      setLoading(true)
      const [receieved, sent ] = await Promise.all ([getUsersTipReceived(username), getUsersTipSent(username)
      ])
      if (receieved.status === 200) setTipsReceived(receieved.data)
      if (sent.status === 200) setTipsSent(sent.data)
      setLoading(false)
    }
    
    useEffect(() => {
      fetchDaFeed() 
    }, [])
    
  return {
    activeTab, setActiveTab,
    tipsSent, tipsReceived,
    isLoading
  }
}