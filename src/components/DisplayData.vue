<template>
  <div class="container mx-auto p-4">
    <div class="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
      <h1 class="text-2xl font-bold mb-4">Demandes d'autorisations d'urbanisme</h1>
      <div class="flex space-x-4 mb-4">
        <input 
          v-model="search" 
          @input="resetPage" 
          placeholder="Rechercher..." 
          class="border border-gray-300 p-2 rounded-md w-1/3"
        />
        <input 
          type="date" 
          v-model="dateFrom" 
          @change="resetPage"
          class="border border-gray-300 p-2 rounded-md"
        />
      </div>
      <div class="table-container">
        <table class="min-w-full bg-white border border-gray-300">
          <thead class="bg-gray-200">
            <tr>
              <th class="py-2 px-4 border-b text-left">Référence</th>
              <th class="py-2 px-4 border-b text-left">Déposé le</th>
              <th class="py-2 px-4 border-b text-left">Demandeur</th>
              <th class="py-2 px-4 border-b text-left">Surface (m²)</th>
              <th class="py-2 px-4 border-b text-left">Nature des travaux</th>
              <th class="py-2 px-4 border-b text-left">Adresse du terrain</th>
              <th class="py-2 px-4 border-b text-left">Ref cadastrales</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="request in urbanismeRequests" :key="request.reference" class="hover:bg-gray-100 max-h-[100px] overflow-y-auto">
              <td class="py-2 px-4 border-b text-left font-bold">{{ request.reference }}</td>
              <td class="py-2 px-4 border-b text-left ">{{ request.dateDeposited }}</td>
              <td class="py-2 px-4 border-b text-left ">{{ request.requester }}</td>
              <td class="py-2 px-4 border-b text-left ">{{ request.surface }}</td>
              <td class="py-2 px-4 border-b text-left ">
                <div style="max-height: 100px; overflow-y: auto;" v-html="request.workNature">
                </div>
              </td>
              <td class="py-2 px-4 border-b text-left ">{{ request.landAddress }}</td>
              <td class="py-2 px-4 border-b text-left ">{{ request.cadastralRef }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-between mt-4">
        <button 
          @click="previousPage" 
          :disabled="isPreviousDisabled"
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          :class="{'opacity-50 cursor-not-allowed': isPreviousDisabled}"
        >
          Précédent
        </button>
        <button 
          @click="nextPage" 
          :disabled="isNextDisabled"
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          :class="{'opacity-50 cursor-not-allowed': isNextDisabled}"
        >
          Suivant
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getUrbanismeRequests } from '@/services/urbanismeService';

export default {
  data() {
    return {
      urbanismeRequests: [],
      page: 1,
      limit: 10,
      search: '',
      dateFrom: '',
      dateTo: '',
    };
  },
  computed: {
    isPreviousDisabled() {
      return this.page === 1;
    },
    isNextDisabled() {
      return this.urbanismeRequests.length < this.limit;
    },
  },
  methods: {
    fetchRequests() {
      getUrbanismeRequests(this.page, this.limit, this.search, this.dateFrom)
        .then(response => {
          this.urbanismeRequests = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    nextPage() {
      if (!this.isNextDisabled) {
        this.page++;
        this.fetchRequests();
      }
    },
    previousPage() {
      if (!this.isPreviousDisabled) {
        this.page--;
        this.fetchRequests();
      }
    },
    resetPage() {
      this.page = 1;
      this.fetchRequests();
    }
  },
  created() {
    this.fetchRequests();
  },
};
</script>
