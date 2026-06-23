import type { Recordable } from '@ms-core/typings'
import type { FormActions, MsFormProps } from './type'

import { Store } from '@ms-core/shared/store'
import { bindMethods, isFunction, mergeWithArrayOverride, StateHandler } from '@ms-core/shared/utils'

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
  public form = {} as FormActions
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

  unmount() {
    this.form?.resetForm?.()
    // this.state = null;
    this.latestSubmissionValues = null
    this.isMounted = false
    this.stateHandler.reset()
  }
}

export { FormApi }
