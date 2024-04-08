<template>
  <v-card color="grey lighten-5" :elevation="3" class="pa-4">
    <v-card-title> Leilões </v-card-title>
    <v-card-subtitle> Consultar </v-card-subtitle>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <div>
        <v-form ref="form">
          <v-row>
            <v-col cols="12">
              <v-text-field color="orange" v-model="parametros.razaoSocialVendedor" label="Razão Social Vendedor" filled></v-text-field>
            </v-col>

            <v-col cols="12" xm="6" class="text-left">
              <v-btn color="success" class="mr-4" @click="buscarTodosComParametros">
                <v-icon class="mr-1">mdi-magnify</v-icon>Consultar
              </v-btn>

              <v-btn color="secondary" @click="reset" outlined>
                <v-icon class="mr-1">mdi-backspace-reverse</v-icon>Limpar campo
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </v-card-text>
    <v-data-table :search="busca" :headers="Cabecalhos" :items="leilaoListFormatada" sort-by="id
        " class="elevation-2">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="width: 100%;">
            <v-text-field color="dark" v-model="busca" append-icon="mdi-magnify" label="Buscar entre os dados do resultado" single-line
              hide-details>
            </v-text-field>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:no-data>
        <h1>{{ mensagemTabela }}</h1>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import LeilaoService from '@/services/LeilaoService'
import { formatarData } from '@/utils/DataFormatter'
export default {
  name: 'LeiloesView',

  components: {
  },

  data: () => ({
    busca: '',
    mensagemTabela: 'Efetue a consulta',
    Cabecalhos: [
      {
        text: 'ID',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'Razão Social Vendedor', value: 'vendedor.razaoSocial' },
      { text: 'Início previsto', value: 'inicioPrevisto' },
      { text: 'Valor Total', value: 'valorTotal' },
    ],
    parametros: {},
    leilaoList: [],
  }),

  methods: {

    buscarTodosComParametros() {
      LeilaoService.buscarTodos(this.parametros).then((resposta) => {
        this.leilaoList = resposta.data;
        if (this.leilaoList.length == 0) {
          this.mensagemTabela = 'Nenhum resultado para a busca'
        }
      })
    },

    reset() {
      this.$refs.form.reset()
    },
  },

  computed: {
    leilaoListFormatada() {
      return this.leilaoList.map(leilao => ({
        ...leilao,
        inicioPrevisto: formatarData(leilao.inicioPrevisto),
        valorTotal: leilao.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      }));
    }
  },
};
</script>