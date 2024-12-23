import { CheckListTypes } from '@/app/_lib/constants/types';
import AirfilterIcon from '@/assets/icon/Type=Airfilter.png';
import BatteryIcon from '@/assets/icon/Type=Battery.png';
import BrakeoilIcon from '@/assets/icon/Type=Brakeoil.png';
import BrakepadIcon from '@/assets/icon/Type=Brakepad.png';
import CoolantIcon from '@/assets/icon/Type=Coolant.png';
import DashboardIcon from '@/assets/icon/Type=Dashboard.png';
import DriveshaftIcon from '@/assets/icon/Type=Driveshaft.png';
import LampIcon from '@/assets/icon/Type=Lamp.png';
import OilIcon from '@/assets/icon/Type=Oil.png';
import SteeringIcon from '@/assets/icon/Type=Steering.png';
import SuspensionIcon from '@/assets/icon/Type=Suspension.png';
import TensionerIcon from '@/assets/icon/Type=Tensioner.png';
import TirePressureIcon from '@/assets/icon/Type=TirePressure.png';
import WiperIcon from '@/assets/icon/Type=Wiper.png';

export const baseCheckList: CheckListTypes[] = [
  {
    title: '엔진오일',
    key: 'engine_oil',
    icon: OilIcon,
    checkList: [
      {
        label: '양호',
        value: 0,
      },
      {
        label: '주의',
        value: 1,
      },
      {
        label: '누유',
        value: 2,
      },
    ],
  },
  {
    title: '브레이크 오일',
    key: 'brake_oil',
    icon: BrakeoilIcon,
    checkList: [
      {
        label: '양호',
        value: 0,
      },
      {
        label: '주의',
        value: 1,
      },
      {
        label: '누유',
        value: 2,
      },
    ],
  },
  {
    title: '스티어링 시스템',
    key: 'steering',
    icon: SteeringIcon,
    checkList: [
      {
        label: '양호',
        value: 0,
      },
      {
        label: '주의',
        value: 1,
      },
      {
        label: '누유',
        value: 2,
      },
    ],
  },
  {
    title: '냉각수',
    key: 'coolant',
    icon: CoolantIcon,
    checkList: [
      {
        label: '양호',
        value: 0,
      },
      {
        label: '주의',
        value: 1,
      },
      {
        label: '누수',
        value: 2,
      },
    ],
  },
  {
    title: '외부벨트/텐셔너',
    key: 'tensioner',
    icon: TensionerIcon,
    checkList: [
      {
        label: '양호',
        value: 0,
      },
      {
        label: '주의',
        value: 1,
      },
    ],
  },
  {
    title: '배터리',
    key: 'battery',
    icon: BatteryIcon,
    checkList: [
      {
        label: '양호',
        value: 0,
      },
      {
        label: '주의',
        value: 1,
      },
    ],
  },
  {
    title: '와이퍼',
    key: 'wiper',
    icon: WiperIcon,
    checkList: [
      {
        label: '양호',
        value: 0,
      },
      {
        label: '교체요',
        value: 1,
      },
    ],
  },
  {
    title: '계기판 경고등 상태',
    key: 'dashboard',
    icon: DashboardIcon,
    checkList: [
      {
        label: '양호',
        value: 0,
      },
      {
        label: '주의',
        value: 1,
      },
    ],
  },
  {
    title: '공조장치 필터',
    key: 'airfilter',
    icon: AirfilterIcon,
    checkList: [
      {
        label: '양호',
        value: 0,
      },
      {
        label: '교체요',
        value: 1,
      },
    ],
  },
  {
    title: '타이어 공기압 마모도',
    key: 'tire_pressure',
    icon: TirePressureIcon,
    checkList: [
      {
        label: '양호',
        value: 0,
      },
      {
        label: '교체요',
        value: 1,
      },
    ],
  },
  {
    title: '브레이크 패드/디스크',
    key: 'brake_pad',
    icon: BrakepadIcon,
    checkList: [
      {
        label: '양호',
        value: 0,
      },
      {
        label: '주의',
        value: 1,
      },
    ],
  },
  {
    title: '서스펜션',
    key: 'suspension',
    icon: SuspensionIcon,
    checkList: [
      {
        label: '양호',
        value: 0,
      },
      {
        label: '주의',
        value: 1,
      },
    ],
  },
  {
    title: '드라이브 샤프트',
    key: 'drive_shaft',
    icon: DriveshaftIcon,
    checkList: [
      {
        label: '양호',
        value: 0,
      },
      {
        label: '주의',
        value: 1,
      },
    ],
  },
  {
    title: '외부 등화 장치',
    key: 'lamp',
    icon: LampIcon,
    checkList: [
      {
        label: '양호',
        value: 0,
      },
      {
        label: '교체요',
        value: 1,
      },
    ],
  },
];

export const evCheckList: CheckListTypes[] = [
  {
    title: '고전압 케이블',
    key: 'cable',
    checkList: [
      {
        label: '양호',
        value: 0,
      },
      {
        label: '주의',
        value: 1,
      },
    ],
  },
  {
    title: '충전 플러그',
    key: 'plug',
    checkList: [
      {
        label: '양호',
        value: 0,
      },
      {
        label: '주의',
        value: 1,
      },
    ],
  },
  {
    title: '감속기 오일',
    key: 'gear_oil',
    checkList: [
      {
        label: '양호',
        value: 0,
      },
      {
        label: '주의',
        value: 1,
      },
    ],
  },
];
