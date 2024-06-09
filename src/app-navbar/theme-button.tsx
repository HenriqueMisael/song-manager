import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@blueprintjs/core';

import { isDarkTheme } from '../store/session/selectors.ts';
import { sessionActions } from '../store/session';

const ThemeButton = () => {
  const themeIcon = useSelector(isDarkTheme) ? 'flash' : 'moon';

  const dispatch = useDispatch();

  return (
    <Button
      className="bp5-minimal"
      icon={themeIcon}
      onClick={() => dispatch(sessionActions.toggleDarkMode())}
    ></Button>
  );
};

export default ThemeButton;
