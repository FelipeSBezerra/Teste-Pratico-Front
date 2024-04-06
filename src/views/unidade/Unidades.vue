<template>
    <v-card color="grey lighten-5" :elevation="3" class="pa-4">
        <v-card-title>
            <div class="d-flex justify-space-between" style="width: 100%;">
                <span>Unidades</span>
                <v-btn class="success" @click="preparaAdicionar()">Adicionar</v-btn>
            </div>
        </v-card-title>
        <v-card-subtitle> Consultar </v-card-subtitle>
        <v-divider class="mx-4"></v-divider>

        <v-data-table :search="busca" :headers="Cabecalhos" :items="unidadeList" sort-by="id
        " class="elevation-2 mt-4">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title style="width: 100%;">
                        <v-text-field color="orange" v-model="busca" append-icon="mdi-magnify" label="Buscar" single-line
                            hide-details>
                        </v-text-field>
                    </v-toolbar-title>
                </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="preparaEditar(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small class="mr-2" @click="preparaDetalhes(item)">
                    mdi-eye
                </v-icon>
                <v-icon color="red lighten-2" small @click="preparaDelete(item)">
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                    Reset
                </v-btn>
            </template>
        </v-data-table>

        <UnidadeDetalhesComponent :dialog.sync="dialogDetalhes" :unidade="unidade"/>
        <UnidadeAdicionarEditarComponent :dialog.sync="dialogAdionarEditar" :modo="modo" :unidade="unidade"/>
        <UnidadeDeleteComponent :dialog.sync="dialogDelete" :unidade="unidade"/>
        
    </v-card>
</template>

<script>

import UnidadeDetalhesComponent from '@/components/unidade/UnidadeDetalhes.vue'
import UnidadeAdicionarEditarComponent from '@/components/unidade/UnidadeAdicionarEditar.vue'
import UnidadeDeleteComponent from '@/components/unidade/UnidadeDelete.vue'
import { getData } from '@/services/dataService.js';
export default {
    name: 'UnidadesView',

    components: {
        UnidadeDetalhesComponent,
        UnidadeAdicionarEditarComponent,
        UnidadeDeleteComponent
    },

    data() {
        return {
            dialogAdionarEditar: false,
            dialogDetalhes: false,
            dialogDelete: false,
            modo: 'Adicionar',
            busca: '',
            Cabecalhos: [
                {
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                },
                { text: 'Nome', value: 'nome' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            unidadeList: [],
            unidade: {},
        }
    },
    created() {
        this.initialize();
    },

    methods: {
        initialize() {
            getData().then((data) => {
                this.unidadeList = data;
            });
        },

        preparaAdicionar() {
            this.modo = 'Adicionar';
            this.dialogAdionarEditar = true;
            this.unidade = {};
        },

        preparaEditar(item) {
            this.modo = 'Editar'
            this.dialogAdionarEditar = true;
            this.unidade = item;
        },

        preparaDetalhes(item) {
            this.dialogDetalhes = true;
            this.unidade = item;
        },

        preparaDelete(item) {
            this.dialogDelete = true;
            this.unidade = item;
        },

    }
};
</script>