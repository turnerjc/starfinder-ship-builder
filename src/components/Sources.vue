<script setup>
  import { defineProps, computed } from 'vue';

  const props = defineProps(['sourceBooks', 'sourceBooksInUse']);
  console.log(props);
</script>
<template>
  <!--
			- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			|	SOURCES
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			-->

  <div class="box">
    <header class="box__header">
      <h2 id="sources">Sources</h2>
    </header>
    <div class="form-inline" style="margin: 0.5rem 0">
      <div class="form-group" v-for="source in sourceBooks">
        <label style="display: inline-block; margin-right: 1rem">
          <input type="checkbox" v-model="sourceBooksInUse[source.id]" />
          {{ source.name }}
        </label>
      </div>
    </div>
  </div>
</template>
