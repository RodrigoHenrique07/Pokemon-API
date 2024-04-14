/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardPokemon } from '../CardPokemon/cardPokemon';
import * as S from './styled';
import axios from 'axios';

import logo from '@assets/pokemon-logo.png';
import { useEffect, useState } from 'react';
import { Loadin } from '../Loading/loading';
import { useSessionState } from '../useSessionState';

interface Pokemon {
  types: any;
  image: string;
  name: string;
  genre: string;
  especie: string;
  species: Species;
  sprites: {
    front_default: string;
  };
}

interface Species {
  name: string;
}

export function Application() {
  const [characters, setCharacters] = useState<Pokemon[]>([]);
  const [page, setPage] = useSessionState('');
  const [isLoading, SetIsLoading] = useState(true);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    setPage(21);
  }

  const getPerson = async () => {
    SetIsLoading(true);
    try {
      const endpoints = [];

      for (let i = 1; i < page; i++) {
        endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
      }

      const endpoint = await Promise.all(
        endpoints.map(item => axios.get(item))
      );

      setCharacters(endpoint.map(res => res.data));
    } catch (error) {
      console.log(error);
    } finally {
      SetIsLoading(false);
    }
  };

  useEffect(() => {
    getPerson();
  }, [page]);

  return (
    <>
      {isLoading && <Loadin />}
      <S.ContainerApp>
        <S.HeaderApp>
          <S.LogoPokemon src={logo} />
        </S.HeaderApp>

        {isLoading ? (
          <Loadin />
        ) : (
          <S.ContentCharacters>
            {characters.map((pokemon, index) => {
              return (
                <CardPokemon
                  key={index}
                  image={pokemon.sprites.front_default}
                  name={pokemon.name}
                  genre={pokemon.types[0].type.name}
                  especie={
                    pokemon.types[1] ? pokemon.types[1].type.name : ' -- '
                  }
                />
              );
            })}
          </S.ContentCharacters>
        )}

        <S.Button onClick={() => setPage(page + 20)}>Carregar mais</S.Button>
        {page >= 22 ? <S.ButtonTop onClick={scrollToTop}>^</S.ButtonTop> : ''}
      </S.ContainerApp>
    </>
  );
}
