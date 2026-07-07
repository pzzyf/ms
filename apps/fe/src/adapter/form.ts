import type { MsFormSchema as FormSchema, MsFormProps } from '@ms/common-ui'

import { setupMsForm, useMsForm as useForm, z } from '@ms/common-ui'

async function initSetupMsForm() {
  setupMsForm({
    config: {
      // ant design vue组件库默认都是 v-model:value
      baseModelPropName: 'value',

      // 一些组件是 v-model:checked 或者 v-model:fileList
      modelPropNameMap: {
        Checkbox: 'checked',
        Radio: 'checked',
        Switch: 'checked',
        Upload: 'fileList',
      },
    },
  })
}

const useMsForm = useForm

export { initSetupMsForm, useMsForm, z }

export type MsFormSchema = FormSchema
export type { MsFormProps }
