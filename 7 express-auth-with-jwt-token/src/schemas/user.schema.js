import { object, string } from 'yup'

// Initialize Module
const UserSchema = {}

UserSchema.create = object().shape({
  name: string().required('Name is Required!'),
  email: string()
    // .matches(emailExp, 'Invalid Email Address!')
    .required('Email is Required!'),
  phone: string()
    // .matches(mobileExp, 'Invalid phone Number!')
    .required('Phone Number is Required!'),
  password: string()
    // .matches(passwordExp, 'Invalid Password!')
    .required('Password Is Required!'),
})

export default UserSchema
