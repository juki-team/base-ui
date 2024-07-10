import React from 'react';
import { classNames } from '../../../helpers';
import { T } from '../../atoms';
import { DataViewerHeadersType, Field, FilterSelectOnlineType } from '../DataViewer';
import { ProblemDataViewerType } from './types';

export const ProblemTagsField: DataViewerHeadersType<ProblemDataViewerType>['Field']
  = ({ record: { tags }, isCard }) => (
  <Field className={classNames('jk-row gap', { center: isCard, left: !isCard, 'jk-pg-smp': isCard })}>
    {tags.filter(tag => !!tag).map(tag => <div className="jk-tag gray-6 tx-s" key={tag}><T>{tag}</T></div>)}
  </Field>
);

export const getProblemTagsHeader = (tags: string[]): DataViewerHeadersType<ProblemDataViewerType> => ({
  head: 'tags',
  index: 'tags',
  Field: ProblemTagsField,
  filter: {
    type: 'select',
    options: tags.map(tag => ({ value: tag, label: <T>{tag}</T> })),
  } as FilterSelectOnlineType,
  cardPosition: 'lower',
  minWidth: 250,
});
