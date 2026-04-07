<template>
  <div class="page">
    <div class="box">
      <h1>Lista de Discos</h1>

      <ul>
        <li v-for="disco in discos" :key="disco.id">

          <img 
            v-if="disco.imagem" 
            :src="disco.imagem" 
            alt="Capa"
          />

          {{ disco.nome }} - {{ disco.artista }} ({{ disco.ano }})
          <div>
            <button @click="editar(disco.id)">Editar</button>
            <button @click="excluir(disco.id)">Excluir</button>
            <button @click="verDetalhes(disco)">Ver detalhes</button>
          </div>
        </li>
      </ul>

      <div v-if="mostrarModal" class="modal-overlay">
        <div class="modal">
          <h2>{{ discoSelecionado.nome }}</h2>
          <hr />

          <h3>Sobre o artista</h3>
          <p>{{ discoSelecionado.descricaoArtista || 'Nenhuma descrição do artista informada.' }}</p>

          <h3>Sobre o álbum</h3>
          <p>{{ discoSelecionado.descricaoAlbum || 'Nenhuma descrição do álbum informada.' }}</p>

          <button class="btn-fechar" @click="mostrarModal = false">Fechar</button>
        </div>
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

const mostrarModal = ref(false)
const discoSelecionado = ref(null)

function verDetalhes(disco) {
  discoSelecionado.value = disco
  mostrarModal.value = true
}

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
