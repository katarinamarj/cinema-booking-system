import { useAxios } from "@/utils";

export class ReservationService {

    static async getReservations() {
        return await useAxios('/reservation')
    }

    static async getReservationOptionsByMovieShortUrl(link: string) {
        return await useAxios('/projection/movie/' + link)
    }

    static async createReservation(model: any) {
        return await useAxios('/reservation', 'post', model)
    }

    static async deleteReservation(id: number) {
       return await useAxios(`/reservation/${id}`, 'delete');
    }

}