<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { HallModel } from '@/models/hall.model';
import type { MovieModel } from '@/models/movie.model';
import { HallService } from '@/services/hall.service';
import { MovieService } from '@/services/movie.service';
import { ProjectionService } from '@/services/projection.service';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const logout = useLogout()
const id = Number(route.query.hall)

const projection = ref({
    movieId: 0,
    hallId: id ?? 0,
    time: new Date().toISOString().slice(0, 16)
})
const movies = ref<MovieModel[]>()
const halls = ref<HallModel[]>()

async function loadData() {
    try {
        const moviesResponse = await MovieService.getMovies()
        projection.value.movieId = moviesResponse.data[0].movieId
        movies.value = moviesResponse.data

        const hallsResponse = await HallService.getHalls()
        if (isNaN(id)) {
            projection.value.hallId = hallsResponse.data[0].hallId
        }
        halls.value = hallsResponse.data
    } catch (e) {
        logout()
    }
}

function save() {
    ProjectionService.createProjection(projection.value)
        .then(rsp => router.push(`/hall/${projection.value.hallId}/projection`))
        .catch(e => logout())
}

onMounted(() => loadData())
</script>

<template>
    <Navigation />
    <div v-if="movies && halls">
        <h1>Nova Projekcija</h1>
        <form v-on:submit.prevent="save">
            <div class="mb-3">
                <label for="movie" class="form-label">Film:</label>
                <select class="form-select" id="movie" v-model="projection.movieId">
                    <option v-for="m of movies" :value="m.movieId">
                        {{ m.title }}
                    </option>
                </select>
            </div>
            <div class="mb-3">
                <label for="hall" class="form-label">Sala:</label>
                <select class="form-select" id="hall" v-model="projection.hallId">
                    <option v-for="h of halls" :value="h.hallId">
                        {{ h.name }} [Bioskop: {{ h.cinema.name }} ({{ h.cinema.location }})]
                    </option>
                </select>
            </div>
            <div class="mb-3">
                <label for="time" class="form-label">Vreme:</label>
                <input type="datetime-local" class="form-control" id="time" v-model="projection.time">
            </div>
            <button type="submit" class="btn btn-primary">
                <i class="fa-solid fa-floppy-disk"></i> Sačuvaj
            </button>
        </form>
    </div>
    <Loading v-else />
</template>