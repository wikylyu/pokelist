import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PokemonListItem } from '../../model/pokemon_list_item';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { PokemonApiService } from '../../services/pokemon-api.service';
import { Pokemon } from '../../model/pokemon';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [
    MatRippleModule,
    MatCardModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent implements OnChanges {
  @Input({ required: true }) item!: PokemonListItem;

  constructor(private api: PokemonApiService) {}

  loading = false;
  pokemon: Pokemon | null = null;

  async getPokemon() {
    try {
      this.loading = true;
      const r = await this.api.getPokemon(this.item.name);
      this.pokemon = r;
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getPokemon();
  }
}
