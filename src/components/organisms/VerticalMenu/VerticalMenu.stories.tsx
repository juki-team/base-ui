import { action, configureActions } from 'storybook/actions';
import { TriggerAction } from '../../../enums';
import { Button, Popover, T } from '../../atoms';
import { MockupToggleThemeButton } from '../../mockup';
import { DrawerActionsType } from '../../molecules/Drawer/types';
import {
  AppsIcon,
  FilterListIcon,
  JukiCouchLogoHorImage,
  JukiJudgeLogoHorImage,
  JukiUtilsLogoHorImage,
  ManufacturingIcon,
  PlusIcon,
  SettingsIcon,
  ViewHeadlineIcon,
} from '../../server';
import { MdMathEditor } from '../index';
import { SAMPLE_MD_CONTENT } from '../MdMathViewer/constants';
import { VerticalMenu as VerticalMenuCmp } from './VerticalMenu';

export default {
  component: VerticalMenuCmp,
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const menu = [
  {
    label: 'contests',
    icon: <ViewHeadlineIcon />,
    selected: false,
    onClick: () => action('/contests'),
  },
  {
    label: 'problems',
    icon: <PlusIcon />,
    selected: true,
    onClick: () => action('/problems'),
  },
  {
    label: 'admin',
    icon: <FilterListIcon />,
    selected: false,
    onClick: () => action('/admin'),
  },
];

const rightSection = ({ open = undefined }: { open?: boolean }) => (
  <div className="jk-row gap" style={{ width: '240px' }}>
    <Popover
      content={<div className="cr-g1"> Settings </div>}
      triggerOn={TriggerAction.CLICK}
      placement="bottom"
      open={open}
    >
      <div>
        <Button icon={<SettingsIcon />} type="text" />
      </div>
    </Popover>
    <Popover
      open={open}
      content={
        <div className="jk-col gap more-apps-popover cr-g1">
          <div className="fw-bd tt-se">
            <T>more apps coming soon</T>
          </div>
          <div className="jk-col gap cr-py">
            <div className="jk-row">
              <JukiCouchLogoHorImage /> <ManufacturingIcon />{' '}
              <T className="tt-se">developing</T>...
            </div>
            <div className="jk-row">
              <JukiUtilsLogoHorImage /> <ManufacturingIcon />{' '}
              <T className="tt-se">developing</T>...
            </div>
          </div>
        </div>
      }
      triggerOn={TriggerAction.CLICK}
      placement="bottom"
    >
      <div>
        <Button icon={<AppsIcon />} type="text" />
      </div>
    </Popover>
    <div className="cr-we">User</div>
  </div>
);

const rightMobile = {
  children: (
    <div className="cr-we">
      <ViewHeadlineIcon />
    </div>
  ),
  content: ({ onClose }: DrawerActionsType) => (
    <div className="jk-col gap more-apps-popover">
      <div className="fw-bd tt-se">
        <T>more apps coming soon</T>
      </div>
      <div className="jk-col gap cr-py" style={{ width: '100px' }}>
        <div className="jk-row">
          <JukiCouchLogoHorImage /> <ManufacturingIcon />{' '}
          <T className="tt-se">developing</T>...
        </div>
        <div className="jk-row">
          <JukiUtilsLogoHorImage /> <ManufacturingIcon />{' '}
          <T className="tt-se">developing</T>...
        </div>
        <div onClick={onClose}>close right!</div>
      </div>
    </div>
  ),
};

const centerMobile = {
  children: (
    <div className="cr-we">
      <JukiJudgeLogoHorImage />
    </div>
  ),
  content: ({ onClose }: DrawerActionsType) => (
    <div>
      TOP MENU <div onClick={onClose}>close top!</div>
    </div>
  ),
};

const drawerMenuMobile = <div>Rest of Menu</div>;

export const VerticalMenu = () => (
  <div style={{ height: '400px' }}>
    <VerticalMenuCmp
      menu={menu}
      topSection={
        <div className="jk-row" style={{ width: '60px' }}>
          <JukiJudgeLogoHorImage />
        </div>
      }
      bottomSection={<div className="">{rightSection({})}</div>}
      rightMobile={rightMobile}
      centerMobile={centerMobile}
      drawerMenuMobile={drawerMenuMobile}
    >
      <div>
        <MdMathEditor
          value={SAMPLE_MD_CONTENT}
          onChange={() => {
          }}
          enableDownload
          informationButton
        />
      </div>
    </VerticalMenuCmp>
    <MockupToggleThemeButton />
  </div>
);
