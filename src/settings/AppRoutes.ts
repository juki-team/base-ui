import { persistGlobalURLSearchParams } from '../helpers/router';
import { ContestTab, ProblemTab, ProfileTab, WorksheetTab } from '../types';

const injectOrigin = (origin: string, path: string) => {
  return `${origin ? origin : ''}${path}`;
};

const injectGlobalURLSearchParams = (pathUrl: string) => {
  const url = new URL('https://juki.app' + pathUrl);
  
  const newSp = persistGlobalURLSearchParams(url.searchParams);
  if (newSp) {
    return url.pathname + '?' + newSp;
  }
  return url.pathname;
};

const igu = injectGlobalURLSearchParams;

export class AppRoutes {
  public JUDGE(_origin?: string) {
    
    const origin = _origin ?? '';
    
    return {
      home() {
        return igu('/');
      },
      profiles: {
        view({ nickname, tab = ProfileTab.OVERVIEW }: { nickname: string, tab?: ProfileTab }) {
          return injectOrigin(origin, igu(`/profiles/${nickname}${tab ? `?tab=${tab}` : ''}`));
        },
      },
      problems: {
        list() {
          return injectOrigin(origin, igu(`/problems`));
        },
        view({ key, tab = ProblemTab.STATEMENT }: { key: string, tab?: ProblemTab }) {
          return injectOrigin(origin, igu(`/problems/${key}${tab ? `?tab=${tab}` : ''}`));
        },
        edit({ key, tab = ProblemTab.STATEMENT }: { key: string, tab?: ProblemTab }) {
          return injectOrigin(origin, igu(`/problems/${key}/edit${tab ? `?tab=${tab}` : ''}`));
        },
        new({ judge, tab }: { judge: string, tab?: ProblemTab }) {
          return injectOrigin(origin, igu(`/problems/new?judge=${judge}${tab ? `&tab=${tab}` : ''}`));
        },
      },
      contests: {
        list() {
          return injectOrigin(origin, igu(`/contests`));
        },
        view({ key, tab = ContestTab.OVERVIEW, subTab }: { key: string, tab?: ContestTab, subTab?: string }) {
          return injectOrigin(origin, igu(`/contests/${key}${tab ? `?tab=${tab}` : ''}${subTab ? (tab ? '&' : '?') + `subTab=${subTab}` : ''}`));
        },
        edit({ key, tab = ContestTab.OVERVIEW }: { key: string, tab?: ContestTab }) {
          return injectOrigin(origin, igu(`/contests/${key}/edit${tab ? `?tab=${tab}` : ''}`));
        },
        new({ tab }: { tab?: ContestTab } | void = { tab: undefined }) {
          return injectOrigin(origin, igu(`/contests/new${tab ? `?tab=${tab}` : ''}`));
        },
      },
      submissions: {
        view({ id }: { id: string }) {
          return injectOrigin(origin, igu(`/submissions/${id}`));
        },
      },
      boards: {
        page() {
          return injectOrigin(origin, igu(`/boards`));
        },
      },
      ide: {
        page() {
          return injectOrigin(origin, igu(`/ide`));
        },
      },
    };
  }
  
  public COACH(_origin?: string) {
    
    const origin = _origin ?? '';
    
    return {
      home() {
        return igu('/');
      },
      worksheets: {
        list() {
          return injectOrigin(origin, igu(`/worksheets`));
        },
        view({ key, page = 1 }: { key: string, page?: number }) {
          return injectOrigin(origin, igu(`/worksheets/${key}${page ? `?page=${page}` : ''}`));
        },
        edit({ key, tab, from }: { key: string, tab: WorksheetTab, from?: string }) {
          return injectOrigin(origin, igu(`/worksheets/${key}/edit?tab=${tab}${from ? `&from=${from}` : ''}`));
        },
        new({ tab }: { tab: WorksheetTab, }) {
          return injectOrigin(origin, igu(`/worksheets/new?tab=${tab}`));
        },
      },
      classes: {
        list() {
          return injectOrigin(origin, igu(`/classes`));
        },
        view({ key }: { key: string }) {
          return injectOrigin(origin, igu(`/classes/${key}`));
        },
        cycleView({ key, cycleId }: { key: string, cycleId: string }) {
          return injectOrigin(origin, igu(`/classes/${key}/cycle/${cycleId}`));
        },
        edit({ key }: { key: string }) {
          return injectOrigin(origin, igu(`/classes/${key}/edit`));
        },
        new() {
          return injectOrigin(origin, igu(`/classes/new`));
        },
      },
      courses: {
        list() {
          return injectOrigin(origin, igu(`/courses`));
        },
        view({ key }: { key: string }) {
          return injectOrigin(origin, igu(`/courses/${key}`));
        },
        lessonView({ key, lessonIndex, page = 1 }: { key: string, lessonIndex: number, page?: number }) {
          return injectOrigin(origin, igu(`/courses/${key}/lessons/${lessonIndex}${page ? `?page=${page}` : ''}`));
        },
        edit({ key }: { key: string }) {
          return injectOrigin(origin, igu(`/courses/${key}/edit`));
        },
        new() {
          return injectOrigin(origin, igu(`/courses/new`));
        },
      },
      profiles: {
        view({ nickname, tab = ProfileTab.OVERVIEW }: { nickname: string, tab?: ProfileTab }) {
          return injectOrigin(origin, igu(`/profiles/${nickname}${tab ? `?tab=${tab}` : ''}`));
        },
      },
    };
  }
  
}
