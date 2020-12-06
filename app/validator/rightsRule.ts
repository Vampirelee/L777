export default {
  rightsName: {
    type: 'string',
    trim: true,
    allowNull: false,
  },
  rightsDesc: {
    type: 'string',
    trim: true,
    allowNull: false,
  },
  rightsType: {
    type: 'string',
    trim: true,
    allowNull: false,
  },
  rightsPath: {
    type: 'string',
    required: false,
    allowNull: true,
    trim: true,
  },
};
