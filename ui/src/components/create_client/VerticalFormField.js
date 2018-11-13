/* eslint react/prop-types: 0 */

import React from 'react';
import { Form, FieldLevelHelp } from 'patternfly-react';

export const VerticalFormField = ({
  controlId,
  label,
  help,
  formControl,
  validationState,
  bsSize,
  showHelp,
  useFieldLevelHelp,
  content,
  close,
  ...props
}) => {
  const controlProps = { ...props };

  if (bsSize) controlProps.bsSize = bsSize;
  if (validationState) controlProps.validationState = validationState;

  const formGroupProps = { key: controlId, controlId, ...controlProps };

  const htmlContent = (
    <div
      dangerouslySetInnerHTML={{
        __html: content
      }}
    />
  );

  const helpControl = (
    <Form.ControlLabel>
      <FieldLevelHelp content={htmlContent} close={close} />
    </Form.ControlLabel>
  );

  return (
    <Form.FormGroup {...formGroupProps}>
      {label && <Form.ControlLabel>{label}</Form.ControlLabel>}
      {useFieldLevelHelp && helpControl}
      {formControl(controlProps)}
      {showHelp && help && <Form.HelpBlock>{help}</Form.HelpBlock>}
    </Form.FormGroup>
  );
};
