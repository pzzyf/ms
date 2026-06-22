import type { FormActions, MsFormProps } from './type'

import { Store } from '@ms-core/shared/store'

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
  public state: null | MsFormProps = null
  public store: Store<MsFormProps>
  private prevState: null | MsFormProps = null

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
}

export { FormApi }
