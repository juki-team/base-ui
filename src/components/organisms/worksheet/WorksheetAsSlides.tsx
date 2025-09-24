import {
  ContentResponseType,
  getUserKey,
  getWorksheetsInPages,
  WorksheetUserSubmissionsResponseDTO,
} from '@juki-team/commons';
import { useMemo } from 'react';
import { jukiApiManager } from '../../../settings';
import { useUserStore } from '../../../stores/user/useUserStore';
import { DetectRequestAnimationFrame } from '../../atoms/DetectRequestAnimationFrame/DetectRequestAnimationFrame';
import { useFetcher } from '../../hooks';
import { UserResultsType } from '../../types/commons';
import { MdMath } from '../mdMath/viewer/MdMath';
import { WorksheetNode } from './sheets/WorksheetNode';
import type { WorksheetAsSlidesProps } from './types';

export const WorksheetAsSlides = (props: WorksheetAsSlidesProps) => {
  
  const {
    worksheet: { content, quiz: { enable: quizEnable }, key: worksheetKey, slides },
    resultsUserKey,
    readOnly = false,
    page,
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
  
  let sheetsInPages = useMemo(() => getWorksheetsInPages(content), [ content ]);
  
  if (typeof page === 'number' && page >= 0 && page < sheetsInPages.length && sheetsInPages[page]) {
    const sheet = sheetsInPages[page];
    sheetsInPages = [ sheet ];
  }
  
  return sheetsInPages.map((sheet) => (
    [
      [
        <section
          key={sheet.header.id + sheet.header.title}
          data-auto-animate
          style={{ overflow: 'hidden auto', maxHeight: '100%' }}
          data-background-image={slides.titleBackgroundImage}
        >
          <DetectRequestAnimationFrame name="WorksheetAsSlides" />
          <MdMath source={sheet.header.title} detectRequestAnimationFrame />
        </section>,
      ],
      sheet.content.map((chunk, index) => (
        <section
          key={chunk.id + index}
          data-auto-animate
          style={{ overflow: 'hidden auto', maxHeight: '100%' }}
          data-background-image={slides.backgroundImage}
        >
          <WorksheetNode
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
