import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from '../../services/pokemon-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PokemonListItem } from '../../model/pokemon_list_item';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeToolbarComponent } from '../../components/home-toolbar/home-toolbar.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    PokemonCardComponent,
    MatProgressSpinnerModule,
    HomeToolbarComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  constructor(private api: PokemonApiService, private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.findPokemons();
  }

  onScroll(event: any) {
    if (this.loading || !this.hasMore) {
      return;
    }
    if (
      event.target.scrollTop + event.target.clientHeight >
      event.target.scrollHeight - 200
    ) {
      console.log('load more');
      this.offset += this.limit;
      this.findPokemons();
    }
  }

  offset: number = 0;
  limit: number = 25;
  loading: boolean = false;
  pokemons: PokemonListItem[] = [];
  hasMore: boolean = true;
  async findPokemons() {
    try {
      this.loading = true;
      const r = await this.api.findPokemons(this.offset, this.limit);
      this.pokemons = this.pokemons.concat(r.results);
      this.hasMore = r.next != null;
    } catch (error) {
      this.snack.open('Network Error', 'OK');
    } finally {
      this.loading = false;
    }
  }
}
