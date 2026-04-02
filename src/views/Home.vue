<template>
  <div>
    <h1>Lista de Discos</h1>

    <div v-for="disco in discos" :key="disco.id" class="card">
      <strong>{{ disco.nome }}</strong><br />
      {{ disco.artista }} - {{ disco.ano }}

      <div style="margin-top:10px;">
        <button class="btn-editar" @click="editar(disco.id)">Editar</button>
        <button class="btn-excluir" @click="excluir(disco.id)">Excluir</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const discos = ref([])
const router = useRouter()

async function carregar() {
  const res = await api.get('/discos')
  discos.value = res.data
}

function editar(id) {
  router.push(`/editar/${id}`)
}

async function excluir(id) {
  await api.delete(`/discos/${id}`)
  carregar()
}

onMounted(carregar)
</script>