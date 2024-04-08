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

        <v-data-table :search="busca" :headers="Cabecalhos" :items="unidadeListFormatada" sort-by="id
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
        <UnidadeAdicionarEditarComponent :dialog.sync="dialogAdionarEditar" :modo="modo" :unidade="unidade" @finalizado="acaoRealizada"/>
        <UnidadeDeleteComponent :dialog.sync="dialogDelete" :unidade="unidade" @finalizado="acaoRealizada"/>        
    </v-card>
</template>

<script>

import UnidadeDetalhesComponent from '@/components/unidade/UnidadeDetalhes.vue'
import UnidadeAdicionarEditarComponent from '@/components/unidade/UnidadeAdicionarEditar.vue'
import UnidadeDeleteComponent from '@/components/unidade/UnidadeDelete.vue'
import UnidadeService from '@/services/UnidadeService.js'
import { formatarData } from '@/utils/DataFormatter'

export default {
    name: 'UnidadesView',

    components: {
        UnidadeDetalhesComponent,
        UnidadeAdicionarEditarComponent,
        UnidadeDeleteComponent,
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
            this.buscarTodos();
        },


        acaoRealizada(mensagem, cor) {
            this.initialize()
            this.mensagemToast(mensagem, cor)
        },

        mensagemToast(mensagem, cor, timeout = 3000) {
            this.$emit('mensagemToast', mensagem, cor, timeout);
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

        buscarTodos() {
            UnidadeService.buscarTodos().then((resposta) => {
                this.unidadeList = resposta.data
            }).catch((erro) => {
                if (erro.request && !erro.response) {
                    this.mensagemToast('Erro na canexão com o servidor. Verifique se a API está em execução', 'red', 5000)
                }
            });
        }

    },

    computed: {

        unidadeListFormatada() {
        return this.unidadeList.map(unidade => ({
                    ...unidade,
                    createdAt: formatarData(unidade.createdAt),
                    updatedAt: formatarData(unidade.updatedAt),
                })
            );
        }
    },
};
</script>