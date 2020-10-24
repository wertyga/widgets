export const stylesDict = {
  reviews: {
    name: {
      color: {
        selector: '.w-rv-il__rv-us__cnt .user-name',
        propName: 'color',
      },
    },
    date: {
      color: {
        selector: '.w-rv-il__rv-us__cnt .comment-date',
        propName: 'color',
      },
    },
    description: {
      titleColor: {
        selector: '.description .w-rv-dsc-title',
        propName: 'color',
      },
      color: {
        selector: '.description .w-rv-dsc-text',
        propName: 'color',
      },
    },
    rating: {
      color: {
        selector: '.w-rv-lti .w-sr .w-sr-si svg path',
        propName: 'fill',
      },
    },
    commentIcon: {
      color: {
        selector: ['.w-rv-it__cm svg path', '.w-rv-it__cm span'],
        propName: ['fill', 'color'],
      },
    },
    like: {
      color: {
        selector: ['.w-rv-itf__lk svg path', '.w-rv-itf__lk span'],
        propName: ['fill', 'color'],
      },
    },
    dislike: {
      color: {
        selector: ['.w-rv-itf__lk.w-rv-itf__dlk svg path', '.w-rv-itf__lk.w-rv-itf__dlk span'],
        propName: ['fill', 'color'],
      },
    },
    mainBlock: {
      backgroundColor: {
        selector: '.w-rv-lti',
        propName: 'background-color',
      },
    },
    buttons: {
      backgroundColor: {
        selector: '.w-rv-il__cm__btn-wrp button, .w-rf__lay-rv-btn button',
        propName: 'background-color',
      },
      color: {
        selector: [
          '.w-rv-il__cm__btn-wrp button, .w-rf__lay-rv-btn button',
          '.w-rf__lay-rv-btn button svg path',
        ],
        propName: ['color', 'fill'],
      },
    },
    subComment: { // styleKey
      borderColor: { // propObj
        selector: '.w-rv-il__int textarea',
        propName: 'border-color',
      },
    },
    totalReviews: {
      starsColor: {
        selector: '.w-rv-tr .w-sr-si svg path',
        propName: 'fill',
      },
      color: {
        selector: ['.w-rv-tr .w-rv-tr__ls p', '.w-rv-tr .w-rv-tr__tr span'],
        propName: ['color', 'color'],
      },
    },
  },
};

const wrapperClasses = {
  reviews: 'w-rf-wr',
};
