import React from 'react'

const CommentBox = ({text, twitterHandler}) => {
  return (
    <div className="rounded-lg border p-4 w-full">
        &quot;{text}&quot; - @{twitterHandler}
    </div>
  )
}

export default CommentBox