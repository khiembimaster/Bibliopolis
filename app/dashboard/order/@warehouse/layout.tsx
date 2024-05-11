import React, {ReactNode} from 'react'

interface Props {
  children: ReactNode;
}

const WarehouseControlLayout = ({children}: Props) => {
  return (
    <>
      {children}
    </>
  )
}

export default WarehouseControlLayout