import { ContentResponseType, Language, ProblemScoringMode, ProfileSetting, Status } from '@juki-team/commons';
import React from 'react';
import {
  authorizedRequest,
  classNames,
  cleanRequest,
  downloadBlobAsFile,
  downloadUrlAsFile,
  getStatementData,
} from '../../../../helpers';
import { useJukiNotification } from '../../../../hooks/useJukiNotification';
import { jukiApiManager } from '../../../../settings';
import { useI18nStore } from '../../../../stores/i18n/useI18nStore';
import { useUserStore } from '../../../../stores/user/useUserStore';
import { T } from '../../../atoms';
import { ButtonLoader, FloatToolbar } from '../../../molecules';
import { MdMathViewer } from '../../../organisms';
import { DownloadIcon } from '../../../server';
import {
  JukiProblemInfo,
  ProblemInfo,
  ProblemMemoryLimitInfo,
  ProblemModeInfo,
  ProblemTimeLimitInfo,
  ProblemTypeInfo,
} from '../ProblemInfo';
import { ProblemStatementViewProps } from '../types';
import { SampleTest } from './SampleTest';

export const ProblemStatementView = ({
                                       problem,
                                       contest,
                                       infoPlacement,
                                       withoutName,
                                       forPrinting,
                                       withoutDownloadButtons,
                                     }: ProblemStatementViewProps) => {
  
  const {
    judge: { key: judgeKey, isExternal, name: judgeName },
    key: problemKey,
    name,
    settings,
    tags,
    author,
    statement,
  } = problem;
  
  const userPreferredLanguage = useUserStore(state => state.user.settings?.[ProfileSetting.LANGUAGE]);
  const t = useI18nStore(state => state.i18n.t);
  const problemName = contest?.index ? `${contest?.index}. (${problemKey}) ${name}` : `(${problemKey}) ${name}`;
  const {
    statementDescription,
    statementInput,
    statementOutput,
    statementNote,
    mdStatement,
  } = getStatementData(t, { statement, settings }, userPreferredLanguage, problemName);
  const { addWarningNotification } = useJukiNotification();
  
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
    
    const { url, ...options } = jukiApiManager.API_V2.export.problem.statementToPdf({
      params: {
        key: problemKey,
        token: jukiApiManager.getToken(),
        language: userPreferredLanguage,
      },
    });
    const response = cleanRequest<ContentResponseType<{ urlExportedPDF: string }>>(
      await authorizedRequest(url, options),
    );
    
    if (response.success) {
      if (!response.content.urlExportedPDF) {
        return addWarningNotification(
          <div className="jk-col stretch" style={{ width: '100%' }}>
            <span className="tt-se">
              <T>{response.message}</T>
            </span>
          </div>,
        );
      }
      await downloadUrlAsFile('https://' + response.content.urlExportedPDF, `${judgeName} - ${problemName}`);
    } else {
      throw new Error('error on download pdf');
    }
  };
  
  const handleDownloadMd = async () => {
    downloadBlobAsFile(new Blob([ mdStatement ], { type: 'text/plain' }), `${judgeName} - ${problemName}.md`);
  };
  
  return (
    <div className="jk-row extend top">
      <div className="jk-row extend top gap nowrap stretch left">
        <div className="jk-col top stretch flex-3">
          {!forPrinting && infoPlacement !== 'left' && !withoutDownloadButtons && (
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
            <h3><T className="tt-se">description</T></h3>
            <div className="bc-we jk-pg-sm jk-br-ie">
              <MdMathViewer source={statementDescription} />
            </div>
          </div>
          {!!statementInput && (
            <div>
              <h3><T className="tt-se">input</T></h3>
              <div className="bc-we jk-pg-sm jk-br-ie">
                <MdMathViewer source={statementInput} />
              </div>
            </div>
          )}
          {!!statementOutput && (
            <div>
              <h3><T className="tt-se">output</T></h3>
              <div className="bc-we jk-pg-sm jk-br-ie">
                <MdMathViewer source={statementOutput} />
              </div>
            </div>
          )}
          {settings.scoringMode === ProblemScoringMode.SUBTASK && (
            <div>
              <h3><T className="tt-se">subtasks description</T></h3>
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
                        source={pointsByGroup.description?.[userPreferredLanguage] || pointsByGroup.description?.[Language.ES] || pointsByGroup.description?.[Language.EN]}
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
              <div className="jk-row"><T className="tt-se tx-h cr-th fw-bd">input sample</T></div>
              <div className="jk-row"><T className="tt-se tx-h cr-th fw-bd">output sample</T></div>
            </div>
          </div>
          <div className="jk-col stretch gap">
            {(statement.sampleCases || [ { input: '', output: '' } ]).map((_, index) => (
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
              <h3><T className="tt-se">note</T></h3>
              <div className="bc-we jk-pg-sm jk-border-radius-inline">
                <MdMathViewer source={statementNote} />
              </div>
            </div>
          )}
        </div>
        {!forPrinting && infoPlacement === 'left' && !withoutDownloadButtons && (
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
