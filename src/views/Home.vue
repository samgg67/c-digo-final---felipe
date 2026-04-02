<template>
  <div class="page">
    <div class="box">
      <h1>Lista de Discos</h1>

      <ul>
        <li v-for="disco in discos" :key="disco.id">
          {{ disco.nome }} - {{ disco.artista }} ({{ disco.ano }})

          <div>
            <button @click="editar(disco.id)">Editar</button>
            <button @click="excluir(disco.id)">Excluir</button>
          </div>
        </li>
      </ul>
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
  const confirmar = window.confirm('Tem certeza que deseja excluir este disco?')

  if (!confirmar) return

  await api.delete(`/discos/${id}`)
  carregar()
}

onMounted(carregar)
</script>

<style>
.page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
}

.box {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
}

li {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
</style>