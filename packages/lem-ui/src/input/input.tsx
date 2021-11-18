/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import React, { createRef } from 'react';
import classNames from 'classnames';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
}

const InternalInput: React.ForwardRefRenderFunction<HTMLElement, InputProps> = (
  { prefix, suffix, className, style, onPressEnter, onChange, children, ...rest },
  ref,
) => {
  const onlyInput = prefix === undefined && suffix === undefined;
  const inputRef = (ref as any) || createRef<HTMLInputElement>();

  const handleKeyup: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      onPressEnter?.(e);
    }
  };

  const renderBasicInput = () => {
    return (
      <input
        className={classNames('lem-input', onlyInput ? className : {})}
        style={onlyInput ? style : undefined}
        ref={inputRef}
        type="text"
        onKeyUp={handleKeyup}
        onChange={onChange}
        {...rest}
      />
    );
  };

  if (onlyInput) {
    return renderBasicInput();
  }

  return (
    <span className={classNames('lem-input-affix-wrapper', className)} style={style}>
      {prefix ? <span className="lem-input-prefix">{prefix}</span> : null}
      {children}
      {renderBasicInput()}
      {suffix ? <span className="lem-input-suffix">{suffix}</span> : null}
    </span>
  );
};

const Input = React.forwardRef<HTMLElement, InputProps>(InternalInput);

export default Input;
