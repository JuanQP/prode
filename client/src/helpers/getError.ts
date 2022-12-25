import { AxiosError } from "axios"

export function getError(error: unknown) {
  if(error instanceof AxiosError) {
    const message = error.response?.data?.message ?? 'Ocurrió un error de conexión.'
    return { message }
  }
  else if(error instanceof Error) {
    const message = error.message ?? 'Ocurrió un error.'
    return { message }
  }

  return { message: 'Ocurrió un error.' }
}
