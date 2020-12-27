export const reviewsStyleDict = {
  name: {
    color: {
      selector: [
        '.w-rv-il__rv-us__cnt .user-name',
        '.w-rg-usr-wr span',
        '.w-rv-md__c__hd',
        '.w-rv-md-ci',
        '.w-rv-img-upl svg path',
        '.w-rv-md__c input, .w-rv-md__c textarea',
        '.w-rv-md__c input::placeholder, .w-rv-md__c textarea::placeholder'
      ],
      propName: ['color', 'color', 'color', 'color', 'fill', 'color', 'color'],
    },
  },
  error: {
    color: {
      selector: ['.w-rv-md__c .error'],
      propName: ['color'],
    },
  },
  message: {
    color: {
      selector: ['.w-rv-md__c .ta-c'],
      propName: ['color'],
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
      selector: ['.w-rv-lti .w-sr .w-sr-si svg path', '.w-rv-md__c__hd .w-sr-wr svg path'],
      propName: ['fill', 'fill'],
    },
  },
  commentIcon: {
    color: {
      selector: ['.w-rv-it__cm svg path', '.w-rv-it__cm span', 'w-rv-il__sub-it svg path'],
      propName: ['fill', 'color', 'fill'],
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
      selector: ['.w-rv-lti', '.w-rv-md__c', '.w-rv-md__c input, .w-rv-md__c textarea'],
      propName: ['background-color', 'background-color', 'background-color'],
    },
    borderColor: {
      selector: '.w-rv-lti',
      propName: 'border-color',
    },
  },
  subComment: { // styleKey
    borderColor: { // propObj
      selector: '.w-rv-il__int textarea',
      propName: 'border-color',
    },
    nameColor: {
      selector: '.w-rv-il__ua span',
      propName: 'color',
    },
  },
  subCommentBtn: {
    backgroundColor: {
      selector: ['.w-rv-il__cm__btn-wrp .w-btn', '.w-rf__lay-rv-btn .w-btn', '.w-rg-usr-wr .w-btn'],
      propName: ['background-color', 'background-color', 'background-color'],
    },
    color: {
      selector: [
        '.w-rv-il__cm__btn-wrp .w-btn',
        '.w-rf__lay-rv-btn .w-btn',
        '.w-rf__lay-rv-btn .w-btn svg path',
        '.w-rg-usr-wr .w-btn'
      ],
      propName: ['color', 'color', 'fill', 'color'],
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
};
