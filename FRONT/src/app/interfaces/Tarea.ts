export interface Tarea{
    ok: boolean
    error: string
    statusCode: number
    id: string
    texto: string
    terminada: boolean
    activa: boolean
    fecha?: string
    fechaAlta: Date
}