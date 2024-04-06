<template>
    <v-footer dark padless app inset :elevation="2">
        <v-card class="flex" flat tile color="orange" :elevation="2">
            <v-card-text class="py-2 white--text text-center">
                {{ new Date().getFullYear() }} — <strong>Felipe S Bezerra</strong>
            </v-card-text>
        </v-card>
    </v-footer>
</template>