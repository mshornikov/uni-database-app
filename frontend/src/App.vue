<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <header>
        <nav>
            <RouterLink to="/doctors" active-class="active">Врачи</RouterLink>
            <RouterLink to="/patients" active-class="active"
                >Пациенты</RouterLink
            >
            <RouterLink to="/rooms" active-class="active">Кабинеты</RouterLink>
            <RouterLink to="/visits" active-class="active"
                >Посещения</RouterLink
            >
            <RouterLink to="/services" active-class="active">Услуги</RouterLink>
            <RouterLink to="/service-lists" active-class="active"
                >Списки услуг</RouterLink
            >
        </nav>
    </header>
    <main>
        <RouterView></RouterView>
    </main>
</template>

<style>
* {
    font-family: sans-serif;
}

main {
    max-width: 500px;
    margin-inline: auto;
    padding-top: 30px;
    padding-bottom: 60px;
}

nav {
    display: flex;
    gap: 5px;
}

a {
    text-decoration: none;
    color: white;
    background-color: darkcyan;
    padding: 10px;
    padding-bottom: 9px;
    border-radius: 5px;
}

header {
    display: grid;
    place-items: center;
}

.active {
    background-color: dodgerblue;
}
</style>
