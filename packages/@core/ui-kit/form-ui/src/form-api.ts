import type { Recordable } from '@ms-core/typings'
import type { FormContext, GenericObject } from 'vee-validate'

import type { MsFormProps } from './types'

import { Store } from '@ms-core/shared/store'
import { bindMethods, isFunction, mergeWithArrayOverride, StateHandler } from '@ms-core/shared/utils'
import { toRaw } from 'vue'

function getDefaultState(): MsFormProps {
  return {
    actionWrapperClass: '',
    collapsed: false,
    collapsedRows: 1,
    collapseTriggerResize: false,
    commonConfig: {},
    handleReset: undefined,
    handleSubmit: undefined,
    handleValuesChange: undefined,
    handleCollapsedChange: undefined,
    layout: 'horizontal',
    resetButtonOptions: {},
    schema: [],
    scrollToFirstError: false,
    showCollapseButton: false,
    showDefaultActions: true,
    submitButtonOptions: {},
    submitOnChange: false,
    submitOnEnter: false,
    wrapperClass: 'grid-cols-1',
  }
}

class FormApi {
  public form: FormContext<GenericObject> | null = null
  isMounted = false
  public state: null | MsFormProps = null
  stateHandler: StateHandler
  public store: Store<MsFormProps>
  private prevState: null | MsFormProps = null
  private latestSubmissionValues: null | Recordable<any> = null

  constructor(options: MsFormProps = {}) {
    const storeState = { ...options }
    const defaultState = getDefaultState()

    this.store = new Store<MsFormProps>({
      ...defaultState,
      ...storeState,
    })
    this.state = this.store.state

    this.store.subscribe((state) => {
      this.prevState = this.state
      this.state = state
      this.updateState()
    })

    this.state = this.store.state
    this.stateHandler = new StateHandler()
    bindMethods(this)
  }

  private getForm() {
    if (!this.form) {
      throw new Error('[MsForm]: form instance is not mounted.')
    }

    return this.form
  }

  private updateState() {
    const currentSchema = this.state?.schema ?? []
    const prevSchema = this.prevState?.schema ?? []
    // 进行了删除schema操作
    if (currentSchema.length < prevSchema.length) {
      const currentFields = new Set(
        currentSchema.map(item => item.fieldName),
      )
      const deletedSchema = prevSchema.filter(
        item => !currentFields.has(item.fieldName),
      )
      for (const schema of deletedSchema) {
        this.form?.setFieldValue?.(schema.fieldName, undefined)
      }
    }
  }

  mount(form: FormContext<GenericObject>) {
    this.form = form
    this.isMounted = true
  }

  setState(
    stateOrFn:
      | ((prev: MsFormProps) => Partial<MsFormProps>)
      | Partial<MsFormProps>,
  ) {
    if (isFunction(stateOrFn)) {
      this.store.setState((prev) => {
        return mergeWithArrayOverride(stateOrFn(prev), prev)
      })
    }
    else {
      this.store.setState(prev => mergeWithArrayOverride(stateOrFn, prev))
    }
  }

  getLatestSubmissionValues() {
    return this.latestSubmissionValues || {}
  }

  getValues<TValues extends GenericObject = GenericObject>() {
    const values = toRaw(this.getForm().values)

    try {
      return structuredClone(values) as TValues
    }
    catch {
      return { ...values } as TValues
    }
  }

  validate(
    ...args: Parameters<FormContext<GenericObject>['validate']>
  ): ReturnType<FormContext<GenericObject>['validate']> {
    return this.getForm().validate(...args)
  }

  unmount() {
    this.form?.resetForm?.()
    this.form = null
    this.latestSubmissionValues = null
    this.isMounted = false
    this.stateHandler.reset()
  }
}

export { FormApi }
