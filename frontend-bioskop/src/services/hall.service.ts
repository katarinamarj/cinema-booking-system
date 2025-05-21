import { useAxios } from "@/utils";

export class HallService {
    static async getHalls() {
        return await useAxios('/hall')
    }

    static async getHallsByCinemaId(id: number) {
        return await useAxios(`/cinema/${id}/hall`)
    }

    static async getHallById(id: number) {
        return await useAxios(`/hall/${id}`)
    }

    static async getExpandedHallById(id: number) {
        return await useAxios(`/hall/${id}/expanded`)
    }

    static async createHall(model: any) {
        return await useAxios('/hall', 'post', model)
    }

    static async updateHall(id: number, model: any) {
        return await useAxios(`/hall/${id}`, 'put', model)
    }

    static async deleteHall(id: number) {
        return await useAxios(`/hall/${id}`, 'delete')
    }
}