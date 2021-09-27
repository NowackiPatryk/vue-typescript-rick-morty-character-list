<template>
  <article class="page charactersPage">
    <section
      class="charactersPage_characters"
      :class="$apollo.loading ? 'charactersPage_characters--loading' : null"
    >
      <CharacterPreview
        v-for="character in charactersByIds"
        :key="character.id"
        :characterData="{
          ...character,
        }"
        :fav="favCharacters.includes(character.id)"
        @favBtnClick="handleFavChange"
      />
    </section>
    <p>Do you like more characters? No problem - just <router-link to="/">add more</router-link></p>
  </article>
</template>

<script lang="ts">
import { gql } from 'apollo-boost';

import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import FavouritesMixin from '../mixins/favourites.mixin';

import CharacterPreview from '@/components/CharacterPreview.vue';
import CharacterPreviewInterface from '@/components/CharacterPreview.interface';

@Component({
  components: {
    CharacterPreview,
  },

  apollo: {
    charactersByIds: {
      query: gql`query charactersByIds($ids: [ID!]!) {
          charactersByIds(ids: $ids) {
              id
              name
              gender
              location {
                name
              }
              image
          }
        }`,

      variables() {
        return {
          ids: this.favCharacters,
        };
      },
    },
  },
})
export default class Favourites extends FavouritesMixin {
  private charactersByIds: CharacterPreviewInterface[] = [];

  @Watch('favCharacters')
  onFavsChanged(currentFavs: CharacterPreviewInterface[]): void {
    if (!currentFavs.length) {
      this.$router.push('/');
    } else {
      this.$apollo.queries.charactersByIds.refetch();
    }
  }
}
</script>
