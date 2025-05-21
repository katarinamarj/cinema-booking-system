<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { HallModel } from '@/models/hall.model';
import type { MovieModel } from '@/models/movie.model';
import type { ProjectionModel } from '@/models/projection.model';
import { HallService } from '@/services/hall.service';
import { MovieService } from '@/services/movie.service';
import { ProjectionService } from '@/services/projection.service';
import { formatDate, toLocalDatetimeInputString } from '@/utils';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const logout = useLogout()
const id = Number(route.params.id)

const projection = ref<ProjectionModel>()
const movies = ref<MovieModel[]>()
const hall = ref<HallModel>()
const halls = ref<HallModel[]>()
const time = ref<string>()

async function loadData() {
    try {
        const projectionResponse = await ProjectionService.getProjectionById(id)
        projection.value = projectionResponse.data
        time.value = toLocalDatetimeInputString(projection.value!.time)

        const moviesResponse = await MovieService.getMovies()
        movies.value = moviesResponse.data

        const hallResponse = await HallService.getExpandedHallById(projection.value!.hallId)
        hall.value = hallResponse.data

        const hallsResponse = await HallService.getHallsByCinemaId(hall.value!.cinemaId)
        halls.value = hallsResponse.data
    } catch (e) {
        logout()
    }
}

function save() {
    projection.value!.time = time.value!
    ProjectionService.updateProjection(id, projection.value)
        .then(rsp => router.push(`/hall/${hall.value!.hallId}/projection`))
        .catch(e => logout())
}

onMounted(() => loadData())
</script>

<template>
    <Navigation />
    <div v-if="projection && hall && movies && halls">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/">Početna</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink to="/cinema">Bioskopi</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink :to="`/cinema/${hall.cinema.cinemaId}/hall`">
                        {{ hall.cinema.name }} ({{ hall.cinema.location }})
                    </RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink :to="`/cinema/${hall.cinema.cinemaId}/hall/${hall.hallId}`">
                        {{ hall.name }}
                    </RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    Izmeni
                </li>
            </ol>
        </nav>
        <h1>Izmeni Projekciju</h1>
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
                        {{ h.name }}
                    </option>
                </select>
            </div>
            <div class="mb-3">
                <label for="time" class="form-label">Vreme:</label>
                <input type="datetime-local" class="form-control" id="time" v-model="time">
            </div>
            <div class="mb-3">
                <label for="updated" class="form-label">Izmenjeno:</label>
                <input type="text" class="form-control" id="updated"
                    :value="formatDate(projection.updatedAt ?? projection.createdAt)" disabled>
            </div>
            <button type="submit" class="btn btn-primary">
                <i class="fa-solid fa-floppy-disk"></i> Sačuvaj
            </button>
        </form>
    </div>
    <Loading v-else />
</template>