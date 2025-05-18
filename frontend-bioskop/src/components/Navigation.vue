<script lang="ts" setup>
import { getRefreshToken, getUserEmail } from '@/auth';
import { useLogout } from '@/hooks/logout.hook';

const logout = useLogout()
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary mb-3">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" to="/">
                PSEP 2025
            </RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/" exact-active-class="active">
                            Početna
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/list" exact-active-class="active">
                            Lista
                        </RouterLink>
                    </li>
                    <template v-if="getRefreshToken()">
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/cinema" exact-active-class="active">
                                Bioskopi
                            </RouterLink>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Korisnik
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <RouterLink class="dropdown-item" to="/user">Moj nalog</RouterLink>
                                </li>
                                <li>
                                    <button type="button" class="dropdown-item" @click="logout">Odjavi se</button>
                                </li>
                            </ul>
                        </li>
                    </template>
                    <template v-else>
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/login" exact-active-class="active">
                                Prijavi se
                            </RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/register" exact-active-class="active">
                                Registruj se
                            </RouterLink>
                        </li>
                    </template>
                </ul>
                <span class="navbar-text" v-if="getRefreshToken()">
                    <i class="fa-solid fa-user"></i> {{ getUserEmail() }}
                </span>
            </div>
        </div>
    </nav>
</template>