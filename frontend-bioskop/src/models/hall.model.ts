export interface HallModel {
    hallId: number
    cinemaId: number
    name: string
    numOfSeats: number
    dolby: boolean
    has3d: boolean
    createdAt: string
    updatedAt: null | string
}