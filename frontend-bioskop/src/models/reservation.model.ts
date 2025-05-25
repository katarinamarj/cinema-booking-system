import type { ProjectionModel } from "./projection.model"

export interface ReservationModel {
    reservationId: number
    projectionid: number
    projection: ProjectionModel
    watchedAt: null | string
    rating: null | number
    comment: null | string
    createdAt: string
    updatedAt: string
}