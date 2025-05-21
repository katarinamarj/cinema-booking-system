import type { MovieModel } from "@/models/movie.model";
import type { SearchModel } from "@/models/search.model";
import axios from "axios";

const client = axios.create({
    baseURL: 'https://movie.pequla.com/api',
    headers: {
        'Accept': 'application/json'
    },
    validateStatus: (status: number) => {
        return status === 200
    }
})

export class MovieService {
    static async getMovies(search: SearchModel | null=null) {
        return await client.request({
            url: '/movie',
            params: search
        })
    }

    static async getMovieByShortUrl(short: string){
       return await client.get<MovieModel>(`/movie/short/${short}`)    }

    static async getMovieById(id: number) {
        return await client.get<MovieModel>(`/movie/${id}`)
    }

    static async getActors(){
        return await client.get(`/actor`)
    }

    static async getGenres(){
        return await client.get(`/genre`)
    }

    static async getDirectors(){
        return await client.get(`/director`)
    }
}
