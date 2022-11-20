import {styled} from 'solid-styled-components'
// import React, {ChangeEventHandler, InputHTMLAttributes, ReactElement, useContext} from 'react'
import sx, {SxProp} from './sx'
import {FormValidationStatus} from './utils/types/FormValidationStatus'
import {RadioGroupContext} from './RadioGroup'
import getGlobalFocusStyles from './_getGlobalFocusStyles'
import {createContext, JSX, JSXElement, useContext,splitProps} from "solid-js";
import HTMLAttributes = JSX.HTMLAttributes;

export type RadioProps = {
  /**
   * A unique value that is never shown to the user.
   * Used during form submission and to identify which radio button in a group is selected
   */
  value: string
  /**
   * Name attribute of the input element. Required for grouping radio inputs
   */
  name?: string
  /**
   * Apply inactive visual appearance to the radio button
   */
  disabled?: boolean
  /**
   * Indicates whether the radio button is selected
   */
  checked?: boolean
  /**
   * Forward a ref to the underlying input element
   */
  ref?: HTMLInputElement
  /**
   * Indicates whether the radio button must be checked before the form can be submitted
   */
  required?: boolean
  /**
   * Only used to inform ARIA attributes. Individual radio inputs do not have validation styles.
   */
  validationStatus?: FormValidationStatus
} & HTMLAttributes<HTMLInputElement> &
    // InputHTMLAttributes<HTMLInputElement> &
  SxProp

const StyledRadio = styled.input`
  cursor: pointer;

  ${props => props.disabled && `cursor: not-allowed;`}
  ${getGlobalFocusStyles('0')};

  ${sx}
`

/**
 * An accessible, native radio component for selecting one option from a list.
 */
const Radio =(
  (
      props: RadioProps,ref
    // {checked, disabled, name: nameProp, onChange, sx: sxProp, required, validationStatus, value, ...rest}: RadioProps,
    // ref
  ): JSXElement => {
    const
        [{checked, disabled, name: nameProp, onChange, sx: sxProp, required, validationStatus, value} ,rest]=
            splitProps(props,["checked", "disabled", "name", "onChange", "sx", "required", "validationStatus", "value"])
    const [getRadioGroupContext] = useContext<{
  disabled?: boolean
  onChange?: JSX.EventHandler<HTMLInputElement,InputEvent>
  name: string
} >(RadioGroupContext)
    const handleOnChange: JSX.EventHandler<HTMLInputElement,InputEvent> = e => {
      getRadioGroupContext()?.onChange && getRadioGroupContext().onChange(e)
      onChange && onChange(e)
    }
    const name = nameProp || radioGroupContext()?.name

    if (!name) {
      // eslint-disable-next-line no-console
      console.warn(
        'A radio input must have a `name` attribute. Pass `name` as a prop directly to each Radio, or nest them in a `RadioGroup` component with a `name` prop'
      )
    }

    return (
      <StyledRadio
        type="radio"
        value={value}
        name={name}
        ref={props.ref}
        disabled={disabled}
        aria-disabled={disabled ? 'true' : 'false'}
        checked={checked}
        aria-checked={checked ? 'true' : 'false'}
        required={required}
        aria-required={required ? 'true' : 'false'}
        aria-invalid={validationStatus === 'error' ? 'true' : 'false'}
        sx={sxProp}
        onChange={handleOnChange}
        {...rest}
      />
    )
  }
)

// Radio.displayName = 'Radio'

export default Radio
