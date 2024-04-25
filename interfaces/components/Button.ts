import { ReactElement } from 'react'
import { ButtonProps, SvgIconTypeMap } from '@mui/material'
import {
  DefaultComponentProps,
  OverridableComponent,
} from '@mui/material/OverridableComponent'

export interface CommonButtonProps extends ButtonProps {
  colorScheme?: 'primary' | 'secondary' | 'create-task'
  endIcon?: MappedIcons
  handler?: any
  startIcon?: MappedIcons
  text?: string
}

export interface IconBtnProps extends ButtonProps {
  filled?: boolean
  handler?: any
  icon: MappedIcons
  iconSize: 'large' | 'medium' | 'small'
}

export interface ConditionalButtonProps extends ButtonProps {
  endIcon?: ReactElement
  startIcon?: ReactElement
}

export interface IconMap {
  [key: string]:
    | OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
        muiName: string
      }
}

export type IconProps = DefaultComponentProps<SvgIconTypeMap>

export type MappedIcons =
  | 'account'
  | 'back'
  | 'camera'
  | 'calendar'
  | 'chat'
  | 'chatBubble' //called comment in design
  | 'check'
  | 'checkbox'
  | 'checkboxChecked'
  | 'checkboxIndeterminate'
  | 'checkCircle'
  | 'circle'
  | 'clock'
  | 'close'
  | 'closeChip'
  | 'crop'
  | 'dash'
  | 'description'
  | 'dropdownDown'
  | 'dropdownUp'
  | 'edit'
  | 'email'
  | 'error'
  | 'forward'
  | 'group'
  | 'help'
  | 'info'
  | 'leave'
  | 'leftArrow'
  | 'likeEmpty'
  | 'likeFilled'
  | 'link'
  | 'localOffer' //called status in design
  | 'lock' //called password in design
  | 'menuDots'
  | 'message'
  | 'notifications'
  | 'page'
  | 'person'
  | 'plus'
  | 'portfolio'
  | 'radioButton'
  | 'radioButtonFilled'
  | 'rightArrow'
  | 'search'
  | 'tasks' //called checkList in design
  | 'title'
  | 'warning'
export interface PaginatorButtonInterface extends ButtonProps {
  buttonType: 'secondary' | 'primary'
  colorScheme?: 'secondary' | 'primary'
  handler?: any
  text: string
}
