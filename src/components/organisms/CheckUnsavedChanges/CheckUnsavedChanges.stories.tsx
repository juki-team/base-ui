import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useEffect, useState } from 'react';
import { NotificationProvider } from '../../../contexts/NotificationProvider/NotificationProvider';
import { useJukiNotification } from '../../../hooks';
import { T } from '../../atoms';
import { CloseIcon } from '../../atoms/server';
import { MockupJukiProvider } from '../../mockup';
import { ButtonLoader } from '../../molecules';
import { CheckUnsavedChanges } from './CheckUnsavedChanges';

const meta = {
  component: NotificationProvider,
} satisfies Meta<typeof NotificationProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const Component = () => {
  
  const {
    addInfoNotification,
  } = useJukiNotification();
  
  const [ entityData, setEntityData ] = useState<any>({
    'name': 'Juan',
    description: 'line 1\nline 2\nline 2.5\nline 3',
    'age': 30,
    'isAdmin': false,
    'skills': [ 'JavaScript', 'HTML', 'CSS' ],
    'address': {
      'city': 'Madrid',
      'zip': 28001,
    },
    'projects': [
      { 'id': 1, 'name': 'Proyecto A' },
      { 'id': 2, 'name': 'Proyecto B' },
    ],
    'notes': 'Este es un texto original',
    A: {
      B: {
        C: {
          D: '123456\n',
          E: '123456',
        },
      },
    },
  });
  useEffect(() => {
    setTimeout(() => {
      setEntityData({
        'name': 'Juan Pérez',
        description: 'line 1 newend\nline new 2\nline 2.5\n3\nline 4',
        'age': 31,
        'isAdmin': true,
        'skills': [ 'JavaScript', 'TypeScript', 'HTML', 'CSS3' ],
        'address': {
          'city': 'Barcelona',
          'zip': 8001,
          'country': 'España',
        },
        'projects': [
          { 'id': 1, 'name': 'Proyecto Alpha' },
          { 'id': 3, 'name': 'Proyecto C' },
        ],
        'notes': 'Este es un texto modificado con más detalles',
        'newField': null,
        A: {
          B: {
            C: {
              D: '123456',
              E: '123456\n',
            },
          },
        },
      });
    }, 1000);
  }, []);
  
  return (
    <>
      <CheckUnsavedChanges
        key="cancel"
        onClickContinue={() => addInfoNotification('continue')}
        value={entityData as object}
      >
        <ButtonLoader
          type="light"
          size="small"
          icon={<CloseIcon />}
          responsiveMobile
        >
          <T className="tt-se">cancel</T>
        </ButtonLoader>
      </CheckUnsavedChanges>,
      <pre>
        {JSON.stringify(entityData, null, 2)}
      </pre>
    </>
  );
};

export const Primary = {
  render: () => <MockupJukiProvider> <Component /></MockupJukiProvider>,
} satisfies Story;
