import { clearTokens } from "@/auth"
import { useRouter } from "vue-router"

export function useLogout() {
    const router = useRouter()

    const logout = () => {
        clearTokens()
        router.push('/login')
    }

    return logout
}