import axios from "axios";

export class CinemaService {
    static async getCinemas(){
        return await axios.get('http://localhost:3000/api/cinema')
    }
}