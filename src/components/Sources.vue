<script setup>
  const props = defineProps(['sources', 'params']);
  const emits = defineEmits(['updateCrew']);
  // console.log('Sources.vue', props);
</script>
<template>
  <!--
      - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |  SOURCES
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      -->

  <div class="box">
    <header class="box__header">
      <h2 id="sources">Sources</h2>
    </header>
    <div class="form-inline" style="margin: 0.5rem 0">
      <div class="form-group" v-for="source in sources">
        <label style="display: inline-block; margin-right: 1rem">
          <input
            type="checkbox"
            v-model="params.sourcesInUse[source.id]"
            @change="$emit('updateCrew')" />
          {{ source.name }}
        </label>
      </div>
    </div>
  </div>
</template>
