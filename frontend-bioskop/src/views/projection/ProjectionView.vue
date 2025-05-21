<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import type { HallModel } from '@/models/hall.model';
import type { ProjectionModel } from '@/models/projection.model';
import { HallService } from '@/services/hall.service';
import { ProjectionService } from '@/services/projection.service';
import { formatDate } from '@/utils';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const id = Number(route.params.id)

const hall = ref<HallModel>()
HallService.getExpandedHallById(id)
    .then(rsp => hall.value = rsp.data)

const projections = ref<ProjectionModel[]>()
ProjectionService.getProjectionsByHallId(id)
    .then(rsp => projections.value = rsp.data)

function deleteProjection(model: ProjectionModel) {
    if (!confirm(`Obrisati projekciju ${model.movie.title} u ${formatDate(model.time)}?`)) return
    ProjectionService.deleteProjection(model.projectionId)
        .then(rsp => {
            projections.value = projections.value?.filter(p => p.projectionId !== model.projectionId)
        })
}
</script>

<template>
    <Navigation />
    <nav aria-label="breadcrumb" v-if="hall">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <RouterLink to="/">Početna</RouterLink>
            </li>
            <li class="breadcrumb-item">
                <RouterLink to="/cinema">Bioskopi</RouterLink>
            </li>
            <li class="breadcrumb-item">
                <RouterLink :to="`/cinema/${hall.cinemaId}/hall`">
                    {{ hall.cinema.name }} ({{ hall.cinema.location }})
                </RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                {{ hall.name }}
            </li>
        </ol>
    </nav>
    <h1>Projekcije</h1>
    <RouterLink :to="`/projection/new?hall=${id}`" class="btn btn-primary">
        + Dodaj Projekciju
    </RouterLink>
    <table class="table table-striped table-hover" v-if="projections">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Naziv</th>
                <th scope="col">Žanr</th>
                <th scope="col">Režiser</th>
                <th scope="col">Dužina</th>
                <th scope="col">Vreme</th>
                <th scope="col">Izmenjeno</th>
                <th scope="col">Opcije</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="p of projections">
                <th scope="row">{{ p.projectionId }}</th>
                <td>{{ p.movie.title }}</td>
                <td>{{ p.movie.movieGenres[0].genre.name }}</td>
                <td>{{ p.movie.director.name }}</td>
                <td>{{ p.movie.runTime }} min</td>
                <td>{{ formatDate(p.time) }}</td>
                <td>{{ formatDate(p.updatedAt ?? p.createdAt) }}</td>
                <td>
                    <div class="btn-group">
                        <RouterLink :to="`/projection/${p.projectionId}`" class="btn btn-sm btn-success" title="Izmeni">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </RouterLink>
                        <button type="button" class="btn btn-sm btn-danger" @click="deleteProjection(p)" title="Ukloni">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <Loading v-else />
</template>