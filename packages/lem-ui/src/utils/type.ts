import React from 'react';

export const tuple = <T extends string[]>(...args: T) => args;

// export const IconType = React.ForwardRefExoticComponent<React.RefAttributes<HTMLSpanElement>

export type IconType = React.ForwardRefExoticComponent<React.RefAttributes<HTMLSpanElement>>;
