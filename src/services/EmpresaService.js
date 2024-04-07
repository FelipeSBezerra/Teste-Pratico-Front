import axios from '../plugins/axios.js'

const uri = '/empresa'
let uriCompleta = ''

export default {
    buscarTodos: async function(params = {}) {
        return axios.get(uri, {params})
    }, 

    buscarPorId: async function(id) {
        uriCompleta = `${uri}/${id}`
        return axios.get(uriCompleta)
    },

    salvar: async function(empresaRequest) {
        return axios.post(uri, empresaRequest)
    },

    atualizar: async function(id, empresaRequest) {
        uriCompleta = `${uri}/${id}`
        return axios.put(uriCompleta, empresaRequest)
    },

    deletar: async function(id) {
        uriCompleta = `${uri}/${id}`
        return axios.delete(uriCompleta)
    },
}