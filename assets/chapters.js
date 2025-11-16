// /assets/chapters.js

export const CHAPTERS = {
  1: {
    title: "Cheap Clocks, 값싼 시계",
    intro: `90분에서 120분 간 중첩하거나 누적하여 작업한 사진이다. 시침과 분침이 명확하면 죽은 시계다.`,

    blocks: [
      {
        type: "images",
        list: [
          { src: "ct_1.jpg", cap: "강원도 원주시, pigment print, 2025" },
          { src: "ct_2.jpg", cap: "경상북도 성주군, pigment print, 2025" },
          { src: "ct_3.jpg", cap: "경기도 양평군, pigment print, 2025" },
          { src: "ct_4.jpg", cap: "충청남도 천안시, pigment print, 2025" },
        ]
      },

      {
        type: "text",
        content: `
        오래 전에 시계탑을 찾아다녔다. 근래는 고장난 채로 멈춰있거나 
        터무니 없는 시간을 가리키는 경우가 많다. 기능이 사라지고 껍데기만 남은 구조물.
        `
      },

      {
        type: "images",
        list: [
          { src: "ct_5.jpg", cap: "" },
          { src: "ct_6.jpg", cap: "" },
          { src: "ct_7.jpg", cap: "" },
          { src: "ct_8.jpg", cap: "" }
        ]
      },

      {
        type: "installation",
        src: "ch1-install-01.jpg",
        cap: "Installation view — Chapter I"
      }
    ]
  },

  2: {
    title: "Fire Flies, 반딧불이",
    intro: `조적식 주택을 중심으로 야간에 촬영한 사진이다.`,

    blocks: [
      {
        type: "images",
        list: [
          { src: "ff_1.jpg", cap: "" },
          { src: "ff_2.jpg", cap: "" },
          { src: "ff_3.jpg", cap: "" }
        ]
      },

      {
        type: "text",
        content: `
        오랜된 주택은 살아있는 듯 보일 때가 있다.
        환경에 적응하며 증식하고 외형을 바꾸는 일종의 생태 구조물.
        `
      },

      {
        type: "images",
        list: [
          { src: "ff_4.jpg", cap: "" },
          { src: "ff_5.jpg", cap: "" },
          { src: "ff_6.jpg", cap: "" }
        ]
      },

      {
        type: "installation",
        src: "ch2-install-01.jpg",
        cap: "Installation view — Chapter II"
      }
    ]
  }
};
