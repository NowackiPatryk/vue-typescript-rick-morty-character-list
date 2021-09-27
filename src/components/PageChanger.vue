<template>
  <div class="pageChanger">
    <font-awesome-icon icon="long-arrow-alt-left" @click="handlePageChange(-1)"/>
    <p class="pageChanger_number">Page {{ this.value }}</p>
    <font-awesome-icon icon="long-arrow-alt-right" @click="handlePageChange(1)"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({})
export default class PageChanger extends Vue {
  @Prop({
    default: 30,
  })
  pagesLimit!: number;

  @Prop({
    required: true,
  })
  value!: number;

  handlePageChange(range: number): void {
    const newNumber = this.value + range;

    if (newNumber > 0 && newNumber < this.pagesLimit) {
      this.$emit('input', newNumber);
    }
  }
}
</script>
