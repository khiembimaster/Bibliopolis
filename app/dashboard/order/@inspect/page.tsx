import React from 'react'

interface Props {
  searchParams: {orderId: string}
}

const Inspect = ({searchParams: {orderId}}:Props) => {

  return (
    <div>Inspecting {orderId}</div>
  )
}

export default Inspect