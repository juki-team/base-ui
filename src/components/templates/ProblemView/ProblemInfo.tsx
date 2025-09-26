import {
  CODE_LANGUAGE,
  Judge,
  Language,
  PROBLEM_MODE,
  PROBLEM_TYPE,
  ProblemScoringMode,
  type ProblemSettingsType,
} from '@juki-team/commons';
import { Children, Fragment, type PropsWithChildren, type ReactNode } from 'react';
import { classNames } from '../../helpers';
import { Popover, T } from '../../atoms';
import { ExclamationIcon, InfoIIcon } from '../../server';
import type { ProblemInfoProps } from './types';

export interface JukiProblemInfoProps {
  settings: ProblemSettingsType,
  tags: string[],
  author: string,
  expand?: boolean,
  asPopover?: boolean,
  centered?: boolean,
  withoutPadding?: boolean,
}

function ContentInfo(props: PropsWithChildren<{
  label: string,
  value: ReactNode,
  expand?: boolean,
  valueAsList?: boolean,
  centered?: boolean,
  withoutPadding?: boolean,
}>) {
  
  const { label, value, children, expand, valueAsList, centered, withoutPadding } = props;
  
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
        <Popover
          popoverClassName="bc-we jk-br-ie elevation-1"
          content={children}
          placement="bottom"
        >
          <div className="jk-row">
            &nbsp;<ExclamationIcon filledCircle className="cr-py" rotate={180} />
          </div>
        </Popover>
      )}
    </div>
  );
}

function ExtraProblemInfo({ tags, author, centered, withoutPadding }: JukiProblemInfoProps) {
  
  return (
    <>
      {!!tags.length && (
        <ContentInfo
          label="tags"
          value={Children.toArray(tags.filter(tag => !!tag.trim()).map(tag => (
            <Fragment key={tag}><span className="jk-tag bc-g6"><T>{tag}</T></span>&nbsp;</Fragment>
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
}

export function ProblemTypeInfo(props: {
  settings: ProblemSettingsType,
  centered?: boolean,
  withoutPadding?: boolean
}) {
  
  const { settings, centered, withoutPadding } = props;
  
  return (
    <ContentInfo
      label="type"
      value={<T className="tt-ce">{PROBLEM_TYPE[settings?.type]?.label}</T>}
      centered={centered}
      withoutPadding={withoutPadding}
    />
  );
}

export function ProblemModeInfo({ settings, expand, centered, withoutPadding }: {
  settings: ProblemSettingsType,
  expand?: boolean,
  centered?: boolean,
  withoutPadding?: boolean,
}) {
  
  const subTasks = (
    <>
      {Object.keys(settings?.pointsByGroups || {}).map(key => (key === '0' ? null :
          <div key={key} className="jk-row left nowrap">
            {key === '0'
              ? <span className="label tt-ce fw-bd"><T className="ws-np">sample cases</T>: </span>
              : <span className="label tt-ce fw-bd"><T>subtask</T> {key}: </span>}
            &nbsp;{settings?.pointsByGroups[+key]!.points}&nbsp;<T>points</T>
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
}

const timeFixed = (milliseconds: number) => {
  milliseconds /= 1000;
  const label = <T>{milliseconds === 1 ? 'second' : 'seconds'}</T>;
  if (milliseconds === ~~milliseconds) {
    return <>{milliseconds}&nbsp;{label}</>;
  } else {
    return <>{milliseconds.toFixed(1)}&nbsp;{label}</>;
  }
};

export function ProblemTimeLimitInfo({ settings, expand, centered, withoutPadding }: {
  settings: ProblemSettingsType,
  expand?: boolean,
  centered?: boolean,
  withoutPadding?: boolean,
}) {
  
  const limitsLanguages = Object.values(settings?.byProgrammingLanguage || {})
    .filter(({ timeLimit }) => timeLimit !== settings.timeLimit);
  
  const body = limitsLanguages.map((language) => (
    <div key={language.language} className="jk-row nowrap left">
      <span className="fw-bd">{CODE_LANGUAGE[language.language]?.label}:</span>
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
}

const memoryFixed = (kbs: number) => {
  kbs /= 1000;
  const label = <T>{kbs === 1 ? 'MB' : 'MB'}</T>;
  if (kbs === ~~kbs) {
    return <>{kbs}&nbsp;{label}</>;
  } else {
    return <>{kbs.toFixed(1)}&nbsp;{label}</>;
  }
};

export function ProblemMemoryLimitInfo({ settings, expand, centered, withoutPadding }: {
  settings: ProblemSettingsType,
  expand?: boolean,
  centered?: boolean,
  withoutPadding?: boolean,
}) {
  
  const limitsLanguages = Object.values(settings?.byProgrammingLanguage || {})
    .filter(({ memoryLimit }) => memoryLimit !== settings.memoryLimit);
  
  const body = limitsLanguages.map((language) => (
    <div key={language.language} className="jk-row nowrap left">
      <span className="fw-bd">{CODE_LANGUAGE[language.language]?.label}:</span>
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
}

export function JukiProblemInfo(props: PropsWithChildren<JukiProblemInfoProps>) {
  
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
}

export function ProblemInfo({ problem }: ProblemInfoProps) {
  
  if (problem.judge.key === Judge.LEETCODE) {
    return null;
  }
  
  return (
    <Popover
      popoverClassName="bc-we jk-br-ie elevation-1"
      content={!problem.judge?.isExternal
        ? (
          <div className="jk-pg-xsm">
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
          <div className="jk-row extend top jk-pg-xsm">
            <div
              className={`${problem.judge?.key}-statement only-info`}
              dangerouslySetInnerHTML={{ __html: problem.statement.html[Language.EN] || problem.statement.html[Language.ES] }}
            />
          </div>
        )}
      placement="bottom"
    >
      <div className="jk-row link">
        <InfoIIcon filledCircle className="cr-py" color="var(--t-color-primary-text)" />
      </div>
    </Popover>
  );
}
