<template>
  <article class="page charactersPage" v-if="!$apollo.loading">
    <section class="charactersPage_info">
      <header class="info_header">
        Check details about your favourite Rick & Morty characters!
      </header>
      <p class="info_description">
        Below you can see list of Rick & Morty characters.
        Pick any you want, add him to list of your favourites and enjoy the app!
      </p>
    </section>
    <section class="charactersPage_searchBar">
      <input
        class="searchBar_input"
        type="text"
        v-model="searchTerm"
        placeholder="Character name...">
    </section>
    <div class="charactersPage_divider">
      <div class="divider_line"></div>
      <p class="divider_text">Or explore on your own</p>
      <div class="divider_line"></div>
    </div>
    <nav class="charactersPage_pageNav">
      <font-awesome-icon icon="long-arrow-alt-left" @click="handlePageChange(-1)"/>
      <p class="pageNav_pageNumber">Page {{ pageNumber }}</p>
      <font-awesome-icon icon="long-arrow-alt-right" @click="handlePageChange(1)"/>
    </nav>
    <section class="charactersPage_characters">
      <CharacterPreview
        v-for="character in filteredCharacters"
        :key="character.id"
        :characterData="{
          ...character,
        }"
        :fav="favCharacters.includes(character.id)"
        @favBtnClick="handleFavChange"
      />
    </section>
  </article>
  <div v-else>Loading</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { gql } from 'apollo-boost';

import CharacterPreview from '@/components/CharacterPreview.vue';
import CharacterPreviewInterface from '@/components/CharacterPreview.interface';

@Component({
  components: {
    CharacterPreview,
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

    fetch() {
      this.fetchFav();
    },
  },
})
export default class Home extends Vue {
  private favCharacters: number[] = [];

  private searchTerm = '';

  private characters: CharacterPreviewInterface[] = [];

  private pageNumber = 1;

  get filteredCharacters(): CharacterPreviewInterface[] {
    return this.characters.results
      .filter((character: CharacterPreviewInterface) => character.name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase()));
  }

  handleFavChange(characterId: number): void {
    let newStorage: number[] = [];
    const isAlreadyInFavs = this.favCharacters.includes(characterId);

    if (isAlreadyInFavs) {
      newStorage = this.favCharacters.filter((id) => id !== characterId);
    } else {
      newStorage = [...this.favCharacters, characterId];
    }

    try {
      this.setFav(newStorage);
      this.$notify({
        group: 'notifications',
        title: 'Yeah!',
        text: `Character has been ${isAlreadyInFavs ? 'removed' : 'added'} successfully`,
      });
      this.fetchFav();
    } catch {
      this.$notify({
        group: 'notifications',
        title: 'Oops!',
        text: 'Something went wrong :(',
      });
    }
  }

  fetchFav(): void {
    const characters = localStorage.getItem('favCharacters');
    this.favCharacters = characters ? JSON.parse(characters) : [];
  }

  setFav(characterIds: number[]): void {
    localStorage.setItem('favCharacters', JSON.stringify(characterIds));
  }

  handlePageChange(range: number): void {
    const newPageNumber = this.pageNumber + range;

    if (newPageNumber > 0 && newPageNumber < 30) {
      this.pageNumber = newPageNumber;
    }
  }
}
</script>
