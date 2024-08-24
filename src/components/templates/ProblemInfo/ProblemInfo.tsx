import {
  Language,
  PROBLEM_MODE,
  PROBLEM_TYPE,
  ProblemDataResponseDTO,
  ProblemScoringMode,
  ProblemSettingsType,
  PROGRAMMING_LANGUAGE,
} from '@juki-team/commons';
import React, { Children, PropsWithChildren, ReactNode } from 'react';
import { classNames } from '../../../helpers';
import { ExclamationIcon, Popover, T, Tooltip } from '../../atoms';

export interface ProblemInfoProps {
  settings: ProblemSettingsType,
  tags: string[],
  author: string,
  expand?: boolean,
  asPopover?: boolean,
  centered?: boolean,
  withoutPadding?: boolean,
}

const ContentInfo = ({ label, value, children, expand, valueAsList, centered, withoutPadding }: PropsWithChildren<{
  label: string,
  value: ReactNode,
  expand?: boolean,
  valueAsList?: boolean,
  centered?: boolean,
  withoutPadding?: boolean,
}>) => {
  
  const head = centered ? (
    <div className="jk-col">
      <T className="fw-bd tt-ce">{label}</T>
      {valueAsList ? <div className="jk-row gap" style={{ maxWidth: 300 }}>{value}</div> : value}
    </div>
  ) : (
    <div
      className={classNames('jk-row left', { gap: !!valueAsList })}
      style={{ maxWidth: valueAsList ? 300 : undefined }}
    >
      <div><T className="fw-bd tt-ce">{label}</T>:&nbsp;</div>
      {value}
    </div>
  );
  
  if (expand) {
    return (
      <div className={classNames('jk-col stretch jk-br-ie', { 'jk-pg-sm': !withoutPadding })}>
        {head}
        {children && (
          <div className="jk-pg-sm-l">
            {children}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className={classNames('jk-col stretch jk-br-ie', { 'jk-pg-sm': !withoutPadding })}>
      {head}
      {children && (
        <Tooltip
          content={<div className="">{children}</div>}
          placement="bottom"
        >
          <div className="jk-row">&nbsp;<ExclamationIcon filledCircle className="cr-py" rotate={180} /></div>
        </Tooltip>
      )}
    </div>
  );
};

export const ExtraProblemInfo = ({ tags, author, centered, withoutPadding }: ProblemInfoProps) => {
  
  return (
    <>
      {!!tags.length && (
        <ContentInfo
          label="tags"
          value={Children.toArray(tags.filter(tag => !!tag.trim()).map(tag => (
            <><span className="jk-tag gray-6"><T>{tag}</T></span>&nbsp;</>
          )))}
          valueAsList
          centered={centered}
          withoutPadding={withoutPadding}
        />
      )}
      {author && (
        <ContentInfo
          label="author"
          value={author}
          centered={centered}
          withoutPadding={withoutPadding}
        />
      )}
    </>
  );
};

export const ProblemTypeInfo = ({ settings, centered, withoutPadding }: {
  settings: ProblemSettingsType,
  centered?: boolean,
  withoutPadding?: boolean
}) => {
  return (
    <ContentInfo
      label="type"
      value={<T className="tt-ce">{PROBLEM_TYPE[settings?.type]?.label}</T>}
      centered={centered}
      withoutPadding={withoutPadding}
    />
  );
};

export const ProblemModeInfo = ({ settings, expand, centered, withoutPadding }: {
  settings: ProblemSettingsType,
  expand?: boolean,
  centered?: boolean,
  withoutPadding?: boolean,
}) => {
  
  const subTasks = (
    <>
      {Object.keys(settings?.pointsByGroups || {}).map(key => (key === '0' ? null :
          <div key={key} className="jk-row left nowrap">
            {key === '0'
              ? <span className="label tt-ce fw-bd"><T className="ws-np">sample cases</T>: </span>
              : <span className="label tt-ce fw-bd"><T>subtask</T> {key}: </span>}
            &nbsp;{settings?.pointsByGroups[+key].points}&nbsp;<T>points</T>
          </div>
      ))}
      <div className="jk-divider tiny" style={{ height: '2px' }} />
      <div className="jk-row left nowrap">
        <span className="label tt-ce fw-bd"><T>total</T>:&nbsp;</span>
        {Object.values(settings?.pointsByGroups || {})
          .reduce((sum, { points }) => +sum + +points, 0)}&nbsp;<T>points</T>
      </div>
    </>
  );
  
  return (
    <ContentInfo
      label="mode"
      value={<T className="tt-ce">{PROBLEM_MODE[settings?.scoringMode]?.label}</T>}
      expand={expand}
      centered={centered}
      withoutPadding={withoutPadding}
    >
      {settings?.scoringMode === ProblemScoringMode.SUBTASK ? subTasks : null}
    </ContentInfo>
  );
};

export const timeFixed = (milliseconds: number) => {
  milliseconds /= 1000;
  const label = <T>{milliseconds === 1 ? 'second' : 'seconds'}</T>;
  if (milliseconds === ~~milliseconds) {
    return <>{milliseconds}&nbsp;{label}</>;
  } else {
    return <>{milliseconds.toFixed(1)}&nbsp;{label}</>;
  }
};

export const ProblemTimeLimitInfo = ({ settings, expand, centered, withoutPadding }: {
  settings: ProblemSettingsType,
  expand?: boolean,
  centered?: boolean,
  withoutPadding?: boolean,
}) => {
  
  const limitsLanguages = Object.values(settings?.byProgrammingLanguage || {})
    .filter(({ timeLimit }) => timeLimit !== settings.timeLimit);
  
  const body = limitsLanguages.map((language) => (
    <div key={language.language} className="jk-row nowrap left">
      <span className="fw-bd">{PROGRAMMING_LANGUAGE[language.language]?.label}:</span>
      {timeFixed(language?.timeLimit)}
    </div>
  ));
  
  return (
    <ContentInfo
      label={!!limitsLanguages.length ? 'time limit general' : 'time limit'}
      value={timeFixed(settings?.timeLimit)}
      expand={expand}
      centered={centered}
      withoutPadding={withoutPadding}
    >
      {!!limitsLanguages.length ? body : null}
    </ContentInfo>
  );
};

export const memoryFixed = (kbs: number) => {
  kbs /= 1000;
  const label = <T>{kbs === 1 ? 'MB' : 'MB'}</T>;
  if (kbs === ~~kbs) {
    return <>{kbs}&nbsp;{label}</>;
  } else {
    return <>{kbs.toFixed(1)}&nbsp;{label}</>;
  }
};

export const ProblemMemoryLimitInfo = ({ settings, expand, centered, withoutPadding }: {
  settings: ProblemSettingsType,
  expand?: boolean,
  centered?: boolean,
  withoutPadding?: boolean,
}) => {
  
  const limitsLanguages = Object.values(settings?.byProgrammingLanguage || {})
    .filter(({ memoryLimit, timeLimit }) => memoryLimit !== settings.memoryLimit);
  
  const body = limitsLanguages.map((language) => (
    <div key={language.language} className="jk-row nowrap left">
      <span className="fw-bd">{PROGRAMMING_LANGUAGE[language.language]?.label}:</span>
      {memoryFixed(language?.memoryLimit)}
    </div>
  ));
  
  return (
    <ContentInfo
      label={!!limitsLanguages.length ? 'memory limit general' : 'memory limit'}
      value={memoryFixed(settings?.memoryLimit)}
      expand={expand}
      centered={centered}
      withoutPadding={withoutPadding}
    >
      {!!limitsLanguages.length ? body : null}
    </ContentInfo>
  );
};

export const JukiProblemInfo = (props: PropsWithChildren<ProblemInfoProps>) => {
  
  const { settings, expand, asPopover, centered, withoutPadding, children } = props;
  
  return (
    <div className={classNames('jk-br-ie jk-col stretch', { 'jk-pg-sm gap': !asPopover, gap: !!withoutPadding })}>
      <ProblemTimeLimitInfo settings={settings} expand={expand} centered={centered} withoutPadding={withoutPadding} />
      <ProblemMemoryLimitInfo settings={settings} expand={expand} centered={centered} withoutPadding={withoutPadding} />
      <ProblemTypeInfo settings={settings} centered={centered} withoutPadding={withoutPadding} />
      <ProblemModeInfo settings={settings} expand={expand} centered={centered} withoutPadding={withoutPadding} />
      <ExtraProblemInfo {...props} />
      {children}
    </div>
  );
};

export const ProblemInfo = ({ problem }: { problem: ProblemDataResponseDTO }) => {
  return (
    <Popover
      content={!problem.judge?.isExternal
        ? (
          <div className="jk-pg-sm">
            <JukiProblemInfo
              author={problem.author}
              tags={problem.tags}
              settings={problem.settings}
              expand
              asPopover
              withoutPadding
            />
          </div>
        ) : (
          <div className="jk-row extend top">
            <div
              className={`${problem.judge?.key}-statement only-info`}
              dangerouslySetInnerHTML={{ __html: problem.statement.html[Language.EN] || problem.statement.html[Language.ES] }}
            />
          </div>
        )}
      triggerOn="click"
      placement="bottom"
    >
      <div className="jk-row link">
        <ExclamationIcon filledCircle className="cr-py" rotate={180} />
      </div>
    </Popover>
  );
};
