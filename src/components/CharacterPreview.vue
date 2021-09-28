<template>
  <div class="characterPreview">
    <div class="characterPreview_details">
      <div class="details_imgContainer">
        <div class="imgContainer_overlay">
          <div class="overlay_favBtn">
            <font-awesome-icon
              :icon="fav ? 'minus' : 'star'"
              @click="$emit('favBtnClick', characterData.id)"
            />
          </div>
          <p class="overlay_text">
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
            Nunc ipsum libero, finibus interdum luctus vel,
            ullamcorper at quam. Nulla placerat nisi est,
            id ullamcorper neque sollicitudin non.
            Donec eget orci sed lacus fermentum vulputate.
            Curabitur sagittis turpis quis elit dictum tempus.
            Donec tincidunt nibh libero,
            sit amet vehicula nisi lobortis vel.
          </p>
        </div>
        <img :src="characterData.image" class="imgContainer_img" alt="character image">
      </div>
      <div class="details_container">
        <div class="container_informations">
          <p class="informations_info">{{ characterData.name }}</p>
          <p class="informations_info">{{ characterData.location.name }}</p>
          <p class="informations_info">{{ characterData.gender }}</p>
        </div>
        <div class="container_actions">
          <button
            class="actions_redirectBtn"
            @click="showWorkInProgress">Show more
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import CharacterPreviewInterface from './CharacterPreview.interface';

@Component({})
export default class CharacterPreview extends Vue {
  @Prop({
    required: true,
  })
  characterData!: CharacterPreviewInterface;

  @Prop({
    default: false,
  })
  fav!: boolean;

  showWorkInProgress(): void {
    this.$notify({
      group: 'notifications',
      type: 'warn',
      title: 'Work in progress',
      text: 'Hey! This feature is still in progress.',
    });
  }
}
</script>
