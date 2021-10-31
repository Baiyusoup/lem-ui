import { useMemo } from 'react'
import FormStore, { FormRules } from '../FormStore'

export default function useFormStore<T extends Record<string, unknown>>(
  values: Partial<T> = {},
  rules: FormRules = {}
) {
  return useMemo(() => new FormStore(values, rules), [values, rules])
}
