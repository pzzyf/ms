import type { MsButtonProps } from '@ms-core/shadcn-ui'
import type { ClassType, MaybeComputedRef } from '@ms-core/typings'
import type { FieldOptions, FormContext, GenericObject } from 'vee-validate'
import type { Component, HtmlHTMLAttributes, Ref } from 'vue'
import type { FormApi } from './form-api'

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

export type FormFieldOptions = Partial<
  FieldOptions & {
    validateOnBlur?: boolean
    validateOnChange?: boolean
    validateOnInput?: boolean
    validateOnModelUpdate?: boolean
  }
>

export type ArrayToStringFields = Array<
  | [string[], string?] // 嵌套数组格式，可选分隔符
  | string // 单个字段，使用默认分隔符
  | string[]
>

export type FieldMappingTime = [
  string,
  [string, string],
  (
    | ((value: any, fieldName: string) => any)
    | [string, string]
    | null
    | string
  )?,
][]

export type HandleResetFn = (
  values: Record<string, any>,
) => Promise<void> | void

export type HandleSubmitFn = (
  values: Record<string, any>,
) => Promise<void> | void

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

export interface ActionButtonOptions extends MsButtonProps {
  [key: string]: any
  content?: MaybeComputedRef<string>
  show?: boolean
}

export interface FormRenderProps<
  T extends BaseFormComponentType = BaseFormComponentType,
> {
  /**
   * 表单字段数组映射字符串配置 默认使用","
   */
  arrayToStringFields?: ArrayToStringFields
  /**
   * 是否折叠，在showCollapseButton=true下生效
   * true:折叠 false:展开
   */
  collapsed?: boolean
  /**
   * 折叠时保持行数
   * @default 1
   */
  collapsedRows?: number
  /**
   * 是否触发resize事件
   * @default false
   */
  collapseTriggerResize?: boolean
  /**
   * 表单项通用后备配置，当子项目没配置时使用这里的配置，子项目配置优先级高于此配置
   */
  commonConfig?: FormCommonConfig
  /**
   * 紧凑模式（移除表单每一项底部为校验信息预留的空间）
   */
  compact?: boolean
  /**
   * 组件v-model事件绑定
   */
  componentBindEventMap?: Partial<Record<BaseFormComponentType, string>>
  /**
   * 组件集合
   */
  componentMap?: Record<BaseFormComponentType, Component>
  /**
   * 表单字段映射到时间格式
   */
  fieldMappingTime?: FieldMappingTime
  /**
   * 表单实例
   */
  form?: FormContext<GenericObject>
  /**
   * 表单项布局
   */
  layout?: FormLayout
  /**
   * 表单定义
   */
  schema?: FormSchema<T>[]

  /**
   * 是否显示展开/折叠
   */
  showCollapseButton?: boolean
  /**
   * 格式化日期
   */

  /**
   * 表单栅格布局
   * @default "grid-cols-1"
   */
  wrapperClass?: WrapperClassType
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

export type FormActions = FormContext<GenericObject>

export type ExtendedFormApi = FormApi & {
  useStore: <T = NoInfer<MsFormProps>>(
    selector?: (state: NoInfer<MsFormProps>) => T,
  ) => Readonly<Ref<T>>
}

export interface MsFormProps<
  T extends BaseFormComponentType = BaseFormComponentType,
> extends Omit<
    FormRenderProps<T>,
  'componentBindEventMap' | 'componentMap' | 'form'
  > {
  /**
   * 操作按钮是否反转（提交按钮前置）
   */
  actionButtonsReverse?: boolean
  /**
   * 操作按钮组的样式
   * newLine: 在新行显示。rowEnd: 在行内显示，靠右对齐（默认）。inline: 使用grid默认样式
   */
  actionLayout?: 'inline' | 'newLine' | 'rowEnd'
  /**
   * 操作按钮组显示位置，默认靠右显示
   */
  actionPosition?: 'center' | 'left' | 'right'
  /**
   * 表单操作区域class
   */
  actionWrapperClass?: ClassType
  /**
   * 表单字段数组映射字符串配置 默认使用","
   */
  arrayToStringFields?: ArrayToStringFields

  /**
   * 表单字段映射
   */
  fieldMappingTime?: FieldMappingTime
  /**
   * 表单收起展开状态变化回调
   */
  handleCollapsedChange?: (collapsed: boolean) => void
  /**
   * 表单重置回调
   */
  handleReset?: HandleResetFn
  /**
   * 表单提交回调
   */
  handleSubmit?: HandleSubmitFn
  /**
   * 表单值变化回调
   */
  handleValuesChange?: (
    values: Record<string, any>,
    fieldsChanged: string[],
  ) => void
  /**
   * 重置按钮参数
   */
  resetButtonOptions?: ActionButtonOptions

  /**
   * 验证失败时是否自动滚动到第一个错误字段
   * @default false
   */
  scrollToFirstError?: boolean

  /**
   * 是否显示默认操作按钮
   * @default true
   */
  showDefaultActions?: boolean

  /**
   * 提交按钮参数
   */
  submitButtonOptions?: ActionButtonOptions

  /**
   * 是否在字段值改变时提交表单
   * @default false
   */
  submitOnChange?: boolean

  /**
   * 是否在回车时提交表单
   * @default false
   */
  submitOnEnter?: boolean
}
