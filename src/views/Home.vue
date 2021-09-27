<template>
  <article class="page charactersPage">
    <router-link to="/favourites">Go to favourites</router-link>
    <section class="charactersPage_info">
      <header class="info_header">
        Check details about your favourite Rick & Morty characters!
      </header>
      <p class="info_description">
        Below you can see list of Rick & Morty characters.
        Pick any you want, add him to list of your favourites and enjoy the app!
      </p>
    </section>
    <form class="charactersPage_searchBar" @submit.prevent="search">
      <input
        class="searchBar_input"
        type="text"
        v-model="searchTerm"
        placeholder="Character name...">
    </form>
    <div class="charactersPage_divider">
      <div class="divider_line"></div>
      <p class="divider_text">Or explore on your own</p>
      <div class="divider_line"></div>
    </div>
    <nav class="charactersPage_pageNav">
      <PageChanger v-model="pageNumber" :range="pageRange"/>
    </nav>
    <section
      class="charactersPage_characters"
      :class="$apollo.loading ? 'charactersPage_characters--loading' : null"
    >
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
</template>

<script lang="ts">
import { gql } from 'apollo-boost';

import Component from 'vue-class-component';
import FavouritesMixin from '../mixins/favourites.mixin';

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
      query: gql`query characters($page: Int!) {
          characters(page: $page) {
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
          page: parseInt(this.pageNumber, 10),
        };
      },
    },
  },
})
export default class Home extends FavouritesMixin {
  private searchTerm = '';

  private characters: CharacterPreviewInterface[] = [];

  private pageNumber = 1;

  private pageRange = 30;

  search(): void {
    this.$router.push(`/results?term=${this.searchTerm}`);
  }
}
</script>
