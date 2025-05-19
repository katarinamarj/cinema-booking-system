<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import type { CinemaModel } from '@/models/cinema.model';
import type { HallModel } from '@/models/hall.model';
import { CinemaService } from '@/services/cinema.service';
import { HallService } from '@/services/hall.service';
import { formatDate } from '@/utils';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import YesNo from '@/components/YesNo.vue'
import { useLogout } from '@/hooks/logout.hook';

const route = useRoute()
const logout = useLogout()
const id = Number(route.params.id)

const cinema = ref<CinemaModel>()
CinemaService.getCinemaById(id)
    .then(rsp => cinema.value = rsp.data)
    .catch(e => logout())

const halls = ref<HallModel[]>()
HallService.getHallsByCinemaId(id)
    .then(rsp => halls.value = rsp.data)
    .catch(e => logout())

function deleteHall(hall: HallModel) {
    if (!confirm(`Obrisati salu ${hall.name}?`)) return
    HallService.deleteHall(hall.hallId)
        .then(rsp => {
            halls.value = halls.value?.filter(h => h.hallId !== hall.hallId)
        })
        .catch(e => logout())
}
</script>

<template>
    <Navigation />
    <nav aria-label="breadcrumb" v-if="cinema">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <RouterLink to="/">Početna</RouterLink>
            </li>
            <li class="breadcrumb-item">
                <RouterLink to="/cinema">Bioskopi</RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                {{ cinema.name }} ({{ cinema.location }})
            </li>
        </ol>
    </nav>
    <h1>Sale</h1>
    <RouterLink :to="`/hall/new?cinema=${id}`" class="btn btn-primary">
        + Dodaj Salu
    </RouterLink>
    <table class="table table-striped table-hover" v-if="halls">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Naziv</th>
                <th scope="col">Broj mesta</th>
                <th scope="col">Dolby</th>
                <th scope="col">3D</th>
                <th scope="col">Izmenjeno</th>
                <th scope="col">Opcije</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="h of halls">
                <th scope="row">{{ h.hallId }}</th>
                <td>{{ h.name }}</td>
                <td>{{ h.numOfSeats }}</td>
                <td>
                    <YesNo :data="h.dolby" />
                </td>
                <td>
                    <YesNo :data="h.has3d" />
                </td>
                <td>{{ formatDate(h.updatedAt ?? h.createdAt) }}</td>
                <td>
                    <div class="btn-group">
                        <RouterLink :to="`/hall/${h.hallId}/projection`" class="btn btn-sm btn-primary"
                            title="Projekcije">
                            <i class="fa-solid fa-list"></i>
                        </RouterLink>
                        <RouterLink :to="`/hall/${h.hallId}`" class="btn btn-sm btn-success" title="Izmeni">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </RouterLink>
                        <button type="button" class="btn btn-sm btn-danger" @click="deleteHall(h)" title="Ukloni">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <Loading v-else />
</template>