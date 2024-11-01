const sideMirror = ["사이드", "사이드미러", "백미러", "미러"];
const bonnet = ["보닛", "본네트", "본넷", "본냇", "보네트"];
const front = ["프론트", "전방", "앞", "앞쪽"];
const rear = ["뒤", "뒷쪽", "뒤쪽", "후방", "리어", "뒷"];
const lamp = ["라이트", "등", "테일램프", "램프", "헤드램프"];

export const exteriorFrontCheck = (text: string) => {
  const frontSide = document.getElementById("front_side") as HTMLLIElement;
  const div = document.createElement("div");

  div.style.position = "absolute";
  div.style.border = "1px solid red";

  if (text.includes("상부") || text.includes("상판")) {
    const frontTop = document.getElementById("front_top");
    if (text.includes("취소") && !!frontTop) {
      frontTop.remove();
    }
    if (!!frontTop) return;

    div.style.top = "4px";
    div.style.height = "10px";
    div.style.width = "60px";
    div.style.borderRadius = "8px";
    div.id = "front_top";
    frontSide.appendChild(div);
  } else if (text.includes("하부")) {
    const frontBottom = document.getElementById("front_bottom");
    if (text.includes("취소") && !!frontBottom) {
      frontBottom.remove();
    }
    if (!!frontBottom) return;

    div.style.top = "50px";
    div.style.height = "10px";
    div.style.width = "80px";
    div.style.borderRadius = "8px";
    div.id = "front_bottom";

    frontSide.appendChild(div);
  } else if (bonnet.some((v) => text.includes(v))) {
    const frontbonnet = document.getElementById("front_bonnet");
    if (text.includes("취소") && !!frontbonnet) {
      frontbonnet.remove();
    }
    if (!!frontbonnet) return;

    div.style.top = "24px";
    div.style.height = "20px";
    div.style.width = "36px";
    div.style.borderRadius = "8px";
    div.id = "front_bonnet";

    frontSide.appendChild(div);
  } else if (text.includes("오른쪽")) {
    const frontRightHeadlamp = document.getElementById("front_right_headlamp");
    if (text.includes("취소") && !!frontRightHeadlamp) {
      frontRightHeadlamp.remove();
    }
    if (!!frontRightHeadlamp) return;

    if (lamp.some((v) => text.includes(v))) {
      div.style.top = "30px";
      div.style.left = "10px";
      div.style.height = "20px";
      div.style.width = "20px";
      div.style.borderRadius = "50%";
      div.id = "front_right_headlamp";
      frontSide.appendChild(div);
    } else if (sideMirror.some((v) => text.includes(v))) {
      const rightSideMirror = document.getElementById("front_right_mirror");
      if (text.includes("취소") && !!rightSideMirror) {
        rightSideMirror.remove();
      }
      if (!!rightSideMirror) return;

      div.style.top = "18px";
      div.style.left = "0px";
      div.style.height = "16px";
      div.style.width = "16px";
      div.style.borderRadius = "50%";
      div.id = "front_right_mirror";
      frontSide.appendChild(div);
    }
  } else if (text.includes("왼쪽")) {
    const frontRightHeadlamp = document.getElementById("front_left_headlamp");
    if (text.includes("취소") && !!frontRightHeadlamp) {
      frontRightHeadlamp.remove();
    }
    if (!!frontRightHeadlamp) return;

    if (lamp.some((v) => text.includes(v))) {
      div.style.top = "30px";
      div.style.right = "10px";
      div.style.height = "20px";
      div.style.width = "20px";
      div.style.borderRadius = "50%";
      div.id = "front_left_headlamp";
      frontSide.appendChild(div);
    } else if (sideMirror.some((v) => text.includes(v))) {
      const rightSideMirror = document.getElementById("front_left_mirror");
      if (text.includes("취소") && !!rightSideMirror) {
        rightSideMirror.remove();
      }
      if (!!rightSideMirror) return;

      div.style.top = "18px";
      div.style.right = "4px";
      div.style.height = "16px";
      div.style.width = "16px";
      div.style.borderRadius = "50%";
      div.id = "front_left_mirror";
      frontSide.appendChild(div);
    }
  }
};

export const exteriorLeftCheck = (text: string) => {
  const leftSide = document.getElementById("left_side") as HTMLLIElement;
  const div = document.createElement("div");

  div.style.position = "absolute";
  div.style.border = "1px solid red";

  if (front.some((v) => text.includes(v))) {
    if (text.includes("타이어")) {
      const leftFrontTire = document.getElementById("left_front_tire");
      if (text.includes("취소") && !!leftFrontTire) {
        leftFrontTire.remove();
      }
      if (!!leftFrontTire) return;

      div.style.top = "32px";
      div.style.left = "20px";
      div.style.height = "24px";
      div.style.width = "24px";
      div.style.borderRadius = "50%";
      div.id = "left_front_tire";
      leftSide.appendChild(div);
    } else if (
      text.includes("문") ||
      text.includes("문짝") ||
      text.includes("도어")
    ) {
      const leftFrontDoor = document.getElementById("left_front_door");
      if (text.includes("취소") && !!leftFrontDoor) {
        leftFrontDoor.remove();
      }
      if (!!leftFrontDoor) return;

      div.style.top = "20px";
      div.style.left = "60px";
      div.style.height = "20px";
      div.style.width = "20px";
      div.style.borderRadius = "50%";
      div.id = "left_front_door";
      leftSide.appendChild(div);
    }
  } else if (rear.some((v) => text.includes(v))) {
    if (text.includes("타이어")) {
      const leftRearTire = document.getElementById("left_rear_tire");
      if (text.includes("취소") && !!leftRearTire) {
        leftRearTire.remove();
      }
      if (!!leftRearTire) return;

      div.style.top = "32px";
      div.style.right = "26px";
      div.style.height = "24px";
      div.style.width = "24px";
      div.style.borderRadius = "50%";
      div.id = "left_rear_tire";
      leftSide.appendChild(div);
    } else if (
      text.includes("문") ||
      text.includes("문짝") ||
      text.includes("도어")
    ) {
      const leftRearDoor = document.getElementById("left_rear_door");
      if (text.includes("취소") && !!leftRearDoor) {
        leftRearDoor.remove();
      }
      if (!!leftRearDoor) return;

      div.style.top = "20px";
      div.style.right = "50px";
      div.style.height = "20px";
      div.style.width = "20px";
      div.style.borderRadius = "50%";
      div.id = "left_rear_door";
      leftSide.appendChild(div);
    }
  }
};

export const exteriorRearCheck = (text: string) => {
  const rearSide = document.getElementById("rear_side") as HTMLLIElement;
  const div = document.createElement("div");

  div.style.position = "absolute";
  div.style.border = "1px solid red";
  if (text.includes("상부") || text.includes("상판")) {
    const rearTop = document.getElementById("rear_top");
    if (text.includes("취소") && !!rearTop) {
      rearTop.remove();
    }
    if (!!rearTop) return;

    div.style.top = "10px";
    div.style.height = "10px";
    div.style.width = "50px";
    div.style.borderRadius = "8px";
    div.id = "rear_top";
    rearSide.appendChild(div);
  } else if (text.includes("하부")) {
    const rearBottom = document.getElementById("rear_bottom");
    if (text.includes("취소") && !!rearBottom) {
      rearBottom.remove();
    }
    if (!!rearBottom) return;

    div.style.top = "50px";
    div.style.height = "10px";
    div.style.width = "80px";
    div.style.borderRadius = "8px";
    div.id = "rear_bottom";

    rearSide.appendChild(div);
  } else if (text.includes("트렁크")) {
    const rearTrunk = document.getElementById("rear_trunk");
    if (text.includes("취소") && !!rearTrunk) {
      rearTrunk.remove();
    }
    if (!!rearTrunk) return;

    div.style.top = "30px";
    div.style.height = "14px";
    div.style.width = "36px";
    div.style.borderRadius = "8px";
    div.id = "rear_trunk";

    rearSide.appendChild(div);
  } else if (text.includes("오른쪽")) {
    const rearRightTaillamp = document.getElementById("rear_right_taillamp");
    if (text.includes("취소") && !!rearRightTaillamp) {
      rearRightTaillamp.remove();
    }
    if (!!rearRightTaillamp) return;
    if (lamp.some((v) => text.includes(v))) {
      div.style.top = "30px";
      div.style.right = "10px";
      div.style.height = "20px";
      div.style.width = "20px";
      div.style.borderRadius = "50%";
      div.id = "rear_right_headlamp";
      rearSide.appendChild(div);
    }
  } else if (text.includes("왼쪽")) {
    const rearLeftTailLamp = document.getElementById("rear_left_taillamp");
    if (text.includes("취소") && !!rearLeftTailLamp) {
      rearLeftTailLamp.remove();
    }
    if (!!rearLeftTailLamp) return;

    if (lamp.some((v) => text.includes(v))) {
      div.style.top = "30px";
      div.style.left = "10px";
      div.style.height = "20px";
      div.style.width = "20px";
      div.style.borderRadius = "50%";
      div.id = "rear_left_taillamp";
      rearSide.appendChild(div);
    }
  }
};

export const exteriorRightCheck = (text: string) => {
  const rightSide = document.getElementById("right_side") as HTMLLIElement;
  const div = document.createElement("div");

  div.style.position = "absolute";
  div.style.border = "1px solid red";

  if (front.some((v) => text.includes(v))) {
    if (text.includes("타이어")) {
      const rightFrontTire = document.getElementById("right_front_tire");
      if (text.includes("취소") && !!rightFrontTire) {
        rightFrontTire.remove();
      }
      if (!!rightFrontTire) return;

      div.style.top = "32px";
      div.style.right = "20px";
      div.style.height = "24px";
      div.style.width = "24px";
      div.style.borderRadius = "50%";
      div.id = "right_front_tire";
      rightSide.appendChild(div);
    } else if (
      text.includes("문") ||
      text.includes("문짝") ||
      text.includes("도어")
    ) {
      const rightFrontDoor = document.getElementById("right_front_door");
      if (text.includes("취소") && !!rightFrontDoor) {
        rightFrontDoor.remove();
      }
      if (!!rightFrontDoor) return;

      div.style.top = "20px";
      div.style.right = "60px";
      div.style.height = "20px";
      div.style.width = "20px";
      div.style.borderRadius = "50%";
      div.id = "right_front_door";
      rightSide.appendChild(div);
    }
  } else if (rear.some((v) => text.includes(v))) {
    if (text.includes("타이어")) {
      const rightRearTire = document.getElementById("right_rear_tire");
      if (text.includes("취소") && !!rightRearTire) {
        rightRearTire.remove();
      }
      if (!!rightRearTire) return;

      div.style.top = "32px";
      div.style.left = "26px";
      div.style.height = "24px";
      div.style.width = "24px";
      div.style.borderRadius = "50%";
      div.id = "right_rear_tire";
      rightSide.appendChild(div);
    } else if (
      text.includes("문") ||
      text.includes("문짝") ||
      text.includes("도어")
    ) {
      const rightRearDoor = document.getElementById("right_rear_door");
      if (text.includes("취소") && !!rightRearDoor) {
        rightRearDoor.remove();
      }
      if (!!rightRearDoor) return;

      div.style.top = "20px";
      div.style.left = "50px";
      div.style.height = "20px";
      div.style.width = "20px";
      div.style.borderRadius = "50%";
      div.id = "right_rear_door";
      rightSide.appendChild(div);
    }
  }
};
