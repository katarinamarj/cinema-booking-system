<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { CinemaModel } from '@/models/cinema.model';
import type { HallModel } from '@/models/hall.model';
import { CinemaService } from '@/services/cinema.service';
import { HallService } from '@/services/hall.service';
import { formatDate } from '@/utils';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const logout = useLogout()
const id = Number(route.params.id)

const hall = ref<HallModel>()
const cinema = ref<CinemaModel>()
const cinemas = ref<CinemaModel[]>()

async function loadData() {
    try {
        const hallResponse = await HallService.getHallById(id)
        hall.value = hallResponse.data

        const cinemasResponse = await CinemaService.getCinemas()
        cinemas.value = cinemasResponse.data
        cinema.value = cinemas.value?.find(c => c.cinemaId == hall.value?.cinemaId)
    } catch (e) {
        logout()
    }
}

function save() {
    HallService.updateHall(id, hall.value)
        .then(rsp => router.push(`/cinema/${hall.value?.cinemaId}/hall`))
        .catch(e => logout())
}

onMounted(() => loadData())
</script>

<template>
    <Navigation />
    <div v-if="hall && cinema && cinemas">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/">Početna</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink to="/cinema">Bioskopi</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink :to="`/cinema/${cinema.cinemaId}/hall`">
                        {{ cinema.name }} ({{ cinema.location }})
                    </RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    Izmeni
                </li>
            </ol>
        </nav>
        <h1>Izmeni Salu</h1>
        <form v-on:submit.prevent="save">
            <div class="mb-3">
                <label for="name" class="form-label">Naziv:</label>
                <input type="text" class="form-control" id="name" v-model="hall.name">
            </div>
            <div class="mb-3">
                <label for="cinema" class="form-label">Bioskop:</label>
                <select class="form-select" id="genre" v-model="hall.cinemaId">
                    <option v-for="c of cinemas" :value="c.cinemaId">
                        {{ c.name }} ({{ c.location }})
                    </option>
                </select>
            </div>
            <div class="mb-3">
                <label for="seats" class="form-label">Broj mesta:</label>
                <input type="number" class="form-control" id="seats" v-model="hall.numOfSeats">
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="dolby" v-model="hall.dolby">
                <label class="form-check-label" for="dolby">Podrška Dolby surround sound ozvučenja</label>
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="3d" v-model="hall.has3d">
                <label class="form-check-label" for="3d">Sala podžava 3D prikaz</label>
            </div>
            <div class="mb-3">
                <label for="updated" class="form-label">Izmenjeno:</label>
                <input type="text" class="form-control" id="updated"
                    :value="formatDate(hall.updatedAt ?? hall.createdAt)" disabled>
            </div>
            <button type="submit" class="btn btn-primary">
                <i class="fa-solid fa-floppy-disk"></i> Sačuvaj
            </button>
        </form>
    </div>
    <Loading v-else />
</template>