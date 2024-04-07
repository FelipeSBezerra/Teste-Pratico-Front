<template>
    <v-dialog v-model="dialogValue" max-width="600px">
        <v-card>
            <v-card-title>
                <span>Deletar Unidade</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="fecharDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            Você está preste a excluir <strong>{{ unidade.nome }}</strong>. Deseja prosseguir?
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="excluir">Excluir</v-btn>
                <v-btn color="grey darken-3" text @click="fecharDialog">Voltar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import UnidadeService from '@/services/UnidadeService.js'

export default {
    name: 'UnidadeDeleteComponent',

    props: {
        dialog: Boolean,
        unidade: Object,
    },
    
    methods: {
        fecharDialog() {
            this.$emit('update:dialog', false);
        },
        excluir() {
            UnidadeService.deletar(this.unidade.id).then(() => {
                this.$emit('finalizado', 'Excluido com sucesso', 'green');
                this.fecharDialog();
            })
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
};
</script>