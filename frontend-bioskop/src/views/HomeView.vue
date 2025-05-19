<script setup lang="ts">
import type { DirectorModel } from '@/models/director.model';
import type { MovieModel } from '@/models/movie.model';
import { MovieService } from '@/services/movie.service';
import { ref } from 'vue';
import type { ActorModel } from '@/models/actor.model';
import type { GenreModel } from '@/models/genre.model';
import type { SearchModel } from '@/models/search.model';
import Navigation from '@/components/Navigation.vue';
import { useRouter } from 'vue-router';
import { BookmarkService } from '@/services/bookmark.service';
import { getRefreshToken } from '@/auth';
import Loading from '@/components/Loading.vue';

const actors = ref<ActorModel[]>()
const genres = ref<GenreModel[]>()
const directors = ref<DirectorModel[]>()
const search = ref<SearchModel>({
    actor: 0,
    genre: 0,
    director: 0
})

MovieService.getActors()
    .then(rsp => actors.value = rsp.data)

MovieService.getGenres()
   .then(rsp =>genres.value = rsp.data)

MovieService.getDirectors()
   .then(rsp =>directors.value = rsp.data)

const movies = ref<MovieModel[]>()
function loadMovies(){
    MovieService.getMovies(search.value)
    .then(rsp => movies.value = rsp.data)
}

const router = useRouter()
function addBookmark(movie: MovieModel) {
    if (!confirm(`Dodaj ${movie.title} u sačuvane?`)) return
    BookmarkService.createBookmark(movie.movieId)
        .then(rsp => router.push('/user'))
        .catch(e => alert(e.message))
}

loadMovies()
</script>

<template>
    <Navigation/>
    <h1>Praktikum Sistemi E-Poslovanja</h1>
    <p>Odabran glumac: {{ search.actor }}, zanr {{ search.genre }}</p>
    <div class="row ">
        <div class="col-12 col-md-4 mb-3" v-if="actors">
            <select class="form-select" v-model="search.actor" @change="loadMovies">
                <option :value="0">Odaberite glumca/icu</option>
                <option v-for="a of actors" :value="a.actorId">{{ a.name }}</option>
            </select>
        </div>
        <div class="col-12 col-md-4 mb-3" v-if="genres">
            <select class="form-select" v-model="search.genre" @change="loadMovies">
                <option :value="0">Odaberite zanr</option>
                <option v-for="g of genres" :value="g.genreId">{{ g.name }}</option>
            </select>
        </div>
        <div class="col-12 col-md-4 mb-3" v-if="directors">
            <select class="form-select" v-model="search.director" @change="loadMovies">
                <option :value="0">Odaberite rezisera</option>
                <option v-for="d of directors" :value="d.directorId">{{ d.name }}</option>
            </select>
        </div>
    </div>
    <div class="card-holder" v-if="movies && movies.length > 0">
        <div class="card movie-card" v-for="m of movies" :key="m.movieId">
            <img :src="m.poster" class="card-img-top" :alt="m.title">
            <div class="card-body">
                <h5 class="card-title">{{ m.title }}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">{{ m.director.name }}</h6>
                <p class="card-text">{{ m.shortDescription }}</p>
            </div>
            <div class="card-footer">
                <div class="btn-group">
                    <RouterLink :to="`/movie/${m.shortUrl}`" class="btn btn-sm btn-outline-primary">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i> Detalji
                    </RouterLink>
                    <button type="button" class="btn btn-sm btn-outline-secondary" v-if="getRefreshToken()"
                        @click="addBookmark(m)">
                        <i class="fa-solid fa-bookmark"></i> Sačuvaj
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="text-center" v-else-if="movies"> 
        Nije pronadjen nijedan film
    </div>
    <div class="text-center" v-else>
        Podaci se učitavaju...
    </div>
    <Loading v-else />
</template>

<style>
.card-holder {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}

.movie-card {
    width: 18rem;
    min-height: 200px;
}
</style>