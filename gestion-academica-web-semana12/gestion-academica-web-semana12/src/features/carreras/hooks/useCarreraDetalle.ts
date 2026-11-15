import { useEffect, useState } from 'react'
import { carrerasApi } from '../api/carrerasApi'
import type { Carrera } from '../model/types'

type DetalleResult = { id: number; data?: Carrera; error?: unknown }

/**
 * Opción A de la guía: consultar el detalle (GET /carreras/{id}) al seleccionar un registro.
 * El resultado se guarda junto con el id al que pertenece; si el id seleccionado
 * cambia, la vista sabe que está cargando sin necesidad de un setState síncrono en el efecto.
 */
export function useCarreraDetalle(id: number | null) {
    const [result, setResult] = useState<DetalleResult | null>(null)

    useEffect(() => {
        if (id === null) return
        const controller = new AbortController()

        carrerasApi
            .getById(id, controller.signal)
            .then((data) => setResult({ id, data }))
            .catch((error: unknown) => {
                if (error instanceof DOMException && error.name === 'AbortError') return
                setResult({ id, error })
            })

        return () => controller.abort()
    }, [id])

    const current = result && result.id === id ? result : null
    return {
        carrera: current?.data,
        error: current?.error,
        isLoading: id !== null && current === null,
    }
}
