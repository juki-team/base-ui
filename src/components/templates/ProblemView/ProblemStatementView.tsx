import { Language, ProblemScoringMode, ProfileSetting, Status } from '@juki-team/commons';
import React from 'react';
import {
  classNames,
  downloadBlobAsFile,
  downloadWebsiteAsPdf,
  getLocalToken,
  getStatementData,
} from '../../../helpers';
import { useJukiUser, useT } from '../../../hooks';
import { DownloadIcon, T } from '../../atoms';
import { ButtonLoader, FloatToolbar } from '../../molecules';
import { MdMathViewer } from '../../organisms/mdMath';
import { image64 } from './image64';
import {
  JukiProblemInfo,
  ProblemInfo,
  ProblemMemoryLimitInfo,
  ProblemModeInfo,
  ProblemTimeLimitInfo,
  ProblemTypeInfo,
} from './ProblemInfo';
import { SampleTest } from './SampleTest';
import { ProblemStatementViewProps } from './types';

export const ProblemStatementView = ({
                                       problem,
                                       contest,
                                       infoPlacement,
                                       withoutName,
                                       forPrinting,
                                     }: ProblemStatementViewProps) => {
  
  const {
    judge: { key: judgeKey, isExternal },
    key: problemKey,
    name,
    settings,
    tags,
    author,
    statement,
    company: { key: problemCompanyKey },
  } = problem;
  
  const {
    user: {
      settings: {
        [ProfileSetting.LANGUAGE]: preferredLanguage,
        // [ProfileSetting.THEME]: preferredTheme,
      },
    },
  } = useJukiUser();
  const { t } = useT();
  const problemName = contest?.index ? `(${t('problem')} ${contest?.index}) ${name}` : `(${t('id')} ${problemKey}) ${name}`;
  const {
    statementDescription,
    statementInput,
    statementOutput,
    statementNote,
    mdStatement,
  } = getStatementData(t, { statement, settings }, preferredLanguage, problemName);
  
  if (isExternal) {
    return (
      <div className="jk-row extend top" style={{ overflow: 'auto', height: '100%', width: '100%' }}>
        <div
          className="jk-row extend top gap nowrap stretch left"
          style={{ position: 'relative' }}
        >
          {/*{contest && (*/}
          {/*  <ProblemLetter*/}
          {/*    index={contest.index}*/}
          {/*    color={contest.color}*/}
          {/*    style={{ position: 'absolute', top: 'var(--pad-m)', left: 'var(--pad-m)' }}*/}
          {/*  />*/}
          {/*)}*/}
          <div
            className={`${judgeKey}-statement`}
            dangerouslySetInnerHTML={{ __html: statement.html[Language.EN] || statement.html[Language.ES] }}
          />
        </div>
      </div>
    );
  }
  
  const handleDownloadPdf = async () => {
    await downloadWebsiteAsPdf(
      // TODO: change with env vars
      `https://${problemCompanyKey}.jukijudge.com/problems/${problemKey}?tab=statement&TOKEN=${getLocalToken()}&print-mode=asProblemSet`,
      `Juki Judge ${problemName}.pdf`,
      {
        format: 'letter',
        margin: {
          top: '64px',
          bottom: '32px',
          left: '32px',
          right: '32px',
        },
        headerTemplate: `<div style="width: 100%; font-size: 16px; font-weight: 300; display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: 0 32px;">
         <div style="width: 100%; display: flex; align-items: center; justify-content: space-between;">
           <div style="display: flex; gap: 8px; padding-left: 24px; align-items: center; justify-content: center;">
             ${image64}
             <div style="color: color(srgb 0.0911765 0.258824 0.432353); font-weight: 700;">${problem.judge.name}</div>
           </div>
           <div style="color: color(srgb 0.0911765 0.258824 0.432353); padding-right: 24px;">${problem.name}</div>
         </div>
         <div style="border-bottom: 1px solid rgba(0, 1, 2, 0.4); width: 100%; padding-top: 12px;"></div>
       </div>`,
        footerTemplate: `<div style="width: 100%; padding: 0 0 12px 0; font-size: 16px; font-weight: 300;" class="jk-row beet space-between">
         <div style="text-align: center; width: 100%;">
           <span class="tt-se">${t('page')}</span> <span class="pageNumber"></span> ${t('of')} <span class="totalPages"></span>
         </div>
       </div>`,
      },
    );
  };
  
  const handleDownloadMd = async () => {
    downloadBlobAsFile(new Blob([ mdStatement ], { type: 'text/plain' }), `Juki Judge ${problemName}.md`);
  };
  
  return (
    <div className="jk-row extend top">
      <div className="jk-row extend top gap nowrap stretch left">
        <div className="jk-col top stretch flex-3">
          {!forPrinting && infoPlacement !== 'left' && (
            <FloatToolbar
              actionButtons={[
                {
                  icon: <DownloadIcon />,
                  buttons: [
                    {
                      icon: <DownloadIcon />,
                      label: <T>pdf</T>,
                      onClick: handleDownloadPdf,
                    },
                    {
                      icon: <DownloadIcon />,
                      label: <T>jk md</T>,
                      onClick: handleDownloadMd,
                    },
                  ],
                },
              ]}
            />
          )}
          {!withoutName && (
            <div className={classNames({ 'jk-row gap': !forPrinting, 'jk-col block': !!forPrinting }, 'center')}>
              <h3>{problem.name}</h3>
              {infoPlacement === 'name' && <ProblemInfo problem={problem} />}
              {forPrinting && (
                <div className="jk-col" style={{ width: '100%' }}>
                  <div className="jk-row gap extend center">
                    <ProblemTimeLimitInfo settings={settings} expand withoutPadding />
                    <ProblemMemoryLimitInfo settings={settings} expand withoutPadding />
                  </div>
                  <div className="jk-row gap extend center">
                    <ProblemTypeInfo settings={settings} withoutPadding />
                    <ProblemModeInfo settings={settings} expand withoutPadding />
                  </div>
                </div>
              )}
            </div>
          )}
          <div>
            <h3><T>description</T></h3>
            <div className="bc-we jk-pg-sm jk-br-ie">
              <MdMathViewer source={statementDescription} />
            </div>
          </div>
          {!!statementInput && (
            <div>
              <h3><T>input</T></h3>
              <div className="bc-we jk-pg-sm jk-br-ie">
                <MdMathViewer source={statementInput} />
              </div>
            </div>
          )}
          {!!statementOutput && (
            <div>
              <h3><T>output</T></h3>
              <div className="bc-we jk-pg-sm jk-br-ie">
                <MdMathViewer source={statementOutput} />
              </div>
            </div>
          )}
          {settings.scoringMode === ProblemScoringMode.SUBTASK && (
            <div>
              <h3><T>subtasks description</T></h3>
              <div className="jk-col left stretch gap">
                {Object.values(settings.pointsByGroups).map(pointsByGroup => (
                  <div className="jk-row extend gap" key={pointsByGroup.group}>
                    <div className="flex-1 bc-we jk-pg-sm jk-br-ie">
                      <div className="fw-bd cr-pd">
                        <T className="tt-se">subtask</T> {pointsByGroup.group}
                        &nbsp;({pointsByGroup.points}&nbsp;
                        {pointsByGroup.points === 1
                          ? <T className="tt-se">point</T>
                          : <T className="tt-se">points</T>})
                      </div>
                      <MdMathViewer
                        source={pointsByGroup.description?.[preferredLanguage] || pointsByGroup.description?.[Language.EN] || pointsByGroup.description?.[Language.ES]}
                      />
                    </div>
                  </div>
                ))}
                <div></div>
              </div>
            </div>
          )}
          <div className="jk-row stretch gap">
            <div className="jk-row stretch gap nowrap flex-1 jk-pg-sm-tb">
              {/*<h3><T>output sample</T></h3>*/}
              <div className="jk-row"><T className="tt-se tx-h cr-pd fw-bd">input sample</T></div>
              <div className="jk-row"><T className="tt-se tx-h cr-pd fw-bd">output sample</T></div>
            </div>
          
          </div>
          <div className="jk-col stretch gap">
            {(statement.sampleCases || [ { input: '', output: '' } ]).map((sample, index) => (
              <SampleTest
                index={index}
                sampleCases={statement.sampleCases}
                key={index}
                withPE={problem.settings.withPE}
                forPrinting={!!forPrinting}
              />
            ))}
          </div>
          {!!statementNote && (
            <div>
              <h3><T>note</T></h3>
              <div className="bc-we jk-pg-sm jk-border-radius-inline">
                <MdMathViewer source={statementNote} />
              </div>
            </div>
          )}
        </div>
        {!forPrinting && infoPlacement === 'left' && (
          <div className="screen md lg hg flex-1">
            <JukiProblemInfo
              settings={settings}
              tags={tags}
              author={author}
              expand
            >
              <ButtonLoader
                size="small"
                icon={<DownloadIcon />}
                onClick={async (setLoaderStatus) => {
                  setLoaderStatus(Status.LOADING);
                  try {
                    await handleDownloadPdf();
                    setLoaderStatus(Status.SUCCESS);
                  } catch (error) {
                    setLoaderStatus(Status.ERROR);
                  }
                }}
              >
                <T>download as pdf</T>
              </ButtonLoader>
              <ButtonLoader
                size="small"
                icon={<DownloadIcon />}
                onClick={async (setLoaderStatus) => {
                  setLoaderStatus(Status.LOADING);
                  try {
                    await handleDownloadMd();
                    setLoaderStatus(Status.SUCCESS);
                  } catch (error) {
                    setLoaderStatus(Status.ERROR);
                  }
                }}
              >
                <T>download as md</T>
              </ButtonLoader>
            </JukiProblemInfo>
          </div>
        )}
      </div>
    </div>
  );
};
