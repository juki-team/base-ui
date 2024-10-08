import { PROBLEM_VERDICT, ProblemVerdict, ProfileSetting, Theme } from '@juki-team/commons';
import React from 'react';
import { useJukiUser } from '../../../hooks/useJukiUser';
import { T, Tooltip } from '../../atoms';

export const ProblemVerdictTag = ({ verdict, small }: { verdict: ProblemVerdict, small?: boolean }) => {
  
  const { user: { settings: { [ProfileSetting.THEME]: userTheme } } } = useJukiUser();
  
  const addDark = userTheme === Theme.DARK ? 'CC' : '';
  
  return (
    <Tooltip content={<T className="tt-se">{PROBLEM_VERDICT[verdict]?.label}</T>}>
      <div
        className="jk-tag tx-t"
        style={{
          backgroundColor: PROBLEM_VERDICT[verdict]?.color + addDark,
          ...(small ? { lineHeight: 1, padding: '2px 4px' } : {}),
        }}
      >
        {verdict}
      </div>
    </Tooltip>
  );
};
