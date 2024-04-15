import * as S from './styled';

interface CharacterPokemon {
  image?: string;

  name: string;
  genre?: string;
  onClick?: () => void;
}

export function CardPokemon({
  image,

  name,
  genre,
  onClick,
  ...rest
}: CharacterPokemon) {
  return (
    <>
      <S.ContainerCard {...rest}>
        <S.ContentImage onClick={onClick}>
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
