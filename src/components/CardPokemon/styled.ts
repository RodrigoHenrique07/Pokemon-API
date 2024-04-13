import styled from 'styled-components';

export const ContainerCard = styled.div`
  width: 100%;
  background-color: #151020;
  border-radius: 2px;
  padding: 2rem;
`;

export const ContentImage = styled.div`
  width: 100%;
  height: 24.3rem;
  overflow: hidden;
  border-radius: 0.4rem;
`;

export const ImagePokemon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const InfoPokemon = styled.div`
  margin-top: 1.6rem;
`;

export const NamePokemon = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.8rem;
`;

export const DescriptionPokemon = styled.ul`
  list-style: none;
  display: flex;
`;

export const TypePokemon = styled.li`
  font-size: 1.2rem;
  display: block;

  &:last-child {
    &::before {
      content: '';
      width: 4px;
      height: 4px;
      background-color: #ffffff;
      opacity: 0.4;
      display: inline-block;
      vertical-align: middle; //posicionar o elemento//
      border-radius: 50%;
      margin: 0 8px;
    }
  }
`;
