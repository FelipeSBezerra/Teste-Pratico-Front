<template>
    <v-card color="grey lighten-5" :elevation="3" class="pa-4">
      <v-card-title> Empresa </v-card-title>
      <v-card-subtitle> {{ subtitulo }} </v-card-subtitle>
      <v-divider class="mx-4"></v-divider>
  
      <v-card-text>
        <div>
          <v-form ref="form" v-model="valid" lazy-validation>
  
            <v-row>
              <v-col cols="12" sm="12" md="9">
                <v-text-field required color="orange" v-model="empresa.razaoSocial" label="Razão Social" filled
                  :counter="64" maxlength="64" :rules="[rules.required, rules.min]"></v-text-field>
              </v-col>
  
              <v-col cols="12" sm="12" md="3">
                <v-text-field required v-mask="'##.###.###/####-##'" :rules="[rules.required, rules.cnpj]" :counter="18" color="orange"
                  v-model="empresa.cnpj" label="CNPJ" filled></v-text-field>
              </v-col>
  
              <v-col cols="12" sm="8" md="6">
                <v-text-field color="orange" v-model="empresa.logradouro" label="Logradouro" filled maxlength="64"
                  :counter="64"></v-text-field>
              </v-col>
  
              <v-col cols="12" sm="4" md="2">
                <v-text-field color="orange" :rules="[rules.numeroEndereco]" v-model="empresa.numero" label="Número" filled maxlength="10" :counter="10">
                </v-text-field>
              </v-col>
  
              <v-col cols="12" sm="6" md="4">
                <v-text-field color="orange" v-model="empresa.complemento" label="Complemento" filled maxlength="64"
                  :counter="64"></v-text-field>
              </v-col>
  
              <v-col cols="12" sm="6" md="6">
                <v-text-field color="orange" v-model="empresa.bairro" label="Bairro" filled maxlength="64"
                  :counter="64"></v-text-field>
              </v-col>
  
              <v-col cols="12" sm="6" md="3">
                <v-text-field color="orange" :rules="[rules.cep]" v-model="empresa.cep" label="CEP" filled v-mask="'#####-###'"
                  placeholder="00000-000"></v-text-field>
              </v-col>
  
              <v-col cols="12" sm="6" md="3">
                <v-text-field color="orange" :rules="[rules.telefone]" v-mask="'(##) ####-####'" placeholder="(00) 0000-0000"
                  v-model="empresa.telefone" label="Telefone" filled></v-text-field>
              </v-col>
  
              <v-col cols="12" sm="6" md="3">
                <v-text-field color="orange" required :rules="[rules.email]" v-model="empresa.email" label="Email" filled
                  maxlength="254"></v-text-field>
              </v-col>
  
              <v-col cols="12" sm="6" md="3">
                <v-text-field color="orange" :rules="[rules.site]" v-model="empresa.site" label="Site" filled maxlength="254"
                  :counter="254"></v-text-field>
              </v-col>
  
              <v-col cols="12" sm="6" md="3">
                <v-text-field color="orange" required maxlength="20" :counter="20" :rules="[rules.required]"
                  v-model="empresa.usuario" label="Usuário" filled></v-text-field>
              </v-col>
  
              <v-col cols="12" sm="6" md="3">
                <v-text-field v-model="empresa.senha" :append-icon="mostrarSenha ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]" :type="mostrarSenha ? 'text' : 'password'" name="input-10-1" label="Senha"
                  hint="Mínimo 3 caracteres" counter filled @click:append="mostrarSenha = !mostrarSenha" color="orange"></v-text-field>
              </v-col>
  
              <v-col cols="12">
                <v-row>
                  <v-col cols="6">
                    <v-btn color="secondary" to="/empresas" outlined>
                      <v-icon class="mr-1">mdi-backspace-reverse</v-icon>Voltar
                    </v-btn>
                  </v-col>
                  <v-col cols="6" class="d-flex justify-end">
                    <v-btn class="success" @click="salvar">Salvar</v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </v-card-text>
    </v-card>
</template>
  
  <script>
  
  import EmpresaService from '@/services/EmpresaService'
  export default {
    name: 'EmpresaAdicionarEditarView',
  
    data() {
      return {
        valid: true,
        subtitulo: 'Cadastrar',
        empresa: {},
        rules: {
          required: v => !!v || 'Campo requerido.',
          min: v => typeof v === 'string' && v.length >= 3 || 'O campo deve ter mais de 3 caracteres',
          email: v => /.+@.+\..+/.test(v) || 'O email deve ser válido',
          site: v => !v || /^([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v) || 'O campo deve ser um site válido',
          cnpj: v => (v && v.length === 18) || 'O campo deve seguir o padrão "00.000.000/0000-00"',
          cep: v => !v || v.length >= 8  || 'O campo deve seguir o padrão "00000-000"',
          telefone: v => !v || v.length >= 14  || 'O campo deve seguir o padrão "(00) 0000-0000"',
          numeroEndereco: v => !v || /^\d+[a-zA-Z]{0,2}$/.test(v) || 'Formato inválido',
        },
        mostrarSenha: false,
      }
    },
  
    methods: {

      mensagemToast(mensagem, cor, timeout = 3000) {
        this.$emit('mensagemToast', mensagem, cor, timeout);
      },

      salvar() {
        if (this.$refs.form.validate()) {
          if (this.empresa.id) {
            this.atualizar()
          } else {
            this.criar();
          }
        }
      },

      criar() {
        if (this.$refs.form.validate()) {
          EmpresaService.salvar(this.empresa).then( () => {
            this.$router.push('/empresas');
            this.mensagemToast('Empresa Cadastrada com sucesso.', 'green')
          }).catch((erro) => {
            console.log(erro);
            const data = erro.response;
            if (data.data && data.data.camposDeErro) {
              const mensagem = `${data.data.camposDeErro[0].fieldName.toUpperCase()}: ${data.data.camposDeErro[0].message}`
              this.mensagemToast(mensagem, 'red', 4000)
            }else {
              this.mensagemToast(data.data.message, 'red', 4000)
            }
          })
        }
      },

      atualizar() {
        if (this.$refs.form.validate()) {
          EmpresaService.atualizar(this.empresa.id, this.empresa).then( () => {
            this.$router.push('/empresas');
            this.mensagemToast('Empresa Atualizada com sucesso.', 'green')
          }).catch((erro) => {
            console.log(erro);
            const data = erro.response;
            if (data.data && data.data.camposDeErro) {
              const mensagem = `${data.data.camposDeErro[0].fieldName.toUpperCase()}: ${data.data.camposDeErro[0].message}`
              this.mensagemToast(mensagem, 'red', 4000)
            }else {
              this.mensagemToast(data.data.message, 'red', 4000)
            }
          })
        }
      },

      buscarPorId(id) {
        EmpresaService.buscarPorId(id).then((response) => {
          this.empresa = response.data
        }).catch((erro) => { 
            const data = erro.response;
            if (data && data.data) {
              this.mensagemToast(data.data.message, 'red', 4000)
            }else {
              this.mensagemToast('Erro na canexão com o servidor. Verifique se a API está em execução', 'red', 5000)
            }
            this.$router.push('/empresas');
        })
      },
      
    },
  
    created() {
      this.empresa.id = this.$route.params.id;
      if (this.empresa.id) {
        this.subtitulo = 'Editar';
        this.buscarPorId(this.empresa.id);
      }
    },
  }
  </script>
  