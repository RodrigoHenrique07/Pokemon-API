import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global.ts';
import { defaultTheme } from './styles/theme.ts';

function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <h1>Hellow template Hellow</h1>
      </ThemeProvider>
    </>
  );
}

export default App;
