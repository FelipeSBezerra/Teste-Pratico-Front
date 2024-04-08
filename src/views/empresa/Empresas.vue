<template>
  <v-card color="grey lighten-5" :elevation="3" class="pa-4">
    <v-card-title> Empresas </v-card-title>
    <v-card-subtitle> Consultar </v-card-subtitle>
    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <div>
        <v-form ref="form">

          <v-row>
            <v-col cols="12" sm="6" md="3">
              <v-text-field color="orange" v-model="parametros.razaoSocial" label="Razão Social" filled></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-text-field color="orange" v-mask="'##.###.###/####-##'" v-model="parametros.cnpj" label="CNPJ" filled></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-text-field color="orange" v-model="parametros.bairro" label="Bairro" filled></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-text-field color="orange" v-mask="'#####-###'" v-model="parametros.cep" label="CEP" filled></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="4" class="text-left">
              <v-btn color="success" class="mr-4" @click="buscarTodosComParametros">
                <v-icon class="mr-1">mdi-magnify</v-icon>Consultar
              </v-btn>

              <v-btn color="secondary" @click="reset" outlined>
                <v-icon class="mr-1">mdi-backspace-reverse</v-icon>Limpar Parâmetros
              </v-btn>
            </v-col>

            <v-col cols="12" sm="6" md="8" class="text-right">
              <v-btn class="success" to="/empresa">Adicionar</v-btn>
            </v-col>
          </v-row>

        </v-form>
      </div>
    </v-card-text>

    <v-data-table :search="busca" :headers="Cabecalhos" :items="empresaListFormatada" sort-by="id" :sort-desc="true"
        class="elevation-2">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="width: 100%;">
            <v-text-field color="dark" v-model="busca" append-icon="mdi-magnify" label="Buscar entre os dados do resultado" single-line
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
        <h1>{{ mensagemTabela }}</h1>
      </template>
    </v-data-table>
    <EmpresaDeleteComponent :dialog.sync="dialogDelete" :empresa="empresa" @finalizado="acaoRealizada"/>
    <EmpresaDetalhesComponent :dialog.sync="dialogDetalhes" :empresa="empresa"/>
  </v-card>
</template>

<script>

import EmpresaService from '@/services/EmpresaService'
import EmpresaDeleteComponent from '@/components/empresa/EmpresaDelete.vue'
import EmpresaDetalhesComponent from '@/components/empresa/EmpresaDetalhes.vue'
import { formatarData } from '@/utils/DataFormatter'
export default {
  name: 'EmpresasView',

  components: {
    EmpresaDeleteComponent,
    EmpresaDetalhesComponent
  },

  data: () => ({
    dialogDetalhes: false,
    dialogDelete: false,
    busca: '',
    mensagemTabela: 'Efetue a consulta',
    Cabecalhos: [
      {
        text: 'ID',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'CNPJ', value: 'cnpj', sortable: false },
      { text: 'Razão Social', value: 'razaoSocial' },
      { text: 'Telefone', value: 'telefone' },
      { text: 'Email', value: 'email' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    parametros: {},
    parametroUltimaBusca: {},
    empresaList: [],
    empresa: {},
  }),

  created() {
  },

  methods: {
    reset() {
      this.$refs.form.reset()
    },

    buscarTodosComParametros() {
      this.parametroUltimaBusca = this.parametros
      EmpresaService.buscarTodos(this.parametros).then((resposta) => {
        this.empresaList = resposta.data;
        if (this.empresaList.length == 0) {
          this.mensagemTabela = 'Nenhum resultado para a busca'
        }
      })
    },

    acaoRealizada(mensagem, cor, atualizarlista) {
        if (atualizarlista) {
          this.parametros = {...this.parametroUltimaBusca}
          this.buscarTodosComParametros()
        }
        this.mensagemToast(mensagem, cor)
    },

    mensagemToast(mensagem, cor, timeout = 3000) {
        this.$emit('mensagemToast', mensagem, cor, timeout);
    },

    preparaEditar(item) {
      this.$router.push(`/empresa/${item.id}`);
    },

    preparaDetalhes(item) {
      this.dialogDetalhes = true;
      this.empresa = item
    },

    preparaDelete(item) {
      this.dialogDelete = true;
      this.empresa = item
    },
  },

  computed: {

    empresaListFormatada() {
    return this.empresaList.map(empresa => ({
          ...empresa,
          createdAt: formatarData(empresa.createdAt),
          updatedAt: formatarData(empresa.updatedAt),
        })
      );
    }
  },
};
</script>