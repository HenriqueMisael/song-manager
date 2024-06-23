import { Button } from '@blueprintjs/core';

import useLoginAction from './useLoginAction.ts';

export const LoginButton = () => {
  const handleClick = useLoginAction();

  return (
    <Button className="bp5-minimal" icon="user" onClick={handleClick}>
      Login
    </Button>
  );
};
