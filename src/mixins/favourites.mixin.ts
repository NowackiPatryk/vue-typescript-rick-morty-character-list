import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class FavouritesMixin extends Vue {
  favCharacters: number[] = [];

  beforeMount(): void {
    this.fetchFav();
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
        type: 'success',
        title: 'Favourites',
        text: `Character has been ${isAlreadyInFavs ? 'removed' : 'added'} successfully`,
      });

      this.fetchFav();
    } catch {
      this.$notify({
        group: 'notifications',
        type: 'error',
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
    this.fetchFav();
  }
}
