<template>
  <!--
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			|	JSON
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			-->

  <div class="box box--json">
    <header class="box__header">
      <h2>JSON</h2>
    </header>

    <div class="box__info">
      <button
        id="copyJsonBtn"
        class="btn btn-primary">
        Copy JSON to clipboard
      </button>
      <p>
        Come back and work on your starship at a later date: copy and paste the JSON in the box
        below into a text file. When you're ready to resume, copy and paste it back in to the JSON
        box in the &lsquo;Input&rsquo; section at the top of the page.
      </p>
      <textarea
        id="outputJson"
        cols="30"
        rows="10"
        class="form-control"
        >{{ jsonParams }}</textarea
      >
    </div>
  </div>
</template>

<script>
  import Ship from './Ship.vue'
</script>