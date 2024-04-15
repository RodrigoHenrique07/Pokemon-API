import styled from 'styled-components';

export const ContainerApp = styled.section`
  width: 100%;
  max-width: 124.6;
  margin: 0 auto;
  padding: 4rem 1.5rem;
`;

export const HeaderApp = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.6rem;
  margin-bottom: 1.6rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  margin-top: 30px;
`;

export const LogoPokemon = styled.img`
  display: block;
  width: 20rem;
`;

export const ContentCharacters = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1.6rem;
`;

export const Button = styled.button`
  display: block;
  line-height: 6.5rem;
  background-color: #5b1fa6;
  border-radius: 6px;
  width: 30rem;
  margin: 0 auto;
  cursor: pointer;
  border: none;
  font-size: 1.8rem;
  margin-top: 4.8rem;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const ButtonTop = styled.button`
  display: block;
  line-height: 6.5rem;
  background-color: #5b1fa6;
  border-radius: 6px;
  width: 5rem;
  margin: 0 auto;
  cursor: pointer;
  border: none;
  font-size: 1.8rem;
  margin-top: 4.8rem;
  position: fixed;
  right: 40px;
  bottom: 40px;
  &:hover {
    filter: brightness(0.9);
  }
`;

export const Search = styled.input`
  width: 30rem;
  height: 30px;
  padding: 12px;
  color: white;
  border-radius: 10px;
  outline: none;
  border: 0;
  background-color: gray;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

export const CountPage = styled.div`



`;


export const InfoPage = styled.p`



`;
