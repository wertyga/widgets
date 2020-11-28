export const chatStylesDict = {
  header: {
    backgroundColor: {
      selector: ['.w-cht-op__h', '.w-cht-cl'],
      propName: ['linear-gradient_to right', 'linear-gradient_to bottom'],
    },
    color: {
      selector: ['.w-cht-op__h', '.w-cht-h .close svg path', '.w-cht-cl svg path'],
      propName: ['color', 'fill', 'fill'],
    },
  },
  mainBlock: {
    backgroundColor: {
      selector: ['.cht-mf-in', '.cht-inf', '.cht-inf .w-inp', '.cht__op__sep'],
      propName: ['background-color', 'background-color', 'background-color', 'background-color'],
    },
  },
  separator: {
    backgroundColor: {
      selector: ['.cht__op__sep span'],
      propName: ['background-color'],
    },
  },
  button: {
    backgroundColor: {
      selector: ['.cht-inf__btn button'],
      propName: ['background-color'],
    },
    color: {
      selector: ['.cht-inf__btn button svg path'],
      propName: ['fill'],
    },
  },
  message: {
    backgroundColor: {
      selector: ['.cht-msg__msg'],
      propName: ['background-color'],
    },
    color: {
      selector: ['.cht-msg__msg'],
      propName: ['color'],
    },
  },
  misc: {
    color: {
      selector: ['.cht-msg__icns svg path', '.cht-msg__name', '.cht-inf .w-inp'],
      propName: ['fill', 'color', 'color'],
    },
  },
  footer: {
    color: {
      selector: ['.cht-inf'],
      propName: ['color'],
    },
  },
};
