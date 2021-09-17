import {useCallback, useState} from "react"

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null as null | string)

  const request = useCallback(
    async (url, method='GET', body = null, headers= {}) => {

      setIsLoading(true)

      try {
        if ( body ) {
          body = JSON.stringify(body)
          headers['Content-Type'] = 'application/json'
          console.log(body)
        }

        const response = await fetch(url, {method, body, headers})
        const data = await response.json()

        if (!response.ok) {
          throw new Error (data.message || 'Что-то пошло не так, попробуйте снова...')
        }

        setIsLoading(false)

        return data
      } catch (e) {
        setIsLoading(false)
        setError(e.message)
        throw e
      }

  }, [])

  const clearError = useCallback(() => setError(null), [])

  return {isLoading, request, clearError, error}

}