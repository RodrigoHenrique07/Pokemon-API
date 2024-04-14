import { CardPokemon } from '../CardPokemon/cardPokemon';
import * as S from './styled';
import axios from 'axios';
import logo from '@assets/pokemon-logo.png';
import { useEffect, useRef, useState } from 'react';
import { Loadin } from '../Loading/loading';
import { useSessionState } from '../useSessionState';

interface Pokemon {
  types: Type[];
  image: string;
  name: string;
  genre: string;
  especie: string;
  species: Species;
  sprites: {
    front_default: string;
  };
}

interface Type {
  type: {
    name: string;
    url: string;
  };
}

interface Species {
  name: string;
}

export function Application() {
  const [characters, setCharacters] = useState<Pokemon[]>([]);
  const [page, setPage] = useSessionState('');
  const [isLoading, setIsLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null); 


  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  const getPerson = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPerson();
  }, [page]);

  useEffect(() => {
    if (contentRef.current) {
      const scrollPosition = contentRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offset = scrollPosition + (contentRef.current.clientHeight / 1.066) - (window.innerHeight / 1.2);
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  }, [characters]);
  
  

  return (
    <>
      {isLoading && <Loadin />}
      <S.ContainerApp>
        <S.HeaderApp>
          <S.LogoPokemon src={logo} />
        </S.HeaderApp>

        <S.ContentCharacters ref={contentRef}>
          {characters.map((pokemon, index) => (
            <CardPokemon
              key={index}
              image={pokemon.sprites.front_default}
              name={pokemon.name}
              genre={pokemon.types.map(type => type.type.name).join(', ')}
            />
          ))}
        </S.ContentCharacters>

        <S.Button onClick={() => setPage(page + 20)}>Carregar mais</S.Button>
        {page >= 22 && <S.ButtonTop onClick={scrollToTop}>^</S.ButtonTop>}
      </S.ContainerApp>
    </>
  );
}
