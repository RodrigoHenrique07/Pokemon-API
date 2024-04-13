import * as S from './styled';

interface CharacterPokemon {
  image?: string;
  name: string;
  genre?: string;
  especie?: string;
}

export function CardPokemon({
  image,
  name,
  genre,
  especie,
  ...rest
}: CharacterPokemon) {
  return (
    <>
      <S.ContainerCard {...rest}>
        <S.ContentImage>
          <S.ImagePokemon src={image} />
        </S.ContentImage>

        <S.InfoPokemon>
          <S.NamePokemon>{name}</S.NamePokemon>

          <S.DescriptionPokemon>
            <S.TypePokemon>Gênero: {genre} </S.TypePokemon>
            <S.TypePokemon>Espécie: {especie} </S.TypePokemon>
          </S.DescriptionPokemon>
        </S.InfoPokemon>
      </S.ContainerCard>
    </>
  );
}
