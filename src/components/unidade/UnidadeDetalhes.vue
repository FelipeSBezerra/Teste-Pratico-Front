<template>
    <v-dialog v-model="dialogValue" max-width="600px">
        <v-card>
            <v-card-title>
                <span>Detalhes Unidade</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="fecharDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <strong>Id:</strong> {{ unidadeLocal.id }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <strong>Nome:</strong> {{ unidadeLocal.nome }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <strong>Criado em:</strong> {{ unidadeLocal.createdAt }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <strong>Ultima atualização:</strong> {{ unidadeLocal.updatedAt }}
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-1" text @click="fecharDialog">Voltar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'UnidadeDetalhesComponent',
    data() {
        return {
            unidadeLocal: { ...this.unidade },
        };
    },
    props: {
        dialog: Boolean,
        unidade: Object,
    },
    methods: {
        fecharDialog() {
            this.$emit('update:dialog', false);
        },
        salvar() {
            // Lógica para salvar a unidade
            this.fecharDialog();
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