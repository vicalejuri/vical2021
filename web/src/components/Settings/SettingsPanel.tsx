import React, { useEffect } from 'react';
import { Leva } from 'leva';

import { useSharedSettings } from '../../hooks/useSharedSettings';
import { useKeyPressed } from '../../hooks/useKeyPressed';

const SettingsPanelStaticDOM = (settings?: ReturnType<typeof useSharedSettings>) => {
  return (
    <div id="globalSettings">
      <Leva hidden={!settings?.tweaksEnabled ?? true} />
    </div>
  );
};

/**
 * A global settings state component
 * Press <CTRL-p> to enable
 */
const SettingsPanel = () => {
  let settings = useSharedSettings();
  let showTweaksPanel = useKeyPressed((ev: KeyboardEvent) => {
    return (ev.metaKey || ev.ctrlKey) && ev.key == 'p';
  });
  useEffect(() => {
    if (showTweaksPanel) {
      settings.setTweaksEnabled(!settings.tweaksEnabled);
    }
  }, [showTweaksPanel]);

  /** SSR guard-rail */
  try {
    window.settings = settings;
  } catch (e) {
    return SettingsPanelStaticDOM();
  }

  return SettingsPanelStaticDOM(settings);
};

export default SettingsPanel;
