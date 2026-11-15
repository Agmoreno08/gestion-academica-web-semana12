import { useState } from 'react'
import { CarreraDetalle, CarrerasTable, useCarreras } from '@/features/carreras'
import { EmptyState, ErrorState, LoadingState } from '@/shared/ui/StatusViews'

/**
 * Página contenedora: conecta el hook de datos con los componentes de presentación.
 * Estado local: id seleccionado (solo le importa a esta página).
 * Estado remoto: lista de carreras (viene del backend mediante useCarreras).
 */
export function CarrerasPage() {
    const { state, reload } = useCarreras()
    const [selectedId, setSelectedId] = useState<number | null>(null)

    return (
        <section className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">Carreras</h1>
                    <p className="text-sm text-slate-500">Datos obtenidos de GET /api/v1/carreras</p>
                </div>
                <button
                    type="button"
                    onClick={reload}
                    disabled={state.status === 'loading'}
                    className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-50 disabled:opacity-50"
                >
                    Actualizar
                </button>
            </header>

            {state.status === 'loading' && <LoadingState text="Cargando carreras…" />}
            {state.status === 'error' && <ErrorState error={state.error} onRetry={reload} />}
            {state.status === 'success' && state.data.length === 0 && (
                <EmptyState text="No hay carreras registradas todavía." />
            )}
            {state.status === 'success' && state.data.length > 0 && (
                <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                    <CarrerasTable carreras={state.data} selectedId={selectedId} onSelect={setSelectedId} />
                    {selectedId !== null && (
                        <CarreraDetalle id={selectedId} onClose={() => setSelectedId(null)} />
                    )}
                </div>
            )}
        </section>
    )
}
