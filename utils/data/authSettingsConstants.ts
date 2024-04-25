import {
  ButtonStyleInterface,
  SuccessScreenValues,
} from '@/interfaces/AccountSettingsInterface'

export const ButtonStyle: Record<string, ButtonStyleInterface> = {
  Orange: { background: '#ffa726', color: '#1a237e' }, // Default
  Red: { background: '#D32F2F', color: '#FFFFFF' },
}

// should be prefixed with ?screen=
export enum SuccessQueryParam {
  signUp = 'sign_up',
  signUpEmail = 'sign_up_email',
  resetPasswordEmail = 'reset_password_email',
  resetPassword = 'reset_password',
  changePassword = 'change_password',
  updateEmail = 'update_email',
}

export const enum ResType {
  error = 'error',
  success = 'success',
}

export const emptySuccessScreenValues: SuccessScreenValues = {
  heading: '',
  subHeading: '',
  body: '',
  body2: '',
  hyperlinkLabel: '',
  hyperlinkAction: null,
  buttonLabel: '',
  buttonAction: null,
}
