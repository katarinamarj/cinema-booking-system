<script lang="ts" setup>
import { setTokens } from '@/auth';
import Navigation from '@/components/Navigation.vue';
import { login } from '@/utils';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const email = ref<string>('')
const password = ref<string>('')
const route = useRoute()
const router = useRouter()

function doLogin() {
    if (email.value == '' || password.value == '') return
    login(email.value, password.value)
        .then(rsp => {
            setTokens(rsp.data)
            if (route.query.r) {
                router.push(route.query.r as string)
                return
            }

            router.push('/cinema')
        })
        .catch(e => alert('Login failed'))
}
</script>

<template>
    <Navigation />
    <div class="auth">
        <h3 class="text-center">PSEP 2025<br>PRIJAVI SE</h3>
        <form v-on:submit.prevent="doLogin">
            <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" class="form-control" id="email" v-model="email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Lozinka:</label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <div class="btn-group">
                <button type="submit" class="btn btn-primary">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Prijavi se
                </button>
                <RouterLink class="btn btn-outline-secondary" to="/register">
                    <i class="fa-solid fa-user-plus"></i> Napravi novi nalog
                </RouterLink>
            </div>
        </form>
    </div>
</template>