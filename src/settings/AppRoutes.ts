import { persistGlobalURLSearchParams } from '../helpers';
import { ContestTab, ProblemTab, ProfileTab } from '../types';

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
          return igu(injectOrigin(origin, `/profiles/${nickname}?tab=${tab}`));
        },
      },
      problems: {
        list() {
          return igu(injectOrigin(origin, `/problems`));
        },
        view({ key, tab = ProblemTab.STATEMENT }: { key: string, tab?: ProblemTab }) {
          return igu(injectOrigin(origin, `/problems/${key}?tab=${tab}`));
        },
        edit({ key, tab = ProblemTab.STATEMENT }: { key: string, tab?: ProblemTab }) {
          return igu(injectOrigin(origin, `/problems/${key}/edit?tab=${tab}`));
        },
        new() {
          return igu(injectOrigin(origin, `/problems/new`));
        },
      },
      contests: {
        list() {
          return igu(injectOrigin(origin, `/contests`));
        },
        view({ key, tab = ContestTab.OVERVIEW, subTab }: { key: string, tab?: ContestTab, subTab?: string }) {
          return igu(injectOrigin(origin, `/contests/${key}?tab=${tab}${subTab ? '&subTab=' + subTab : ''}`));
        },
        edit({ key, tab = ContestTab.OVERVIEW }: { key: string, tab?: ContestTab }) {
          return igu(injectOrigin(origin, `/contests/${key}/edit?tab=${tab}`));
        },
        new() {
          return igu(injectOrigin(origin, `/contests/new`));
        },
      },
      submissions: {
        view({ id }: { id: string }) {
          return igu(injectOrigin(origin, `/submissions/${id}`));
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
          return igu(injectOrigin(origin, `/worksheets`));
        },
        view({ key, page = 1 }: { key: string, page?: number }) {
          return igu(injectOrigin(origin, `/worksheets/${key}?page=${page}`));
        },
        edit({ key }: { key: string }) {
          return igu(injectOrigin(origin, `/worksheets/${key}/edit`));
        },
        new() {
          return igu(injectOrigin(origin, `/worksheets/new`));
        },
      },
      classes: {
        list() {
          return igu(injectOrigin(origin, `/classes`));
        },
        view({ key }: { key: string }) {
          return igu(injectOrigin(origin, `/classes/${key}`));
        },
        cycleView({ key, cycleId }: { key: string, cycleId: string }) {
          return igu(injectOrigin(origin, `/classes/${key}/cycle/${cycleId}`));
        },
        edit({ key }: { key: string }) {
          return igu(injectOrigin(origin, `/classes/${key}/edit`));
        },
        new() {
          return igu(injectOrigin(origin, `/classes/new`));
        },
      },
      courses: {
        list() {
          return igu(injectOrigin(origin, `/courses`));
        },
        view({ key }: { key: string }) {
          return igu(injectOrigin(origin, `/courses/${key}`));
        },
        lessonView({ key, lessonIndex, lessonPage = 1 }: { key: string, lessonIndex: number, lessonPage?: number }) {
          return igu(injectOrigin(origin, `/courses/${key}/lessons/${lessonIndex}?page=${lessonPage}`));
        },
        edit({ key }: { key: string }) {
          return igu(injectOrigin(origin, `/courses/${key}/edit`));
        },
        new() {
          return igu(injectOrigin(origin, `/courses/new`));
        },
      },
      profiles: {
        view({ nickname, tab = ProfileTab.OVERVIEW }: { nickname: string, tab?: ProfileTab }) {
          return igu(injectOrigin(origin, `/profiles/${nickname}?tab=${tab}`));
        },
      },
    };
  }
  
}
