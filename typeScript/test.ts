type GetRefProps<Props> = 'ref' extends keyof Props ?
  Props extends {ref?:infer Value|undefined} ? Value : never
: never
type ref = GetRefProps<{ref: '1'}>;