import {
  EntityAccess,
  EntityState,
  Judge,
  ProblemScoringMode,
  ProblemType,
  ProgrammingLanguage,
} from '@juki-team/commons';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MockupJukiProvider } from '../../mockup';
import { ProblemView } from './ProblemView';

const meta: Meta<typeof ProblemView> = {
  component: ProblemView,
};

export default meta;

type Story = StoryObj<typeof ProblemView>;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <div className="jk-col gap">
        <div style={{ width: '100%', height: 600 }}>
          <ProblemView {...args} />
        </div>
      </div>
    </MockupJukiProvider>
  ),
};

Regular.args = {
  problem: {
    state: EntityState.RELEASED,
    name: 'B + A',
    judge: {
      key: Judge.JUKI_JUDGE,
      name: 'juki judge',
      isCustom: false,
      isExternal: false,
      isMain: false,
    },
    author: '',
    key: 'P-1000',
    ownerNickname: 'OscarGauss',
    statement: {
      description: {
        ES: 'La tarea es sumar dos números.',
        EN: '',
      },
      input: {
        ES: 'Se te daran dos numeros enteros a y b, ($-100000 \\leq a, b \\leq 100000$).',
        EN: '',
      },
      output: {
        ES: 'Debes imprimir la suma de los numeros enteros de la entrada',
        EN: '',
      },
      sampleCases: [
        {
          input: '1 3',
          output: '4\n',
        },
        {
          input: '4 -1',
          output: '3\n',
        },
        {
          input: '1012 -1012',
          output: '0\n',
        },
      ],
      note: {
        ES: '',
        EN: '',
      },
      html: {
        ES: '',
        EN: '',
      },
    },
    editorial: {
      ES: '  ',
      EN: '',
    },
    tags: [ 'new' ],
    settings: {
      timeLimit: 10000,
      memoryLimit: 512000,
      withPE: true,
      type: ProblemType.STANDARD,
      scoringMode: ProblemScoringMode.TOTAL,
      byProgrammingLanguage: {
        C: {
          language: ProgrammingLanguage.C,
          timeLimit: 10000,
          memoryLimit: 512000,
        },
      },
      pointsByGroups: {
        '0': {
          group: 0,
          points: 0,
          partial: 0,
          description: {
            ES: '',
            EN: '',
          },
        },
      },
      evaluatorSource: '',
    },
    members: {
      access: EntityAccess.PUBLIC,
      managers: {},
      spectators: {},
    },
    company: {
      key: 'juki-app',
    },
    user: {
      isOwner: true,
      isSpectator: true,
      isManager: true,
      solved: true,
      tried: true,
    },
    owner: {
      company: { key: '' },
      nickname: 'OscarGauss',
      imageUrl: '',
    },
    
  },
};
