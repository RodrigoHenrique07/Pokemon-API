import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global';
import { defaultTheme } from './styles/theme';
import { Home } from './pages/home';

function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <Home/>
        
      </ThemeProvider>
    </>
  );
}

export default App;
