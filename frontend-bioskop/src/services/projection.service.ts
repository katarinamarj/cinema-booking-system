import { useAxios } from "@/utils";

export class ProjectionService {
    static async getProjectionsByHallId(id: number) {
        return await useAxios(`/hall/${id}/projection`)
    }

    static async getProjectionById(id: number) {
        return await useAxios(`/projection/${id}`)
    }

    static async createProjection(model: any) {
        return await useAxios('/projection', 'post', model)
    }

    static async updateProjection(id: number, model: any) {
        return await useAxios(`/projection/${id}`, 'put', model)
    }

    static async deleteProjection(id: number) {
        return await useAxios(`/projection/${id}`, 'delete')
    }
}