/* eslint-disable max-statements */
/* eslint-disable simple-import-sort/imports */
/**
 * Copyright (c) 2021, Henrik Geißler.
 */
import Prism from 'prismjs'
import type { ReactNode } from 'react'
import React, { useEffect } from 'react'

import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

type CodeProps = {
  children?: ReactNode
  lang: string
}
const Code = ({ children, lang }: CodeProps): JSX.Element | null => {
  useEffect(() => {
    Prism.highlightAll()
  }, [children, lang])
  if (!children) return null
  const JsxString = (component: any, counter = 0): string => {
    if (!component.type) return component
    const type = component.type.name
    const { props } = component
    let propsString = ''
    for (const key in props) {
      if (key !== 'children') {
        const propertyValue = props[key]
        let value = ''
        if (propertyValue instanceof Object) {
          value = `{${JSON.stringify(propertyValue).replace(/["']+/g, '')}}`
        } else {
          value = `"${propertyValue}"`
        }
        propsString += ` ${key}=${value}`
      }
    }
    if (props.children) {
      counter += 2
      const children = JsxString(props.children, counter)

      return `<${type}${propsString}>
${new Array(counter).join(' ')}  ${children}
${new Array(counter).join(' ')}</${type}>`
    }

    return `<${type}${propsString} />`
  }

  return (
    <pre
      style={{
        background: '#f9f9fb',
        border: '1px solid #e6e9ec',
        borderRadius: '5px',
        boxShadow:
          'inset 0 0 10px #e3e7ea, inset 0 0 2px #e3e7ea, 0 1px 0 0 #fff',
        margin: '0 0 40px',
        padding: '20px 30px',
        textShadow: ' 0 1px 0 #fff!important',
      }}
    >
      <code className={`language-${lang}`}>{JsxString(children).trim()}</code>
    </pre>
  )
}

export default Code
