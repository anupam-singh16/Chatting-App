import React from 'react'

const anotherUser = ({messageList}) => {
  return (
    <div>anotherUser{messageList.map((item)=>{
        return(
            <p>{item.author}</p>
        )
    })}</div>
  )
}

export default anotherUser