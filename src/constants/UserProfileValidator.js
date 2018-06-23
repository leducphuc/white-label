import Joi from 'joi-browser';

export const UserProfileValidator = {
  fullName: Joi.string().min(3).max(100).required()
  .trim()
  .empty()
  .label('Full Name'),
  address: Joi.string().min(3).max(100).required()
  .trim()
  .empty()
  .label('Address'),
  telephone: Joi.string().min(3).max(100).required()
  .trim()
  .empty()
  .label('Phone Number'),
  partnerAccount: Joi.string().min(3).max(100).required()
  .trim()
  .empty()
  .label('Partner Account'),
  email: Joi.string().max(50).min(3)
  .required()
  .trim()
  .regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
  .label('Email')
  .options({
    language: {
      string: {
        regex: {
          base: 'Invalid Email Format',
        },
      },
    },
  }),
  dob: Joi.string().max(50).min(3)
  .required()
  .trim()
  .regex(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2)\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)
  .label('Birthday')
  .options({
    language: {
      string: {
        regex: {
          base: 'Invalid Date Format',
        },
      },
    },
  }),
};

