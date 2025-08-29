import { PROBLEM_VERDICT, ProfileSetting, Theme } from '@juki-team/commons';
import React from 'react';
import { useUserStore } from '../../../stores/user/useUserStore';
import { ProblemVerdictTagProps } from './types';

export const ProblemVerdictTag = ({ verdict, small }: ProblemVerdictTagProps) => {
  
  const userPreferredTheme = useUserStore(state => state.user.settings[ProfileSetting.THEME]);
  const addDark = userPreferredTheme === Theme.DARK ? 'CC' : '';
  
  return (
    <div
      data-tooltip-id="jk-tooltip"
      data-tooltip-content={PROBLEM_VERDICT[verdict]?.label}
      className="jk-tag tx-t"
      style={{
        backgroundColor: PROBLEM_VERDICT[verdict]?.color + addDark,
        ...(small ? { lineHeight: 1, padding: '2px 4px' } : {}),
      }}
    >
      {verdict}
    </div>
  );
};
