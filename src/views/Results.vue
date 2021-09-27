<template>
  <article class="page charactersPage" v-if="!$apollo.loading">
    <nav class="charactersPage_pageNav">
      <PageChanger v-model="pageNumber" :range="pageRange"/>
    </nav>
    <section class="charactersPage_characters">
      <CharacterPreview
        v-for="character in characters.results"
        :key="character.id"
        :characterData="{
          ...character,
        }"
        :fav="favCharacters.includes(character.id)"
        @favBtnClick="handleFavChange"
      />
    </section>
    <nav class="charactersPage_pageNav">
      <PageChanger v-model="pageNumber" :range="pageRange"/>
    </nav>
  </article>
  <div v-else>Loading</div>
</template>

<script lang="ts">
import { gql } from 'apollo-boost';

import Component from 'vue-class-component';
import Favourites from '../mixins/favourites.mixin';

import CharacterPreview from '@/components/CharacterPreview.vue';
import CharacterPreviewInterface from '@/components/CharacterPreview.interface';

import PageChanger from '@/components/PageChanger.vue';

@Component({
  components: {
    CharacterPreview,
    PageChanger,
  },

  apollo: {
    characters: {
      query: gql`query characters($page: Int!, $name: String!) {
          characters(page: $page, filter:{ name: $name }) {
            results {
              id
              image
              name
              gender
              location {
                name
              }
            }
          }
        }`,

      variables() {
        return {
          name: this.$route.query.term,
          page: this.pageNumber,
        };
      },
    },
  },
})
export default class Results extends Favourites {
  private characters: CharacterPreviewInterface[] = [];

  private pageNumber = 1;

  private pageRange = 10;
}
</script>
