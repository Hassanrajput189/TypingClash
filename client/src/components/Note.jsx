import React from 'react'

const Note = () => {
  return (
    <div className='pl-6 w-[15vw] font-bold'>
        <p className='text-xl pb-2'>Instructions</p>
      <ol className=" flex flex-col gap-4  list-decimal text-sm ">
            <li>Enter any name for the room and join the room</li>
            <li>Make others to join with the same name that you entered for the room</li>
            <li>Cannot start typing in the room with just one player</li>
          </ol>
    </div>
  )
}

export default Note
