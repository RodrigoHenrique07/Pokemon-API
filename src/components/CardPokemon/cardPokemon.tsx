import * as S from './styled';

interface CharacterPokemon {
  image?: string;
  name: string;
  genre?: string;
}

export function CardPokemon({
  image,
  name,
  genre,
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
            <S.TypePokemon>Tipo: {genre} </S.TypePokemon>
          </S.DescriptionPokemon>
        </S.InfoPokemon>
      </S.ContainerCard>
    </>
  );
}
