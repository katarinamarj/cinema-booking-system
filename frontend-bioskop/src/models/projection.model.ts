import type { MovieModel } from "./movie.model"

export interface ProjectionModel {
    projectionId: number
    movieId: number
    movie: MovieModel
    hallId: number
    time: string
    createdAt: string
    updatedAt: null | string
}