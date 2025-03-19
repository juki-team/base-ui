import { PROBLEM_VERDICT, ProblemVerdict, ProfileSetting, Theme } from '@juki-team/commons';
import React from 'react';
import { useUserStore } from '../../../stores/user/useUserStore';

export const ProblemVerdictTag = ({ verdict, small }: { verdict: ProblemVerdict, small?: boolean }) => {
  
  const userPreferredTheme = useUserStore(state => state.user.settings[ProfileSetting.THEME]);
  const addDark = userPreferredTheme === Theme.DARK ? 'CC' : '';
  
  return (
    <div
      data-tooltip-id="jk-tooltip"
      data-tooltip-content={PROBLEM_VERDICT[verdict]?.label}
      data-tooltip-t-class-name="tt-se"
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
