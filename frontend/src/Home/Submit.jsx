import React from 'react'

const Submit = () => {
  return (
    <div className='flex'>
        <div>
            <h1>Game Entry</h1> <br />
        </div>
        <div>
            <form id="formed" onsubmit="update()" target="update">
                <input type="text" id="title" /><br />

                <label for="slider">Priority: </label>
                <input type='range' id="slider" /><br />

                <input type="submit" value="Submit" />
            </form>
        </div>
    </div>
  )
}

export default Submit