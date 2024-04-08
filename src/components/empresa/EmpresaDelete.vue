<template>
    <v-dialog v-model="dialogValue" max-width="600px">
        <v-card>
            <v-card-title>
                <span>Deletar Empresa</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="fecharDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            Você está preste a excluir <strong>{{ empresa.razaoSocial }}</strong>. Deseja prosseguir?
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
import EmpresaService from '@/services/EmpresaService.js'

export default {
    name: 'EmpresaDeleteComponent',

    props: {
        dialog: Boolean,
        empresa: Object,
    },
    
    methods: {
        fecharDialog() {
            this.$emit('update:dialog', false);
        },
        excluir() {
            EmpresaService.deletar(this.empresa.id).then(() => {
                this.$emit('finalizado', 'Excluida com sucesso', 'green', true);
                this.fecharDialog();
            }).catch((erro) => {
                this.$emit('finalizado', erro.response.data.message, 'red');
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