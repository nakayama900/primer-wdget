import styled from 'styled-components'
import {COMMON, SystemCommonProps, SystemTypographyProps, TYPOGRAPHY} from './constants'
import sx from './sx'
import {ComponentProps} from './utils/types'

const Text = styled('span')<SystemTypographyProps & SystemCommonProps & typeof sx>`
  ${TYPOGRAPHY};
  ${COMMON};
  ${sx};
`

export type TextProps = ComponentProps<typeof Text>
export default Text
