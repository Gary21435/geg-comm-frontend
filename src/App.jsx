import { useState } from 'react'
import Order from './components/Order'

const App = () => {

  // You'd use useEffect to load Order data from the DB at initial App mount
  // useEffect(() => {
  //   orderService
  //     .getAll()
  //     .then(response => {
  //       setNotes(response.data)
  //     })
  //     .catch(response => console.error(response.message))
  //   }, [])

  let i = 0;

  return (
    <>
      <h1>GEG Comm</h1>

      <Order orderNum={6252} name={'Esmeralda Reyes'} status={'New'} />
    </>
  )
}

export default App
