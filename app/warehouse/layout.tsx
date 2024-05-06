import React, {ReactNode} from 'react'

interface Props {
  children: ReactNode;
}

const WarehouseControlLayout = ({children}: Props) => {
  return (
    <>
      <main>{children}</main>
    </>
  )
}

export default WarehouseControlLayout