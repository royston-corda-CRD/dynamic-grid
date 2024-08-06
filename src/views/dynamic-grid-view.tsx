import { useNexusTheme } from '@nexus/platform';
import { defineWebComponent, NexusStylesProvider } from '@nexus/web-components';
import { ReactElement } from 'react';
import { GridComponent } from '../components/index.js';

export const DynamicGridView = (): ReactElement => {
  const theme = useNexusTheme();

  return (
    <NexusStylesProvider nexusVersion='prerelease' theme={theme}>
      <GridComponent />
    </NexusStylesProvider>
  );
};

defineWebComponent('dynamic-grid-view', DynamicGridView);
