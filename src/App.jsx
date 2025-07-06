import { useState } from 'react'
import Order from './Order'

const App = () => {

  return (
    <>
      <h1>Hello GEG App!</h1>

      <Order orderNum={6252} status={'New'} />
    </>
  )
}

export default App
