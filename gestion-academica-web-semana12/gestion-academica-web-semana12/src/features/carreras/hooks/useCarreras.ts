import { useCallback, useEffect, useState } from 'react'
import { carrerasApi } from '../api/carrerasApi'
import type { Carrera } from '../model/types'

type CarrerasState =
    | { status: 'loading' }
    | { status: 'success'; data: Carrera[] }
    | { status: 'error'; error: unknown }

/**
 * Consulta la lista de carreras usando useState + useEffect (ciclo de vida).
 *
 * - El efecto se ejecuta al montar el componente y cada vez que cambia `reloadKey`
 *   (botón "Reintentar"/"Actualizar"). No hay solicitudes durante el render.
 * - AbortController cancela la petición si el componente se desmonta
 *   (o en el doble montaje de StrictMode), evitando actualizar estado obsoleto.
 */
export function useCarreras() {
    const [state, setState] = useState<CarrerasState>({ status: 'loading' })
    const [reloadKey, setReloadKey] = useState(0)

    useEffect(() => {
        const controller = new AbortController()

        carrerasApi
            .list(controller.signal)
            .then((data) => setState({ status: 'success', data }))
            .catch((error: unknown) => {
                if (error instanceof DOMException && error.name === 'AbortError') return
                setState({ status: 'error', error })
            })

        return () => controller.abort()
    }, [reloadKey])

    const reload = useCallback(() => {
        setState({ status: 'loading' })
        setReloadKey((key) => key + 1)
    }, [])

    return { state, reload }
}
