import type { Response } from "express";

export async function defineRequest(res: Response, callback: Function){
    const status = 200
    try {
        const data = await callback()
        if( data == null) {
            res.status(204).send()
            return
        }
        res.json(data)
    } catch(e: any){
        const code = e.message == 'NOT_FOUND' ? 404 : 500
        res.status(code).json({
            message: e.message ?? 'ERROR',
            timestamp: new Date()
        })
    }
}

export function dataExists(data: any) {
    if (data == null)
        throw new Error('NOT_FOUND')
    return data
}