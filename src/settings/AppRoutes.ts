import { ContestTab, ProblemTab, ProfileTab } from '../types';

const injectOrigin = (origin: string, path: string) => {
  return `${origin ? origin : ''}${path}`;
};

export class AppRotes {
  public JUDGE(_origin?: string) {
    
    const origin = _origin ?? '';
    
    return {
      home() {
        return '';
      },
      profiles: {
        view({ nickname, tab = ProfileTab.OVERVIEW }: { nickname: string, tab?: ProfileTab }) {
          return injectOrigin(origin, `/profiles/${nickname}?tab=${tab}`);
        },
      },
      problems: {
        list() {
          return injectOrigin(origin, `/problems`);
        },
        view({ key, tab = ProblemTab.STATEMENT }: { key: string, tab?: ProblemTab }) {
          return injectOrigin(origin, `/problems/${key}?tab=${tab}`);
        },
        edit({ key }: { key: string }) {
          return injectOrigin(origin, `/problems/${key}/edit`);
        },
        new() {
          return injectOrigin(origin, `/problems/new`);
        },
      },
      contests: {
        list() {
          return injectOrigin(origin, `/contests`);
        },
        view({ key, tab = ContestTab.OVERVIEW, subTab }: { key: string, tab?: ContestTab, subTab?: string }) {
          return injectOrigin(origin, `/contests/${key}?tab=${tab}${subTab ? '&subTab=' + subTab : ''}`);
        },
        edit({ key }: { key: string }) {
          return injectOrigin(origin, `/contests/${key}/edit`);
        },
        new() {
          return injectOrigin(origin, `/contests/new`);
        },
      },
      submissions: {
        view({ id }: { id: string }) {
          return injectOrigin(origin, `/submissions/${id}`);
        },
      },
    };
  }
  
  public COACH(_origin?: string) {
    
    const origin = _origin ?? '';
    
    return {
      home() {
        return '';
      },
      worksheets: {
        list() {
          return injectOrigin(origin, `/worksheets`);
        },
        view({ key, page = 1 }: { key: string, page?: number }) {
          return injectOrigin(origin, `/worksheets/${key}?page=${page}`);
        },
        edit({ key }: { key: string }) {
          return injectOrigin(origin, `/worksheets/${key}/edit`);
        },
        new() {
          return injectOrigin(origin, `/worksheets/new`);
        },
      },
      classes: {
        list() {
          return injectOrigin(origin, `/classes`);
        },
        view({ key }: { key: string }) {
          return injectOrigin(origin, `/classes/${key}`);
        },
        cycleView({ key, cycleId }: { key: string, cycleId: string }) {
          return injectOrigin(origin, `/classes/${key}/cycle/${cycleId}`);
        },
        edit({ key }: { key: string }) {
          return injectOrigin(origin, `/classes/${key}/edit`);
        },
        new() {
          return injectOrigin(origin, `/classes/new`);
        },
      },
      courses: {
        list() {
          return injectOrigin(origin, `/courses`);
        },
        view({ key }: { key: string }) {
          return injectOrigin(origin, `/courses/${key}`);
        },
        lessonView({ key, lessonIndex, lessonPage = 1 }: { key: string, lessonIndex: number, lessonPage?: number }) {
          return injectOrigin(origin, `/courses/${key}/lessons/${lessonIndex}?page=${lessonPage}`);
        },
        edit({ key }: { key: string }) {
          return injectOrigin(origin, `/courses/${key}/edit`);
        },
        new() {
          return injectOrigin(origin, `/courses/new`);
        },
      },
    };
  }
  
}
