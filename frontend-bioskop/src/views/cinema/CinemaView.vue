<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { CinemaModel } from '@/models/cinema.model';
import { CinemaService } from '@/services/cinema.service';
import { formatDate } from '@/utils';
import { ref } from 'vue';

const cinemas = ref<CinemaModel[]>()
const logout = useLogout()

CinemaService.getCinemas()
    .then(rsp => {
        cinemas.value = rsp.data
    })
    .catch((e) => logout())

function deleteCinema(id: number) {
    CinemaService.deleteCinemaById(id)
        .then(rsp => {
            cinemas.value = cinemas.value?.filter(c => c.cinemaId !== id)
        })
        .catch((e) => logout())
}
</script>

<template>
    <Navigation />
    <h1>Bioskopi</h1>
    <RouterLink to="/cinema/new" class="btn btn-primary">
        + Dodaj Bioskop
    </RouterLink>
    <table class="table table-striped table-hover" v-if="cinemas">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Naziv</th>
                <th scope="col">Lokacija</th>
                <th scope="col">Izmenjeno</th>
                <th scope="col">Opcije</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="c of cinemas">
                <th scope="row">{{ c.cinemaId }}</th>
                <td>{{ c.name }}</td>
                <td>{{ c.location }}</td>
                <td>{{ formatDate(c.updatedAt ?? c.createdAt) }}</td>
                <td>
                    <div class="btn-group">
                        <RouterLink :to="`/cinema/${c.cinemaId}/hall`" class="btn btn-sm btn-primary" title="Sale">
                            <i class="fa-solid fa-list"></i>
                        </RouterLink>
                        <RouterLink :to="`/cinema/${c.cinemaId}`" class="btn btn-sm btn-success">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </RouterLink>
                        <button type="button" class="btn btn-sm btn-danger" @click="deleteCinema(c.cinemaId)">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <Loading v-else />
</template>