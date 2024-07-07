import React, { memo } from 'react';
import { classNames } from '../../../helpers';
import { T } from '../../atoms';
import { DataViewerHeadersType, Field } from '../DataViewer';
import { ProblemDataViewer } from './types';

export const ProblemTagsField: DataViewerHeadersType<ProblemDataViewer>['Field']
  = memo(({ record: { tags }, isCard }) => (
  <Field className={classNames('jk-row gap', { center: isCard, left: !isCard })}>
    {tags.filter(tag => !!tag).map(tag => <div className="jk-tag gray-6 tx-s" key={tag}><T>{tag}</T></div>)}
  </Field>
));
