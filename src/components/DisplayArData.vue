<template>
<div class="container mx-auto p-4">
    <div class="p-card p-6 mb-6">
      <h1 class="text-2xl text-center font-bold mb-4">Demandes d'autorisations d'urbanisme</h1>

      <!-- Search & Date Filters -->
      <div class="flex gap-4 mb-4">
        <!-- <InputText 
          v-model="search" 
          @input="resetPage" 
          placeholder="Rechercher..." 
          class="w-1/3"
        /> -->
        <IconField>
            <InputIcon class="pi pi-search" />
            <InputText v-model="value1" placeholder="Search" />
        </IconField>
        <DatePicker
         v-model="dateFrom"
         selectionMode="range"
         :manualInput="false" 
         showIcon fluid iconDisplay="input"
         />
         
      </div>

      <DataTable 
            :value="urbanismeRequests" 
            stripedRows 
            responsiveLayout="scroll"
            scrollable 
            scrollHeight="600px"
        >
            <Column field="reference" header="Référence" sortable></Column>
            <Column field="dateDeposited" header="Déposé le" sortable></Column>
            <Column field="requester" header="Demandeur" sortable></Column>
            <Column field="surface" header="Surface (m²)" sortable></Column>
            <Column header="Nature des travaux">
            <template #body="slotProps">
                <div style="max-height: 100px; overflow-y: auto;" v-html="slotProps.data.workNature"></div>
            </template>
            </Column>
            <Column field="landAddress" header="Adresse du terrain"></Column>
            <Column field="cadastralRef" header="Ref cadastrales"></Column>
        </DataTable>

    </div>
  </div>
  </template>

  <script>
import { ref } from "vue";
import DataTable from "primevue/datatable";
import  Column  from "primevue/column";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import DatePicker from 'primevue/datepicker';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

export default {
  components: {
    DataTable,
    Column,
    InputText,
    DatePicker,
    Button,
    IconField,
    InputIcon
  }

    </script>
