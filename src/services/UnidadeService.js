import axios from '../plugins/axios.js'

const uri = '/unidade'
let uriCompleta = ''

export default {
    buscarTodos: async function() {
        return axios.get(uri)
    }, 

    buscarPorId: async function(id) {
        uriCompleta = `${uri}/${id}`
        return axios.get(uriCompleta)
    },

    salvar: async function(unidadeRequest) {
        return axios.post(uri, unidadeRequest)
    },

    atualizar: async function(id, unidadeRequest) {
        uriCompleta = `${uri}/${id}`
        return axios.put(uriCompleta, unidadeRequest)
    },

    deletar: async function(id) {
        uriCompleta = `${uri}/${id}`
        return axios.delete(uriCompleta)
    },
}