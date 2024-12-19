import {
  bonnet,
  front,
  lamp,
  rear,
  sideMirror,
} from '@/app/_lib/constants/strings';

export const exteriorFrontCheck = (text: string, callback: () => void) => {
  let isCatch = false;

  const active = '1px solid red';
  const inActive = '1px dotted var(--gray-scale-2)';
  const isCancel = text.includes('취소');
  const border = isCancel ? inActive : active;
  if (text.includes('상부') || text.includes('상판')) {
    isCatch = true;
    const div = document.getElementById('front_top');
    if (!div) return;

    div.style.border = border;
  } else if (text.includes('하부')) {
    isCatch = true;
    const div = document.getElementById('front_bottom');
    if (!div) return;

    div.style.border = border;
  } else if (bonnet.some((v) => text.includes(v))) {
    isCatch = true;
    const div = document.getElementById('front_bonnet');
    if (!div) return;

    div.style.border = border;
  } else if (text.includes('오른쪽')) {
    if (lamp.some((v) => text.includes(v))) {
      isCatch = true;
      const div = document.getElementById('front_right_headlamp');
      if (!div) return;

      div.style.border = border;
    } else if (sideMirror.some((v) => text.includes(v))) {
      isCatch = true;
      const div = document.getElementById('front_right_mirror');
      if (!div) return;

      div.style.border = border;
    }
  } else if (text.includes('왼쪽')) {
    if (lamp.some((v) => text.includes(v))) {
      isCatch = true;
      const div = document.getElementById('front_left_headlamp');
      if (!div) return;

      div.style.border = border;
    } else if (sideMirror.some((v) => text.includes(v))) {
      isCatch = true;
      const div = document.getElementById('front_left_mirror');
      if (!div) return;

      div.style.border = border;
    }
  }

  if (isCatch) {
    setTimeout(() => {
      callback();
    }, 1000);
  }
};

export const exteriorLeftCheck = (text: string, callback: () => void) => {
  let isCatch = false;

  const active = '1px solid red';
  const inActive = '1px dotted var(--gray-scale-2)';
  const isCancel = text.includes('취소');
  const border = isCancel ? inActive : active;

  if (front.some((v) => text.includes(v))) {
    if (text.includes('타이어') || text.includes('바퀴')) {
      isCatch = true;
      const div = document.getElementById('left_front_tire');
      if (!div) return;

      div.style.border = border;
    } else if (
      text.includes('문') ||
      text.includes('문짝') ||
      text.includes('도어')
    ) {
      isCatch = true;
      const div = document.getElementById('left_front_door');
      if (!div) return;

      div.style.border = border;
    }
  } else if (rear.some((v) => text.includes(v))) {
    if (text.includes('타이어') || text.includes('바퀴')) {
      isCatch = true;
      const div = document.getElementById('left_rear_tire');
      if (!div) return;

      div.style.border = border;
    } else if (
      text.includes('문') ||
      text.includes('문짝') ||
      text.includes('도어')
    ) {
      isCatch = true;
      const div = document.getElementById('left_rear_door');
      if (!div) return;

      div.style.border = border;
    }
  }
  if (isCatch) {
    setTimeout(() => {
      callback();
    }, 1000);
  }
};

export const exteriorRearCheck = (text: string, callback: () => void) => {
  let isCatch = false;
  const active = '1px solid red';
  const inActive = '1px dotted var(--gray-scale-2)';
  const isCancel = text.includes('취소');
  const border = isCancel ? inActive : active;

  if (text.includes('상부') || text.includes('상판')) {
    isCatch = true;
    const div = document.getElementById('rear_top');
    if (!div) return;

    div.style.border = border;
  } else if (text.includes('하부') || text.includes('하고')) {
    isCatch = true;
    const div = document.getElementById('rear_bottom');
    if (!div) return;

    div.style.border = border;
  } else if (text.includes('트렁크')) {
    isCatch = true;
    const div = document.getElementById('rear_trunk');
    if (!div) return;

    div.style.border = border;
  } else if (text.includes('오른쪽')) {
    if (lamp.some((v) => text.includes(v))) {
      isCatch = true;
      const div = document.getElementById('rear_right_taillamp');
      if (!div) return;

      div.style.border = border;
    }
  } else if (text.includes('왼쪽')) {
    if (lamp.some((v) => text.includes(v))) {
      isCatch = true;
      const div = document.getElementById('rear_left_taillamp');
      if (!div) return;

      div.style.border = border;
    }
  }

  if (isCatch) {
    setTimeout(() => {
      callback();
    }, 1000);
  }
};

export const exteriorRightCheck = (text: string, callback: () => void) => {
  let isCatch = false;
  const active = '1px solid red';
  const inActive = '1px dotted var(--gray-scale-2)';
  const isCancel = text.includes('취소');
  const border = isCancel ? inActive : active;

  if (front.some((v) => text.includes(v))) {
    if (text.includes('타이어') || text.includes('바퀴')) {
      isCatch = true;
      const div = document.getElementById('right_front_tire');
      if (!div) return;

      div.style.border = border;
    } else if (
      text.includes('문') ||
      text.includes('문짝') ||
      text.includes('도어')
    ) {
      isCatch = true;
      const div = document.getElementById('right_front_door');
      if (!div) return;

      div.style.border = border;
    }
  } else if (rear.some((v) => text.includes(v))) {
    if (text.includes('타이어') || text.includes('바퀴')) {
      isCatch = true;
      const div = document.getElementById('right_rear_tire');
      if (!div) return;

      div.style.border = border;
    } else if (
      text.includes('문') ||
      text.includes('문짝') ||
      text.includes('도어')
    ) {
      isCatch = true;
      const div = document.getElementById('right_rear_door');
      if (!div) return;

      div.style.border = border;
    }
  }

  if (isCatch) {
    setTimeout(() => {
      callback();
    }, 1000);
  }
};

let timer: NodeJS.Timeout | null = null;
export const debounce = (func: () => void, wait = 500) => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(func, wait);
};
