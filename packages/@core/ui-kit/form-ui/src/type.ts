import type { Component, HtmlHTMLAttributes } from 'vue'

export type FormLayout = 'horizontal' | 'inline' | 'vertical'

export type BaseFormComponentType
  = | 'DefaultButton'
    | 'PrimaryButton'
    | 'MsCheckbox'
    | 'MsInput'
    | 'MsInputPassword'
    | 'MsPinInput'
    | 'MsSelect'
    | (Record<never, never> & string)

type Breakpoints = '2xl:' | '3xl:' | '' | 'lg:' | 'md:' | 'sm:' | 'xl:'

type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13

export type WrapperClassType
  = | `${Breakpoints}grid-cols-${GridCols}`
    | (Record<never, never> & string)

export type MaybeComponentPropKey
  = | 'options'
    | 'placeholder'
    | 'title'
    | keyof HtmlHTMLAttributes
    | (Record<never, never> & string)

export type MaybeComponentProps = { [K in MaybeComponentPropKey]?: any }

export interface FormRenderProps {
  /**
   * 表单实例
   */
  form?: any

  /**
   * 表单项布局
   */
  layout?: FormLayout

  /**
   * 表单栅格布局
   * @default "grid-cols-1"
   */
  wrapperClass?: WrapperClassType

  /**
   * 紧凑模式（移除表单每一项底部为校验信息预留的空间）
   */
  compact?: boolean
}

export interface FormCommonConfig {
  /**
   * 在Label后显示一个冒号
   */
  colon?: boolean
  /**
   * 所有表单项的props
   */
  componentProps?: any
  /**
   * 所有表单项的控件样式
   */
  controlClass?: string
  /**
   * 所有表单项的禁用状态
   * @default false
   */
  disabled?: boolean
  /**
   * 是否禁用所有表单项的change事件监听
   * @default true
   */
  disabledOnChangeListener?: boolean
  /**
   * 是否禁用所有表单项的input事件监听
   * @default true
   */
  disabledOnInputListener?: boolean
  /**
   * 所有表单项的空状态值,默认都是undefined，naive-ui的空状态值是null
   */
  emptyStateValue?: null | undefined
  /**
   * 所有表单项的控件样式
   * @default {}
   */
  formFieldProps?: any
  /**
   * 所有表单项的栅格布局，支持函数形式
   * @default ""
   */
  formItemClass?: (() => string) | string
  /**
   * 隐藏所有表单项label
   * @default false
   */
  hideLabel?: boolean
  /**
   * 是否隐藏必填标记
   * @default false
   */
  hideRequiredMark?: boolean
  /**
   * 所有表单项的label样式
   * @default ""
   */
  labelClass?: string
  /**
   * 所有表单项的label宽度
   */
  labelWidth?: number
  /**
   * 所有表单项的model属性名
   * @default "modelValue"
   */
  modelPropName?: string
  /**
   * 所有表单项的wrapper样式
   */
  wrapperClass?: string
}

export interface FormSchema<
  T extends BaseFormComponentType = BaseFormComponentType,
> extends FormCommonConfig {
  /** 组件 */
  component: Component | T
  /** 组件参数 */
  componentProps?: any
  /** 默认值 */
  defaultValue?: any
  /** 依赖 */
  dependencies?: any
  /** 描述 */
  description?: any
  /** 字段名 */
  fieldName: string
  /** 帮助信息 */
  help?: any
  /** 是否隐藏表单项 */
  hide?: boolean
  /** 表单项 */
  label?: any
  // 自定义组件内部渲染
  renderComponentContent?: any
  /** 字段规则 */
  rules?: any
  /** 后缀 */
  suffix?: any
}
