import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import Snowflake from './Snowflake';

export const SnowflakeIcon = (props: BasicIconProps) => renderBasicIcon(props, Snowflake);
