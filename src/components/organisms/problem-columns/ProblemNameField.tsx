import React from 'react';
import { classNames } from '../../../helpers';
import { useJukiUI } from '../../../hooks';
import { T, Tooltip, VoidIcon } from '../../atoms';
import { DataViewerHeadersType, Field } from '../DataViewer';
import { ProblemStatus } from './ProblemStatus';
import { ProblemDataViewer } from './types';

export const ProblemNameField: DataViewerHeadersType<ProblemDataViewer>['Field'] = (props) => {
  
  const { record: { name, user, viewProblemUrl }, isCard } = props;
  
  const { components: { Link } } = useJukiUI();
  
  return (
    <Field className={classNames('jk-row jk-pg-sm', { left: !isCard, center: isCard })}>
      <div className="jk-row nowrap">
        <Link href={{ pathname: viewProblemUrl }}>
          <div className="jk-row link fw-bd">{name}</div>
        </Link>
        {(user.tried || user.solved) && <>&nbsp;</>}
        <ProblemStatus {...user} size="small" />
        {user.isManager && (
          <Tooltip
            content={<T className="tt-se ws-np">you are editor</T>}
            placement="top"
            withPortal
          >
            <div className="jk-row tx-s cr-py">
              &nbsp;<VoidIcon size="small" filledSquare letter="E" />
            </div>
          </Tooltip>
        )}
      </div>
    </Field>
  );
};
