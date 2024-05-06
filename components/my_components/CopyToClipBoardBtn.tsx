'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Copy, CopyCheck } from 'lucide-react'

interface Props{
  orderId: string
}

const CopyToClipBoardBtn = (data: Props) => {
  const [isCopied, setIsCopied] = useState(false);
  
  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => {
        navigator.clipboard.writeText(data.orderId);
        setIsCopied(true);
      }}
      className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
    >
      {isCopied ? <CopyCheck className="h-3 w-3"/> : <Copy className="h-3 w-3" />}
      <span className="sr-only">Copy Order ID</span>
    </Button>
  )
}

export default CopyToClipBoardBtn