import { Loader } from './styled';

import loading from '@/assets/loader.gif';

export function Loadin() {
  return (
    <>
      <Loader>
        <img src={loading} alt="" />
      </Loader>
    </>
  );
}
