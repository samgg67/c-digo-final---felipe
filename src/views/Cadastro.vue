<template>
  <div>
    <h1>Cadastrar Disco</h1>

    <input v-model="nome" placeholder="Nome" />
    <input v-model="artista" placeholder="Artista" />
    <input v-model="ano" placeholder="Ano" />

    <button @click="salvar">Salvar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const nome = ref('')
const artista = ref('')
const ano = ref('')
const router = useRouter()

async function salvar() {
  await api.post('/discos', {
    nome: nome.value,
    artista: artista.value,
    ano: Number(ano.value)
  })

  router.push('/')
}
</script>