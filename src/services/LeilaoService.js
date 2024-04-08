import axios from '../plugins/axios.js'

const uri = '/leilao'
let uriCompleta = ''

export default {
    buscarTodos: async function(params = {}) {
        return axios.get(uri, {params})
    }, 

    buscarPorId: async function(id) {
        uriCompleta = `${uri}/${id}`
        return axios.get(uriCompleta)
    },

    salvar: async function(leilaoRequest) {
        return axios.post(uri, leilaoRequest)
    },

    atualizar: async function(id, leilaoRequest) {
        uriCompleta = `${uri}/${id}`
        return axios.put(uriCompleta, leilaoRequest)
    },

    deletar: async function(id) {
        uriCompleta = `${uri}/${id}`
        return axios.delete(uriCompleta)
    },
}