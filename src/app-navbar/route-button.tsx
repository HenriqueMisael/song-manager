import type { ButtonProps } from '@blueprintjs/core';
import { Button } from '@blueprintjs/core';
import { memo } from 'react';

interface Props extends ButtonProps {
  name: string;
  to: string;
}

const RouteButton = memo<Props>(({ name, to, ...rest }) => {
  // const navigate = useNavigate();
  const handleClick = () => {
    // navigate(to);
  };

  return (
    <Button onClick={handleClick} className="bp5-minimal" {...rest}>
      {name}
    </Button>
  );
});

export default RouteButton;
