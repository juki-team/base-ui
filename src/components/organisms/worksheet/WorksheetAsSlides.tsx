import {
  ContentResponseType,
  getUserKey,
  getWorksheetsInPages,
  WorksheetUserSubmissionsResponseDTO,
} from '@juki-team/commons';
import React, { useMemo } from 'react';
import { useFetcher } from '../../../hooks';
import { jukiApiManager } from '../../../settings';
import { useUserStore } from '../../../stores/user/useUserStore';
import { MdMath } from '../mdMath/viewer/MdMath';
import { WorksheetNode } from './sheets/WorksheetNode';
import { UserResultsType, WorksheetAsSlidesProps } from './types';

export const WorksheetAsSlides = (props: WorksheetAsSlidesProps) => {
  
  const {
    worksheet: { content, quiz: { enable: quizEnable }, key: worksheetKey },
    resultsUserKey,
    readOnly = false,
  } = props;
  
  const userNickname = useUserStore(state => state.user.nickname);
  const companyKey = useUserStore(state => state.company.key);
  const userIsLogged = useUserStore(state => state.user.isLogged);
  const {
    data: userResultsData,
    mutate: userResultsMutate,
    isLoading: userResultsIsLoading,
    isValidating: userResultsIsValidating,
  } = useFetcher<ContentResponseType<WorksheetUserSubmissionsResponseDTO>>(worksheetKey && quizEnable && userIsLogged ? jukiApiManager.API_V1.worksheet.getSubmissionsUser({
    params: {
      key: worksheetKey,
      userKey: resultsUserKey || getUserKey(userNickname, companyKey),
    },
  }).url : null);
  
  const userResults: UserResultsType = useMemo(() => ({
    data: userResultsData?.success ? userResultsData.content : undefined,
    isLoading: userResultsIsLoading,
    isValidating: userResultsIsValidating,
    mutate: userResultsMutate,
  }), [ userResultsData, userResultsIsLoading, userResultsIsValidating, userResultsMutate ]);
  
  const sheetsInPages = useMemo(() => getWorksheetsInPages(content), [ content ]);
  
  return sheetsInPages.map((sheet) => (
    [
      [
        <section
          data-auto-animate
          style={{ overflow: 'hidden auto', maxHeight: '100%' }}
          data-background-image={'https://images.juki.pub/posters/ada-slide-title.jpg'}
        >
          <MdMath source={sheet.header.title} />
        </section>,
      ],
      sheet.content.map((chunk, index) => (
        <section
          data-auto-animate
          style={{ overflow: 'hidden auto', maxHeight: '100%' }}
          data-background-image={'https://images.juki.pub/posters/ada-slide-cover.jpg'}
        >
          <WorksheetNode
            key={chunk.id}
            sheet={sheet.content}
            userResults={userResults}
            readOnly={readOnly}
            isSolvable={quizEnable}
            worksheetKey={worksheetKey}
            asSlides
            index={index}
            length={sheet.content.length}
          />
        </section>
      )),
    ]
  )).flat(2);
};
