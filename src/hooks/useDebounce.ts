import { useEffect, useState } from "react";

// INFO: 防抖
// MARK: 防抖
function useDebounce<T>(value: T, delay?:number):T {
  const [debouncedValue,setDebouncedValue] = useState<T>(value)

  //NOTE: 防抖：只有在输入停止后的 500ms 后才会更新
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    },delay || 500)

    //NOTE: 如果用户在 500ms 内继续输入，清除之前的 timeout
    return () => {
      clearTimeout(timer)
    }
  },[value ,delay])

  return debouncedValue
}

export default useDebounce;