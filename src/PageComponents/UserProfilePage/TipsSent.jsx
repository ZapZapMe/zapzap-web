import React, { useEffect, useState } from 'react'
import FeedItem from './FeedItem';
import { getUsersTipSent } from '../../lib/utils/apiHandlers';
import { useParams } from 'react-router-dom';

const TipsSent = () => {
  const {username} = useParams()  
  const [tipsSent, setTipsSent] = useState([])
      // useEffect for fetching feed
  const fetchDaFeed = async () => {
    const sent = await getUsersTipSent(username)

    if (sent.status === 200) setTipsSent(sent.data)

  }
  
  useEffect(() => {
    fetchDaFeed() 
  }, [])

  if (tipsSent) return (
    tipsSent?.map((item, index) => (
      <FeedItem mode="sent" key={index} {...item} />
    ))
  )

  return (
    <>No tips sent yet!</>
  )
}

export default TipsSent