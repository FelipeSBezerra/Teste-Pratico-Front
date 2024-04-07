<template>
    <v-dialog v-model="dialogValue" max-width="600px">
        <v-card>
            <v-card-title>
                <span>Detalhes Empresa</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="fecharDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <strong>Id:</strong> {{ empresa.id }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <strong>Nome:</strong> {{ empresa.razaoSocial }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <strong>CNPJ:</strong> {{ empresa.cnpj }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <strong>Logradouro:</strong> {{ empresa.logradouro }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <strong>Número:</strong> {{ empresa.numero }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <strong>Complemento:</strong> {{ empresa.complemento }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <strong>Bairro:</strong> {{ empresa.bairro }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <strong>CEP:</strong> {{ empresa.cep }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <strong>Telefone:</strong> {{ empresa.telefone }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <strong>Email:</strong> {{ empresa.email }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <strong>Site:</strong> {{ empresa.site }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <strong>Usuário:</strong> {{ empresa.usuario }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <strong>Criado em:</strong> {{ empresa.createdAt }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <strong>Ultima atualização:</strong> {{ empresa.updatedAt }}
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
    name: 'EmpresaDetalhesComponent',
    
    props: {
        dialog: Boolean,
        empresa: Object,
    },
    methods: {
        fecharDialog() {
            this.$emit('update:dialog', false);
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