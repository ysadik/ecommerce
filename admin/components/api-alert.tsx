'use client'

import { Copy, Server } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { Button } from './ui/button'
import toast from 'react-hot-toast'

interface ApiAlertProps {
  title: string
  description: string
}

export const ApiAlert: React.FC<ApiAlertProps> = ({ title, description }) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description)
    toast.success('API Route copied to the clipboard.')
  }

  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">{title}</AlertTitle>
      <AlertDescription className="mt4 flex justify-between items-center">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  )
}
