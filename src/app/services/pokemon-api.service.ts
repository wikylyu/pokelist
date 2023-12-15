import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { PokemonListItem } from '../model/pokemon_list_item';
import { PaginationResponse } from '../model/pagination_response';
import { Pokemon } from '../model/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  constructor(private http: HttpService) {}

  async findPokemons(
    offset: number = 0,
    limit: number = 20
  ): Promise<PaginationResponse<PokemonListItem>> {
    const url = this.http.buildurl('/pokemon', { offset, limit });
    const r = await this.http.fget(url);
    return r;
  }

  async getPokemon(name: string): Promise<Pokemon> {
    const url = this.http.buildurl(`/pokemon/${name}`);
    const r = await this.http.fget(url);
    return r;
  }
}
