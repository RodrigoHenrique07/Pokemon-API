import { CardPokemon } from '../CardPokemon/cardPokemon';
import * as S from './styled';
import logo from '@assets/pokemon-logo.png';
import { useEffect, useRef, useState } from 'react';
import { Loadin } from '../Loading/loading';
import { useSessionState } from '../useSessionState';

import Modal from 'react-modal';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

Modal.setAppElement('#root');
import './style.css';

import close from '@assets/close.png';
import { api } from '@/server/api';
Modal.setAppElement('#root');

interface Pokemon {
  types: Type[];
  image: string;
  name: string;
  genre: string;
  especie: string;
  species: Species;
  sprites: {
    back_default: string;
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

interface CustomArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function Application() {
  const [characters, setCharacters] = useState<Pokemon[]>([]);
  const [page, setPage] = useSessionState('');
  const [countPage, setCountPage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImgIndex, setSelectedImgIndex] = useState<number>(0);
  const [selectedPokName, setSelectedPokName] = useState<string | null>(null);


  useEffect(() => {
    getPerson();
  }, [page]);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    setPage(21);
  };

  const MorePokemon = () => {
    setPage(page + 20);
  };

  const getPerson = async () => {
    setIsLoading(true);
    try {
      const endpoints = [];

      for (let i = 1; i < page; i++) {
        endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
      }

      const endpoint = await Promise.all(endpoints.map(item => api.get(item)));

      const count = await api.get('');
      setCountPage(count.data.count);

      setCharacters(endpoint.map(res => res.data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const pokemonFilter = (name: string) => {
    // Se o campo de pesquisa estiver vazio, retorna todos os Pokémon
    if (name === '') {
      getPerson();
      return;
    }

    // Filtra os Pokémon cujos nomes começam com a letra digitada
    const filteredPokemons = characters.filter(pokemon =>
      pokemon.name.toLowerCase().startsWith(name.toLowerCase())
    );
    setCharacters(filteredPokemons);
  };

 

  const openModal = (index: number, PokName: string) => {
    setSelectedImgIndex(index);
    setSelectedPokName(PokName);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  

  const NextArrow: React.FC<CustomArrowProps> = props => {
    // eslint-disable-next-line react/prop-types
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow2 custom-next2`}
        style={{ ...style }}
        onClick={onClick}
      />
    );
  };

  const PrevArrow: React.FC<CustomArrowProps> = props => {
    // eslint-disable-next-line react/prop-types
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow2 custom-prev2`}
        style={{ ...style }}
        onClick={onClick}
      />
    );
  };

  const sliderSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: selectedImgIndex,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <>
      {isLoading && <Loadin />}
      <S.ContainerApp>
        <S.LogoPokemon src={logo} />
        <S.HeaderApp>
          <S.Search
            type="search"
            placeholder="Pesquisar Pokemon"
            onChange={e => pokemonFilter(e.target.value)}
          />

          <S.CountPage>
            <S.InfoPage>Nº Total de Personagens: {countPage}</S.InfoPage>
            <S.InfoPage>Nº de Personagens carregados: {page}</S.InfoPage>
          </S.CountPage>
        </S.HeaderApp>

        <S.ContentCharacters ref={contentRef}>
          {characters.map((pokemon, index) => (
            <CardPokemon
              onClick={() => openModal(index, pokemon.name)}
              key={pokemon.name}
              image={pokemon.sprites.front_default}
              name={pokemon.name}
              genre={pokemon.types.map(type => type.type.name).join(', ')}
            />
          ))}
        </S.ContentCharacters>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Galeria de fotos"
          className="Modal"
          overlayClassName="Overlay"
        >
          <div className="Modal-header">
            <h2 className="Modal-title">{}</h2>
            <button onClick={closeModal} className="close-button">
              <img src={close} alt="" />
            </button>
          </div>
          <div className="Slider-content">
            {characters
              .filter(card => card.name === selectedPokName)
              .map((pokemon, index) => (
                <div key={index} className="Slider-content">
                  <Slider {...sliderSettings} initialSlide={0}>
                    <CardPokemon
                      key={pokemon.name}
                      image={pokemon.sprites.front_default}
                      name={pokemon.name}
                      genre={pokemon.types
                        .map(type => type.type.name)
                        .join(', ')}
                    />

                    <CardPokemon
                      key={pokemon.name}
                      image={pokemon.sprites.back_default}
                      name={pokemon.name}
                      genre={pokemon.types
                        .map(type => type.type.name)
                        .join(', ')}
                    />
                  </Slider>
                </div>
              ))}
          </div>
        </Modal>

        <S.Button onClick={MorePokemon}>Carregar mais</S.Button>
        {page >= 22 && <S.ButtonTop onClick={scrollToTop}>^</S.ButtonTop>}
      </S.ContainerApp>
    </>
  );
}
