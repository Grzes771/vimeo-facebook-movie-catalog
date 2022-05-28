import { useVideosListContext } from 'contexts/video-list-context';
import { NavbarSection } from 'modules/navbar/components/navbar-section';
import { NAVBAR_SECTIONS } from 'modules/navbar/components/navbar-section/consts';

import { Container } from './index.styles';

export const MainPanelView = () => {
  const { handleIsActive, handleOnClick } = useVideosListContext();

  return (
    <Container>
      {NAVBAR_SECTIONS({ handleIsActive, handleOnClick }).map((item, index) => (
        <NavbarSection
          key={index}
          label={item.label}
          leftButtonLabel={item.leftButtonLabel}
          rightButtonLabel={item.rightButtonLabel}
          idLeft={item.idLeft}
          idRight={item.idRight}
          buttonIsActive={item.buttonIsActive}
          buttonOnClick={item.buttonOnClick}
        />
      ))}
    </Container>
  );
};
