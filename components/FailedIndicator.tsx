"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const FailedIndicator = () => {
  return (
    <div className="w-full space-y-4 text-center py-12">
      <span className="flex gap-1 justify-center text-center animate-bounce">
        <X /> <p>Gagal mengambil data! Silahkan reload</p>
      </span>
      <Button
        variant="outline"
        onClick={() => window.location.reload()}
      >
        Reload
      </Button>
    </div>
  )
}

export default FailedIndicator;