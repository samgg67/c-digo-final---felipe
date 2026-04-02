<template>
  <div class="page">
    <div class="box">
      <h1>Editar Disco</h1>

      <input v-model="nome" />
      <input v-model="artista" />
      <input v-model="ano" />

      <button @click="atualizar">Atualizar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()

const nome = ref('')
const artista = ref('')
const ano = ref('')

const id = route.params.id

async function carregar() {
  const res = await api.get(`/discos/${id}`)
  nome.value = res.data.nome
  artista.value = res.data.artista
  ano.value = res.data.ano
}

async function atualizar() {
  await api.put(`/discos/${id}`, {
    nome: nome.value,
    artista: artista.value,
    ano: Number(ano.value),
  })

  alert('✏️ Disco atualizado com sucesso!')

  router.push('/')
}


onMounted(carregar)
</script>