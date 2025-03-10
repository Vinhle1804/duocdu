import { clsx, type ClassValue } from "clsx"
import { UseFormSetError } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { EntityError } from "./http"
import { toast } from "@/hooks/use-toast"
import jwt from 'jsonwebtoken'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleErrorApi = ({error, setError, duration}:{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setError: UseFormSetError<any>
  duration?: number
}) =>{
if(error instanceof EntityError && setError){
  error.payload.errors.forEach(item =>{
    setError(item.field ,{
      type: 'server',
      message: item.message
    })
  })
}else{
  toast({
    title: "lỗi",
    description: error?.payload?.message ?? 'Lỗikhông xác định',
    variant:'destructive',
    duration: duration ?? 5000

  })
}
}
/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const decodeJWT = <Payload = any>(token: string) => {
  return jwt.decode(token) as Payload
}