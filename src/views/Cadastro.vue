<template>
  <div class="page">
    <div class="box">
      <h1>Cadastrar Disco</h1>

      <input v-model="nome" placeholder="Nome" />
      <input v-model="artista" placeholder="Artista" />
      <input v-model="ano" placeholder="Ano" />

      <button @click="salvar">Salvar</button>
    </div>
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
    ano: Number(ano.value),
  })

  alert('✅ Disco cadastrado com sucesso!')
  router.push('/')
}
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

  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
}

h1 {
  text-align: center;
  font-size: 22px;
}
</style>
