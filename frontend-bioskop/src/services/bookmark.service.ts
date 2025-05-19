import { useAxios } from "@/utils";

export class BookmarkService {
    static async createBookmark(id: number) {
        return await useAxios(`/bookmark/movie/${id}`, 'post')
    }
}