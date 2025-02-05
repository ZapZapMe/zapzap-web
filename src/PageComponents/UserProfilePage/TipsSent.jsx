import React from 'react'
import FeedItem from './FeedItem';

import FeedItemSkeleton from '../../components/ui/LoadingSkeleton/FeedItemSkeleton';

const TipsSent = ({data, isLoading}) => {
  // const {username} = useParams()  
  // const [tipsSent, setTipsSent] = useState([])
  //     // useEffect for fetching feed
  // const fetchDaFeed = async () => {
  //   const sent = await getUsersTipSent(username)

  //   if (sent.status === 200) setTipsSent(sent.data)

  // }
  
  // useEffect(() => {
  //   fetchDaFeed() 
  // }, [])
  if (isLoading) return [...Array(3)].map((_, index) => <FeedItemSkeleton key={index} />)

  if (data) return (
    data?.map((item, index) => (
      <FeedItem mode="sent" key={index} {...item} />
    ))
  )

  return (
    <>No tips sent yet!</>
  )
}

export default TipsSent
