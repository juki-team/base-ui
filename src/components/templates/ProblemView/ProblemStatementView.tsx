import {
  Judge,
  Language,
  ProblemDataResponseDTO,
  ProblemScoringMode,
  ProfileSetting,
  Status,
} from '@juki-team/commons';
import React from 'react';
import { downloadBlobAsFile, downloadJukiMarkdownAsPdf, getStatementData } from '../../../helpers';
import { useJukiUser, useT } from '../../../hooks';
import { DownloadIcon, T } from '../../atoms';
import { ButtonLoader, FloatToolbar } from '../../molecules';
import { MdMathViewer } from '../../organisms/mdMath';
import { JukiProblemInfo, ProblemInfo } from '../ProblemInfo';
import { SampleTest } from './SampleTest';

export interface ProblemStatementViewProps {
  problem: ProblemDataResponseDTO,
  contest?: { index: string, color: string },
  infoPlacement: 'left' | 'name' | 'none',
  withoutName?: boolean,
}

export const ProblemStatementView = ({ problem, contest, infoPlacement, withoutName }: ProblemStatementViewProps) => {
  
  const { judge, key: problemKey, name, settings, tags, author, statement } = problem;
  const {
    user: {
      settings: {
        [ProfileSetting.LANGUAGE]: preferredLanguage,
        [ProfileSetting.THEME]: preferredTheme,
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
  
  if ([ Judge.CODEFORCES, Judge.JV_UMSA, Judge.CODEFORCES_GYM ].includes(judge)) {
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
            className={`${judge}-statement`}
            dangerouslySetInnerHTML={{ __html: statement.html[Language.EN] || statement.html[Language.ES] }}
          />
        </div>
      </div>
    );
  }
  
  const handleDownloadPdf = () => {
    return downloadJukiMarkdownAsPdf(mdStatement, preferredTheme, `Juki Judge ${problemName}.pdf`);
  };
  
  const handleDownloadMd = async () => {
    downloadBlobAsFile(new Blob([ mdStatement ], { type: 'text/plain' }), `Juki Judge ${problemName}.md`);
  };
  
  return (
    <div className="jk-row extend top">
      <div className="jk-row extend top gap nowrap stretch left">
        <div className="jk-col top stretch flex-3">
          {infoPlacement !== 'left' && (
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
                      label: <T>md</T>,
                      onClick: handleDownloadMd,
                    },
                  ],
                },
              ]}
            />
          )}
          {!withoutName && (
            <div className="jk-row gap center">
              <h3>{problem.name}</h3>
              {infoPlacement === 'name' && <ProblemInfo problem={problem} />}
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
          {settings.mode === ProblemScoringMode.SUBTASK && (
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
        {infoPlacement === 'left' && (
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
