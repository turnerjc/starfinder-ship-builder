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
    <div
      class="form-inline"
      style="margin: 0.5rem 0">
      <div
        class="form-group"
        v-for="src in sources">
        <label style="display: inline-block; margin-right: 1rem">
          <input
            type="checkbox"
            v-model="params.sources[src.id]" />
          {{ src.name }}
        </label>
      </div>
    </div>
  </div>

  <!--
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			|	INPUT
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			-->

  <div class="box">
    <header class="box__header">
      <h2 id="input">Input</h2>
    </header>

    <div class="box__select">
      <div class="form-group">
        <label for="sampleShipSelect">Select a sample ship</label>

        <!-- sort by -->
        <div
          class="form-inline"
          style="margin: 0.5rem 0">
          <div class="form-group">
            Sort by:
            <div class="radio">
              <label>
                <input
                  type="radio"
                  name="selectSampleShipSortOrder"
                  value="name"
                  v-model="selectSampleShipSortOrder" />
                Name
              </label>
            </div>
            <div class="radio">
              <label>
                <input
                  type="radio"
                  name="selectSampleShipSortOrder"
                  value="size"
                  v-model="selectSampleShipSortOrder" />
                Size
              </label>
            </div>
            <div class="radio">
              <label>
                <input
                  type="radio"
                  name="selectSampleShipSortOrder"
                  value="tier"
                  v-model="selectSampleShipSortOrder" />
                Tier
              </label>
            </div>
          </div>
        </div>

        <select
          class="form-control"
          id="sampleShipSelect"
          v-on:change="inputSampleShipParams">
          <option value="none">None</option>
          <option
            v-for="option in selectOptions.sampleShip"
            :value="option.id">
            {{ getSampleShipOptionName(option) }}
          </option>
        </select>
      </div>
    </div>

    <!--
				<div class="box__select">
					<div class="form-group">
						<form class=""
							action="./starshipSheet.php" 
							method="post"
							target="_blank">
								<input type="hidden" :value="jsonParams" name="json">
								<button type="submit" class="btn btn-lg btn-primary">
									Open Character Sheet
								</button>
						</form>
					</div>
				</div>
				-->

    <div class="box__select">
      <div class="form-group">
        <label for="">Paste in JSON from a previous design</label>
        <textarea
          class="form-control"
          v-model="json"
          v-on:change="convertJsonInput"
          id="jsonData"
          cols="30"
          rows="5"></textarea>
      </div>
      <div class="form-group">
        <p>Or start building your ship from scratch</p>
        <button
          class="btn btn-lg btn-primary"
          v-on:click="clearAll">
          Clear All
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Ship from './Ship.vue'
</script>
