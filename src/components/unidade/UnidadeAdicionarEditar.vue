<template>
    <v-dialog v-model="dialogValue" max-width="600px">
        <v-card>
            <v-card-title>
                <span>{{ modo }} Unidade</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="fecharDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field ref="nome" color="orange" label="Nome"  placeholder="nome" v-model="unidadeLocal.nome"
                                hint="nome para unidade" :rules="[v => !!v || 'Campo obrigatório']"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="fecharDialog">Cancelar</v-btn>
                <v-btn color="green darken-3" text @click="salvar" :disabled="!unidadeLocal.nome || unidadeLocal.nome.length === 0">Salvar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import UnidadeService from '@/services/UnidadeService.js'

export default {
    name: 'UnidadeAdicionarEditarComponent',
    data() {
        return {
            unidadeLocal: { ...this.unidade },
        };
    },
    props: {
        dialog: Boolean,
        modo: {
            type: String,
            validator: function(value) {
                return ['Adicionar', 'Editar'].includes(value);
            },
            default: 'Adicionar',
        },
        unidade: Object,
    },
    methods: {
        fecharDialog() {
            this.unidadeLocal = {};
            this.$refs.nome.resetValidation();
            this.$emit('update:dialog', false);
        },
        salvar() {
            let unidade = {nome: this.unidadeLocal.nome}

            if (this.modo == 'Adicionar') {
                UnidadeService.salvar(unidade).then(() => {
                    this.$emit('finalizado');
                    this.fecharDialog();
                })
                } else {
                    UnidadeService.atualizar(this.unidadeLocal.id ,unidade).then(() => {
                        this.$emit('finalizado');
                        this.fecharDialog();
                    })
                } 
        },
    },
    computed: {
        dialogValue: {
            get() {
                return this.dialog;
            },
            set(value) {
                this.$emit('update:dialog', value);
            },
        },
    },
    watch: {
        unidade: {
            immediate: true,
            handler(value) {
                this.unidadeLocal = { ...value };
            },
        },
    },
};
</script>